import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Shield, 
  Bell, 
  Database, 
  Lock,
  Monitor,
  Mail,
  Smartphone
} from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    security: true,
    inventory: true
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
          System Settings
        </h1>
        <p className="text-muted-foreground">
          Configure your cybersecurity platform preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile */}
        <Card className="lg:col-span-2 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-cyber-primary" />
            <h2 className="text-xl font-semibold">User Profile</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" placeholder="Security Administrator" />
            </div>
          </div>

          <Button variant="cyber">Update Profile</Button>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-cyber-primary" />
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </div>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Lock className="h-4 w-4" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Database className="h-4 w-4" />
              Backup Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Monitor className="h-4 w-4" />
              System Status
            </Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="lg:col-span-2 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-cyber-primary" />
            <h2 className="text-xl font-semibold">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, email: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Browser push notifications</p>
                </div>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications.push}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, push: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label htmlFor="security-alerts">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">Critical security notifications</p>
                </div>
              </div>
              <Switch
                id="security-alerts"
                checked={notifications.security}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, security: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label htmlFor="inventory-updates">Inventory Updates</Label>
                  <p className="text-sm text-muted-foreground">Stock level changes</p>
                </div>
              </div>
              <Switch
                id="inventory-updates"
                checked={notifications.inventory}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, inventory: checked }))
                }
              />
            </div>
          </div>

          <Button variant="cyber">Save Preferences</Button>
        </Card>

        {/* System Info */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Monitor className="h-5 w-5 text-cyber-primary" />
            <h2 className="text-xl font-semibold">System Info</h2>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version:</span>
              <span>v2.1.4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Update:</span>
              <span>Dec 15, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Uptime:</span>
              <span>15 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">License:</span>
              <span className="text-green-400">Active</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}