import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

interface SubscriptionMetricsProps {
  mrrData: Array<{ name: string; value: number }>;
  arpuData: Array<{ name: string; value: number }>;
  retentionData: Array<{ name: string; retained: number; churned: number }>;
}

const SubscriptionMetrics: React.FC<SubscriptionMetricsProps> = ({
  mrrData,
  arpuData,
  retentionData,
}) => {
  const [activeTab, setActiveTab] = React.useState("mrr");

  // Glass morphism style for tooltips
  const glassStyle = {
    backgroundColor: "rgba(17, 25, 40, 0.75)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.125)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
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

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      <Card className="matrix-flow shadow-glow-sm">
        <CardHeader>
          <CardTitle className="terminal-text">Subscription Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="mrr"
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 backdrop-blur-md bg-background/30 rounded-xl mb-6">
              <TabsTrigger
                value="mrr"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
              >
                MRR
              </TabsTrigger>
              <TabsTrigger
                value="arpu"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
              >
                ARPU
              </TabsTrigger>
              <TabsTrigger
                value="retention"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
              >
                Retention
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="mrr" className="relative">
                <motion.div
                  key="mrr"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={chartVariants}
                  className="h-[280px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={mrrData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorMRR"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
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
                        <filter id="glow-mrr" height="200%">
                          <feGaussianBlur stdDeviation="2.5" result="blur" />
                          <feFlood
                            floodColor="#8b5cf6"
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
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip
                        contentStyle={glassStyle}
                        cursor={{ stroke: "rgba(255, 255, 255, 0.2)" }}
                        formatter={(value) => [
                          `$${value.toLocaleString()}`,
                          "MRR",
                        ]}
                        animationDuration={300}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        name="Monthly Recurring Revenue"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fill="url(#colorMRR)"
                        filter="url(#glow-mrr)"
                        animationDuration={2000}
                        animationEasing="ease"
                        isAnimationActive={true}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>
              </TabsContent>

              <TabsContent value="arpu" className="relative">
                <motion.div
                  key="arpu"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={chartVariants}
                  className="h-[280px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={arpuData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorARPU"
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
                        <filter id="glow-arpu" height="200%">
                          <feGaussianBlur stdDeviation="2.5" result="blur" />
                          <feFlood
                            floodColor="#0ea5e9"
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
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        contentStyle={glassStyle}
                        cursor={{ stroke: "rgba(255, 255, 255, 0.2)" }}
                        formatter={(value: number) => [
                          `$${value.toFixed(2)}`,
                          "ARPU",
                        ]}
                        animationDuration={300}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="Avg. Revenue Per User"
                        stroke="#0ea5e9"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5, fill: "#0ea5e9" }}
                        filter="url(#glow-arpu)"
                        animationDuration={2000}
                        animationEasing="ease"
                        isAnimationActive={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </TabsContent>

              <TabsContent value="retention" className="relative">
                <motion.div
                  key="retention"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={chartVariants}
                  className="h-[280px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={retentionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorRetained"
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
                          id="colorChurned"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#ef4444"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#ef4444"
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                        <filter id="shadow-retention" height="200%">
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
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip
                        contentStyle={glassStyle}
                        cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                        formatter={(value) => [`${value}%`, ""]}
                        animationDuration={300}
                      />
                      <Legend
                        verticalAlign="top"
                        wrapperStyle={{ paddingBottom: "10px" }}
                      />
                      <Bar
                        dataKey="retained"
                        name="Retained Customers"
                        fill="url(#colorRetained)"
                        radius={[8, 8, 0, 0]}
                        filter="url(#shadow-retention)"
                        animationDuration={1500}
                        animationEasing="ease"
                        isAnimationActive={true}
                      />
                      <Bar
                        dataKey="churned"
                        name="Churned Customers"
                        fill="url(#colorChurned)"
                        radius={[8, 8, 0, 0]}
                        animationDuration={1500}
                        animationEasing="ease"
                        animationBegin={300}
                        isAnimationActive={true}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SubscriptionMetrics;
