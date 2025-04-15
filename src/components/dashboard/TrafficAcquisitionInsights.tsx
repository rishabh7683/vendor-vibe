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
  ResponsiveContainer,
  Legend,
  FunnelChart,
  Funnel,
  LabelList,
  LineChart,
  Line,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Users,
  MousePointerClick,
  ShoppingCart,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowRight,
  Zap,
} from "lucide-react";

// Mock data
const trafficSourcesData = [
  {
    source: "Organic Search",
    visitors: 28456,
    conversionRate: 3.2,
    revenue: 58950,
  },
  { source: "Direct", visitors: 19854, conversionRate: 4.5, revenue: 42385 },
  { source: "Social", visitors: 15120, conversionRate: 2.8, revenue: 31240 },
  { source: "Email", visitors: 8623, conversionRate: 5.7, revenue: 39710 },
  { source: "Referral", visitors: 6942, conversionRate: 4.2, revenue: 23109 },
  {
    source: "Paid Search",
    visitors: 15205,
    conversionRate: 3.8,
    revenue: 20000,
  },
];

const conversionFunnelData = [
  { stage: "Visitors", value: 85911, percentage: 100 },
  { stage: "Product Views", value: 54812, percentage: 63.8 },
  { stage: "Add to Cart", value: 18324, percentage: 21.3 },
  { stage: "Checkout", value: 9880, percentage: 11.5 },
  { stage: "Purchases", value: 6272, percentage: 7.3 },
];

const campaignPerformanceData = [
  {
    name: "Summer Collection",
    convRate: 6.2,
    ctr: 3.8,
    roas: 6.2,
    revenue: 42386,
  },
  { name: "Flash Sale", convRate: 7.8, ctr: 5.2, roas: 7.8, revenue: 38942 },
  {
    name: "Holiday Special",
    convRate: 4.3,
    ctr: 2.9,
    roas: 5.5,
    revenue: 31785,
  },
  { name: "New Arrivals", convRate: 3.1, ctr: 2.2, roas: 4.1, revenue: 21543 },
  {
    name: "Loyalty Program",
    convRate: 8.4,
    ctr: 4.1,
    roas: 9.2,
    revenue: 19876,
  },
];

// Define funnel data type
interface FunnelData {
  stage: string;
  value: number;
  percentage: number;
}

// Improved color palette with professional, visually pleasing colors
const COLORS = [
  "#6366f1", // Indigo
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#0ea5e9", // Sky blue
  "#10b981", // Emerald
  "#f59e0b", // Amber
];

