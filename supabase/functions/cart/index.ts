import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CartItem {
  id: string
  user_id: string
  product_id: number
  quantity: number
  created_at: string
  updated_at: string
  products?: {
    id: number
    name: string
    category: string
    price: number
    status: string
    image?: string
    brand?: string
    model?: string
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get user from token
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authorization' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    switch (req.method) {
      case 'GET': {
        // Get user's cart items with product details
        const { data: cartItems, error } = await supabaseClient
          .from('cart_items')
          .select(`
            *,
            products (
              id,
              name,
              category,
              price,
              status,
              image,
              brand,
              model
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching cart items:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to fetch cart items' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        // Calculate total
        const total = cartItems?.reduce((sum, item) => {
          return sum + (item.products?.price || 0) * item.quantity
        }, 0) || 0

        return new Response(JSON.stringify({
          items: cartItems || [],
          total: parseFloat(total.toFixed(2))
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      case 'POST': {
        const { product_id, quantity = 1 } = await req.json()

        if (!product_id || quantity < 1) {
          return new Response(
            JSON.stringify({ error: 'Invalid product_id or quantity' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        // Check if item already exists in cart
        const { data: existingItem } = await supabaseClient
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id)
          .eq('product_id', product_id)
          .single()

        if (existingItem) {
          // Update quantity
          const { data: updatedItem, error } = await supabaseClient
            .from('cart_items')
            .update({ quantity: existingItem.quantity + quantity })
            .eq('id', existingItem.id)
            .select()
            .single()

          if (error) {
            console.error('Error updating cart item:', error)
            return new Response(
              JSON.stringify({ error: 'Failed to update cart item' }),
              { 
                status: 500, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
              }
            )
          }

          return new Response(JSON.stringify(updatedItem), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        } else {
          // Add new item
          const { data: newItem, error } = await supabaseClient
            .from('cart_items')
            .insert({
              user_id: user.id,
              product_id,
              quantity
            })
            .select()
            .single()

          if (error) {
            console.error('Error adding cart item:', error)
            return new Response(
              JSON.stringify({ error: 'Failed to add cart item' }),
              { 
                status: 500, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
              }
            )
          }

          return new Response(JSON.stringify(newItem), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }
      }

      case 'PUT': {
        const { product_id, quantity } = await req.json()

        if (!product_id || quantity < 1) {
          return new Response(
            JSON.stringify({ error: 'Invalid product_id or quantity' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        const { data: updatedItem, error } = await supabaseClient
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('product_id', product_id)
          .select()
          .single()

        if (error) {
          console.error('Error updating cart item:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to update cart item' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        return new Response(JSON.stringify(updatedItem), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      case 'DELETE': {
        const url = new URL(req.url)
        const productId = url.searchParams.get('product_id')

        if (!productId) {
          return new Response(
            JSON.stringify({ error: 'product_id parameter required' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        const { error } = await supabaseClient
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', parseInt(productId))

        if (error) {
          console.error('Error removing cart item:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to remove cart item' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      default:
        return new Response('Method not allowed', { 
          status: 405, 
          headers: corsHeaders 
        })
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})