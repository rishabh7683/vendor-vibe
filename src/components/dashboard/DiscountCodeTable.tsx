
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface DiscountCode {
  code: string;
  usageCount: number;
  avgDiscount: number;
  totalDiscount: number;
  revenueGenerated: number;
}

interface DiscountCodeTableProps {
  data: DiscountCode[];
}

const DiscountCodeTable: React.FC<DiscountCodeTableProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead className="text-right">Usage</TableHead>
          <TableHead className="text-right">Discount</TableHead>
          <TableHead className="text-right">Revenue</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.code} className="group">
            <TableCell>
              <Badge variant="outline" className="bg-background text-primary font-mono">
                {item.code}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{item.usageCount}</TableCell>
            <TableCell className="text-right">
              <div className="flex flex-col items-end">
                <span>${item.totalDiscount.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">Avg: ${item.avgDiscount}</span>
              </div>
            </TableCell>
            <TableCell className="text-right font-medium">
              ${item.revenueGenerated.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DiscountCodeTable;
