import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Database,
  TrendingUp,
  BarChart2,
  ArrowUpRight,
  PieChart,
  Users,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock performance data
const performanceData = [
  { month: "Jan", revenue: 12400, profit: 3800, target: 10000 },
  { month: "Feb", revenue: 14800, profit: 4500, target: 10000 },
  { month: "Mar", revenue: 9800, profit: 2900, target: 10000 },
  { month: "Apr", revenue: 16500, profit: 5200, target: 12000 },
  { month: "May", revenue: 18300, profit: 6100, target: 12000 },
  { month: "Jun", revenue: 21000, profit: 7200, target: 12000 },
  { month: "Jul", revenue: 19500, profit: 6800, target: 15000 },
  { month: "Aug", revenue: 22800, profit: 8100, target: 15000 },
  { month: "Sep", revenue: 25400, profit: 9200, target: 15000 },
  { month: "Oct", revenue: 27800, profit: 10500, target: 18000 },
  { month: "Nov", revenue: 29500, profit: 11800, target: 18000 },
  { month: "Dec", revenue: 34200, profit: 13900, target: 18000 },
];

// Daily performance data (similar to Orders page)
const dailyPerformanceData = [
  { day: "Mon", visits: 1200, conversions: 85, orders: 72 },
  { day: "Tue", visits: 1400, conversions: 92, orders: 78 },
  { day: "Wed", visits: 1650, conversions: 104, orders: 91 },
  { day: "Thu", visits: 1500, conversions: 98, orders: 84 },
  { day: "Fri", visits: 1800, conversions: 120, orders: 105 },
  { day: "Sat", visits: 2100, conversions: 142, orders: 124 },
  { day: "Sun", visits: 1800, conversions: 115, orders: 95 },
];

// Key metrics data
const conversionRate = 6.2;
const averageOrderValue = 128;
const customerRetention = 72;

const Performance = () => {
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
            Performance Metrics
          </h1>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500 hover:bg-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              YoY Growth: 24%
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            icon={<BarChart2 className="h-5 w-5 text-primary" />}
            change={1.2}
            changeLabel="vs last month"
            className="matrix-flow"
          />
          <StatCard
            title="Average Order Value"
            value={`$${averageOrderValue}`}
            icon={<Database className="h-5 w-5 text-primary" />}
            change={5.8}
            changeLabel="vs last month"
            className="matrix-flow"
          />
          <StatCard
            title="Customer Retention"
            value={`${customerRetention}%`}
            icon={<Users className="h-5 w-5 text-primary" />}
            change={-2.1}
            changeLabel="vs last month"
            className="matrix-flow"
          />
        </div>

        {/* Daily Performance Chart */}
        <Card className="matrix-flow">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium terminal-text">
              Daily Performance
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Site visits, conversions, and orders per day
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={dailyPerformanceData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="day" stroke="#888888" />
                <YAxis stroke="#888888" />
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
                <Legend />
                <Bar
                  dataKey="visits"
                  name="Site Visits"
                  stackId="a"
                  fill="url(#colorVisits)"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <Bar
                  dataKey="conversions"
                  name="Conversions"
                  stackId="b"
                  fill="url(#colorConversions)"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <Bar
                  dataKey="orders"
                  name="Orders"
                  stackId="c"
                  fill="url(#colorOrders)"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient
                    id="colorConversions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Tabs */}
        <Card className="matrix-flow">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium terminal-text">
              Business Performance
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Revenue, profit, and targets over time
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly">
              <TabsList className="mb-4">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly" className="space-y-4">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis dataKey="month" stroke="#888888" />
                    <YAxis stroke="#888888" />
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
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      name="Profit"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      name="Target"
                      stroke="#f97316"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Card
                    className={cn(
                      "bg-gradient-to-b from-green-500/10 to-green-500/5 border-green-500/20"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-500">
                            Total Revenue
                          </p>
                          <h3 className="text-2xl font-bold mt-1">$248,000</h3>
                        </div>
                        <div className="flex items-center text-green-500">
                          <ArrowUpRight className="h-5 w-5 mr-1" />
                          <span>+18.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className={cn(
                      "bg-gradient-to-b from-purple-500/10 to-purple-500/5 border-purple-500/20"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-500">
                            Total Profit
                          </p>
                          <h3 className="text-2xl font-bold mt-1">$90,000</h3>
                        </div>
                        <div className="flex items-center text-purple-500">
                          <ArrowUpRight className="h-5 w-5 mr-1" />
                          <span>+24.1%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className={cn(
                      "bg-gradient-to-b from-orange-500/10 to-orange-500/5 border-orange-500/20"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-orange-500">
                            Profit Margin
                          </p>
                          <h3 className="text-2xl font-bold mt-1">36.3%</h3>
                        </div>
                        <div className="flex items-center text-orange-500">
                          <ArrowUpRight className="h-5 w-5 mr-1" />
                          <span>+5.3%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="quarterly">
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Quarterly data will be displayed here
                </div>
              </TabsContent>
              <TabsContent value="yearly">
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Yearly data will be displayed here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Market Share */}
        <Card className="matrix-flow">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium terminal-text">
              Market Share Analysis
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Your position compared to competitors
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Competitive Position
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Your Store</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "28%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Competitor A</span>
                      <span className="text-sm font-medium">34%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: "34%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Competitor B</span>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "22%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Competitor C</span>
                      <span className="text-sm font-medium">16%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: "16%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Growth Compared to Market
                </h3>
                <div className="p-4 bg-gradient-to-b from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Your Growth
                      </p>
                      <p className="text-3xl font-bold text-green-500">+24%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Market Growth
                      </p>
                      <p className="text-3xl font-bold">+16%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Your AOV</p>
                      <p className="text-3xl font-bold text-green-500">$128</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Market AOV
                      </p>
                      <p className="text-3xl font-bold">$98</p>
                    </div>
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

export default Performance;
