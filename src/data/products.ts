// Mock product data for cybersecurity equipment
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  image: string;
  specs: string;
  description: string;
  features: string[];
  technicalSpecs: {
    [key: string]: string;
  };
  brand: string;
  model: string;
}

export const products: Product[] = [
  // Firewalls
  {
    id: 1,
    name: "Fortinet FortiGate 60F",
    category: "Firewalls",
    brand: "Fortinet",
    model: "FortiGate 60F",
    price: 1299,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    specs: "6 ports, 10 Gbps throughput, Next-Gen Firewall",
    description: "Enterprise-grade next-generation firewall with advanced threat protection, web filtering, and intrusion prevention system.",
    features: [
      "Next-Generation Firewall (NGFW)",
      "Intrusion Prevention System (IPS)",
      "Web Application Firewall (WAF)",
      "Advanced Threat Protection",
      "VPN Support (IPSec/SSL)",
      "Centralized Management"
    ],
    technicalSpecs: {
      "Throughput": "10 Gbps",
      "Concurrent Sessions": "200,000",
      "New Sessions/sec": "25,000",
      "Interfaces": "5x GE RJ45, 1x GE SFP",
      "VPN Tunnels": "200 IPSec, 60 SSL",
      "Power Consumption": "35W"
    }
  },
  {
    id: 2,
    name: "Palo Alto PA-220",
    category: "Firewalls",
    brand: "Palo Alto",
    model: "PA-220",
    price: 1899,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1498050108023-4b2d558d2937",
    specs: "8 ports, 500 Mbps throughput, ML-powered security",
    description: "AI-powered next-generation firewall with machine learning-based threat detection and advanced behavioral analytics.",
    features: [
      "ML-Powered Threat Detection",
      "App-ID Technology",
      "User-ID Integration",
      "Content-ID Filtering",
      "WildFire Malware Analysis",
      "GlobalProtect VPN"
    ],
    technicalSpecs: {
      "Throughput": "500 Mbps",
      "Concurrent Sessions": "64,000",
      "New Sessions/sec": "3,000",
      "Interfaces": "8x GE Copper",
      "VPN Tunnels": "250 IPSec, 50 GlobalProtect",
      "Power Consumption": "40W"
    }
  },

  // Switches
  {
    id: 3,
    name: "Cisco Catalyst 2960X-24TS-L",
    category: "Switches",
    brand: "Cisco",
    model: "Catalyst 2960X-24TS-L",
    price: 899,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    specs: "24 ports, Layer 2, Gigabit Ethernet",
    description: "Reliable Layer 2 switch with advanced security features, QoS, and energy efficiency for enterprise networks.",
    features: [
      "24x Gigabit Ethernet Ports",
      "4x SFP Uplinks",
      "Advanced Security Features",
      "Quality of Service (QoS)",
      "Energy Efficient Ethernet",
      "Cisco IOS Software"
    ],
    technicalSpecs: {
      "Switch Capacity": "56 Gbps",
      "Forwarding Rate": "41.67 Mpps",
      "MAC Addresses": "8,000",
      "VLANs": "1,005",
      "Power Consumption": "44W",
      "MTBF": "442,970 hours"
    }
  },
  {
    id: 4,
    name: "HPE Aruba 6300M",
    category: "Switches",
    brand: "HPE Aruba",
    model: "6300M-24G-4SFP+",
    price: 1299,
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
    specs: "24 ports, Layer 3, Advanced routing",
    description: "High-performance Layer 3 switch with advanced routing capabilities, network analytics, and cloud management.",
    features: [
      "24x 1GbE RJ45 Ports",
      "4x 10GbE SFP+ Ports",
      "Layer 3 Routing",
      "Network Analytics Engine",
      "Zero Touch Provisioning",
      "Cloud Management Ready"
    ],
    technicalSpecs: {
      "Switch Capacity": "128 Gbps",
      "Forwarding Rate": "95.2 Mpps",
      "Routing Table": "16,000 IPv4 routes",
      "VLANs": "4,094",
      "Power Consumption": "65W",
      "Latency": "<3 μs"
    }
  },

  // Routers
  {
    id: 5,
    name: "Cisco ISR 4331",
    category: "Routers",
    brand: "Cisco",
    model: "ISR 4331",
    price: 2499,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
    specs: "3 slots, 100 Mbps performance, Enterprise routing",
    description: "Integrated services router with advanced security, unified communications, and application services.",
    features: [
      "Integrated Security",
      "Unified Communications",
      "Application Services",
      "Cloud Connectivity",
      "Service Module Slots",
      "Advanced QoS"
    ],
    technicalSpecs: {
      "Performance": "100 Mbps",
      "WAN Interfaces": "3x GE",
      "LAN Interfaces": "2x GE",
      "Service Module Slots": "3",
      "Memory": "4 GB DRAM",
      "Storage": "8 GB eUSB"
    }
  },
  {
    id: 6,
    name: "Netgear Nighthawk Pro Gaming XR500",
    category: "Routers",
    brand: "Netgear",
    model: "Nighthawk XR500",
    price: 299,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    specs: "AC2600, Gaming optimization, Dual-band",
    description: "High-performance gaming router with advanced QoS, network monitoring, and gaming acceleration.",
    features: [
      "Gaming Dashboard",
      "Dynamic QoS",
      "Gaming VPN",
      "Network Monitoring",
      "Beamforming+",
      "MU-MIMO Technology"
    ],
    technicalSpecs: {
      "Wi-Fi Standard": "802.11ac",
      "Speed": "AC2600 (800+1733 Mbps)",
      "Processor": "Dual-core 1.7GHz",
      "Memory": "512MB RAM",
      "Antennas": "4x External",
      "Ethernet Ports": "4x Gigabit"
    }
  },

  // Laptops
  {
    id: 7,
    name: "Lenovo ThinkPad P1 Gen 4",
    category: "Laptops",
    brand: "Lenovo",
    model: "ThinkPad P1 Gen 4",
    price: 2899,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    specs: "Intel i7, 32GB RAM, 1TB SSD, NVIDIA RTX",
    description: "Professional mobile workstation with enterprise security features, powerful performance for security analysis.",
    features: [
      "Intel vPro Technology",
      "Fingerprint Reader",
      "IR Camera with Windows Hello",
      "TPM 2.0 Chip",
      "Mil-Spec Durability",
      "Rapid Charge Technology"
    ],
    technicalSpecs: {
      "Processor": "Intel Core i7-11800H",
      "Memory": "32GB DDR4",
      "Storage": "1TB SSD PCIe",
      "Graphics": "NVIDIA RTX A2000",
      "Display": "15.6\" 4K OLED",
      "Battery": "90Wh"
    }
  },
  {
    id: 8,
    name: "Dell Latitude 9420",
    category: "Laptops",
    brand: "Dell",
    model: "Latitude 9420",
    price: 2199,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    specs: "Intel i7, 16GB RAM, 512GB SSD, Enterprise security",
    description: "Ultra-premium business laptop with advanced security features and AI-powered performance optimization.",
    features: [
      "Intelligent Privacy Features",
      "ExpressSign-in",
      "SafeShutter Camera",
      "Dell Optimizer",
      "5G Connectivity Ready",
      "Carbon Fiber Build"
    ],
    technicalSpecs: {
      "Processor": "Intel Core i7-1185G7",
      "Memory": "16GB LPDDR4x",
      "Storage": "512GB SSD M.2",
      "Graphics": "Intel Iris Xe",
      "Display": "14\" QHD+ Touch",
      "Weight": "2.87 lbs"
    }
  },

  // Servers
  {
    id: 9,
    name: "Dell PowerEdge R750",
    category: "Servers",
    brand: "Dell",
    model: "PowerEdge R750",
    price: 4999,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    specs: "Intel Xeon, 64GB RAM, 2U rack, Dual PSU",
    description: "High-performance 2U rack server optimized for security workloads and enterprise applications.",
    features: [
      "Intel Xeon Scalable Processors",
      "Advanced System Management",
      "Cyber Resilient Architecture",
      "Hardware Root of Trust",
      "Secure Boot",
      "System Lockdown"
    ],
    technicalSpecs: {
      "Processor": "2x Intel Xeon Silver 4314",
      "Memory": "64GB DDR4 ECC",
      "Storage": "4x 960GB SSD RAID 10",
      "Network": "4x 1GbE, 2x 10GbE SFP+",
      "PSU": "2x 800W Redundant",
      "Form Factor": "2U Rack"
    }
  },
  {
    id: 10,
    name: "HPE ProLiant DL380 Gen10+",
    category: "Servers",
    brand: "HPE",
    model: "ProLiant DL380 Gen10+",
    price: 5999,
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    specs: "Intel Xeon, 128GB RAM, 2U rack, Intelligent security",
    description: "Intelligent 2U rack server with security-first architecture and advanced threat detection capabilities.",
    features: [
      "Silicon Root of Trust",
      "Runtime Firmware Verification",
      "Secure Recovery",
      "HPE InfoSight Analytics",
      "Intelligent System Tuning",
      "Workload Matching"
    ],
    technicalSpecs: {
      "Processor": "2x Intel Xeon Gold 6248R",
      "Memory": "128GB DDR4 ECC",
      "Storage": "8x 1.2TB SAS RAID 6",
      "Network": "4x 1GbE, 2x 25GbE SFP28",
      "PSU": "2x 800W Platinum",
      "Management": "iLO 5"
    }
  },

  // Access Points
  {
    id: 11,
    name: "Ubiquiti UniFi 6 Enterprise",
    category: "Access Points",
    brand: "Ubiquiti",
    model: "U6-Enterprise",
    price: 379,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    specs: "Wi-Fi 6E, 6 GHz band, Enterprise features",
    description: "High-performance Wi-Fi 6E access point with advanced security features and enterprise management.",
    features: [
      "Wi-Fi 6E (6 GHz)",
      "4x4 MU-MIMO",
      "Advanced Security",
      "UniFi Network Control",
      "PoE+ Powered",
      "Seamless Roaming"
    ],
    technicalSpecs: {
      "Wi-Fi Standard": "802.11ax (Wi-Fi 6E)",
      "Speed": "Up to 7.68 Gbps",
      "Frequency": "2.4/5/6 GHz tri-band",
      "Antennas": "12x internal",
      "Power": "PoE+ (25W)",
      "Range": "150m (outdoor)"
    }
  },
  {
    id: 12,
    name: "Cisco Catalyst 9130AXI",
    category: "Access Points",
    brand: "Cisco",
    model: "Catalyst 9130AXI",
    price: 599,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    specs: "Wi-Fi 6, AI analytics, Enterprise security",
    description: "Enterprise-grade Wi-Fi 6 access point with AI-powered analytics and advanced threat detection.",
    features: [
      "Cisco DNA Spaces",
      "AI Analytics",
      "Advanced Security",
      "Application Visibility",
      "Intelligent Capture",
      "Hyperlocation Services"
    ],
    technicalSpecs: {
      "Wi-Fi Standard": "802.11ax (Wi-Fi 6)",
      "Speed": "Up to 5.38 Gbps",
      "Frequency": "2.4/5 GHz dual-band",
      "Antennas": "8x8:8 MU-MIMO",
      "Power": "PoE+ (30W)",
      "Operating Temp": "-10°C to 50°C"
    }
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getAllCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};