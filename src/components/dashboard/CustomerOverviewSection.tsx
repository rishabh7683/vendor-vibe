import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getUserTypeData,
  getUserTypeRevenue,
  getUserTypeAOV,
} from "@/data/customerData";

const CustomerOverviewSection = () => {
  const countData = getUserTypeData();
  const revenueData = getUserTypeRevenue();
  const aovData = getUserTypeAOV();

  // Use consistent colors with other charts in the app
  const COLORS = ["#8b5cf6", "#0ea5e9"];

  // Glass morphism style for tooltips - matching Sales page
  const glassStyle = {
    backgroundColor: "rgba(240, 240, 245, 0.85)",
    borderRadius: "16px",
    border: "1px solid rgba(200, 200, 220, 0.3)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
    color: "#000000",
  };

  return (
    <Card className="col-span-12 lg:col-span-6 matrix-flow shadow-glow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold terminal-text">
          New vs. Returning Customers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="count" className="w-full">
          <TabsList className="grid w-full grid-cols-3 backdrop-blur-md bg-background/30 rounded-xl mb-4">
            <TabsTrigger
              value="count"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              Customer Count
            </TabsTrigger>
            <TabsTrigger
              value="revenue"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger
              value="aov"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              Average Order Value
            </TabsTrigger>
          </TabsList>

          <TabsContent value="count" className="h-[300px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <div className="bg-gradient-to-b from-[#8b5cf6]/10 to-[#8b5cf6]/5 border border-border/50 rounded-lg p-4 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      {COLORS.map((color, index) => (
                        <linearGradient
                          key={`gradient-${index}`}
                          id={`colorCustomer${index}`}
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
                      <filter id="glow-pie-customer" height="200%">
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
                      data={countData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
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
                      filter="url(#glow-pie-customer)"
                    >
                      {countData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#colorCustomer${index})`}
                          strokeWidth={1}
                          stroke="rgba(255, 255, 255, 0.2)"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={glassStyle}
                      formatter={(value) => [
                        `${value.toLocaleString()} customers`,
                        "Count",
                      ]}
                      animationDuration={300}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-gradient-to-b from-[#0ea5e9]/10 to-[#0ea5e9]/5 border border-border/50 rounded-lg p-4 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={countData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      className="stroke-border/30"
                    />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={glassStyle}
                      cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                      formatter={(value) => [
                        `${value.toLocaleString()} customers`,
                        "Count",
                      ]}
                      animationDuration={300}
                    />
                    <Bar
                      dataKey="value"
                      name="Customers"
                      fill="url(#customerCountFill)"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                      animationEasing="ease"
                      isAnimationActive={true}
                    />
                    <defs>
                      <linearGradient
                        id="customerCountFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#0ea5e9"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="100%"
                          stopColor="#0ea5e9"
                          stopOpacity={0.4}
                        />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="h-[300px]">
            <div className="bg-gradient-to-b from-[#8b5cf6]/10 to-[#8b5cf6]/5 border border-border/50 rounded-lg p-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-border/30"
                  />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={glassStyle}
                    cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                    animationDuration={300}
                  />
                  <Bar
                    dataKey="value"
                    name="Revenue"
                    fill="url(#revenueGradient)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease"
                    isAnimationActive={true}
                  />
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.4}
                      />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="aov" className="h-[300px]">
            <div className="bg-gradient-to-b from-[#0ea5e9]/10 to-[#0ea5e9]/5 border border-border/50 rounded-lg p-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={aovData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-border/30"
                  />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={glassStyle}
                    cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                    formatter={(value) => [`$${value.toLocaleString()}`, "AOV"]}
                    animationDuration={300}
                  />
                  <Bar
                    dataKey="value"
                    name="AOV"
                    fill="url(#aovGradient)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease"
                    isAnimationActive={true}
                  />
                  <defs>
                    <linearGradient
                      id="aovGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#0ea5e9"
                        stopOpacity={0.4}
                      />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerOverviewSection;