const ImprovedTrafficAcquisitionInsights = () => {
  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  // Improved glass-style tooltip with better readability
  const glassStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "0.5rem",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.1)",
    color: "#1e293b",
    padding: "12px 16px",
  };

  // Custom tooltip for the funnel chart
  const CustomFunnelTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
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
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-indigo-500" />
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Traffic & Acquisition Insights
        </h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white dark:bg-slate-800 border-0 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Visitors
                </p>
                <h3 className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">
                  {formatNumber(totalVisitors)}
                </h3>
              </div>
              <Users className="h-5 w-5 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-0 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Avg. Conversion Rate
                </p>
                <h3 className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">
                  {avgConversionRate}%
                </h3>
              </div>
              <MousePointerClick className="h-5 w-5 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-0 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">
                  ${formatNumber(totalRevenue)}
                </h3>
              </div>
              <ShoppingCart className="h-5 w-5 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Traffic Sources Chart - Spans 2 columns on large screens */}
        <Card className="col-span-1 lg:col-span-2 bg-white dark:bg-slate-800 border-0 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <BarChart3 className="h-4 w-4 text-indigo-500" />
              Traffic Sources
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Visitors and conversion rates by source
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 overflow-x-auto">
              <ResponsiveContainer width="100%" height="100%" minWidth={600}>
                <BarChart
                  data={trafficSourcesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barGap={8}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="rgba(148, 163, 184, 0.2)"
                  />
                  <XAxis
                    dataKey="source"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    tickFormatter={(value) => formatNumber(value)}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
                    contentStyle={glassStyle}
                    formatter={(value, name) => {
                      if (name === "visitors")
                        return [formatNumber(value), "Visitors"];
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
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#6366f1"
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
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#8b5cf6"
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
              className="bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300"
            >
              <BarChart3 className="mr-1 h-3 w-3" />
              Traffic Analysis
            </Badge>
          </CardFooter>
        </Card>

        {/* Conversion Funnel */}
        <Card className="col-span-1 row-span-2 bg-white dark:bg-slate-800 border-0 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <Activity className="h-4 w-4 text-indigo-500" />
              Conversion Funnel
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
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
                    data={conversionFunnelData}
                    isAnimationActive
                    animationDuration={1500}
                  >
                    <LabelList
                      position="right"
                      fill="#1e293b"
                      stroke="none"
                      dataKey="stage"
                      fontSize={12}
                      fontWeight="bold"
                    />
                    <LabelList
                      position="left"
                      fill="#1e293b"
                      stroke="none"
                      dataKey={(entry) => `${entry.percentage}%`}
                      fontSize={12}
                      fontWeight="bold"
                    />
                    {conversionFunnelData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        opacity={0.9}
                      />
                    ))}
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {conversionFunnelData.slice(0, 3).map((item, index) => (
                <div key={index} className="mb-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {item.stage}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex justify-end">
            <Badge
              variant="outline"
              className="bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300"
            >
              <ArrowRight className="mr-1 h-3 w-3" />
              User Journey
            </Badge>
          </CardFooter>
        </Card>

        {/* Top Traffic Sources Table */}
        <Card className="col-span-1 bg-white dark:bg-slate-800 border-0 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <Globe className="h-4 w-4 text-indigo-500" />
              Top Sources
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Performance by traffic source
            </CardDescription>
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
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {item.source}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {formatNumber(item.visitors)}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {item.conversionRate}% Conv.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm">
            <span className="text-slate-500 dark:text-slate-400">
              View all sources
            </span>
            <Badge
              variant="outline"
              className="bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300"
            >
              {trafficSourcesData.length} sources
            </Badge>
          </CardFooter>
        </Card>

        {/* Top Campaigns Table */}
        <Card className="col-span-1 bg-white dark:bg-slate-800 border-0 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <PieChartIcon className="h-4 w-4 text-indigo-500" />
              Top Campaigns
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
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
                      <span className="text-sm font-medium truncate text-slate-700 dark:text-slate-300">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 ml-4">
                      ${formatNumber(item.revenue)} revenue
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {item.roas}x
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      ROAS
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm">
            <span className="text-slate-500 dark:text-slate-400">
              View all campaigns
            </span>
            <Badge
              variant="outline"
              className="bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300"
            >
              {campaignPerformanceData.length} campaigns
            </Badge>
          </CardFooter>
        </Card>

        {/* Campaign Performance Chart */}
        <Card className="col-span-1 lg:col-span-2 bg-white dark:bg-slate-800 border-0 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <TrendingUp className="h-4 w-4 text-indigo-500" />
              Campaign Performance
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
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
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(148, 163, 184, 0.2)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
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
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: "#6366f1" }}
                    activeDot={{ r: 6, strokeWidth: 2, fill: "#6366f1" }}
                    animationDuration={1500}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="ctr"
                    name="Click-through Rate"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: "#8b5cf6" }}
                    activeDot={{ r: 6, strokeWidth: 2, fill: "#8b5cf6" }}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="roas"
                    name="ROAS"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: "#10b981" }}
                    activeDot={{ r: 6, strokeWidth: 2, fill: "#10b981" }}
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
              className="bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300"
            >
              <TrendingUp className="mr-1 h-3 w-3" />
              Campaign Metrics
            </Badge>
          </CardFooter>
        </Card>

        {/* Conversion Opportunities */}
        <Card className="col-span-1 bg-white dark:bg-slate-800 border-0 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <Zap className="h-4 w-4 text-indigo-500" />
              Conversion Opportunities
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Areas to improve conversion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1 flex items-center text-slate-700 dark:text-slate-300">
                  <Badge className="mr-2 bg-indigo-500">1</Badge>
                  Cart Abandonment
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {formatNumber(
                    conversionFunnelData[2].value -
                      conversionFunnelData[3].value
                  )}{" "}
                  visitors abandoned their cart
                </p>
                <div className="mt-1 text-xs text-indigo-500">
                  Consider email reminders and checkout optimization
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 flex items-center text-slate-700 dark:text-slate-300">
                  <Badge className="mr-2 bg-indigo-500">2</Badge>
                  Checkout Drop-offs
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {formatNumber(
                    conversionFunnelData[3].value -
                      conversionFunnelData[4].value
                  )}{" "}
                  visitors left during checkout
                </p>
                <div className="mt-1 text-xs text-indigo-500">
                  Review payment options and simplify the process
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm">
            <span className="text-slate-500 dark:text-slate-400">
              View full report
            </span>
            <Badge
              variant="outline"
              className="bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300"
            >
              2 opportunities
            </Badge>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ImprovedTrafficAcquisitionInsights;
