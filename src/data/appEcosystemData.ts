
import { faker } from "@faker-js/faker";

export interface AppItem {
  id: string;
  name: string;
  category: "Marketing" | "Upsell" | "Loyalty" | "Shipping" | "Support" | "Utility";
  cost: number;
  revenue: number;
  roi: number;
  description: string;
  benefits: string[];
  monthlyCost: string;
  activeUsers?: number;
  timeInstalled?: string;
  savesHoursPerWeek?: number;
}

export const getAppCategories = () => {
  return [
    { name: "Marketing", count: 5, totalCost: 299 },
    { name: "Upsell", count: 3, totalCost: 149 },
    { name: "Loyalty", count: 2, totalCost: 99 },
    { name: "Shipping", count: 4, totalCost: 179 },
    { name: "Support", count: 3, totalCost: 129 },
    { name: "Utility", count: 6, totalCost: 199 }
  ];
};

export const getMarketingApps = (): AppItem[] => {
  return [
    {
      id: "email-marketing-1",
      name: "EmailFlow Pro",
      category: "Marketing",
      cost: 79.99,
      revenue: 1200,
      roi: 1400,
      description: "Automated email marketing platform",
      benefits: ["Increased open rates", "Automated sequences", "A/B testing"],
      monthlyCost: "$79.99",
      activeUsers: 3,
      timeInstalled: "9 months"
    },
    {
      id: "sms-marketing-1",
      name: "SMS Connect",
      category: "Marketing",
      cost: 59.99,
      revenue: 850,
      roi: 1317,
      description: "SMS marketing and notifications",
      benefits: ["High engagement", "Automated reminders", "Quick setup"],
      monthlyCost: "$59.99",
      activeUsers: 2,
      timeInstalled: "6 months"
    },
    {
      id: "social-ads-1",
      name: "Social Ad Manager",
      category: "Marketing",
      cost: 89.99,
      revenue: 980,
      roi: 989,
      description: "Social media ad campaign management",
      benefits: ["Cross-platform management", "Audience targeting", "Performance tracking"],
      monthlyCost: "$89.99",
      activeUsers: 4,
      timeInstalled: "12 months"
    },
    {
      id: "seo-tools-1",
      name: "SEO Optimizer",
      category: "Marketing",
      cost: 49.99,
      revenue: 320,
      roi: 540,
      description: "Search engine optimization tools",
      benefits: ["Keyword research", "On-page recommendations", "Competitor analysis"],
      monthlyCost: "$49.99",
      activeUsers: 2,
      timeInstalled: "8 months"
    },
    {
      id: "analytics-1",
      name: "Advanced Analytics",
      category: "Marketing",
      cost: 39.99,
      revenue: 190,
      roi: 375,
      description: "Comprehensive analytics dashboard",
      benefits: ["Customer journey tracking", "Conversion analytics", "Custom reports"],
      monthlyCost: "$39.99",
      activeUsers: 5,
      timeInstalled: "15 months"
    }
  ];
};

export const getUpsellApps = (): AppItem[] => {
  return [
    {
      id: "product-recs-1",
      name: "Smart Recommendations",
      category: "Upsell",
      cost: 59.99,
      revenue: 1350,
      roi: 2150,
      description: "AI-powered product recommendations",
      benefits: ["Personalized suggestions", "Basket analysis", "Conversion optimization"],
      monthlyCost: "$59.99",
      activeUsers: 1,
      timeInstalled: "11 months"
    },
    {
      id: "bundle-deals-1",
      name: "Bundle Builder",
      category: "Upsell",
      cost: 49.99,
      revenue: 890,
      roi: 1680,
      description: "Create and manage product bundles",
      benefits: ["Increased AOV", "Custom bundle creation", "Discount management"],
      monthlyCost: "$49.99",
      activeUsers: 2,
      timeInstalled: "7 months"
    },
    {
      id: "checkout-boost-1",
      name: "Checkout Booster",
      category: "Upsell",
      cost: 39.99,
      revenue: 430,
      roi: 975,
      description: "Checkout page upsell offers",
      benefits: ["Last-minute offers", "One-click add", "Smart timing"],
      monthlyCost: "$39.99",
      activeUsers: 1,
      timeInstalled: "5 months"
    }
  ];
};

