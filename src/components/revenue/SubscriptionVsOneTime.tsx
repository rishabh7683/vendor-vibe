import React from "react";
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

interface PurchaseTypeData {
  name: string;
  value: number;
}

interface SubscriptionVsOneTimeProps {
  data: PurchaseTypeData[];
}

const SubscriptionVsOneTime: React.FC<SubscriptionVsOneTimeProps> = ({
  data,
}) => {
  // Predefined colors for subscription vs one-time
  const COLORS = ["#10b981", "#f97316"];

  // Glass morphism style for tooltips
  const glassStyle = {
    backgroundColor: "rgba(240, 240, 245, 0.85)",
    borderRadius: "16px",
    border: "1px solid rgba(200, 200, 220, 0.3)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
    color: "#000000",
  };

  // Calculate percentages for the labels
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercent = data.map((item) => ({
    ...item,
    percent: ((item.value / total) * 100).toFixed(0),
  }));

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
            Subscription vs. One-time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <defs>
                <linearGradient
                  id="colorSubscription"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="colorOneTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0.6} />
                </linearGradient>
                <filter id="glow-purchase" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
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
              </defs>

              <Pie
                data={dataWithPercent}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                filter="url(#glow-purchase)"
                label={({ name, percent }) => `${name}: ${percent}%`}
                labelLine={{
                  stroke: "rgba(255, 255, 255, 0.3)",
                  strokeWidth: 1,
                }}
                animationDuration={2000}
                animationEasing="ease"
                isAnimationActive={true}
              >
                <Cell key="cell-0" fill="url(#colorSubscription)" />
                <Cell key="cell-1" fill="url(#colorOneTime)" />
              </Pie>

              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                contentStyle={glassStyle}
              />

              <Legend
                verticalAlign="bottom"
                formatter={(value, entry, index) => (
                  <span className="text-sm font-medium">
                    {value}: {dataWithPercent[index].percent}%
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {dataWithPercent.map((entry, index) => (
              <div key={`stat-${index}`} className="flex flex-col items-center">
                <span className="text-2xl font-bold">
                  ${entry.value.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SubscriptionVsOneTime;
