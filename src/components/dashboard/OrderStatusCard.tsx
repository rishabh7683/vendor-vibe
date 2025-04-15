import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OrderStatusCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  textColor: string;
}

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  title,
  value,
  icon,
  color,
  textColor,
}) => {
  return (
    <Card
      className={cn(
        "overflow-hidden border matrix-flow",
        "bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className={cn("text-sm font-medium", textColor)}>{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div
            className={cn(
              "flex items-center justify-center h-10 w-10 rounded-full",
              "bg-background/60"
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusCard;
