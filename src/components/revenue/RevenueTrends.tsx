import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface RevenueTrendsProps {
  data: Array<{
    name: string;
    thisYear: number;
    lastYear: number;
  }>;
  timeframe: string;
}

const RevenueTrends: React.FC<RevenueTrendsProps> = ({ data, timeframe }) => {
  // Glass morphism style for tooltips
  const glassStyle = {
    backgroundColor: "rgba(17, 25, 40, 0.75)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.125)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
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
          <CardTitle className="terminal-text">Revenue Growth Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorThisYear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="colorLastYear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.2} />
                </linearGradient>
                <filter id="glow-revenue" height="200%">
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
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={glassStyle}
                cursor={{ stroke: "rgba(255, 255, 255, 0.2)" }}
                formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                animationDuration={300}
              />
              <Legend
                verticalAlign="top"
                wrapperStyle={{ paddingBottom: "10px" }}
              />
              <Line
                type="monotone"
                dataKey="thisYear"
                name={`${
                  timeframe === "yearly" ? "This Year" : "Current Period"
                }`}
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5, fill: "#10b981" }}
                fill="url(#colorThisYear)"
                filter="url(#glow-revenue)"
                animationDuration={2000}
                animationEasing="ease"
                isAnimationActive={true}
              />
              <Line
                type="monotone"
                dataKey="lastYear"
                name={`${
                  timeframe === "yearly" ? "Last Year" : "Previous Period"
                }`}
                stroke="#0ea5e9"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 2 }}
                activeDot={{ r: 4, fill: "#0ea5e9" }}
                fill="url(#colorLastYear)"
                animationDuration={2000}
                animationEasing="ease"
                animationBegin={500}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RevenueTrends;
