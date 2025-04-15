import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  getTopCustomersBySpending,
  getTopCustomersByOrders,
  CustomerItem,
} from "@/data/customerData";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CustomerTableRow = ({
  customer,
  showOrders = false,
}: {
  customer: CustomerItem;
  showOrders?: boolean;
}) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <img src={customer.avatar} alt={customer.name} />
          </Avatar>
          <div>
            <div className="font-medium">{customer.name}</div>
            <div className="text-xs text-muted-foreground">
              {customer.email}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        {showOrders ? (
          <div className="font-mono font-medium tabular-nums">
            {customer.orders}
          </div>
        ) : (
          <div className="font-mono font-medium tabular-nums">
            {formatCurrency(customer.totalSpent)}
          </div>
        )}
      </TableCell>
      <TableCell>
        <Badge
          variant={
            customer.tier === "VIP"
              ? "default"
              : customer.tier === "Regular"
              ? "secondary"
              : "outline"
          }
        >
          {customer.tier}
        </Badge>
      </TableCell>
      <TableCell className="text-right text-muted-foreground">
        <div className="text-sm">Last order: {customer.lastOrder}</div>
      </TableCell>
    </TableRow>
  );
};

const TopCustomersTable: React.FC = () => {
  const topSpendingCustomers = getTopCustomersBySpending();
  const topOrderCustomers = getTopCustomersByOrders();

  return (
    <Card className="col-span-12 matrix-flow shadow-glow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold terminal-text">
          Top Customers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="spending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 backdrop-blur-md bg-background/30 rounded-xl mb-4">
            <TabsTrigger
              value="spending"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              By Total Spending
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              By Order Count
            </TabsTrigger>
          </TabsList>
          <TabsContent value="spending">
            <div className="bg-gradient-to-b from-[#8b5cf6]/10 to-[#8b5cf6]/5 border border-border/50 rounded-lg p-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30">
                    <TableHead>Customer</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead className="text-right">Last Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSpendingCustomers.map((customer) => (
                    <CustomerTableRow key={customer.id} customer={customer} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="orders">
            <div className="bg-gradient-to-b from-[#0ea5e9]/10 to-[#0ea5e9]/5 border border-border/50 rounded-lg p-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30">
                    <TableHead>Customer</TableHead>
                    <TableHead>Total Orders</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead className="text-right">Last Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topOrderCustomers.map((customer) => (
                    <CustomerTableRow
                      key={customer.id}
                      customer={customer}
                      showOrders={true}
                    />
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

export default TopCustomersTable;
