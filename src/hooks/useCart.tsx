import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '@/lib/api'
import { useAuth } from './useAuth'
import { useToast } from './use-toast'

export interface CartItem {
  id: string
  user_id: string
  product_id: number
  quantity: number
  is_selected: boolean
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

export interface CartResponse {
  items: CartItem[]
  total: number
}

export function useCart() {
  const { user } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const {
    data: cartData = { items: [], total: 0 },
    isLoading,
    error
  } = useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.get,
    enabled: !!user,
  })

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity?: number }) =>
      cartApi.add(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart.",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add to cart",
        variant: "destructive",
      })
    },
  })

  const updateCartMutation = useMutation({
    mutationFn: ({ productId, updates }: { productId: number; updates: { quantity?: number; is_selected?: boolean } }) =>
      cartApi.update(productId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update cart",
        variant: "destructive",
      })
    },
  })

  const removeFromCartMutation = useMutation({
    mutationFn: cartApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart.",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove from cart",
        variant: "destructive",
      })
    },
  })

  const addToCart = (productId: number, quantity: number = 1) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to cart.",
        variant: "destructive",
      })
      return
    }
    addToCartMutation.mutate({ productId, quantity })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    updateCartMutation.mutate({ productId, updates: { quantity } })
  }

  const updateSelection = (productId: number, isSelected: boolean) => {
    updateCartMutation.mutate({ productId, updates: { is_selected: isSelected } })
  }

  const removeFromCart = (productId: number) => {
    removeFromCartMutation.mutate(productId)
  }

  const getSelectedTotal = () => {
    return cartData.items
      .filter(item => item.is_selected)
      .reduce((sum, item) => sum + (item.products?.price || 0) * item.quantity, 0)
  }

  const getSelectedItemsCount = () => {
    return cartData.items.filter(item => item.is_selected).length
  }

  return {
    cartItems: cartData.items,
    total: cartData.total,
    selectedTotal: getSelectedTotal(),
    selectedItemsCount: getSelectedItemsCount(),
    isLoading,
    error,
    addToCart,
    updateQuantity,
    updateSelection,
    removeFromCart,
    isAdding: addToCartMutation.isPending,
    isUpdating: updateCartMutation.isPending,
    isRemoving: removeFromCartMutation.isPending,
  }
}