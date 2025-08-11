import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Favorite {
  id: string
  user_id: string
  product_id: number
  created_at: string
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
        // Get user's favorites with product details
        const { data: favorites, error } = await supabaseClient
          .from('favorites')
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
              model,
              description
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching favorites:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to fetch favorites' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        return new Response(JSON.stringify(favorites || []), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      case 'POST': {
        const { product_id } = await req.json()

        if (!product_id) {
          return new Response(
            JSON.stringify({ error: 'product_id is required' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        // Check if already favorited
        const { data: existing } = await supabaseClient
          .from('favorites')
          .select('id')
          .eq('user_id', user.id)
          .eq('product_id', product_id)
          .single()

        if (existing) {
          return new Response(
            JSON.stringify({ error: 'Product already in favorites' }),
            { 
              status: 409, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        const { data: newFavorite, error } = await supabaseClient
          .from('favorites')
          .insert({
            user_id: user.id,
            product_id
          })
          .select()
          .single()

        if (error) {
          console.error('Error adding favorite:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to add favorite' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        return new Response(JSON.stringify(newFavorite), {
          status: 201,
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
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', parseInt(productId))

        if (error) {
          console.error('Error removing favorite:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to remove favorite' }),
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