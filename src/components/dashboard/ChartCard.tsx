import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  chart: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  chart,
  className,
}) => {
  return (
    <Card className={cn("matrix-flow", className)}>
      <CardHeader className="pb-2 relative">
        <CardTitle className="text-md font-medium terminal-text">
          {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0 relative">{chart}</CardContent>
    </Card>
  );
};

export default ChartCard;
