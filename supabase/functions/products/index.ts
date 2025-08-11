import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Product {
  id: number
  name: string
  category: string
  price: number
  status: string
  image?: string
  specs?: string
  description?: string
  features?: string[]
  technical_specs?: Record<string, any>
  brand?: string
  model?: string
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

    const url = new URL(req.url)
    const pathParts = url.pathname.split('/').filter(Boolean)
    const productId = pathParts[pathParts.length - 1]

    switch (req.method) {
      case 'GET': {
        if (productId && productId !== 'products') {
          // Get single product by ID
          const { data: product, error } = await supabaseClient
            .from('products')
            .select('*')
            .eq('id', parseInt(productId))
            .single()

          if (error) {
            console.error('Error fetching product:', error)
            return new Response(
              JSON.stringify({ error: 'Product not found' }),
              { 
                status: 404, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
              }
            )
          }

          return new Response(JSON.stringify(product), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        } else {
          // Get all products with optional category filter
          const category = url.searchParams.get('category')
          let query = supabaseClient.from('products').select('*')
          
          if (category) {
            query = query.eq('category', category)
          }

          const { data: products, error } = await query.order('id')

          if (error) {
            console.error('Error fetching products:', error)
            return new Response(
              JSON.stringify({ error: 'Failed to fetch products' }),
              { 
                status: 500, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
              }
            )
          }

          return new Response(JSON.stringify(products || []), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }
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