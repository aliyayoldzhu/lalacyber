import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function Cart() {
  const { user } = useAuth()
  const { requireAuth } = useAuthGuard()
  const { cartItems, selectedTotal, selectedItemsCount, isLoading, updateQuantity, updateSelection, removeFromCart, isRemoving } = useCart()
  const [removingId, setRemovingId] = useState<number | null>(null)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  // Initialize selected items when cart loads
  useState(() => {
    const initialSelected = new Set<string>()
    cartItems.forEach(item => {
      if (item.is_selected) {
        initialSelected.add(item.id)
      }
    })
    setSelectedItems(initialSelected)
  })

  const handleItemSelect = (itemId: string, productId: number, checked: boolean) => {
    const newSelected = new Set(selectedItems)
    if (checked) {
      newSelected.add(itemId)
    } else {
      newSelected.delete(itemId)
    }
    setSelectedItems(newSelected)
    updateSelection(productId, checked)
  }

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveFromCart = (productId: number) => {
    requireAuth(() => {
      setRemovingId(productId)
      removeFromCart(productId)
      setRemovingId(null)
    })
  }

  const getSelectedTotal = () => {
    return cartItems
      .filter(item => selectedItems.has(item.id))
      .reduce((sum, item) => sum + (item.products?.price || 0) * item.quantity, 0)
  }

  const getSelectedCount = () => {
    return selectedItems.size
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
          <p className="text-muted-foreground mb-6">Please log in to view your cart.</p>
          <Button onClick={() => requireAuth(() => {})}>
            Login to View Cart
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
          <p className="text-muted-foreground">Loading your cart items...</p>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-20 w-20 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
          <p className="text-muted-foreground mb-6">Your cart is empty.</p>
          <p className="text-sm text-muted-foreground">Browse our products and add items to your cart!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
        <p className="text-muted-foreground">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="space-y-6">
        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item) => {
            const product = item.products
            if (!product) return null

            return (
              <Card key={item.id} className="bg-gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={selectedItems.has(item.id)}
                      onCheckedChange={(checked) => handleItemSelect(item.id, product.id, checked as boolean)}
                    />
                    
                    {product.image && (
                      <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                      {product.brand && product.model && (
                        <p className="text-sm text-muted-foreground">
                          {product.brand} {product.model}
                        </p>
                      )}
                      <Badge variant={product.status === 'In Stock' ? 'secondary' : 'destructive'} className="mt-1">
                        {product.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                        className="w-20 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-cyber-primary">
                        ${(product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${product.price.toFixed(2)} each
                      </p>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          disabled={removingId === product.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove from Cart?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove "{product.name}" from your cart?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRemoveFromCart(product.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Cart Summary */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Selected Items ({getSelectedCount()})</span>
              <span>${getSelectedTotal().toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-cyber-primary">${getSelectedTotal().toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              size="lg"
              disabled={getSelectedCount() === 0}
            >
              Proceed to Payment ({getSelectedCount()} items)
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}