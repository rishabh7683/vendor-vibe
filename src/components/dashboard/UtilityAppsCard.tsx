
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUtilityAppSavings } from "@/data/appEcosystemData";
import { ClockIcon, DollarSignIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const UtilityAppsCard = () => {
  const utilityApps = getUtilityAppSavings();
  
  // Calculate totals
  const totalHoursSaved = utilityApps.reduce((sum, app) => sum + app.hoursPerWeek, 0);
  const totalMonthlyCost = utilityApps.reduce((sum, app) => sum + app.monthlyCost, 0);
  const totalMonthlySavings = utilityApps.reduce((sum, app) => sum + app.monthlySavings, 0);
  const overallROI = Math.round((totalMonthlySavings - totalMonthlyCost) / totalMonthlyCost * 100);
  
  return (
    <Card className="col-span-12 matrix-flow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold terminal-text">Utility Apps Time Savings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="matrix-flow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hours Saved Weekly</p>
                  <h3 className="text-2xl font-bold">{totalHoursSaved} hours</h3>
                </div>
                <ClockIcon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="matrix-flow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Cost</p>
                  <h3 className="text-2xl font-bold">{formatCurrency(totalMonthlyCost)}</h3>
                </div>
                <DollarSignIcon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="matrix-flow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estimated ROI</p>
                  <h3 className="text-2xl font-bold text-primary">{overallROI}%</h3>
                </div>
                <DollarSignIcon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow className="border-border/40">
              <TableHead>App Name</TableHead>
              <TableHead>Hours Saved/Week</TableHead>
              <TableHead>Monthly Cost</TableHead>
              <TableHead>Estimated Value</TableHead>
              <TableHead>ROI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {utilityApps.map((app, index) => (
              <TableRow key={index} className="border-border/40">
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell>{app.hoursPerWeek} hours</TableCell>
                <TableCell>{formatCurrency(app.monthlyCost)}</TableCell>
                <TableCell>{formatCurrency(app.monthlySavings)}</TableCell>
                <TableCell>
                  <Badge variant="success">
                    {app.roi}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UtilityAppsCard;
