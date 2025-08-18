import { useState } from 'react'
import { useFavorites } from '@/hooks/useFavorites'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
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

export default function Favorites() {
  const { user } = useAuth()
  const { requireAuth } = useAuthGuard()
  const { favorites, isLoading, removeFromFavorites, isRemoving } = useFavorites()
  const { addToCart, isAdding } = useCart()
  const [removingId, setRemovingId] = useState<number | null>(null)

  const handleRemoveFromFavorites = (productId: number) => {
    requireAuth(() => {
      setRemovingId(productId)
      removeFromFavorites(productId)
      setRemovingId(null)
    })
  }

  const handleAddToCart = (productId: number) => {
    requireAuth(() => {
      addToCart(productId)
    })
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
          <p className="text-muted-foreground mb-6">Please log in to view your favorite items.</p>
          <Button onClick={() => requireAuth(() => {})}>
            Login to View Favorites
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
          <p className="text-muted-foreground">Items you've marked as favorites</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-gradient-card border-border/50">
              <CardHeader>
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
          <p className="text-muted-foreground mb-6">You haven't added any items to your favorites yet.</p>
          <p className="text-sm text-muted-foreground">Browse our products and click the heart icon to add them here!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
        <p className="text-muted-foreground">
          {favorites.length} {favorites.length === 1 ? 'item' : 'items'} in your favorites
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => {
          const product = favorite.products
          if (!product) return null

          return (
            <Card key={favorite.id} className="bg-gradient-card border-border/50 hover:shadow-cyber transition-all duration-300">
              <CardHeader>
                {product.image && (
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardTitle className="text-lg">{product.name}</CardTitle>
                {product.brand && product.model && (
                  <p className="text-sm text-muted-foreground">
                    {product.brand} {product.model}
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-cyber-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge variant={product.status === 'In Stock' ? 'secondary' : 'destructive'}>
                    {product.status}
                  </Badge>
                </div>
                {product.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}
              </CardContent>

              <CardFooter className="gap-2">
                <Button
                  onClick={() => handleAddToCart(product.id)}
                  disabled={isAdding || product.status !== 'In Stock'}
                  className="flex-1"
                  variant="default"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                
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
                      <AlertDialogTitle>Remove from Favorites?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove "{product.name}" from your favorites?
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleRemoveFromFavorites(product.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}