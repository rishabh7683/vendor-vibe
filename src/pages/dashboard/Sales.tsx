import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { salesData, salesOverTimeData } from "@/data/dashboardData";
import {
  getSalesByChannel,
  getSalesByLocation,
  getSalesByDevice,
  getPeakSalesTimes,
  getDiscountCodePerformance,
  getAOVData,
  getOrderStatusData,
  getAbandonedCheckouts,
} from "@/data/salesAnalyticsData";
import ChartCard from "@/components/dashboard/ChartCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SalesHeatmap from "@/components/dashboard/SalesHeatmap";
import DiscountCodeTable from "@/components/dashboard/DiscountCodeTable";
import SalesChannelChart from "@/components/dashboard/SalesChannelChart";
import SalesMapChart from "@/components/dashboard/SalesMapChart";

const Sales = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  const COLORS = ["#10b981", "#0ea5e9", "#8b5cf6", "#ec4899", "#f97316"];

  // Get the sales data based on timeframe
  const getSalesTrendData = () => {
    switch (timeframe) {
      case "weekly":
        return salesOverTimeData.datasets[0].data
          .slice(0, 7)
          .map((value, index) => ({
            name: salesOverTimeData.labels[index],
            thisWeek: value,
            lastWeek: salesOverTimeData.datasets[1].data[index],
          }));
      case "yearly":
        return salesData.slice(0, 12);
      default:
        return salesData;
    }
  };

  const salesTrendData = getSalesTrendData();
  const salesByChannel = getSalesByChannel();
  const salesByLocation = getSalesByLocation();
  const salesByDevice = getSalesByDevice();
  const peakSalesTimes = getPeakSalesTimes();
  const discountCodeData = getDiscountCodePerformance();
  const aovData = getAOVData();
  const orderStatusData = getOrderStatusData();
  const abandonedCheckouts = getAbandonedCheckouts();

  // Calculate summary metrics
  const totalRevenue = salesData.reduce((sum, item) => sum + item.value, 0);
  const totalOrders = orderStatusData.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const averageOrderValue = totalRevenue / totalOrders;
  const abandonedRate = abandonedCheckouts.rate;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Apple-like easing
      },
    },
  };

  // Glass morphism style for tooltips
  const glassStyle = {
    backgroundColor: "rgba(240, 240, 245, 0.85)",
    borderRadius: "16px",
    border: "1px solid rgba(200, 200, 220, 0.3)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
    color: "#000000",
  };

  return (
    <DashboardLayout>
      <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          variants={itemVariants}
        >
          <h1 className="text-3xl font-bold tracking-tight terminal-text">
            Sales Analytics
          </h1>

          <Tabs
            defaultValue={timeframe}
            className="w-[250px]"
            onValueChange={(value) => setTimeframe(value)}
          >
            <TabsList className="grid w-full grid-cols-3 backdrop-blur-md bg-background/30 rounded-xl">
              <TabsTrigger
                value="weekly"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
              >
                Week
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
              >
                Month
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
              >
                Year
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Summary Metrics Cards */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border matrix-flow shadow-glow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      ${totalRevenue.toLocaleString()}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-green-500/10 text-green-500 border-green-500/20"
                    >
                      +12.4%
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    vs. previous period
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-b from-[#0ea5e9]/10 to-[#0ea5e9]/5 border matrix-flow shadow-glow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Total Orders
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {totalOrders.toLocaleString()}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                    >
                      +8.1%
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    vs. previous period
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-b from-[#8b5cf6]/10 to-[#8b5cf6]/5 border matrix-flow shadow-glow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Average Order Value
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      ${averageOrderValue.toFixed(2)}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-purple-500/10 text-purple-500 border-purple-500/20"
                    >
                      +3.2%
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    vs. previous period
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-b from-[#f59e0b]/10 to-[#f59e0b]/5 border matrix-flow shadow-glow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Abandoned Checkout Rate
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{abandonedRate}%</span>
                    <Badge
                      variant="outline"
                      className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                    >
                      -1.5%
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    vs. previous period
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Revenue Trend Chart */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={itemVariants}
        >
          <motion.div
            className="col-span-full lg:col-span-2"
            variants={itemVariants}
          >
            <Card className="matrix-flow shadow-glow-sm">
              <CardHeader>
                <CardTitle className="terminal-text">Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={salesTrendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorLastPeriod"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#0ea5e9"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0ea5e9"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                      <filter id="glow-line" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feFlood
                          floodColor="#10b981"
                          floodOpacity="0.5"
                          result="color"
                        />
                        <feComposite
                          in="color"
                          in2="blur"
                          operator="in"
                          result="shadow"
                        />
                        <feComposite
                          in="SourceGraphic"
                          in2="shadow"
                          operator="over"
                        />
                      </filter>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#333"
                      opacity={0.2}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#999"
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="#999"
                      axisLine={false}
                      tickLine={false}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={glassStyle}
                      cursor={{ stroke: "rgba(255, 255, 255, 0.2)" }}
                      animationDuration={300}
                    />
                    <Legend
                      verticalAlign="top"
                      wrapperStyle={{ paddingBottom: "10px" }}
                    />
                    <Line
                      type="monotone"
                      dataKey={timeframe === "weekly" ? "thisWeek" : "value"}
                      name="Current Period"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5, fill: "#10b981" }}
                      fill="url(#colorRevenue)"
                      filter="url(#glow-line)"
                      animationDuration={2000}
                      animationEasing="ease"
                      isAnimationActive={true}
                    />
                    {timeframe === "weekly" && (
                      <Line
                        type="monotone"
                        dataKey="lastWeek"
                        name="Previous Period"
                        stroke="#0ea5e9"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 4, fill: "#0ea5e9" }}
                        fill="url(#colorLastPeriod)"
                        strokeDasharray="5 5"
                        animationDuration={2000}
                        animationEasing="ease"
                        animationBegin={500}
                        isAnimationActive={true}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* By Location - Map preview */}
          <motion.div variants={itemVariants}>
            <ChartCard
              title="Sales by Location"
              chart={
                <div className="h-[415px] flex flex-col">
                  <SalesMapChart data={salesByLocation} />
                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 backdrop-blur-sm bg-background/40 hover:bg-background/60 transition-all"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      View Full Map
                    </Button>
                  </div>
                </div>
              }
            />
          </motion.div>
        </motion.div>

        {/* Sales Breakdown - Bento Grid Layout */}
        <motion.div
          className="grid gap-6 grid-cols-1 md:grid-cols-6 lg:grid-cols-12"
          variants={itemVariants}
        >
          {/* By Channel */}
          <motion.div
            className="md:col-span-3 lg:col-span-4"
            variants={itemVariants}
          >
            <ChartCard
              title="Sales by Channel"
              chart={
                <div className="h-[280px]">
                  <SalesChannelChart data={salesByChannel} colors={COLORS} />
                </div>
              }
            />
          </motion.div>

          {/* By Device */}
          <motion.div
            className="md:col-span-3 lg:col-span-4"
            variants={itemVariants}
          >
            <ChartCard
              title="Sales by Device"
              chart={
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <defs>
                      {COLORS.map((color, index) => (
                        <linearGradient
                          key={`gradient-${index}`}
                          id={`colorDevice${index}`}
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
                      <filter id="glow-pie" height="200%">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feFlood floodOpacity="0.3" result="color" />
                        <feComposite
                          in="color"
                          in2="blur"
                          operator="in"
                          result="shadow"
                        />
                        <feComposite
                          in="SourceGraphic"
                          in2="shadow"
                          operator="over"
                        />
                      </filter>
                    </defs>
                    <Pie
                      data={salesByDevice}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={5}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      animationDuration={2000}
                      animationEasing="ease"
                      isAnimationActive={true}
                      filter="url(#glow-pie)"
                    >
                      {salesByDevice.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#colorDevice${index})`}
                          strokeWidth={1}
                          stroke="rgba(255, 255, 255, 0.2)"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={glassStyle}
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Sales",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              }
            />
          </motion.div>

          {/* Average Order Value (AOV) Trend */}
          <motion.div
            className="md:col-span-6 lg:col-span-4"
            variants={itemVariants}
          >
            <Card className="matrix-flow shadow-glow-sm h-full">
              <CardHeader>
                <CardTitle className="terminal-text">AOV Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={aovData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="colorAOV" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                      <filter id="shadow-aov" height="200%">
                        <feDropShadow
                          dx="0"
                          dy="4"
                          stdDeviation="8"
                          floodColor="#8b5cf6"
                          floodOpacity="0.2"
                        />
                      </filter>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#333"
                      opacity={0.2}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#999"
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="#999"
                      axisLine={false}
                      tickLine={false}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={glassStyle}
                      cursor={false}
                      formatter={(value) => [`$${value}`, "AOV"]}
                      animationDuration={300}
                    />
                    <Bar
                      dataKey="value"
                      name="AOV"
                      fill="url(#colorAOV)"
                      radius={[8, 8, 0, 0]}
                      filter="url(#shadow-aov)"
                      animationDuration={1500}
                      animationEasing="ease"
                      isAnimationActive={true}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Status Overview */}
          <motion.div
            className="md:col-span-3 lg:col-span-6"
            variants={itemVariants}
          >
            <Card className="matrix-flow shadow-glow-sm h-full">
              <CardHeader>
                <CardTitle className="terminal-text">
                  Order Status Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderStatusData.map((status, index) => (
                    <div key={status.name} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {status.name}
                        </span>
                        <div className="flex items-center gap-6">
                          <span className="text-sm">{status.count} orders</span>
                          <span className="text-sm font-medium">
                            ${status.value.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 mt-3 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total</span>
                      <div className="flex items-center gap-6">
                        <span className="text-sm">{totalOrders} orders</span>
                        <span className="text-sm font-medium">
                          ${totalRevenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Discount Code Performance */}
          <motion.div
            className="md:col-span-3 lg:col-span-6"
            variants={itemVariants}
          >
            <Card className="matrix-flow shadow-glow-sm h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="terminal-text">
                  Discount Code Performance
                </CardTitle>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-500 border-green-500/20"
                >
                  Top 5 Codes
                </Badge>
              </CardHeader>
              <CardContent>
                <DiscountCodeTable data={discountCodeData.slice(0, 5)} />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Peak Sales Times + Abandoned Checkouts */}
        <motion.div
          className="grid gap-6 md:grid-cols-12"
          variants={itemVariants}
        >
          {/* Peak Sales Times - Heatmap */}
          <motion.div className="md:col-span-8" variants={itemVariants}>
            <Card className="matrix-flow shadow-glow-sm">
              <CardHeader>
                <CardTitle className="terminal-text">
                  Peak Sales Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SalesHeatmap data={peakSalesTimes} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Abandoned Checkouts */}
          <motion.div className="md:col-span-4" variants={itemVariants}>
            <Card className="matrix-flow shadow-glow-sm h-full">
              <CardHeader>
                <CardTitle className="terminal-text">
                  Abandoned Checkouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Abandonment Rate
                      </span>
                      <span className="text-sm font-medium">
                        {abandonedCheckouts.rate}%
                      </span>
                    </div>
                    <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-amber-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${abandonedCheckouts.rate}%` }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.5,
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-3">
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/40"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <div className="text-xs text-muted-foreground">
                          Abandoned Value
                        </div>
                        <div className="text-lg font-medium mt-1">
                          ${abandonedCheckouts.value.toLocaleString()}
                        </div>
                      </motion.div>
                      <motion.div
                        className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/40"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <div className="text-xs text-muted-foreground">
                          Recovered Value
                        </div>
                        <div className="text-lg font-medium mt-1">
                          ${abandonedCheckouts.recovered.toLocaleString()}
                        </div>
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/40"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <div className="text-xs text-muted-foreground">
                          Recovery Rate
                        </div>
                        <div className="text-lg font-medium mt-1">
                          {abandonedCheckouts.recoveryRate}%
                        </div>
                      </motion.div>
                      <motion.div
                        className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/40"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <div className="text-xs text-muted-foreground">
                          Potential Lost
                        </div>
                        <div className="text-lg font-medium mt-1">
                          ${abandonedCheckouts.potentialLost.toLocaleString()}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Sales;
