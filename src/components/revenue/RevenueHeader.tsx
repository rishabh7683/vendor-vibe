import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RevenueHeaderProps {
  timeframe: string;
  setTimeframe: (value: string) => void;
}

const RevenueHeader: React.FC<RevenueHeaderProps> = ({
  timeframe,
  setTimeframe,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-3xl font-bold tracking-tight terminal-text">
        Revenue Analytics
      </h1>

      <Tabs
        defaultValue={timeframe}
        className="w-[250px]"
        onValueChange={(value) => setTimeframe(value)}
      >
        <TabsList className="grid w-full grid-cols-3 backdrop-blur-md bg-background/30 rounded-xl">
          <TabsTrigger
            value="weekly"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
          >
            Week
          </TabsTrigger>
          <TabsTrigger
            value="monthly"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
          >
            Month
          </TabsTrigger>
          <TabsTrigger
            value="yearly"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
          >
            Year
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default RevenueHeader;
