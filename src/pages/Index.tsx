import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Shield, Database, Settings, BarChart3 } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-cyber bg-clip-text text-transparent">
              Welcome to CyberSec Systems
            </h1>
            <p className="text-xl text-muted-foreground">
              Your comprehensive cybersecurity management platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Link to="/dashboard">
              <Card className="hover:shadow-cyber transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-cyber-primary mb-2" />
                  <CardTitle>Dashboard</CardTitle>
                  <CardDescription>View system overview and analytics</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/inventory">
              <Card className="hover:shadow-cyber transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <Database className="h-8 w-8 text-cyber-primary mb-2" />
                  <CardTitle>Inventory</CardTitle>
                  <CardDescription>Manage security assets and resources</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/settings">
              <Card className="hover:shadow-cyber transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <Settings className="h-8 w-8 text-cyber-primary mb-2" />
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure system preferences</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Card className="hover:shadow-cyber transition-all duration-300">
              <CardHeader>
                <Shield className="h-8 w-8 text-cyber-primary mb-2" />
                <CardTitle>Security</CardTitle>
                <CardDescription>Monitor threats and incidents</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-cyber bg-clip-text text-transparent">
            CyberSec Systems
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Advanced cybersecurity management platform for enterprise-grade protection, 
            monitoring, and incident response.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-cyber-primary hover:bg-cyber-primary/90">
                Get Started
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