export const getLoyaltyApps = (): AppItem[] => {
  return [
    {
      id: "loyalty-program-1",
      name: "Points & Rewards",
      category: "Loyalty",
      cost: 69.99,
      revenue: 980,
      roi: 1300,
      description: "Comprehensive loyalty program management",
      benefits: ["Point system", "Tiered rewards", "Member profiles"],
      monthlyCost: "$69.99",
      activeUsers: 3,
      timeInstalled: "14 months"
    },
    {
      id: "reviews-1",
      name: "Review Collector",
      category: "Loyalty",
      cost: 29.99,
      revenue: 320,
      roi: 967,
      description: "Automated review collection and display",
      benefits: ["Email follow-ups", "Photo reviews", "Review management"],
      monthlyCost: "$29.99",
      activeUsers: 2,
      timeInstalled: "8 months"
    }
  ];
};

export const getShippingApps = (): AppItem[] => {
  return [
    {
      id: "shipping-rates-1",
      name: "Dynamic Shipping",
      category: "Shipping",
      cost: 49.99,
      revenue: 310,
      roi: 520,
      description: "Real-time carrier rate calculator",
      benefits: ["Real-time rates", "Multiple carriers", "Rule-based discounts"],
      monthlyCost: "$49.99",
      activeUsers: 2,
      timeInstalled: "10 months"
    },
    {
      id: "tracking-1",
      name: "Order Tracker",
      category: "Shipping",
      cost: 39.99,
      revenue: 180,
      roi: 350,
      description: "Enhanced order tracking for customers",
      benefits: ["Branded tracking", "Notification system", "Delivery estimates"],
      monthlyCost: "$39.99",
      activeUsers: 1,
      timeInstalled: "6 months"
    },
    {
      id: "label-printer-1",
      name: "Label Printer Pro",
      category: "Shipping",
      cost: 59.99,
      revenue: 240,
      roi: 300,
      description: "Batch label printing and management",
      benefits: ["Bulk printing", "Label customization", "Carrier integration"],
      monthlyCost: "$59.99",
      activeUsers: 3,
      timeInstalled: "9 months"
    },
    {
      id: "returns-1",
      name: "Returns Manager",
      category: "Shipping",
      cost: 29.99,
      revenue: 120,
      roi: 300,
      description: "Streamlined returns processing",
      benefits: ["Self-service returns", "Return label generation", "Refund tracking"],
      monthlyCost: "$29.99",
      activeUsers: 2,
      timeInstalled: "4 months"
    }
  ];
};

export const getSupportApps = (): AppItem[] => {
  return [
    {
      id: "helpdesk-1",
      name: "Help Center Pro",
      category: "Support",
      cost: 69.99,
      revenue: 290,
      roi: 314,
      description: "Comprehensive customer support system",
      benefits: ["Ticket management", "Knowledge base", "Customer history"],
      monthlyCost: "$69.99",
      activeUsers: 4,
      timeInstalled: "12 months"
    },
    {
      id: "live-chat-1",
      name: "Live Chat Connect",
      category: "Support",
      cost: 39.99,
      revenue: 210,
      roi: 425,
      description: "Real-time customer chat platform",
      benefits: ["Instant support", "Chatbot integration", "Mobile app"],
      monthlyCost: "$39.99",
      activeUsers: 3,
      timeInstalled: "8 months"
    },
    {
      id: "faq-builder-1",
      name: "FAQ Builder",
      category: "Support",
      cost: 19.99,
      revenue: 85,
      roi: 325,
      description: "Create and manage FAQs",
      benefits: ["SEO optimization", "Search functionality", "Easy updates"],
      monthlyCost: "$19.99",
      activeUsers: 1,
      timeInstalled: "5 months"
    }
  ];
};

