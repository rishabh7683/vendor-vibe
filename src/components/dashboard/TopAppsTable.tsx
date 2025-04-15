
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTopPerformingApps, getLowPerformingApps, AppItem } from "@/data/appEcosystemData";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const AppTableRow = ({ app }: { app: AppItem }) => {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{app.name}</div>
        <div className="text-xs text-muted-foreground">{app.category}</div>
      </TableCell>
      <TableCell>{formatCurrency(app.cost)}/mo</TableCell>
      <TableCell>{formatCurrency(app.revenue)}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <span className={cn(
            "mr-2 font-medium",
            app.roi > 0 ? "text-green-600" : "text-red-600"
          )}>
            {app.roi}%
          </span>
          {app.roi > 0 ? (
            <ArrowUpIcon className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-600" />
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={app.roi > 1000 ? "success" : app.roi > 500 ? "default" : app.roi > 0 ? "secondary" : "destructive"}>
          {app.roi > 1000 ? "Excellent" : app.roi > 500 ? "Good" : app.roi > 0 ? "Fair" : "Poor"}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

const TopAppsTable: React.FC = () => {
  const topApps = getTopPerformingApps();
  const lowApps = getLowPerformingApps();
  
  return (
    <Card className="col-span-12 matrix-flow shadow-glow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold terminal-text">App Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="top" className="w-full">
          <TabsList className="grid w-full grid-cols-2 backdrop-blur-md bg-background/30 rounded-xl mb-4">
            <TabsTrigger 
              value="top" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              Top Performing
            </TabsTrigger>
            <TabsTrigger 
              value="low" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              Low Performing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top">
            <div className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border border-border/50 rounded-lg p-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30">
                    <TableHead>App</TableHead>
                    <TableHead>Monthly Cost</TableHead>
                    <TableHead>Revenue Generated</TableHead>
                    <TableHead>ROI</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topApps.map((app) => (
                    <AppTableRow key={app.id} app={app} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="low">
            <div className="bg-gradient-to-b from-[#f59e0b]/10 to-[#f59e0b]/5 border border-border/50 rounded-lg p-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30">
                    <TableHead>App</TableHead>
                    <TableHead>Monthly Cost</TableHead>
                    <TableHead>Revenue Generated</TableHead>
                    <TableHead>ROI</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowApps.map((app) => (
                    <AppTableRow key={app.id} app={app} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TopAppsTable;
