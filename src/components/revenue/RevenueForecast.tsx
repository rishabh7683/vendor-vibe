import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface ForecastData {
  name: string;
  actual: number | null;
  forecast: number;
}

interface RevenueForecastProps {
  data: ForecastData[];
}

const RevenueForecast: React.FC<RevenueForecastProps> = ({ data }) => {
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
      <Card className="matrix-flow shadow-glow-sm h-full">
        <CardHeader>
          <CardTitle className="terminal-text">Revenue Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2} />
                </linearGradient>
                <filter id="glow-forecast" height="200%">
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
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={glassStyle}
                cursor={{ stroke: "rgba(255, 255, 255, 0.2)" }}
                formatter={(value) => [
                  `$${value?.toLocaleString() || 0}`,
                  "Revenue",
                ]}
                animationDuration={300}
              />
              <Legend
                verticalAlign="top"
                wrapperStyle={{ paddingBottom: "10px" }}
              />
              <Area
                type="monotone"
                dataKey="actual"
                name="Actual Revenue"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#colorActual)"
                activeDot={{ r: 5 }}
                animationDuration={2000}
                animationEasing="ease"
                isAnimationActive={true}
              />
              <Area
                type="monotone"
                dataKey="forecast"
                name="Forecast Revenue"
                stroke="#8b5cf6"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#colorForecast)"
                filter="url(#glow-forecast)"
                activeDot={{ r: 5 }}
                animationDuration={2000}
                animationEasing="ease"
                animationBegin={500}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RevenueForecast;
