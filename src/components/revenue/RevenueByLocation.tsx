import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import SalesMapChart from "@/components/dashboard/SalesMapChart";

interface LocationData {
  name: string;
  value: number;
  coordinates: [number, number];
}

interface RevenueByLocationProps {
  data: LocationData[];
}

const RevenueByLocation: React.FC<RevenueByLocationProps> = ({ data }) => {
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
          <CardTitle className="terminal-text">Revenue by Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] flex flex-col">
            <div className="flex-1 mb-4">
              <SalesMapChart data={data} />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full backdrop-blur-sm bg-background/40 hover:bg-background/60 transition-all shadow-glow-sm hover:shadow-glow-md"
              >
                <MapPin className="mr-2 h-4 w-4" />
                View Full Map
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RevenueByLocation;
