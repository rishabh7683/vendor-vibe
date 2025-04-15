import { useState, useEffect } from "react";
import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Sector,
  ReferenceLine,
  LabelList,
} from "recharts";
import {
  Calendar,
  ShoppingCart,
  DollarSign,
  CreditCard,
  Users,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import ProductPerformanceTable from "@/components/dashboard/ProductPerformanceTable";
import AppEcosystemCard from "@/components/dashboard/AppEcosystemCard";
import TrafficAcquisitionInsights from "@/components/dashboard/TrafficAcquisitionInsights";
import {
  salesData as originalSalesData,
  productCategoryData as originalProductCategoryData,
  productPerformanceData as originalProductPerformanceData,
  appEcosystemData as originalAppEcosystemData,
  revenueData as originalRevenueData,
  statisticsData as originalStatisticsData,
} from "@/data/dashboardData";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Modern, vibrant colors for the pie chart
const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

// Custom active shape for the pie chart when hovering
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="drop-shadow-lg"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#ccc"
        className="text-xs"
      >
        {`${payload.name}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        className="text-xs"
      >
        {`${value} (${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

// Helper function to filter data based on date range
const filterDataByDateRange = (range) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const last7Days = new Date(today);
  last7Days.setDate(last7Days.getDate() - 7);

  const last30Days = new Date(today);
  last30Days.setDate(last30Days.getDate() - 30);

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const yearStart = new Date(now.getFullYear(), 0, 1);

  // Apply multipliers based on the selected range
  let multiplier = 1;
  switch (range) {
    case "today":
      multiplier = 0.3;
      break;
    case "yesterday":
      multiplier = 0.25;
      break;
    case "last7":
      multiplier = 0.6;
      break;
    case "last30":
      multiplier = 1;
      break;
    case "month":
      multiplier = 0.9;
      break;
    case "year":
      multiplier = 1.5;
      break;
    default:
      multiplier = 1;
  }

  // Filter and transform data based on the selected range
  const modifiedSalesData = originalSalesData.map((item) => ({
    ...item,
    value: Math.round(item.value * multiplier),
  }));

  const modifiedRevenueData = originalRevenueData.map((item) => ({
    ...item,
    revenue: Math.round(item.revenue * multiplier),
    expenses: Math.round(item.expenses * multiplier),
  }));

  const modifiedProductCategoryData = originalProductCategoryData.map(
    (item) => ({
      ...item,
      value: Math.round(item.value * multiplier),
    })
  );

  const modifiedAppEcosystemData = originalAppEcosystemData.map((item) => {
    const newCostValue = parseFloat((item.costValue * multiplier).toFixed(2));
    const newRevenue = Math.round(
      parseInt(item.revenue.replace(/[^0-9]/g, "")) * multiplier
    );
    const newROI = Math.round((newRevenue / newCostValue - 1) * 100);

    return {
      ...item,
      cost: `$${newCostValue.toFixed(2)}/mo`,
      costValue: newCostValue,
      revenue: `$${newRevenue}/mo`,
      roi: newROI,
    };
  });

  const modifiedProductPerformanceData = originalProductPerformanceData.map(
    (item) => ({
      ...item,
      sales: Math.round(item.sales * multiplier),
      profit: `$${Math.round(
        parseFloat(item.profit.replace(/[^0-9.]/g, "")) * multiplier
      ).toLocaleString()}.00`,
      inventory: Math.round(
        item.inventory *
          (range === "today" || range === "yesterday" ? 1 : multiplier)
      ),
    })
  );

  const formatCurrency = (value, multiplier) => {
    const numValue = parseFloat(value.replace(/[$,]/g, ""));
    return `$${(numValue * multiplier).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const calculateChange = (original, multiplier) => {
    const value = original.change;
    // Change the trend direction occasionally based on the range
    return range === "yesterday" || range === "today" ? -value : value;
  };

  const modifiedStatisticsData = {
    totalRevenue: {
      value: formatCurrency(
        originalStatisticsData.totalRevenue.value,
        multiplier
      ),
      change: calculateChange(originalStatisticsData.totalRevenue, multiplier),
      changeLabel: originalStatisticsData.totalRevenue.changeLabel,
    },
    averageOrderValue: {
      value: formatCurrency(
        originalStatisticsData.averageOrderValue.value,
        multiplier
      ),
      change: calculateChange(
        originalStatisticsData.averageOrderValue,
        multiplier
      ),
      changeLabel: originalStatisticsData.averageOrderValue.changeLabel,
    },
    conversionRate: {
      value: `${(
        parseFloat(originalStatisticsData.conversionRate.value) * multiplier
      ).toFixed(1)}%`,
      change: calculateChange(
        originalStatisticsData.conversionRate,
        multiplier
      ),
      changeLabel: originalStatisticsData.conversionRate.changeLabel,
    },
    activeCustomers: {
      value: Math.round(
        parseInt(
          originalStatisticsData.activeCustomers.value.replace(/,/g, "")
        ) * multiplier
      ).toLocaleString(),
      change: calculateChange(
        originalStatisticsData.activeCustomers,
        multiplier
      ),
      changeLabel: originalStatisticsData.activeCustomers.changeLabel,
    },
  };

  return {
    salesData: modifiedSalesData,
    revenueData: modifiedRevenueData,
    productCategoryData: modifiedProductCategoryData,
    appEcosystemData: modifiedAppEcosystemData,
    productPerformanceData: modifiedProductPerformanceData,
    statisticsData: modifiedStatisticsData,
  };
};

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("last30");
  const [activeIndex, setActiveIndex] = useState(0);
  const [filteredData, setFilteredData] = useState({
    salesData: originalSalesData,
    revenueData: originalRevenueData,
    productCategoryData: originalProductCategoryData,
    appEcosystemData: originalAppEcosystemData,
    productPerformanceData: originalProductPerformanceData,
    statisticsData: originalStatisticsData,
  });

  useEffect(() => {
    // Update data when date range changes
    const newData = filterDataByDateRange(dateRange);
    setFilteredData(newData);
  }, [dateRange]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center ml-auto gap-4">
            <Select defaultValue={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7">Last 7 days</SelectItem>
                <SelectItem value="last30">Last 30 days</SelectItem>
                <SelectItem value="month">Month to date</SelectItem>
                <SelectItem value="year">Year to date</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Compare</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={filteredData.statisticsData.totalRevenue.value}
            icon={<DollarSign />}
            change={filteredData.statisticsData.totalRevenue.change}
            changeLabel={filteredData.statisticsData.totalRevenue.changeLabel}
            variant="green"
          />
          <StatCard
            title="Average Order Value"
            value={filteredData.statisticsData.averageOrderValue.value}
            icon={<CreditCard />}
            change={filteredData.statisticsData.averageOrderValue.change}
            changeLabel={
              filteredData.statisticsData.averageOrderValue.changeLabel
            }
            variant="purple"
          />
          <StatCard
            title="Conversion Rate"
            value={filteredData.statisticsData.conversionRate.value}
            icon={<ShoppingCart />}
            change={filteredData.statisticsData.conversionRate.change}
            changeLabel={filteredData.statisticsData.conversionRate.changeLabel}
            variant="amber"
          />
          <StatCard
            title="Active Customers"
            value={filteredData.statisticsData.activeCustomers.value}
            icon={<Users />}
            change={filteredData.statisticsData.activeCustomers.change}
            changeLabel={
              filteredData.statisticsData.activeCustomers.changeLabel
            }
            variant="blue"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ChartCard
            title="Sales Overview"
            description="Monthly sales performance"
            chart={
              <ResponsiveContainer width="100%" height={300}>
                <ChartContainer
                  config={{
                    sales: {
                      label: "Sales",
                      color: "hsl(142, 76%, 36%)", // Green theme primary color
                    },
                  }}
                >
                  <BarChart
                    accessibilityLayer
                    data={filteredData.salesData}
                    margin={{ top: 20 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <defs>
                      <linearGradient
                        id="salesGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#059669"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="100%"
                          stopColor="#10b981"
                          stopOpacity={0.7}
                        />
                      </linearGradient>
                    </defs>
                    <Bar
                      dataKey="value"
                      name="Sales"
                      fill="url(#salesGradient)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </ResponsiveContainer>
            }
          />

          <ChartCard
            title="Revenue vs Expenses"
            description="Monthly financial overview"
            chart={
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={filteredData.revenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#6366f1"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorExpenses"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#f43f5e"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <filter id="shadow" height="200%">
                      <feDropShadow
                        dx="0"
                        dy="4"
                        stdDeviation="8"
                        floodOpacity="0.2"
                      />
                    </filter>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={0.5}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#999"
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    dy={10}
                  />
                  <YAxis
                    stroke="#999"
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    tickFormatter={(value) => `$${value}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.8)",
                      borderColor: "rgba(107, 114, 128, 0.3)",
                      borderRadius: "0.5rem",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                    }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(value) => [`$${value}k`, undefined]}
                    labelStyle={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span style={{ color: "#ccc", fontSize: "0.875rem" }}>
                        {value}
                      </span>
                    )}
                  />
                  <ReferenceLine
                    y={0}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={1}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    activeDot={{
                      r: 6,
                      stroke: "#6366f1",
                      strokeWidth: 2,
                      fill: "#fff",
                      filter: "url(#shadow)",
                    }}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    name="Expenses"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorExpenses)"
                    activeDot={{
                      r: 6,
                      stroke: "#f43f5e",
                      strokeWidth: 2,
                      fill: "#fff",
                      filter: "url(#shadow)",
                    }}
                    animationDuration={1500}
                    animationEasing="ease-out"
                    animationBegin={300}
                  />
                </AreaChart>
              </ResponsiveContainer>
            }
          />
        </div>

        <div className="grid gap-4">
          <Card className="col-span-12 shadow-glow-sm border-emerald-700/20 bg-emerald-800/5">
            <CardContent className="p-6">
              <TrafficAcquisitionInsights />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ChartCard
            title="Product Categories"
            description="Sales distribution by category"
            chart={
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={filteredData.productCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {filteredData.productCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        strokeWidth={2}
                        stroke="rgba(0, 0, 0, 0.2)"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(240, 240, 245, 0.85)",
                      borderRadius: "4px",
                      border: "1px solid rgba(200, 200, 220, 0.3)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
                      color: "#000",
                      fontWeight: "600",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            }
            className="md:col-span-1"
          />
          <AppEcosystemCard
            apps={filteredData.appEcosystemData}
            className="md:col-span-2 lg:col-span-2"
          />
        </div>

        <div className="grid gap-4">
          <ProductPerformanceTable
            products={filteredData.productPerformanceData}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
