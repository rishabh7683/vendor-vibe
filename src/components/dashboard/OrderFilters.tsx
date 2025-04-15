import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/data/orderData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DateRange } from "react-day-picker";

interface OrderFiltersProps {
  data: Order[];
  onFilterChange: (filteredData: Order[]) => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  data,
  onFilterChange,
}) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Apply filters
  useEffect(() => {
    let filteredOrders = [...data];
    const newActiveFilters: string[] = [];

    // Date range filter
    if (dateRange.from && dateRange.to) {
      filteredOrders = filteredOrders.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate >= dateRange.from! && orderDate <= dateRange.to!;
      });
      newActiveFilters.push("Date range");
    }

    // Status filter
    if (statusFilter && statusFilter !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === statusFilter
      );
      newActiveFilters.push(`Status: ${statusFilter}`);
    }

    // Price range filter
    if (minPrice !== "" || maxPrice !== "") {
      filteredOrders = filteredOrders.filter((order) => {
        const min = minPrice !== "" ? parseFloat(minPrice) : 0;
        const max = maxPrice !== "" ? parseFloat(maxPrice) : Infinity;
        return order.total >= min && order.total <= max;
      });
      newActiveFilters.push(`Price: ${minPrice || "0"} - ${maxPrice || "∞"}`);
    }

    setActiveFilters(newActiveFilters);
    onFilterChange(filteredOrders);
  }, [dateRange, statusFilter, minPrice, maxPrice, data, onFilterChange]);

  const resetFilters = () => {
    setDateRange({ from: undefined, to: undefined });
    setStatusFilter("all");
    setMinPrice("");
    setMaxPrice("");
    setActiveFilters([]);
  };

  const removeFilter = (filter: string) => {
    if (filter.startsWith("Date range")) {
      setDateRange({ from: undefined, to: undefined });
    } else if (filter.startsWith("Status")) {
      setStatusFilter("all");
    } else if (filter.startsWith("Price")) {
      setMinPrice("");
      setMaxPrice("");
    }
  };

  return (
    <div className="space-y-4 relative z-10">
      {/* Date Range Picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Date Range</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRange.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                    {format(dateRange.to, "MMM dd, yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "MMM dd, yyyy")
                )
              ) : (
                "Select date range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="z-20">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="z-50">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 z-10"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="flex items-center">-</span>
          <input
            type="number"
            placeholder="Max"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 z-10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Active Filters</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs z-10"
              onClick={resetFilters}
            >
              Clear all
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="gap-1 z-10">
                {filter}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={() => removeFilter(filter)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {filter} filter</span>
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Apply Button */}
      <Button
        className="w-full relative z-10"
        onClick={() => onFilterChange(data)}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default OrderFilters;
