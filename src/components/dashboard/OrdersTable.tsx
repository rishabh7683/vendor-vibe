
import React, { useState } from "react";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, MoreHorizontal, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order } from "@/data/orderData";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const [sortField, setSortField] = useState<keyof Order>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const isMobile = useIsMobile();

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500/20";
      case "processing":
        return "bg-blue-500/10 border-blue-500/20 text-blue-500 hover:bg-blue-500/20";
      case "shipped":
        return "bg-indigo-500/10 border-indigo-500/20 text-indigo-500 hover:bg-indigo-500/20";
      case "delivered":
        return "bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500/20";
      case "cancelled":
        return "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-gray-500/10 border-gray-500/20 text-gray-500 hover:bg-gray-500/20";
    }
  };

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortField === "total") {
      return sortDirection === "asc"
        ? a.total - b.total
        : b.total - a.total;
    } else {
      const aValue = a[sortField] as any;
      const bValue = b[sortField] as any;
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    }
  });

  const renderSortIcon = (field: keyof Order) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer w-[100px]"
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                ID {renderSortIcon("id")}
              </div>
            </TableHead>
            {!isMobile && (
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date {renderSortIcon("date")}
                </div>
              </TableHead>
            )}
            <TableHead>Customer</TableHead>
            {!isMobile && <TableHead>Product</TableHead>}
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort("total")}
            >
              <div className="flex items-center justify-end">
                Amount {renderSortIcon("total")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Status {renderSortIcon("status")}
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isMobile ? 4 : 6} className="text-center py-10 text-muted-foreground">
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            sortedOrders.map((order) => (
              <TableRow key={order.id} className="group">
                <TableCell className="font-medium">{order.id}</TableCell>
                {!isMobile && (
                  <TableCell>{formatDate(order.date)}</TableCell>
                )}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                      <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{order.customer.name}</span>
                      {!isMobile && <span className="text-xs text-muted-foreground">{order.customer.email}</span>}
                    </div>
                  </div>
                </TableCell>
                {!isMobile && (
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{order.product.name}</span>
                      <span className="text-xs text-muted-foreground">
                        Qty: {order.product.quantity}
                      </span>
                    </div>
                  </TableCell>
                )}
                <TableCell className="text-right font-medium">
                  {formatCurrency(order.total)}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn(getStatusBadgeVariant(order.status))}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View order details</DropdownMenuItem>
                      <DropdownMenuItem>Contact customer</DropdownMenuItem>
                      {order.trackingNumber && (
                        <DropdownMenuItem>
                          <div className="flex items-center gap-1">
                            Track shipment
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </div>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Cancel order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
