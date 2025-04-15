import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { salesData, productCategoryData } from "@/data/dashboardData";
import { getSalesByLocation } from "@/data/salesAnalyticsData";

// Import our new modular components
import RevenueHeader from "@/components/revenue/RevenueHeader";
import RevenueSummaryCards from "@/components/revenue/RevenueSummaryCards";
import RevenueTrends from "@/components/revenue/RevenueTrends";
import RevenueByCategory from "@/components/revenue/RevenueByCategory";
import RevenueByProduct from "@/components/revenue/RevenueByProduct";
import RevenueByLocation from "@/components/revenue/RevenueByLocation";
import RevenueForecast from "@/components/revenue/RevenueForecast";
import SubscriptionMetrics from "@/components/revenue/SubscriptionMetrics";
import RevenueByMarketing from "@/components/revenue/RevenueByMarketing";
import CustomerSegment from "@/components/revenue/CustomerSegment";
import SubscriptionVsOneTime from "@/components/revenue/SubscriptionVsOneTime";
import TaxFeeBreakdown from "@/components/revenue/TaxFeeBreakdown";

// Sample data for dashboard charts
const revenueGrowthData = [
  { name: "Jan", thisYear: 4200, lastYear: 3400 },
  { name: "Feb", thisYear: 3600, lastYear: 2800 },
  { name: "Mar", thisYear: 2400, lastYear: 2000 },
  { name: "Apr", thisYear: 3200, lastYear: 2600 },
  { name: "May", thisYear: 2200, lastYear: 1800 },
  { name: "Jun", thisYear: 2800, lastYear: 2200 },
  { name: "Jul", thisYear: 4000, lastYear: 3200 },
  { name: "Aug", thisYear: 4600, lastYear: 3700 },
  { name: "Sep", thisYear: 5400, lastYear: 4100 },
  { name: "Oct", thisYear: 6500, lastYear: 5000 },
  { name: "Nov", thisYear: 7600, lastYear: 5700 },
  { name: "Dec", thisYear: 9800, lastYear: 7400 },
];

const profitMarginData = [
  { name: "Jan", margin: 28 },
  { name: "Feb", margin: 32 },
  { name: "Mar", margin: 30 },
  { name: "Apr", margin: 34 },
  { name: "May", margin: 32 },
  { name: "Jun", margin: 35 },
  { name: "Jul", margin: 38 },
  { name: "Aug", margin: 36 },
  { name: "Sep", margin: 40 },
  { name: "Oct", margin: 38 },
  { name: "Nov", margin: 42 },
  { name: "Dec", margin: 44 },
];

const forecastData = [
  { name: "Jan", actual: 4200, forecast: 4200 },
  { name: "Feb", actual: 3600, forecast: 3600 },
  { name: "Mar", actual: 2400, forecast: 2400 },
  { name: "Apr", actual: 3200, forecast: 3200 },
  { name: "May", actual: 2200, forecast: 2200 },
  { name: "Jun", actual: 2800, forecast: 2800 },
  { name: "Jul", actual: 4000, forecast: 4000 },
  { name: "Aug", actual: 4600, forecast: 4600 },
  { name: "Sep", actual: null, forecast: 5200 },
  { name: "Oct", actual: null, forecast: 5800 },
  { name: "Nov", actual: null, forecast: 6500 },
  { name: "Dec", actual: null, forecast: 7200 },
];

const topProducts = [
  { id: 1, name: "Premium Subscription", revenue: 124500, growth: 12.5 },
  { id: 2, name: "Pro Plan Annual", revenue: 98700, growth: 8.3 },
  { id: 3, name: "Enterprise Solution", revenue: 87600, growth: 15.2 },
  { id: 4, name: "Basic Plan", revenue: 54300, growth: -2.1 },
  { id: 5, name: "Add-on Services", revenue: 43200, growth: 5.7 },
];

const customerSegmentData = [
  { name: "Enterprise", value: 4500 },
  { name: "SMB", value: 3200 },
  { name: "Startup", value: 1800 },
  { name: "Individual", value: 1200 },
  { name: "Education", value: 800 },
];

const marketingChannelData = [
  { name: "Direct", value: 2800 },
  { name: "Organic Search", value: 1900 },
  { name: "Paid Search", value: 1600 },
  { name: "Social Media", value: 1200 },
  { name: "Email", value: 900 },
  { name: "Referral", value: 750 },
];

const subscriptionVsOneTimeData = [
  { name: "Subscription", value: 7500 },
  { name: "One-time", value: 2500 },
];

