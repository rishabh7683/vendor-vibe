import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: number;
  changeLabel?: string;
  className?: string;
  variant?: "green" | "blue" | "purple" | "amber" | "pink";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeLabel,
  className,
  variant = "green",
}) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  const variantStyles = {
    green: {
      gradient: "from-[#10b981]/10 to-[#10b981]/5",
      iconBg: "bg-[#10b981]/20",
      iconColor: "text-[#10b981]",
      badgeBg: "bg-green-500/10",
      badgeText: "text-green-500",
      badgeBorder: "border-green-500/20",
    },
    blue: {
      gradient: "from-[#0ea5e9]/10 to-[#0ea5e9]/5",
      iconBg: "bg-[#0ea5e9]/20",
      iconColor: "text-[#0ea5e9]",
      badgeBg: "bg-blue-500/10",
      badgeText: "text-blue-500",
      badgeBorder: "border-blue-500/20",
    },
    purple: {
      gradient: "from-[#8b5cf6]/10 to-[#8b5cf6]/5",
      iconBg: "bg-[#8b5cf6]/20",
      iconColor: "text-[#8b5cf6]",
      badgeBg: "bg-purple-500/10",
      badgeText: "text-purple-500",
      badgeBorder: "border-purple-500/20",
    },
    amber: {
      gradient: "from-[#f59e0b]/10 to-[#f59e0b]/5",
      iconBg: "bg-[#f59e0b]/20",
      iconColor: "text-[#f59e0b]",
      badgeBg: "bg-amber-500/10",
      badgeText: "text-amber-500",
      badgeBorder: "border-amber-500/20",
    },
    pink: {
      gradient: "from-[#ec4899]/10 to-[#ec4899]/5",
      iconBg: "bg-[#ec4899]/20",
      iconColor: "text-[#ec4899]",
      badgeBg: "bg-pink-500/10",
      badgeText: "text-pink-500",
      badgeBorder: "border-pink-500/20",
    },
  };

  const currentStyle = variantStyles[variant];

  return (
    <Card
      className={cn(
        `bg-gradient-to-b ${currentStyle.gradient} border matrix-flow shadow-glow-sm overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-glow`,
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{value}</span>
            </div>
            {change !== undefined && (
              <div className="flex items-center gap-1.5">
                <Badge
                  variant="outline"
                  className={cn(
                    `${currentStyle.badgeBg} ${currentStyle.badgeText} ${currentStyle.badgeBorder}`,
                    "flex items-center gap-0.5 font-medium py-0.5"
                  )}
                >
                  {isPositive && <ArrowUpIcon className="h-3 w-3" />}
                  {isNegative && <ArrowDownIcon className="h-3 w-3" />}
                  {Math.abs(change)}%
                </Badge>
                {changeLabel && (
                  <span className="text-xs text-muted-foreground">
                    {changeLabel}
                  </span>
                )}
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex items-center justify-center h-12 w-12 rounded-full",
              currentStyle.iconBg
            )}
          >
            {React.cloneElement(icon as React.ReactElement, {
              className: cn("h-5 w-5", currentStyle.iconColor),
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
