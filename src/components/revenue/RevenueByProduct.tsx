import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Product {
  id: number;
  name: string;
  revenue: number;
  growth: number;
}

interface RevenueByProductProps {
  data: Product[];
}

const RevenueByProduct: React.FC<RevenueByProductProps> = ({ data }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      <Card className="matrix-flow shadow-glow-sm h-full">
        <CardHeader>
          <CardTitle className="terminal-text">
            Top Products by Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">#</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((product, index) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-background/20 transition-colors"
                >
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${product.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {product.growth >= 0 ? (
                        <>
                          <Badge
                            variant="outline"
                            className="bg-green-500/10 text-green-500 border-green-500/20"
                          >
                            +{product.growth}%
                          </Badge>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </>
                      ) : (
                        <>
                          <Badge
                            variant="outline"
                            className="bg-red-500/10 text-red-500 border-red-500/20"
                          >
                            {product.growth}%
                          </Badge>
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RevenueByProduct;