const arpuData = [
  { name: "Jan", value: 42 },
  { name: "Feb", value: 43 },
  { name: "Mar", value: 45 },
  { name: "Apr", value: 44 },
  { name: "May", value: 46 },
  { name: "Jun", value: 48 },
  { name: "Jul", value: 52 },
  { name: "Aug", value: 55 },
  { name: "Sep", value: 58 },
  { name: "Oct", value: 60 },
  { name: "Nov", value: 63 },
  { name: "Dec", value: 65 },
];

const mrrData = [
  { name: "Jan", value: 85000 },
  { name: "Feb", value: 87500 },
  { name: "Mar", value: 91000 },
  { name: "Apr", value: 94500 },
  { name: "May", value: 98000 },
  { name: "Jun", value: 103000 },
  { name: "Jul", value: 108000 },
  { name: "Aug", value: 114000 },
  { name: "Sep", value: 120000 },
  { name: "Oct", value: 127000 },
  { name: "Nov", value: 135000 },
  { name: "Dec", value: 145000 },
];

const retentionData = [
  { name: "Jan", retained: 95, churned: 5 },
  { name: "Feb", retained: 93, churned: 7 },
  { name: "Mar", retained: 94, churned: 6 },
  { name: "Apr", retained: 92, churned: 8 },
  { name: "May", retained: 91, churned: 9 },
  { name: "Jun", retained: 93, churned: 7 },
  { name: "Jul", retained: 95, churned: 5 },
  { name: "Aug", retained: 96, churned: 4 },
  { name: "Sep", retained: 94, churned: 6 },
  { name: "Oct", retained: 95, churned: 5 },
  { name: "Nov", retained: 97, churned: 3 },
  { name: "Dec", retained: 96, churned: 4 },
];

// Tax and Fee data
const taxFeeData = [
  {
    name: "Q1",
    tax: 2100,
    shippingFees: 1200,
    platformFees: 800,
    processingFees: 600,
  },
  {
    name: "Q2",
    tax: 2400,
    shippingFees: 1400,
    platformFees: 900,
    processingFees: 700,
  },
  {
    name: "Q3",
    tax: 2800,
    shippingFees: 1700,
    platformFees: 1100,
    processingFees: 850,
  },
  {
    name: "Q4",
    tax: 3500,
    shippingFees: 2200,
    platformFees: 1450,
    processingFees: 1050,
  },
];

// Color schemes
const COLORS = [
  "#10b981",
  "#0ea5e9",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
  "#f59e0b",
  "#6366f1",
];

const Revenue = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  const salesByLocation = getSalesByLocation();

  // Calculate summary metrics
  const totalRevenue = revenueGrowthData.reduce(
    (sum, item) => sum + item.thisYear,
    0
  );
  const revenueGrowth = 12.4; // Example growth rate
  const averageOrderValue = 89.75;
  const aovGrowth = 3.2;
  const customers = 12450;
  const customerGrowth = 8.7;
  const orders = 24680;
  const orderGrowth = 5.3;

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <DashboardLayout>
      <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header with title and timeframe selector */}
        <RevenueHeader timeframe={timeframe} setTimeframe={setTimeframe} />

        {/* Summary metrics cards */}
        <RevenueSummaryCards
          data={{
            totalRevenue,
            revenueGrowth,
            averageOrderValue,
            aovGrowth,
            customers,
            customerGrowth,
            orders,
            orderGrowth,
          }}
        />

        {/* Revenue trends chart */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full lg:col-span-2">
            <RevenueTrends data={revenueGrowthData} timeframe={timeframe} />
          </div>
          <div className="lg:col-span-1">
            <RevenueForecast data={forecastData} />
          </div>
        </div>

        {/* Revenue breakdowns */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RevenueByCategory data={customerSegmentData} colors={COLORS} />
          <RevenueByLocation data={salesByLocation} />
          <RevenueByProduct data={topProducts} />
        </div>

        {/* Marketing & Customer Segments */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RevenueByMarketing data={marketingChannelData} colors={COLORS} />
          <CustomerSegment data={customerSegmentData} />
          <SubscriptionVsOneTime data={subscriptionVsOneTimeData} />
        </div>

        {/* Tax & Fee Breakdown */}
        <div className="grid gap-6">
          <TaxFeeBreakdown data={taxFeeData} />
        </div>

        {/* Subscription metrics */}
        <div className="grid gap-6">
          <SubscriptionMetrics
            mrrData={mrrData}
            arpuData={arpuData}
            retentionData={retentionData}
          />
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Revenue;
