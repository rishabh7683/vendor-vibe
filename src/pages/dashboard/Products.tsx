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
  productPerformanceData,
  productOutOfStock,
  lowStockProducts,
  productInventoryValue,
  productSeasonalityData,
} from "@/data/dashboardData";
import ProductPerformanceTable from "@/components/dashboard/ProductPerformanceTable";
import ChartCard from "@/components/dashboard/ChartCard";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Package,
  DollarSign,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TopBottomPerformers = ({
  products,
  type,
}: {
  products: typeof productPerformanceData;
  type: "top" | "bottom";
}) => {
  const sortedProducts = [...products]
    .sort((a, b) => (type === "top" ? b.sales - a.sales : a.sales - b.sales))
    .slice(0, 5);

  return (
    <Card className="w-full matrix-flow">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium terminal-text">
          {type === "top"
            ? "Top Performing Products"
            : "Worst Performing Products"}
        </CardTitle>
        <CardDescription>
          {type === "top"
            ? "Best selling products by revenue and units sold"
            : "Lowest performing products that need attention"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Units Sold</TableHead>
              <TableHead>Margin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.profit}</TableCell>
                <TableCell>{product.sales}</TableCell>
                <TableCell>
                  <span
                    className={
                      product.margin > 40
                        ? "text-green-500 font-medium"
                        : product.margin < 20
                        ? "text-red-500 font-medium"
                        : "font-medium"
                    }
                  >
                    {product.margin}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const InventoryManagement = () => {
  return (
    <Card className="w-full matrix-flow">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium terminal-text">
          Inventory Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lowstock">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Inventory Overview</TabsTrigger>
            <TabsTrigger value="lowstock">Low Stock</TabsTrigger>
            <TabsTrigger value="outofstock">Out of Stock</TabsTrigger>
          </TabsList>

          <TabsContent value="lowstock">
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Low Stock Alert</AlertTitle>
              <AlertDescription>
                {lowStockProducts.length} products are running low on inventory.
              </AlertDescription>
            </Alert>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Days Remaining</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.inventory} units</TableCell>
                    <TableCell>{product.stockDays} days</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.inventory <= 5 ? "destructive" : "outline"
                        }
                        className="text-xs"
                      >
                        {product.inventory <= 5 ? "Critical" : "Low"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="outofstock">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Last Available</TableHead>
                  <TableHead>Expected Arrival</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productOutOfStock.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.lastAvailable}</TableCell>
                    <TableCell>{product.estimatedArrival}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Inventory Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <DollarSign className="h-8 w-8 text-green-500" />
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {productInventoryValue.totalRetail}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Cost: {productInventoryValue.totalCost}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Products & Variants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Package className="h-8 w-8 text-purple-500" />
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {productInventoryValue.totalProducts}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Variants: {productInventoryValue.totalVariants}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Inventory Turnover
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <BarChart2 className="h-8 w-8 text-blue-500" />
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {productInventoryValue.averageTurnover}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Avg. turns per year
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const SeasonalityAnalysis = () => {
  return (
    <ChartCard
      title="Product Seasonality Analysis"
      description="Seasonal trends for product categories over the year"
      chart={
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={productSeasonalityData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.5} />
            <XAxis dataKey="month" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#222",
                borderColor: "#333",
                color: "#fff",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="tshirts"
              name="T-shirts"
              stroke="#10b981"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="hoodies"
              name="Hoodies"
              stroke="#8b5cf6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="sunglasses"
              name="Sunglasses"
              stroke="#0ea5e9"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="swimwear"
              name="Swimwear"
              stroke="#f97316"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      }
    />
  );
};

const Products = () => {
  const topPerformers = [...productPerformanceData]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 6);
  const bottomPerformers = [...productPerformanceData]
    .sort((a, b) => a.sales - b.sales)
    .slice(0, 6);

  const profitabilityData = [...productPerformanceData]
    .sort((a, b) => (b.margin || 0) - (a.margin || 0))
    .slice(0, 10)
    .map((product) => ({
      name: product.name,
      margin: product.margin || 0,
      revenue: parseFloat(product.profit?.replace(/[^0-9.-]+/g, "") || "0"),
    }));

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
            Product Analytics
          </h1>

          <div className="flex items-center gap-2">
            <Badge className="bg-green-500 hover:bg-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              Top performers
            </Badge>
            <Badge variant="outline" className="border-red-500 text-red-500">
              <TrendingDown className="h-3 w-3 mr-1" />
              Low stock alert ({lowStockProducts.length})
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <TopBottomPerformers products={productPerformanceData} type="top" />
          <TopBottomPerformers
            products={productPerformanceData}
            type="bottom"
          />
        </div>

        <InventoryManagement />

        <div className="grid gap-6 md:grid-cols-2">
          <SeasonalityAnalysis />

          <ChartCard
            title="Profitability Analysis"
            description="Margin contribution by product"
            chart={
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={profitabilityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barGap={8}
                  barSize={24}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="rgba(255, 255, 255, 0.1)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#aaa", fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke="#10b981"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#eab308"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                    contentStyle={{
                      backgroundColor: "rgba(240, 240, 245, 0.85)",
                      borderRadius: "4px",
                      border: "1px solid rgba(200, 200, 220, 0.3)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
                      color: "#000",
                      fontWeight: "600",
                    }}
                    labelStyle={{ color: "#333", fontWeight: "bold" }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: 10 }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="margin"
                    name="Profit Margin %"
                    fill="#10b981"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {profitabilityData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.margin > 30 ? "#22c55e" : "#eab308"}
                      />
                    ))}
                  </Bar>
                  <Bar
                    yAxisId="right"
                    dataKey="revenue"
                    name="Revenue ($)"
                    fill="#eab308"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease-out"
                    animationBegin={300}
                  />
                </BarChart>
              </ResponsiveContainer>
            }
          />
        </div>

        <Card className="w-full matrix-flow">
          <CardHeader className="pb-3">
            <CardTitle className="terminal-text font-normal">
              Product Performance
            </CardTitle>
            <CardDescription>
              Detailed analysis of all products with metrics on sales,
              inventory, and profitability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductPerformanceTable products={productPerformanceData} />
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Products;
