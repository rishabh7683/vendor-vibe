
import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerOverviewSection from "@/components/dashboard/CustomerOverviewSection";
import CustomerLifetimeValue from "@/components/dashboard/CustomerLifetimeValue";
import TopCustomersTable from "@/components/dashboard/TopCustomersTable";
import CustomerCohortAnalysis from "@/components/dashboard/CustomerCohortAnalysis";
import CustomerSegmentation from "@/components/dashboard/CustomerSegmentation";

const Customers = () => {
  return (
    <DashboardLayout>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight terminal-text">Customer Insights</h1>
            <p className="text-muted-foreground mt-1">
              Analyze customer behavior, segmentation, and lifetime value
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* New vs. Returning Customers */}
          <CustomerOverviewSection />
          
          {/* Customer Lifetime Value */}
          <CustomerLifetimeValue />
          
          {/* Top Customers Table */}
          <TopCustomersTable />
          
          {/* Customer Cohort Analysis */}
          <CustomerCohortAnalysis />
          
          {/* Customer Segmentation */}
          <CustomerSegmentation />
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Customers;
