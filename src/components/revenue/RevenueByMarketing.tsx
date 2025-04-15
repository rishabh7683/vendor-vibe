import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface MarketingData {
  name: string;
  value: number;
}

interface RevenueByMarketingProps {
  data: MarketingData[];
  colors: string[];
}

const RevenueByMarketing: React.FC<RevenueByMarketingProps> = ({
  data,
  colors,
}) => {
  // Glass morphism style for tooltips
  const glassStyle = {
    backgroundColor: "rgba(240, 240, 245, 0.85)",
    borderRadius: "16px",
    border: "1px solid rgba(200, 200, 220, 0.3)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
    color: "#000000",
  };

  const createGradients = () => {
    return (
      <defs>
        {colors.map((color, index) => (
          <linearGradient
            key={`gradient-${index}`}
            id={`colorMarketing${index}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={color} stopOpacity={0.9} />
            <stop offset="100%" stopColor={color} stopOpacity={0.6} />
          </linearGradient>
        ))}
        <filter id="glow-marketing" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feFlood floodOpacity="0.3" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>
      </defs>
    );
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
          <CardTitle className="terminal-text">
            Revenue by Marketing Channel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              {createGradients()}
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                animationDuration={2000}
                animationEasing="ease"
                isAnimationActive={true}
                filter="url(#glow-marketing)"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#colorMarketing${index % colors.length})`}
                    strokeWidth={1}
                    stroke="rgba(255, 255, 255, 0.2)"
                    className="cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                contentStyle={glassStyle}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RevenueByMarketing;
