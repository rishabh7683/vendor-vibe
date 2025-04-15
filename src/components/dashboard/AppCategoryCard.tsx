
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from "recharts";
import { getAppCategories } from "@/data/appEcosystemData";

const AppCategoryCard = () => {
  const categories = getAppCategories();
  
  const costData = categories.map(cat => ({
    name: cat.name,
    value: cat.totalCost
  }));
  
  const countData = categories.map(cat => ({
    name: cat.name,
    value: cat.count
  }));

  const colors = [
    "#8B5CF6", // Purple
    "#D946EF", // Pink
    "#F97316", // Orange
    "#0EA5E9", // Blue
    "#10B981", // Green
    "#6366F1"  // Indigo
  ];

  // Variables for elegant glassmorphism effect
  const glassStyle = {
    backgroundColor: "rgba(240, 240, 245, 0.85)",
    borderRadius: "4px",
    border: "1px solid rgba(200, 200, 220, 0.3)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
    color: "#000",
    fontWeight: "600",
  };

  return (
    <Card className="col-span-4 matrix-flow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold terminal-text">App Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cost">
          <TabsList className="mb-4">
            <TabsTrigger value="cost">Monthly Cost</TabsTrigger>
            <TabsTrigger value="count">App Count</TabsTrigger>
          </TabsList>
          <TabsContent value="cost">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={costData}
                  margin={{ top: 15, right: 30, left: 20, bottom: 15 }}
                >
                  <defs>
                    {colors.map((color, index) => (
                      <linearGradient
                        key={`gradient-${index}`}
                        id={`colorBar${index}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={color} stopOpacity={0.2} />
                      </linearGradient>
                    ))}
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
                    tickFormatter={(value) => `$${value}`}
                    stroke="#999"
                    axisLine={false}
                    tickLine={false}
                    dx={-10}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Monthly Cost']}
                    labelFormatter={(label) => `${label} Apps`}
                    contentStyle={glassStyle}
                    cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                    animationDuration={300}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[8, 8, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease"
                  >
                    {costData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`url(#colorBar${index % colors.length})`} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="count">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={countData}
                  margin={{ top: 15, right: 30, left: 20, bottom: 15 }}
                >
                  <defs>
                    {colors.map((color, index) => (
                      <linearGradient
                        key={`gradient-count-${index}`}
                        id={`colorCount${index}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={color} stopOpacity={0.2} />
                      </linearGradient>
                    ))}
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
                  />
                  <Tooltip 
                    contentStyle={glassStyle}
                    cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                    animationDuration={300}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[8, 8, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease"
                  >
                    {countData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`url(#colorCount${index % colors.length})`} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AppCategoryCard;
