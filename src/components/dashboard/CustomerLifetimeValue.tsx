import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCLVTrendData, getCLVDistributionData } from "@/data/customerData";

const CustomerLifetimeValue = () => {
  const clvTrendData = getCLVTrendData();
  const clvDistributionData = getCLVDistributionData();

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
          Customer Lifetime Value
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trend" className="w-full">
          <TabsList className="grid w-full grid-cols-2 backdrop-blur-md bg-background/30 rounded-xl mb-4">
            <TabsTrigger
              value="trend"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              CLV Trend
            </TabsTrigger>
            <TabsTrigger
              value="distribution"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              CLV Distribution
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trend" className="h-[300px]">
            <div className="bg-gradient-to-b from-[#8b5cf6]/10 to-[#8b5cf6]/5 border border-border/50 rounded-lg p-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={clvTrendData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                  <defs>
                    <linearGradient
                      id="clvGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-border/30"
                  />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip
                    contentStyle={glassStyle}
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Average CLV",
                    ]}
                    animationDuration={300}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#clvGradient)"
                    animationDuration={1500}
                    animationEasing="ease"
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="h-[300px]">
            <div className="bg-gradient-to-b from-[#0ea5e9]/10 to-[#0ea5e9]/5 border border-border/50 rounded-lg p-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={clvDistributionData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-border/30"
                  />
                  <XAxis dataKey="range" />
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
                    fill="url(#clvDistributionGradient)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease"
                    isAnimationActive={true}
                  />
                  <defs>
                    <linearGradient
                      id="clvDistributionGradient"
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

export default CustomerLifetimeValue;
