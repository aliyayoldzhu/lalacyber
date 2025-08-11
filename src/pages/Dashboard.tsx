import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  Router, 
  Laptop, 
  Wifi, 
  Server, 
  Network
} from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { productsApi } from "@/lib/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    { name: "Firewalls", icon: Shield, count: 0 },
    { name: "Switches", icon: Network, count: 0 },
    { name: "Routers", icon: Router, count: 0 },
    { name: "Laptops", icon: Laptop, count: 0 },
    { name: "Servers", icon: Server, count: 0 },
    { name: "Access Points", icon: Wifi, count: 0 },
  ]);
  const [totalDevices, setTotalDevices] = useState(0);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const allProducts = await productsApi.getAll();
        setTotalDevices(allProducts.length);
        
        const updatedCategories = categories.map(category => ({
          ...category,
          count: allProducts.filter(p => p.category === category.name).length
        }));
        setCategories(updatedCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategoryCounts();
  }, []);
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
          Security Device Categories
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comprehensive overview of all network security devices and equipment in your infrastructure
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-cyber-primary">{totalDevices}</div>
          <div className="text-muted-foreground">Total Devices</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-cyber-secondary">6</div>
          <div className="text-muted-foreground">Categories</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-cyber-accent">98%</div>
          <div className="text-muted-foreground">Active Status</div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            name={category.name}
            icon={category.icon}
            count={category.count}
            onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-cyber-primary">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-sm">New firewall added to inventory</span>
            <span className="text-xs text-muted-foreground">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-sm">Router maintenance scheduled</span>
            <span className="text-xs text-muted-foreground">5 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Access point security update completed</span>
            <span className="text-xs text-muted-foreground">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}