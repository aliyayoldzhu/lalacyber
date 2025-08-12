import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { favoritesApi } from '@/lib/api'
import { useAuth } from './useAuth'
import { useToast } from './use-toast'

export interface Favorite {
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
    description?: string
  }
}

export function useFavorites() {
  const { user } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const {
    data: favorites = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: favoritesApi.get,
    enabled: !!user,
  })

  const addFavoriteMutation = useMutation({
    mutationFn: favoritesApi.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      toast({
        title: "Added to favorites",
        description: "Item has been added to your favorites.",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add to favorites",
        variant: "destructive",
      })
    },
  })

  const removeFavoriteMutation = useMutation({
    mutationFn: favoritesApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      toast({
        title: "Removed from favorites",
        description: "Item has been removed from your favorites.",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove from favorites",
        variant: "destructive",
      })
    },
  })

  const addToFavorites = (productId: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to favorites.",
        variant: "destructive",
      })
      return
    }
    addFavoriteMutation.mutate(productId)
  }

  const removeFromFavorites = (productId: number) => {
    removeFavoriteMutation.mutate(productId)
  }

  const isFavorite = (productId: number) => {
    return favorites.some((fav: Favorite) => fav.product_id === productId)
  }

  return {
    favorites,
    isLoading,
    error,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    isAdding: addFavoriteMutation.isPending,
    isRemoving: removeFavoriteMutation.isPending,
  }
}