
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, Minus, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Product {
  id: string;
  name: string;
  price: string;
  sales: number;
  status: "trending" | "stable" | "declining";
  inventory: number;
  conversion: number;
  profit?: string;
  margin?: number;
  cost?: string;
  stockDays?: number;
  totalValue?: string;
  turnoverRate?: number;
  variants?: number;
  category?: string;
}

interface ProductPerformanceTableProps {
  products: Product[];
  className?: string;
}

const ProductPerformanceTable: React.FC<ProductPerformanceTableProps> = ({
  products,
  className,
}) => {
  const [sortField, setSortField] = useState<keyof Product>("sales");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const isMobile = useIsMobile();

  const getStatusIcon = (status: Product["status"]) => {
    switch (status) {
      case "trending":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      case "stable":
        return <Minus className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getInventoryStatus = (inventory: number) => {
    if (inventory <= 5) {
      return (
        <Badge variant="destructive" className="text-xs">
          Critical
        </Badge>
      );
    } else if (inventory <= 20) {
      return (
        <Badge variant="outline" className="text-xs text-amber-500">
          Low
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="text-xs text-success">
          Good
        </Badge>
      );
    }
  };

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortedProducts = () => {
    return [...products].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle string values for proper comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        // If it's a price string, convert to number
        if (sortField === 'price' || sortField === 'profit' || sortField === 'cost' || sortField === 'totalValue') {
          aValue = parseFloat((aValue as string).replace(/[^0-9.-]+/g, ""));
          bValue = parseFloat((bValue as string).replace(/[^0-9.-]+/g, ""));
        } else {
          // Regular string comparison
          aValue = (aValue as string).toLowerCase();
          bValue = (bValue as string).toLowerCase();
        }
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const getSortIcon = (field: keyof Product) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 ml-1" />;
    return sortDirection === "asc" ? 
      <ChevronUp className="h-3 w-3 ml-1" /> : 
      <ChevronDown className="h-3 w-3 ml-1" />;
  };

  // Define which columns to show based on screen size
  const renderTableHeader = () => {
    if (isMobile) {
      return (
        <TableRow>
          <TableHead>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleSort("name")}
              className="flex items-center font-medium text-xs"
            >
              Product {getSortIcon("name")}
            </Button>
          </TableHead>
          <TableHead>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleSort("sales")}
              className="flex items-center font-medium text-xs"
            >
              Sales {getSortIcon("sales")}
            </Button>
          </TableHead>
          <TableHead>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleSort("status")}
              className="flex items-center font-medium text-xs"
            >
              Status {getSortIcon("status")}
            </Button>
          </TableHead>
        </TableRow>
      );
    }

    return (
      <TableRow>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleSort("name")}
            className="flex items-center font-medium text-xs"
          >
            Product {getSortIcon("name")}
          </Button>
        </TableHead>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleSort("category")}
            className="flex items-center font-medium text-xs"
          >
            Category {getSortIcon("category")}
          </Button>
        </TableHead>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleSort("price")}
            className="flex items-center font-medium text-xs"
          >
            Price {getSortIcon("price")}
          </Button>
        </TableHead>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleSort("cost")}
            className="flex items-center font-medium text-xs"
          >
            Cost {getSortIcon("cost")}
          </Button>
        </TableHead>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleSort("sales")}
            className="flex items-center font-medium text-xs"
          >
            Sales {getSortIcon("sales")}
          </Button>
        </TableHead>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleSort("status")}
            className="flex items-center font-medium text-xs"
          >
            Status {getSortIcon("status")}
          </Button>
        </TableHead>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleSort("inventory")}
            className="flex items-center font-medium text-xs"
          >
            Inventory {getSortIcon("inventory")}
          </Button>
        </TableHead>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleSort("turnoverRate")}
            className="flex items-center font-medium text-xs"
          >
            Turnover {getSortIcon("turnoverRate")}
          </Button>
        </TableHead>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleSort("margin")}
            className="flex items-center font-medium text-xs"
          >
            Margin {getSortIcon("margin")}
          </Button>
        </TableHead>
      </TableRow>
    );
  };

  const renderTableRow = (product: Product) => {
    if (isMobile) {
      return (
        <TableRow key={product.id} className="hover:bg-accent/50 transition-colors cursor-pointer">
          <TableCell className="font-medium">{product.name}</TableCell>
          <TableCell>{product.sales}</TableCell>
          <TableCell>
            <div className="flex items-center gap-1">
              {getStatusIcon(product.status)}
              <span
                className={cn(
                  product.status === "trending" && "text-success",
                  product.status === "declining" && "text-destructive",
                  product.status === "stable" && "text-muted-foreground"
                )}
              >
                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
              </span>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    return (
      <TableRow key={product.id} className="hover:bg-accent/50 transition-colors cursor-pointer">
        <TableCell className="font-medium">{product.name}</TableCell>
        <TableCell>{product.category || "Uncategorized"}</TableCell>
        <TableCell>{product.price}</TableCell>
        <TableCell>{product.cost || "N/A"}</TableCell>
        <TableCell>{product.sales}</TableCell>
        <TableCell>
          <div className="flex items-center gap-1">
            {getStatusIcon(product.status)}
            <span
              className={cn(
                product.status === "trending" && "text-success",
                product.status === "declining" && "text-destructive",
                product.status === "stable" && "text-muted-foreground"
              )}
            >
              {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
            </span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <span>{product.inventory}</span>
            {getInventoryStatus(product.inventory)}
          </div>
        </TableCell>
        <TableCell>
          {product.turnoverRate ? (
            <span className={cn(
              product.turnoverRate > 10 && "text-success", 
              product.turnoverRate < 3 && "text-destructive",
              "font-medium"
            )}>
              {product.turnoverRate.toFixed(1)}x
            </span>
          ) : "N/A"}
        </TableCell>
        <TableCell>
          {product.margin ? (
            <span className={cn(
              product.margin > 40 && "text-success", 
              product.margin < 20 && "text-destructive",
              "font-medium"
            )}>
              {product.margin}%
            </span>
          ) : "N/A"}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="w-full">
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            {renderTableHeader()}
          </TableHeader>
          <TableBody className="text-sm">
            {getSortedProducts().map((product) => renderTableRow(product))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default ProductPerformanceTable;
