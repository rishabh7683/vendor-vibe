import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCohortRetentionData } from "@/data/customerData";

// Custom cell color calculation based on retention value
const getCellColor = (value: number) => {
  if (value >= 90)
    return "bg-purple-500/30 text-purple-600 dark:text-purple-300";
  if (value >= 70)
    return "bg-indigo-500/30 text-indigo-600 dark:text-indigo-300";
  if (value >= 50) return "bg-blue-500/20 text-blue-600 dark:text-blue-300";
  if (value >= 30)
    return "bg-yellow-400/20 text-yellow-600 dark:text-yellow-300";
  if (value >= 10)
    return "bg-orange-400/20 text-orange-600 dark:text-orange-300";
  return "bg-red-400/20 text-red-600 dark:text-red-300";
};

const CustomerCohortAnalysis = () => {
  // Get cohort data
  const { cohorts, months } = getCohortRetentionData();

  return (
    <Card className="col-span-12 matrix-flow shadow-glow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold terminal-text">
          Customer Cohort Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-b from-[#8b5cf6]/10 to-[#8b5cf6]/5 border border-border/50 rounded-lg p-4 overflow-auto">
          <div className="min-w-[800px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left p-2 font-medium text-muted-foreground">
                    Cohort
                  </th>
                  <th className="text-left p-2 font-medium text-muted-foreground">
                    Customers
                  </th>
                  {months.map((month, i) => (
                    <th
                      key={month}
                      className="p-2 font-medium text-muted-foreground text-center"
                    >
                      Month {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohorts.map((cohort) => (
                  <tr
                    key={cohort.date}
                    className="border-b border-border/10 hover:bg-muted/30"
                  >
                    <td className="p-2 font-medium">{cohort.date}</td>
                    <td className="p-2 font-mono">{cohort.customers}</td>
                    {cohort.retention.map((value, i) => (
                      <td
                        key={i}
                        className={`p-2 text-center font-medium ${getCellColor(
                          value
                        )}`}
                      >
                        {value}%
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              This cohort analysis shows the percentage of customers who remain
              active in subsequent months after their initial purchase month.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerCohortAnalysis;
