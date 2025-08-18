import { supabase } from './supabase'

const API_BASE_URL = 'https://xsbnptuqoreumobxgyxc.supabase.co/functions/v1'

// Get auth token for authenticated requests
const getAuthToken = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token
}

// Products API (public)
export const productsApi = {
  getAll: async (category?: string) => {
    const url = new URL(`${API_BASE_URL}/products`)
    if (category) {
      url.searchParams.set('category', category)
    }
    
    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return response.json()
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch product')
    }
    return response.json()
  }
}

// Cart API (requires authentication)
export const cartApi = {
  get: async () => {
    const token = await getAuthToken()
    if (!token) throw new Error('Authentication required')

    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch cart')
    }
    return response.json()
  },

  add: async (productId: number, quantity: number = 1) => {
    const token = await getAuthToken()
    if (!token) throw new Error('Authentication required')

    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: productId,
        quantity
      })
    })
    if (!response.ok) {
      throw new Error('Failed to add to cart')
    }
    return response.json()
  },

  update: async (productId: number, updates: { quantity?: number; is_selected?: boolean }) => {
    const token = await getAuthToken()
    if (!token) throw new Error('Authentication required')

    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: productId,
        ...updates
      })
    })
    if (!response.ok) {
      throw new Error('Failed to update cart')
    }
    return response.json()
  },

  remove: async (productId: number) => {
    const token = await getAuthToken()
    if (!token) throw new Error('Authentication required')

    const response = await fetch(`${API_BASE_URL}/cart?product_id=${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Failed to remove from cart')
    }
    return response.json()
  }
}

// Favorites API (requires authentication)
export const favoritesApi = {
  get: async () => {
    const token = await getAuthToken()
    if (!token) throw new Error('Authentication required')

    const response = await fetch(`${API_BASE_URL}/favorites`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch favorites')
    }
    return response.json()
  },

  add: async (productId: number) => {
    const token = await getAuthToken()
    if (!token) throw new Error('Authentication required')

    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: productId
      })
    })
    if (!response.ok) {
      throw new Error('Failed to add to favorites')
    }
    return response.json()
  },

  remove: async (productId: number) => {
    const token = await getAuthToken()
    if (!token) throw new Error('Authentication required')

    const response = await fetch(`${API_BASE_URL}/favorites?product_id=${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Failed to remove from favorites')
    }
    return response.json()
  },

  isExists: async (productId: number) => {
    try {
      const favorites = await favoritesApi.get()
      return favorites.some((fav: any) => fav.product_id === productId)
    } catch {
      return false
    }
  }
}