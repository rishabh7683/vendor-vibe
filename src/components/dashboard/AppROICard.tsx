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
  ReferenceLine,
} from "recharts";
import { getAppCategoryROI } from "@/data/appEcosystemData";
import { cn } from "@/lib/utils";

const AppROICard = () => {
  const data = getAppCategoryROI();

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
    <Card className="col-span-8 matrix-flow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold terminal-text">
          App Category ROI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 15, right: 30, left: 20, bottom: 15 }}
            >
              <defs>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="colorROI" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2} />
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
                dataKey="name"
                stroke="#999"
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                tickFormatter={(value) => `$${value}`}
                stroke="#999"
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `${value}%`}
                stroke="#999"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "roi") return [`${value}%`, "ROI"];
                  return [`$${value}`, name === "cost" ? "Cost" : "Revenue"];
                }}
                contentStyle={glassStyle}
                cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                animationDuration={300}
              />
              <Legend
                verticalAlign="top"
                wrapperStyle={{ paddingBottom: "10px" }}
              />
              <ReferenceLine
                yAxisId="right"
                y={0}
                stroke="rgba(16, 185, 129, 0.3)"
              />
              <Bar
                yAxisId="left"
                dataKey="cost"
                name="Monthly Cost"
                fill="url(#colorCost)"
                radius={[8, 8, 0, 0]}
                animationDuration={1500}
                animationEasing="ease"
                animationBegin={0}
                isAnimationActive={true}
              />
              <Bar
                yAxisId="left"
                dataKey="revenue"
                name="Generated Revenue"
                fill="url(#colorRevenue)"
                radius={[8, 8, 0, 0]}
                animationDuration={1500}
                animationEasing="ease"
                animationBegin={150}
                isAnimationActive={true}
                filter="url(#shadow)"
              />
              <Bar
                yAxisId="right"
                dataKey="roi"
                name="ROI %"
                fill="url(#colorROI)"
                radius={[8, 8, 0, 0]}
                animationDuration={1500}
                animationEasing="ease"
                animationBegin={300}
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppROICard;
