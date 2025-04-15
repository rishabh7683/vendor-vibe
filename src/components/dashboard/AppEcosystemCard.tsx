
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { PuzzleIcon } from "lucide-react";

interface AppItem {
  id: string;
  name: string;
  cost: string;
  costValue: number;
  revenue: string;
  roi: number;
}

interface AppEcosystemCardProps {
  apps: AppItem[];
  className?: string;
}

const AppEcosystemCard: React.FC<AppEcosystemCardProps> = ({
  apps,
  className,
}) => {
  return (
    <Card className={cn("matrix-flow", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium terminal-text">App Ecosystem</CardTitle>
        <PuzzleIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{app.name}</div>
                <div className="text-xs text-muted-foreground">
                  ROI: {app.roi > 0 ? "+" : ""}{app.roi}%
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div>Cost: {app.cost}</div>
                <div>Revenue: {app.revenue}</div>
              </div>
              <Progress 
                value={app.roi > 0 ? 50 + app.roi / 2 : 50 - Math.abs(app.roi) / 2} 
                className={cn(
                  "h-2",
                  app.roi > 0 ? "bg-muted text-success" : "bg-muted text-destructive"
                )}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppEcosystemCard;
