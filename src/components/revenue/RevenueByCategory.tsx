import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { motion } from "framer-motion";

interface CategoryData {
  name: string;
  value: number;
}

interface RevenueByCategoryProps {
  data: CategoryData[];
  colors: string[];
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
        {`$${value.toLocaleString()} (${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

const RevenueByCategory: React.FC<RevenueByCategoryProps> = ({
  data,
  colors,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Glass morphism style for tooltips
  const glassStyle = {
    backgroundColor: "rgba(240, 240, 245, 0.85)",
    borderRadius: "16px",
    border: "1px solid rgba(200, 200, 220, 0.3)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
    color: "#000000",
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const createGradients = () => {
    return (
      <defs>
        {colors.map((color, index) => (
          <linearGradient
            key={`gradient-${index}`}
            id={`colorCategory${index}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={color} stopOpacity={0.9} />
            <stop offset="100%" stopColor={color} stopOpacity={0.6} />
          </linearGradient>
        ))}
        <filter id="glow-pie" height="200%">
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
          <CardTitle className="terminal-text">Revenue by Category</CardTitle>
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
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
                animationDuration={2000}
                animationEasing="ease"
                isAnimationActive={true}
                filter="url(#glow-pie)"
                startAngle={0}
                endAngle={360}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#colorCategory${index % colors.length})`}
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

export default RevenueByCategory;
