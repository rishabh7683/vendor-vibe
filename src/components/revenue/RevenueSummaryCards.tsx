import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Users, ShoppingCart } from "lucide-react";

interface RevenueSummaryCardsProps {
  data: {
    totalRevenue: number;
    revenueGrowth: number;
    averageOrderValue: number;
    aovGrowth: number;
    customers: number;
    customerGrowth: number;
    orders: number;
    orderGrowth: number;
  };
}

const RevenueSummaryCards: React.FC<RevenueSummaryCardsProps> = ({ data }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border matrix-flow shadow-glow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    ${data.totalRevenue.toLocaleString()}
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-500 border-green-500/20"
                  >
                    +{data.revenueGrowth}%
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  vs. previous period
                </span>
              </div>
              <div className="h-12 w-12 rounded-lg bg-[#10b981]/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-[#10b981]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-b from-[#0ea5e9]/10 to-[#0ea5e9]/5 border matrix-flow shadow-glow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Average Order Value
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    ${data.averageOrderValue.toFixed(2)}
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    +{data.aovGrowth}%
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  vs. previous period
                </span>
              </div>
              <div className="h-12 w-12 rounded-lg bg-[#0ea5e9]/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-[#0ea5e9]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-b from-[#8b5cf6]/10 to-[#8b5cf6]/5 border matrix-flow shadow-glow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Total Customers
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    {data.customers.toLocaleString()}
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-purple-500/10 text-purple-500 border-purple-500/20"
                  >
                    +{data.customerGrowth}%
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  vs. previous period
                </span>
              </div>
              <div className="h-12 w-12 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-[#8b5cf6]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-b from-[#f59e0b]/10 to-[#f59e0b]/5 border matrix-flow shadow-glow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Total Orders
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    {data.orders.toLocaleString()}
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                  >
                    +{data.orderGrowth}%
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  vs. previous period
                </span>
              </div>
              <div className="h-12 w-12 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-[#f59e0b]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RevenueSummaryCards;
