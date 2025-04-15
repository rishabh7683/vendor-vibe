import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface TaxFeeData {
  name: string;
  tax: number;
  shippingFees: number;
  platformFees: number;
  processingFees: number;
}

interface TaxFeeBreakdownProps {
  data: TaxFeeData[];
}

const TaxFeeBreakdown: React.FC<TaxFeeBreakdownProps> = ({ data }) => {
  // Glass morphism style for tooltips
  const glassStyle = {
    backgroundColor: "rgba(240, 240, 245, 0.85)",
    borderRadius: "16px",
    border: "1px solid rgba(200, 200, 220, 0.3)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
    color: "#000000",
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
          <CardTitle className="terminal-text">Tax & Fee Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorTax" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="colorShipping" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="colorPlatform" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient
                  id="colorProcessing"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.3} />
                </linearGradient>
                <filter id="shadow-bars" height="200%">
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="4"
                    floodColor="#6366f1"
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
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={glassStyle}
                formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
              />
              <Legend
                verticalAlign="top"
                wrapperStyle={{ paddingBottom: "10px" }}
              />
              <Bar
                dataKey="tax"
                name="Sales Tax"
                stackId="a"
                fill="url(#colorTax)"
                radius={[4, 4, 0, 0]}
                filter="url(#shadow-bars)"
                animationDuration={1500}
                animationEasing="ease"
                isAnimationActive={true}
              />
              <Bar
                dataKey="shippingFees"
                name="Shipping Fees"
                stackId="a"
                fill="url(#colorShipping)"
                animationDuration={1500}
                animationEasing="ease"
                animationBegin={200}
                isAnimationActive={true}
              />
              <Bar
                dataKey="platformFees"
                name="Platform Fees"
                stackId="a"
                fill="url(#colorPlatform)"
                animationDuration={1500}
                animationEasing="ease"
                animationBegin={400}
                isAnimationActive={true}
              />
              <Bar
                dataKey="processingFees"
                name="Processing Fees"
                stackId="a"
                fill="url(#colorProcessing)"
                animationDuration={1500}
                animationEasing="ease"
                animationBegin={600}
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaxFeeBreakdown;
