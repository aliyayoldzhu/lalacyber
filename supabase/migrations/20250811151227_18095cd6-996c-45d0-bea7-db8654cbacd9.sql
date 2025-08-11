-- Create products table (if not exists, update schema to match requirements)
DROP TABLE IF EXISTS public.products CASCADE;
CREATE TABLE public.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('In Stock', 'Low Stock', 'Out of Stock')),
  image TEXT,
  specs TEXT,
  description TEXT,
  features TEXT[], -- Array of features
  technical_specs JSONB, -- JSON for technical specifications
  brand TEXT,
  model TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart table for user cart items
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  product_id INTEGER NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create favorites table for user favorites
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  product_id INTEGER NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Products policies (public read access)
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

-- Cart policies (user-specific data)
CREATE POLICY "Users can view their own cart items" ON public.cart_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items" ON public.cart_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items" ON public.cart_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items" ON public.cart_items
  FOR DELETE USING (auth.uid() = user_id);

-- Favorites policies (user-specific data)
CREATE POLICY "Users can view their own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Create trigger for updating timestamps
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON public.cart_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products data
INSERT INTO public.products (name, category, price, status, image, specs, description, features, technical_specs, brand, model) VALUES
('Enterprise Firewall Pro', 'Firewalls', 2999.99, 'In Stock', '/placeholder.svg', 'High-performance enterprise firewall', 'Advanced threat protection with deep packet inspection and intrusion prevention capabilities.', 
 ARRAY['Deep Packet Inspection', 'Intrusion Prevention', 'VPN Support', 'Load Balancing'], 
 '{"throughput": "10 Gbps", "concurrent_sessions": "2M", "ports": "24x Gigabit + 4x 10G SFP+", "power": "200W"}', 
 'SecureNet', 'FW-3000'),
('Managed Switch 48-Port', 'Switches', 899.99, 'In Stock', '/placeholder.svg', '48-port managed Gigabit switch', 'Layer 3 managed switch with advanced VLAN and QoS capabilities.',
 ARRAY['Layer 3 Switching', 'VLAN Support', 'QoS', 'SNMP Management'],
 '{"ports": "48x Gigabit + 4x 10G SFP+", "switching_capacity": "176 Gbps", "power": "75W", "rack_units": "1U"}',
 'NetGear', 'MS48-100'),
('Business Router Pro', 'Routers', 1599.99, 'Low Stock', '/placeholder.svg', 'High-performance business router', 'Dual-WAN router with advanced routing protocols and security features.',
 ARRAY['Dual WAN', 'BGP Support', 'VPN', 'Failover'],
 '{"wan_ports": "2x Gigabit", "lan_ports": "8x Gigabit", "wireless": "Wi-Fi 6", "throughput": "3.5 Gbps"}',
 'Cisco', 'RV340W'),
('Security Laptop Elite', 'Laptops', 2299.99, 'In Stock', '/placeholder.svg', 'Hardened security laptop', 'Military-grade laptop with encrypted storage and secure boot capabilities.',
 ARRAY['Encrypted Storage', 'Secure Boot', 'TPM 2.0', 'Rugged Design'],
 '{"cpu": "Intel i7-12700H", "ram": "32GB DDR5", "storage": "1TB NVMe SSD", "display": "15.6\" 4K", "battery": "12 hours"}',
 'Panasonic', 'CF-33'),
('Rack Server Enterprise', 'Servers', 4999.99, 'In Stock', '/placeholder.svg', '2U rack server', 'High-performance 2U server with redundant power supplies and hot-swappable drives.',
 ARRAY['Redundant PSU', 'Hot-Swap Drives', 'IPMI', 'ECC Memory'],
 '{"cpu": "2x Intel Xeon Gold", "ram": "128GB DDR4 ECC", "storage": "8x 2.5\" SAS/SATA", "network": "4x Gigabit", "psu": "2x 800W redundant"}',
 'Dell', 'R750'),
('Wireless Access Point Pro', 'Access Points', 399.99, 'Out of Stock', '/placeholder.svg', 'Enterprise wireless access point', 'Wi-Fi 6E access point with advanced security and management features.',
 ARRAY['Wi-Fi 6E', 'MU-MIMO', 'Band Steering', 'Captive Portal'],
 '{"wireless_standard": "802.11ax (Wi-Fi 6E)", "max_speed": "5.4 Gbps", "antennas": "4x4 MIMO", "power": "PoE+", "mounting": "Ceiling/Wall"}',
 'Ubiquiti', 'U6-Enterprise');