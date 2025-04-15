import React, { useState } from "react";
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
  PieChart,
  Pie,
  Cell,
  Sector,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Area,
  AreaChart,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getOrderCountsByDay,
  getOrderStatusDistribution,
  Order,
} from "@/data/orderData";
import { motion, AnimatePresence } from "framer-motion";

interface OrdersChartProps {
  data: Order[];
}

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
        {`${value} orders (${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

const OrdersChart: React.FC<OrdersChartProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("daily");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const dailyData = getOrderCountsByDay();
  const statusData = getOrderStatusDistribution();

  // Reset animation state when changing tabs
  const handleTabChange = (value) => {
    setSelectedTab(value);
    // Force recharts to re-render with animations
    setIsFirstRender(true);
    setTimeout(() => setIsFirstRender(false), 50);
  };

  // More vibrant, modern colors for status chart
  const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const createGradients = () => {
    return (
      <defs>
        {COLORS.map((color, index) => (
          <linearGradient
            key={`gradient-${index}`}
            id={`colorStatus${index}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={color} stopOpacity={0.9} />
            <stop offset="100%" stopColor={color} stopOpacity={0.6} />
          </linearGradient>
        ))}
      </defs>
    );
  };

  // Animation variants for charts
  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Apple-like cubic-bezier easing
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Variables for elegant glassmorphism effect
  const glassStyle = {
    backgroundColor: "rgba(240, 240, 245, 0.85)",
    borderRadius: "16px",
    border: "1px solid rgba(200, 200, 220, 0.3)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
    color: "#000000",
  };

  return (
    <div className="w-full">
      <Tabs
        defaultValue="daily"
        className="w-full"
        orientation="horizontal"
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-3 p-1 mb-4 backdrop-blur-md bg-background/30 rounded-xl">
          <TabsTrigger
            value="daily"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
          >
            Daily Orders
          </TabsTrigger>
          <TabsTrigger
            value="trend"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
          >
            Order Trend
          </TabsTrigger>
          <TabsTrigger
            value="status"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
          >
            Status Distribution
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="daily" className="relative">
            <motion.div
              className="h-[300px]"
              key="daily"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={chartVariants}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyData}
                  margin={{ top: 15, right: 30, left: 20, bottom: 15 }}
                >
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorDelivered"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorProcessing"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorCancelled"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#ef4444"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <filter id="shadow" height="200%">
                      <feDropShadow
                        dx="0"
                        dy="4"
                        stdDeviation="8"
                        floodColor="#10b981"
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
                    dataKey="day"
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
                    cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                    animationDuration={300}
                  />
                  <Legend
                    verticalAlign="top"
                    wrapperStyle={{ paddingBottom: "10px" }}
                  />
                  <Bar
                    dataKey="total"
                    name="Total Orders"
                    fill="url(#colorTotal)"
                    radius={[8, 8, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease"
                    animationBegin={0}
                    isAnimationActive={true}
                    filter="url(#shadow)"
                  />
                  <Bar
                    dataKey="delivered"
                    name="Delivered"
                    fill="url(#colorDelivered)"
                    radius={[8, 8, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease"
                    animationBegin={150}
                    isAnimationActive={true}
                  />
                  <Bar
                    dataKey="processing"
                    name="Processing"
                    fill="url(#colorProcessing)"
                    radius={[8, 8, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease"
                    animationBegin={300}
                    isAnimationActive={true}
                  />
                  <Bar
                    dataKey="cancelled"
                    name="Cancelled"
                    fill="url(#colorCancelled)"
                    radius={[8, 8, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease"
                    animationBegin={450}
                    isAnimationActive={true}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </TabsContent>

          <TabsContent value="trend" className="relative">
            <motion.div
              className="h-[300px]"
              key="trend"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={chartVariants}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dailyData}
                  margin={{ top: 15, right: 30, left: 20, bottom: 15 }}
                >
                  <defs>
                    <linearGradient
                      id="colorTotalLine"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorDeliveredLine"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorProcessingLine"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <filter id="glow" height="200%">
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
                    dataKey="day"
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
                  <Area
                    type="monotone"
                    dataKey="total"
                    name="Total Orders"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#colorTotalLine)"
                    fillOpacity={0.8}
                    animationDuration={2000}
                    animationEasing="ease"
                    animationBegin={0}
                    isAnimationActive={true}
                    filter="url(#glow)"
                  />
                  <Area
                    type="monotone"
                    dataKey="delivered"
                    name="Delivered"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeOpacity={0.7}
                    fill="url(#colorDeliveredLine)"
                    fillOpacity={0.5}
                    animationDuration={2000}
                    animationEasing="ease"
                    animationBegin={500}
                    isAnimationActive={true}
                  />
                  <Area
                    type="monotone"
                    dataKey="processing"
                    name="Processing"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeOpacity={0.7}
                    fill="url(#colorProcessingLine)"
                    fillOpacity={0.5}
                    animationDuration={2000}
                    animationEasing="ease"
                    animationBegin={1000}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </TabsContent>

          <TabsContent value="status" className="relative">
            <motion.div
              className="h-[300px]"
              key="status"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={chartVariants}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  {createGradients()}
                  <filter id="glow-pie">
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
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    fill="#8884d8"
                    dataKey="value"
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    onMouseEnter={onPieEnter}
                    animationDuration={2000}
                    animationEasing="ease"
                    isAnimationActive={true}
                    animationBegin={0}
                    filter="url(#glow-pie)"
                    startAngle={0}
                    endAngle={360}
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#colorStatus${index})`}
                        strokeWidth={1}
                        stroke="rgba(255, 255, 255, 0.2)"
                        className="cursor-pointer"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} orders`, "Count"]}
                    contentStyle={glassStyle}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default OrdersChart;
