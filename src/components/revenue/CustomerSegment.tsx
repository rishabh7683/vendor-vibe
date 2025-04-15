import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface SegmentData {
  name: string;
  value: number;
}

interface CustomerSegmentProps {
  data: SegmentData[];
}

const CustomerSegment: React.FC<CustomerSegmentProps> = ({ data }) => {
  // Sort data by value in descending order
  const sortedData = [...data].sort((a, b) => b.value - a.value);

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
          <CardTitle className="terminal-text">
            Customer Segment Contribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorSegment" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.8} />
                </linearGradient>
                <filter id="glow-segment" height="200%">
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
                horizontal={true}
                vertical={false}
                stroke="#333"
                opacity={0.2}
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                domain={[0, "dataMax"]}
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                width={100}
              />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                contentStyle={glassStyle}
                cursor={{ fill: "rgba(14, 165, 233, 0.1)" }}
              />
              <Bar
                dataKey="value"
                name="Revenue"
                fill="url(#colorSegment)"
                radius={[0, 4, 4, 0]}
                filter="url(#glow-segment)"
                animationDuration={1500}
                animationEasing="ease"
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerSegment;
