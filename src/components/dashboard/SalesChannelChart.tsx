import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface SalesChannel {
  name: string;
  value: number;
  icon: string;
  percent: number;
}

interface SalesChannelChartProps {
  data: SalesChannel[];
  colors: string[];
}

const SalesChannelChart: React.FC<SalesChannelChartProps> = ({
  data,
  colors,
}) => {
  return (
    <div className="h-[220px] flex flex-col">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {colors.map((color, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`colorChannel${index}`}
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
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#colorChannel${index})`} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(240, 240, 245, 0.85)",
              borderRadius: "16px",
              border: "1px solid rgba(200, 200, 220, 0.3)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
              color: "#000000",
            }}
            formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-4 mt-2">
        {data.map((channel, index) => (
          <div key={channel.name} className="flex items-center gap-1.5 text-xs">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span>{channel.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesChannelChart;
