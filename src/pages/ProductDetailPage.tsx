import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Shield, Star, Truck, RotateCcw, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductById } from "@/data/products";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  
  if (!id) {
    return <div>Product not found</div>;
  }

  const product = getProductById(parseInt(id));
  
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Link to="/">
          <Button variant="cyber">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Low Stock":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Out of Stock":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to={`/category/${product.category.toLowerCase()}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline">{product.category}</Badge>
            <Badge className={getStatusColor(product.status)}>
              {product.status}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            {product.name}
          </h1>
          <p className="text-muted-foreground">{product.brand} • {product.model}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <Card className="p-6">
          <div className="aspect-square bg-gradient-card rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Card>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(127 reviews)</span>
            </div>
            <p className="text-3xl font-bold text-cyber-primary mb-4">
              ${product.price.toLocaleString()}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity and Add to Cart */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="cyber" 
                  className="flex-1"
                  disabled={product.status === "Out of Stock"}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="cyber-outline">
                  <CreditCard className="h-4 w-4" />
                  Buy Now
                </Button>
              </div>
            </div>
          </Card>

          {/* Security Features */}
          <Card className="p-4 bg-gradient-card border-cyber-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-cyber-primary" />
              <h3 className="font-semibold">Security Guarantee</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-cyber-secondary" />
                <span>Secure Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-cyber-secondary" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-cyber-secondary" />
                <span>1 Year Warranty</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="features" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-cyber-primary">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-cyber-primary rounded-full" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="specifications" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-cyber-primary">Technical Specifications</h3>
            <div className="space-y-3">
              {Object.entries(product.technicalSpecs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border/50">
                  <span className="font-medium">{key}:</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-cyber-primary">Customer Reviews</h3>
            <div className="space-y-4">
              <div className="border-b border-border/50 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-medium">John D.</span>
                  <span className="text-sm text-muted-foreground">Verified Purchase</span>
                </div>
                <p className="text-muted-foreground">
                  "Excellent security device with robust features. Easy to configure and very reliable."
                </p>
              </div>
              <div className="border-b border-border/50 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <Star className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Sarah M.</span>
                  <span className="text-sm text-muted-foreground">Verified Purchase</span>
                </div>
                <p className="text-muted-foreground">
                  "Great performance and build quality. Would recommend for enterprise use."
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}