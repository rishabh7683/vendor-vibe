import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList,
  LineChart,
  Line,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Globe,
  Users,
  MousePointerClick,
  ShoppingCart,
  ExternalLink,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowRight,
} from "lucide-react";
import {
  trafficSourcesData,
  conversionFunnelData,
  campaignPerformanceData,
} from "@/data/dashboardData";

// Define types for the funnel chart data
interface FunnelData {
  stage: string;
  value: number;
  percentage: number;
}

// Reusable glass-style tooltip with more green tones
const glassStyle = {
  backgroundColor: "rgba(17, 24, 39, 0.75)",
  borderRadius: "0.5rem",
  border: "1px solid rgba(16, 185, 129, 0.3)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
  color: "#fff",
  padding: "12px 16px",
};

// Updated color palette with vibrant punchy colors for charts
const COLORS = [
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#06b6d4", // Cyan
  "#10b981", // Emerald
  "#ef4444", // Red
];

const TrafficAcquisitionInsights = () => {
  // Format numbers with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  // Custom tooltip for the funnel chart
  const CustomFunnelTooltip = ({
    active,
    payload,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as FunnelData;
      return (
        <div style={glassStyle}>
          <p className="font-semibold mb-1">{data.stage}</p>
          <p className="text-sm">Users: {formatNumber(data.value)}</p>
          <p className="text-sm">Percentage: {data.percentage}%</p>
          {data.stage !== "Visitors" && (
            <p className="text-sm">
              Drop-off: {(100 - data.percentage).toFixed(1)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Format the time on site (seconds to mm:ss)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate total metrics
  const totalVisitors = trafficSourcesData.reduce(
    (sum, item) => sum + item.visitors,
    0
  );
  const avgConversionRate = (
    trafficSourcesData.reduce((sum, item) => sum + item.conversionRate, 0) /
    trafficSourcesData.length
  ).toFixed(1);
  const totalRevenue = trafficSourcesData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-emerald-500" />
        <h2 className="text-xl font-semibold terminal-text">
          Traffic & Acquisition Insights
        </h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-emerald-800/5 backdrop-blur-sm border-emerald-700/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Visitors
                </p>
                <h3 className="text-2xl font-bold mt-1 terminal-text">
                  {formatNumber(totalVisitors)}
                </h3>
              </div>
              <Users className="h-5 w-5 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-emerald-800/5 backdrop-blur-sm border-emerald-700/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Conversion Rate
                </p>
                <h3 className="text-2xl font-bold mt-1 terminal-text">
                  {avgConversionRate}%
                </h3>
              </div>
              <MousePointerClick className="h-5 w-5 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-emerald-800/5 backdrop-blur-sm border-emerald-700/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold mt-1 terminal-text">
                  ${formatNumber(totalRevenue)}
                </h3>
              </div>
              <ShoppingCart className="h-5 w-5 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Traffic Sources Chart - Spans 2 columns on large screens */}
        <Card className="col-span-1 lg:col-span-2 bg-emerald-800/5 backdrop-blur-sm border-emerald-700/20 transition-all hover:shadow-md hover:shadow-emerald-700/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-emerald-500" />
              Traffic Sources
            </CardTitle>
            <CardDescription>
              Visitors and conversion rates by source
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 overflow-x-auto">
              <ResponsiveContainer width="100%" height="100%" minWidth={600}>
                <BarChart
                  accessibilityLayer
                  data={trafficSourcesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barGap={8}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis
                    dataKey="source"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    tickFormatter={(value) => formatNumber(value)}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                  />
                  <Tooltip
                    cursor={false}
                    contentStyle={glassStyle}
                    formatter={(value, name) => {
                      if (name === "visitors")
                        return [formatNumber(value as number), "Visitors"];
                      if (name === "conversionRate")
                        return [`${value}%`, "Conversion Rate"];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <defs>
                    <linearGradient
                      id="visitorsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.4}
                      />
                    </linearGradient>
                    <linearGradient
                      id="conversionGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#ec4899" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#ec4899"
                        stopOpacity={0.4}
                      />
                    </linearGradient>
                  </defs>
                  <Bar
                    yAxisId="left"
                    dataKey="visitors"
                    name="Visitors"
                    fill="url(#visitorsGradient)"
                    radius={4}
                    animationDuration={1500}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="conversionRate"
                    name="Conversion Rate"
                    fill="url(#conversionGradient)"
                    radius={4}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex justify-end">
            <Badge
              variant="outline"
              className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            >
              <BarChart3 className="mr-1 h-3 w-3" />
              Traffic Analysis
            </Badge>
          </CardFooter>
        </Card>

        {/* Conversion Funnel */}
        <Card className="col-span-1 row-span-2 bg-emerald-800/5 backdrop-blur-sm border-emerald-700/20 transition-all hover:shadow-md hover:shadow-emerald-700/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              Conversion Funnel
            </CardTitle>
            <CardDescription>
              User journey from visit to purchase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 overflow-x-auto mb-4">
              <ResponsiveContainer width="100%" height="100%" minWidth={300}>
                <FunnelChart>
                  <Tooltip content={<CustomFunnelTooltip />} />
                  <Funnel
                    dataKey="value"
                    data={conversionFunnelData as FunnelData[]}
                    isAnimationActive
                    animationDuration={1500}
                  >
                    <LabelList
                      position="right"
                      fill="#fff"
                      stroke="none"
                      dataKey="stage"
                    />
                    <LabelList
                      position="left"
                      fill="#fff"
                      stroke="none"
                      dataKey={(entry: FunnelData) => `${entry.percentage}%`}
                    />
                    {conversionFunnelData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {conversionFunnelData.slice(0, 3).map((item, index) => {
                // Calculate drop-off from previous stage
                const prevPercentage =
                  index > 0 ? conversionFunnelData[index - 1].percentage : 100;
                const dropOff = prevPercentage - item.percentage;

                return (
                  <div key={index} className="mb-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium">{item.stage}</span>
                      <span className="text-xs">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex justify-end">
            <Badge
              variant="outline"
              className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            >
              <ArrowRight className="mr-1 h-3 w-3" />
              User Journey
            </Badge>
          </CardFooter>
        </Card>

        {/* Top Traffic Sources Table */}
        <Card className="col-span-1 bg-emerald-800/5 backdrop-blur-sm border-emerald-700/20 transition-all hover:shadow-md hover:shadow-emerald-700/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-4 w-4 text-emerald-500" />
              Top Sources
            </CardTitle>
            <CardDescription>Performance by traffic source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSourcesData.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm font-medium">{item.source}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">
                      {formatNumber(item.visitors)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.conversionRate}% Conv.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0 border-t border-emerald-800/10 flex justify-between items-center text-sm">
            <span className="text-muted-foreground">View all sources</span>
            <Badge
              variant="outline"
              className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            >
              {trafficSourcesData.length} sources
            </Badge>
          </CardFooter>
        </Card>

        {/* Top Campaigns Table */}
        <Card className="col-span-1 bg-emerald-800/5 backdrop-blur-sm border-emerald-700/20 transition-all hover:shadow-md hover:shadow-emerald-700/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChartIcon className="h-4 w-4 text-emerald-500" />
              Top Campaigns
            </CardTitle>
            <CardDescription>
              Best performing marketing campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignPerformanceData.slice(0, 3).map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                      <span className="text-sm font-medium truncate">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground ml-4">
                      ${formatNumber(item.revenue)} revenue
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{item.roas}x</div>
                    <div className="text-xs text-muted-foreground">ROAS</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0 border-t border-emerald-800/10 flex justify-between items-center text-sm">
            <span className="text-muted-foreground">View all campaigns</span>
            <Badge
              variant="outline"
              className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            >
              {campaignPerformanceData.length} campaigns
            </Badge>
          </CardFooter>
        </Card>

        {/* Campaign Performance Chart */}
        <Card className="col-span-1 lg:col-span-2 bg-emerald-800/5 backdrop-blur-sm border-emerald-700/20 transition-all hover:shadow-md hover:shadow-emerald-700/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              Campaign Performance
            </CardTitle>
            <CardDescription>
              Conversion rates and ROAS by campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 overflow-x-auto">
              <ResponsiveContainer width="100%" height="100%" minWidth={600}>
                <LineChart
                  data={campaignPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="lineGradient1"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                    <linearGradient
                      id="lineGradient2"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#ec4899"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                    <linearGradient
                      id="lineGradient3"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#f59e0b"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                  />
                  <Tooltip
                    contentStyle={glassStyle}
                    formatter={(value, name) => {
                      if (name === "convRate" || name === "ctr")
                        return [
                          `${value}%`,
                          name === "convRate"
                            ? "Conversion Rate"
                            : "Click-through Rate",
                        ];
                      if (name === "roas") return [`${value}x`, "ROAS"];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="convRate"
                    name="Conversion Rate"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: "#8b5cf6" }}
                    activeDot={{ r: 6, strokeWidth: 2, fill: "#8b5cf6" }}
                    animationDuration={1500}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="ctr"
                    name="Click-through Rate"
                    stroke="#ec4899"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: "#ec4899" }}
                    activeDot={{ r: 6, strokeWidth: 2, fill: "#ec4899" }}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="roas"
                    name="ROAS"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: "#f59e0b" }}
                    activeDot={{ r: 6, strokeWidth: 2, fill: "#f59e0b" }}
                    animationDuration={1500}
                    animationBegin={600}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex justify-end">
            <Badge
              variant="outline"
              className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            >
              <TrendingUp className="mr-1 h-3 w-3" />
              Campaign Metrics
            </Badge>
          </CardFooter>
        </Card>

        {/* Conversion Opportunities */}
        <Card className="col-span-1 bg-emerald-800/5 backdrop-blur-sm border-emerald-700/20 transition-all hover:shadow-md hover:shadow-emerald-700/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-500" />
              Conversion Opportunities
            </CardTitle>
            <CardDescription>Areas to improve conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1 flex items-center">
                  <Badge className="mr-2 bg-amber-500/80">1</Badge>
                  Cart Abandonment
                </h4>
                <p className="text-xs text-muted-foreground">
                  {(
                    conversionFunnelData[2].value -
                    conversionFunnelData[3].value
                  ).toLocaleString()}{" "}
                  visitors abandoned their cart
                </p>
                <div className="mt-1 text-xs text-emerald-500">
                  Consider email reminders and checkout optimization
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 flex items-center">
                  <Badge className="mr-2 bg-amber-500/80">2</Badge>
                  Checkout Drop-offs
                </h4>
                <p className="text-xs text-muted-foreground">
                  {(
                    conversionFunnelData[3].value -
                    conversionFunnelData[4].value
                  ).toLocaleString()}{" "}
                  visitors left during checkout
                </p>
                <div className="mt-1 text-xs text-emerald-500">
                  Review payment options and simplify the process
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 border-t border-emerald-800/10 flex justify-between items-center text-sm">
            <span className="text-muted-foreground">View full report</span>
            <Badge
              variant="outline"
              className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            >
              2 opportunities
            </Badge>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TrafficAcquisitionInsights;