export const getUtilityApps = (): AppItem[] => {
  return [
    {
      id: "inventory-1",
      name: "Inventory Manager",
      category: "Utility",
      cost: 49.99,
      revenue: 0,
      roi: 0,
      description: "Advanced inventory control",
      benefits: ["Stock alerts", "Forecasting", "Supplier management"],
      monthlyCost: "$49.99",
      savesHoursPerWeek: 8,
      activeUsers: 3,
      timeInstalled: "11 months"
    },
    {
      id: "tax-calc-1",
      name: "Tax Calculator",
      category: "Utility",
      cost: 29.99,
      revenue: 0,
      roi: 0,
      description: "Automated tax calculation",
      benefits: ["Multi-jurisdiction", "Real-time updates", "Report generation"],
      monthlyCost: "$29.99",
      savesHoursPerWeek: 4,
      activeUsers: 2,
      timeInstalled: "9 months"
    },
    {
      id: "backup-1",
      name: "Store Backup",
      category: "Utility",
      cost: 19.99,
      revenue: 0,
      roi: 0,
      description: "Automated store backups",
      benefits: ["Daily backups", "One-click restore", "Secure storage"],
      monthlyCost: "$19.99",
      savesHoursPerWeek: 2,
      activeUsers: 1,
      timeInstalled: "14 months"
    },
    {
      id: "translation-1",
      name: "Store Translator",
      category: "Utility",
      cost: 39.99,
      revenue: 0,
      roi: 0,
      description: "Automatic store translation",
      benefits: ["50+ languages", "SEO optimization", "Content detection"],
      monthlyCost: "$39.99",
      savesHoursPerWeek: 5,
      activeUsers: 2,
      timeInstalled: "7 months"
    },
    {
      id: "bulk-editor-1",
      name: "Bulk Editor Pro",
      category: "Utility",
      cost: 29.99,
      revenue: 0,
      roi: 0,
      description: "Mass update product details",
      benefits: ["CSV import/export", "Field mapping", "Scheduling"],
      monthlyCost: "$29.99",
      savesHoursPerWeek: 6,
      activeUsers: 2,
      timeInstalled: "5 months"
    },
    {
      id: "seo-redirect-1",
      name: "SEO Redirects",
      category: "Utility",
      cost: 19.99,
      revenue: 0,
      roi: 0,
      description: "Manage store redirects",
      benefits: ["404 monitoring", "Bulk creation", "Analytics integration"],
      monthlyCost: "$19.99",
      savesHoursPerWeek: 3,
      activeUsers: 1,
      timeInstalled: "8 months"
    }
  ];
};

export const getAllApps = (): AppItem[] => {
  return [
    ...getMarketingApps(),
    ...getUpsellApps(),
    ...getLoyaltyApps(),
    ...getShippingApps(),
    ...getSupportApps(),
    ...getUtilityApps()
  ];
};

export const getTopPerformingApps = (): AppItem[] => {
  return getAllApps()
    .filter(app => app.roi > 0)
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 5);
};

export const getLowPerformingApps = (): AppItem[] => {
  return getAllApps()
    .filter(app => app.roi > 0)
    .sort((a, b) => a.roi - b.roi)
    .slice(0, 5);
};

export const getAppCategoryROI = () => {
  const apps = getAllApps();
  const categories = ["Marketing", "Upsell", "Loyalty", "Shipping", "Support"];
  
  return categories.map(category => {
    const categoryApps = apps.filter(app => app.category === category);
    const totalCost = categoryApps.reduce((sum, app) => sum + app.cost, 0);
    const totalRevenue = categoryApps.reduce((sum, app) => sum + app.revenue, 0);
    const roi = totalCost > 0 ? Math.round((totalRevenue - totalCost) / totalCost * 100) : 0;
    
    return {
      name: category,
      cost: totalCost,
      revenue: totalRevenue,
      roi: roi
    };
  });
};

export const getUtilityAppSavings = () => {
  const utilityApps = getUtilityApps();
  
  return utilityApps.map(app => ({
    name: app.name,
    hoursPerWeek: app.savesHoursPerWeek || 0,
    monthlyCost: app.cost,
    hourlyValue: 25, // Assumed hourly value of time saved
    monthlySavings: (app.savesHoursPerWeek || 0) * 25 * 4, // 4 weeks per month
    roi: Math.round(((app.savesHoursPerWeek || 0) * 25 * 4 - app.cost) / app.cost * 100)
  }));
};
