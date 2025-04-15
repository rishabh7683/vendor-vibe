import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Package,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ShoppingCart,
  BarChart as BarChartIcon,
  DollarSign,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const inventoryItems = [
  {
    id: 1,
    name: "Premium T-Shirt",
    sku: "TSH-001",
    stock: 145,
    value: 2900,
    category: "Apparel",
    threshold: 50,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Classic Hoodie",
    sku: "HOD-001",
    stock: 78,
    value: 3120,
    category: "Apparel",
    threshold: 30,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Yoga Pants",
    sku: "YP-001",
    stock: 32,
    value: 1600,
    category: "Active Wear",
    threshold: 40,
    status: "Low Stock",
  },
  {
    id: 4,
    name: "Running Shoes",
    sku: "RS-001",
    stock: 18,
    value: 2160,
    category: "Footwear",
    threshold: 20,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Leather Wallet",
    sku: "ACC-001",
    stock: 5,
    value: 250,
    category: "Accessories",
    threshold: 10,
    status: "Critical",
  },
  {
    id: 6,
    name: "Winter Jacket",
    sku: "WJ-001",
    stock: 0,
    value: 0,
    category: "Outerwear",
    threshold: 15,
    status: "Out of Stock",
  },
  {
    id: 7,
    name: "Smartwatch",
    sku: "TECH-001",
    stock: 12,
    value: 3600,
    category: "Electronics",
    threshold: 15,
    status: "Low Stock",
  },
  {
    id: 8,
    name: "Wireless Earbuds",
    sku: "TECH-002",
    stock: 0,
    value: 0,
    category: "Electronics",
    threshold: 10,
    status: "Out of Stock",
  },
  {
    id: 9,
    name: "Sunglasses",
    sku: "ACC-002",
    stock: 45,
    value: 1350,
    category: "Accessories",
    threshold: 20,
    status: "In Stock",
  },
  {
    id: 10,
    name: "Baseball Cap",
    sku: "ACC-003",
    stock: 67,
    value: 1005,
    category: "Accessories",
    threshold: 25,
    status: "In Stock",
  },
];

const categoryData = [
  { name: "Apparel", value: 223, color: "#10b981" },
  { name: "Accessories", value: 117, color: "#6366f1" },
  { name: "Footwear", value: 18, color: "#f97316" },
  { name: "Electronics", value: 12, color: "#ec4899" },
  { name: "Active Wear", value: 32, color: "#8b5cf6" },
];

const lowStockItems = inventoryItems.filter(
  (item) => item.status === "Low Stock" || item.status === "Critical"
);
const outOfStockItems = inventoryItems.filter(
  (item) => item.status === "Out of Stock"
);

const valuationSummary = {
  totalItems: inventoryItems.reduce((sum, item) => sum + item.stock, 0),
  totalValue: inventoryItems.reduce((sum, item) => sum + item.value, 0),
  avgItemValue:
    inventoryItems.reduce((sum, item) => sum + item.value, 0) /
    inventoryItems.reduce((sum, item) => sum + item.stock, 0),
  categoriesCount: new Set(inventoryItems.map((item) => item.category)).size,
};

