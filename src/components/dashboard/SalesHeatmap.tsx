
import React from "react";
import { ResponsiveContainer, Tooltip } from "recharts";

interface SalesHeatmapProps {
  data: Array<{
    day: string;
    hour: string;
    hourNum: number;
    value: number;
  }>;
}

const SalesHeatmap: React.FC<SalesHeatmapProps> = ({ data }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Group by day
  const groupedByDay = days.map(day => {
    return {
      day,
      hours: data.filter(item => item.day === day)
        .sort((a, b) => a.hourNum - b.hourNum)
    };
  });

  // Filter to show only business hours
  const businessHours = Array.from({ length: 14 }, (_, i) => i + 8); // 8am to 9pm
  
  // Calculate the max value for color intensity
  const maxValue = Math.max(...data.map(item => item.value));

  const getColorIntensity = (value: number) => {
    const percentage = value / maxValue;
    
    // Green color with varying opacity based on value
    return `rgba(16, 185, 129, ${percentage * 0.9})`;
  };

  return (
    <div className="w-full">
      <div className="flex mb-2">
        <div className="w-24"></div>
        <div className="flex-1 grid grid-cols-7 gap-1 text-xs text-center text-muted-foreground">
          {days.map(day => (
            <div key={day}>{day.substring(0, 3)}</div>
          ))}
        </div>
      </div>
      
      <div className="flex">
        <div className="w-24 pr-2 flex flex-col justify-around text-xs text-muted-foreground">
          {businessHours.map(hour => (
            <div key={hour} className="h-7 flex items-center justify-end">
              {hour > 12 ? `${hour - 12}pm` : hour === 12 ? "12pm" : `${hour}am`}
            </div>
          ))}
        </div>
        
        <div className="flex-1 grid grid-cols-7 gap-1">
          {days.map(day => (
            <div key={day} className="flex flex-col gap-1">
              {businessHours.map(hour => {
                const hourData = data.find(item => item.day === day && item.hourNum === hour);
                const value = hourData?.value || 0;
                
                return (
                  <div 
                    key={hour}
                    className="h-7 rounded-sm flex items-center justify-center text-xs font-medium cursor-pointer hover:shadow-md transition-shadow"
                    style={{ 
                      backgroundColor: getColorIntensity(value),
                      color: value > maxValue * 0.7 ? "white" : "currentColor"
                    }}
                    title={`${day} ${hour > 12 ? `${hour - 12}pm` : hour === 12 ? "12pm" : `${hour}am`}: ${value} orders`}
                  >
                    {value > 0 ? value : ""}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Low</span>
          <div className="flex h-2">
            {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((opacity, i) => (
              <div 
                key={i}
                className="w-5 h-2"
                style={{ backgroundColor: `rgba(16, 185, 129, ${opacity})` }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">High</span>
        </div>
      </div>
    </div>
  );
};

export default SalesHeatmap;
