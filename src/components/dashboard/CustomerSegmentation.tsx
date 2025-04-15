import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getCustomersByLocation,
  getCustomersBySpendBracket,
  getCustomersByPurchaseFrequency,
} from "@/data/customerData";

// Updated color palette to match other dashboard components
const COLORS = [
  "#8b5cf6",
  "#0ea5e9",
  "#F59E0B",
  "#EC4899",
  "#6366F1",
  "#f43f5e",
];
const RADIAN = Math.PI / 180;

// Custom label renderer for the pie chart
interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
  payload?: {
    name: string;
    value: number;
    percentage: string;
  };
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
}: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomerSegmentation = () => {
  const locationData = getCustomersByLocation();
  const spendData = getCustomersBySpendBracket();
  const frequencyData = getCustomersByPurchaseFrequency();

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
    <Card className="col-span-12 matrix-flow shadow-glow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold terminal-text">
          Customer Segmentation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="location" className="w-full">
          <TabsList className="grid w-full grid-cols-3 backdrop-blur-md bg-background/30 rounded-xl mb-4">
            <TabsTrigger
              value="location"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              By Location
            </TabsTrigger>
            <TabsTrigger
              value="spend"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              By Spending
            </TabsTrigger>
            <TabsTrigger
              value="frequency"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              Shopping Frequency
            </TabsTrigger>
          </TabsList>

          <TabsContent value="location" className="h-[300px]">
            <div className="bg-gradient-to-b from-[#8b5cf6]/10 to-[#8b5cf6]/5 border border-border/50 rounded-lg p-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {COLORS.map((color, index) => (
                      <linearGradient
                        key={`gradient-${index}`}
                        id={`colorLocation${index}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={color} stopOpacity={0.9} />
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
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={4}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={2000}
                    animationEasing="ease"
                    isAnimationActive={true}
                    filter="url(#glow-pie)"
                  >
                    {locationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#colorLocation${index})`}
                        strokeWidth={1}
                        stroke="rgba(255, 255, 255, 0.2)"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={glassStyle}
                    formatter={(value, name, props) => {
                      return [
                        `${value.toLocaleString()} customers (${
                          props.payload.percentage
                        })`,
                        props.payload.name,
                      ];
                    }}
                    animationDuration={300}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="spend" className="h-[300px]">
            <div className="bg-gradient-to-b from-[#0ea5e9]/10 to-[#0ea5e9]/5 border border-border/50 rounded-lg p-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {COLORS.map((color, index) => (
                      <linearGradient
                        key={`gradient-${index}`}
                        id={`colorSpend${index}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                        <stop
                          offset="100%"
                          stopColor={color}
                          stopOpacity={0.6}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={spendData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={4}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={2000}
                    animationEasing="ease"
                    isAnimationActive={true}
                    filter="url(#glow-pie)"
                  >
                    {spendData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#colorSpend${index})`}
                        strokeWidth={1}
                        stroke="rgba(255, 255, 255, 0.2)"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={glassStyle}
                    formatter={(value, name, props) => {
                      return [
                        `${value.toLocaleString()} customers (${
                          props.payload.percentage
                        })`,
                        props.payload.name,
                      ];
                    }}
                    animationDuration={300}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="frequency" className="h-[300px]">
            <div className="bg-gradient-to-b from-[#6366F1]/10 to-[#6366F1]/5 border border-border/50 rounded-lg p-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={frequencyData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                  barGap={8}
                >
                  <defs>
                    {COLORS.map((color, index) => (
                      <linearGradient
                        key={`frequencyGradient-${index}`}
                        id={`frequencyGradient-${index}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={COLORS[index % COLORS.length]}
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="100%"
                          stopColor={COLORS[index % COLORS.length]}
                          stopOpacity={0.4}
                        />
                      </linearGradient>
                    ))}
                    <filter id="shadow-frequencyBar" height="130%">
                      <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="3"
                        floodColor="#6366F1"
                        floodOpacity="0.5"
                      />
                    </filter>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-border/30"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
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
                    radius={[6, 6, 0, 0]}
                    animationDuration={1800}
                    animationEasing="ease-out"
                    isAnimationActive={true}
                    filter="url(#shadow-frequencyBar)"
                  >
                    {frequencyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#frequencyGradient-${index})`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerSegmentation;