const COLORS = ["#10b981", "#6366f1", "#f97316", "#ec4899", "#8b5cf6"];

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(inventoryItems);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredItems(inventoryItems);
    } else {
      const filtered = inventoryItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.sku.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
      setFilteredItems(filtered);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500/20";
      case "Low Stock":
        return "bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500/20";
      case "Critical":
        return "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20";
      case "Out of Stock":
        return "bg-gray-500/10 border-gray-500/20 text-gray-500 hover:bg-gray-500/20";
      default:
        return "bg-gray-500/10 border-gray-500/20 text-gray-500 hover:bg-gray-500/20";
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight terminal-text">
            Inventory Management
          </h1>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search inventory..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Inventory Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="matrix-flow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium terminal-text">
                    Total Items
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    {valuationSummary.totalItems}
                  </h3>
                </div>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/20">
                  <Package className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="matrix-flow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium terminal-text">
                    Inventory Value
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    ${valuationSummary.totalValue.toLocaleString()}
                  </h3>
                </div>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/20">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="matrix-flow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium terminal-text">
                    Low Stock Items
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    {lowStockItems.length}
                  </h3>
                </div>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-500/20">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="matrix-flow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium terminal-text">
                    Out of Stock
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    {outOfStockItems.length}
                  </h3>
                </div>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-500/20">
                  <Clock className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="matrix-flow">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium terminal-text">
                  Stock Status
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Current inventory levels by stock status
                </p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Items</TabsTrigger>
                    <TabsTrigger value="lowstock">Low Stock</TabsTrigger>
                    <TabsTrigger value="outofstock">Out of Stock</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell>{item.sku}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                            <TableCell>${item.value}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={cn(getStatusColor(item.status))}
                              >
                                {item.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="lowstock">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Current Stock</TableHead>
                          <TableHead>Threshold</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lowStockItems.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center py-6 text-muted-foreground"
                            >
                              No low stock items found
                            </TableCell>
                          </TableRow>
                        ) : (
                          lowStockItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">
                                {item.name}
                              </TableCell>
                              <TableCell>{item.stock}</TableCell>
                              <TableCell>{item.threshold}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={cn(getStatusColor(item.status))}
                                >
                                  {item.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="outofstock">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {outOfStockItems.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center py-6 text-muted-foreground"
                            >
                              No out of stock items found
                            </TableCell>
                          </TableRow>
                        ) : (
                          outOfStockItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">
                                {item.name}
                              </TableCell>
                              <TableCell>{item.sku}</TableCell>
                              <TableCell>{item.category}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  <ShoppingCart className="h-4 w-4 mr-1" />
                                  Reorder
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="matrix-flow">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium terminal-text">
                  Inventory by Category
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Distribution of stock across categories
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        {COLORS.map((color, index) => (
                          <linearGradient
                            key={`gradient-${index}`}
                            id={`colorGradient${index}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor={color}
                              stopOpacity={0.9}
                            />
                            <stop
                              offset="100%"
                              stopColor={color}
                              stopOpacity={0.6}
                            />
                          </linearGradient>
                        ))}
                      </defs>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={5}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`url(#colorGradient${index % COLORS.length})`}
                            className="glow"
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(17, 24, 39, 0.8)",
                          borderColor: "rgba(31, 41, 55, 0.6)",
                          color: "#fff",
                          borderRadius: "6px",
                          backdropFilter: "blur(4px)",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                  {categoryData.map((category, index) => (
                    <div
                      key={category.name}
                      className="flex items-center gap-1.5 text-xs"
                    >
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span>{category.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Inventory Valuation */}
        <Card className="matrix-flow">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium terminal-text">
              Inventory Valuation
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Financial overview of your current inventory
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Value Distribution</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Apparel</span>
                      <span className="text-sm font-medium">$6,020</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "35%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Electronics</span>
                      <span className="text-sm font-medium">$3,600</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: "21%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Accessories</span>
                      <span className="text-sm font-medium">$2,605</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Footwear</span>
                      <span className="text-sm font-medium">$2,160</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: "12%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Active Wear</span>
                      <span className="text-sm font-medium">$1,600</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-pink-500 h-2 rounded-full"
                        style={{ width: "9%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Summary</h3>
                <div className="p-4 bg-gradient-to-b from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Items
                      </p>
                      <p className="text-2xl font-bold">
                        {valuationSummary.totalItems}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Categories
                      </p>
                      <p className="text-2xl font-bold">
                        {valuationSummary.categoriesCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Value
                      </p>
                      <p className="text-2xl font-bold">
                        ${valuationSummary.totalValue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Avg. Item Value
                      </p>
                      <p className="text-2xl font-bold">
                        ${Math.round(valuationSummary.avgItemValue)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button className="w-full">
                      Generate Inventory Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Inventory;
