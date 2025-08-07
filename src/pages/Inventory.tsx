import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, getAllCategories } from "@/data/products";

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...getAllCategories()];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            Product Inventory
          </h1>
          <p className="text-muted-foreground">
            Browse and manage all cybersecurity products
          </p>
        </div>
        <Button variant="cyber" className="lg:w-auto">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "cyber" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group overflow-hidden border border-border/50 hover:border-cyber-primary/50 transition-all duration-300 hover:shadow-cyber">
            <div className="aspect-video bg-gradient-card relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className={`absolute top-2 right-2 ${getStatusColor(product.status)}`}>
                {product.status}
              </Badge>
            </div>
            
            <div className="p-4 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-xs">
                    {product.brand}
                  </Badge>
                </div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-foreground group-hover:text-cyber-primary transition-colors hover:underline">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground">{product.specs}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-cyber-primary">
                  ${product.price.toLocaleString()}
                </span>
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Link to={`/product/${product.id}`} className="flex-1">
                  <Button variant="cyber-outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
                <Button 
                  variant="cyber" 
                  size="sm"
                  onClick={() => console.log(`Add ${product.name} to cart`)}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}