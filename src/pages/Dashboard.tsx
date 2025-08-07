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
import { products } from "@/data/products";

const categories = [
  { name: "Firewalls", icon: Shield, count: products.filter(p => p.category === "Firewalls").length },
  { name: "Switches", icon: Network, count: products.filter(p => p.category === "Switches").length },
  { name: "Routers", icon: Router, count: products.filter(p => p.category === "Routers").length },
  { name: "Laptops", icon: Laptop, count: products.filter(p => p.category === "Laptops").length },
  { name: "Servers", icon: Server, count: products.filter(p => p.category === "Servers").length },
  { name: "Access Points", icon: Wifi, count: products.filter(p => p.category === "Access Points").length },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const totalDevices = products.length;
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