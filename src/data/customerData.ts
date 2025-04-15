
import { faker } from "@faker-js/faker";

// Customer type definition
export interface CustomerItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSpent: number;
  orders: number;
  tier: "New" | "Regular" | "VIP";
  lastOrder: string;
  firstPurchaseDate: string;
  location: string;
}

// Generate realistic customer data
const generateCustomers = (count: number): CustomerItem[] => {
  const customers: CustomerItem[] = [];
  const tiers: ("New" | "Regular" | "VIP")[] = ["New", "Regular", "VIP"];
  const tierWeights = [0.3, 0.5, 0.2]; // 30% New, 50% Regular, 20% VIP
  
  const locations = [
    "North America", 
    "Europe", 
    "Asia", 
    "South America", 
    "Australia", 
    "Africa"
  ];
  
  const locationWeights = [0.35, 0.25, 0.2, 0.1, 0.05, 0.05];

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    // Determine tier based on weighted distribution
    const tierRandom = Math.random();
    let tierIndex = 0;
    let tierSum = 0;
    
    for (let j = 0; j < tierWeights.length; j++) {
      tierSum += tierWeights[j];
      if (tierRandom < tierSum) {
        tierIndex = j;
        break;
      }
    }
    
    // Determine location based on weighted distribution
    const locationRandom = Math.random();
    let locationIndex = 0;
    let locationSum = 0;
    
    for (let j = 0; j < locationWeights.length; j++) {
      locationSum += locationWeights[j];
      if (locationRandom < locationSum) {
        locationIndex = j;
        break;
      }
    }
    
    // Generate realistic order counts and spending based on tier
    let orders = 0;
    let totalSpent = 0;
    
    if (tiers[tierIndex] === "New") {
      orders = faker.number.int({ min: 1, max: 3 });
      totalSpent = faker.number.int({ min: 50, max: 300 });
    } else if (tiers[tierIndex] === "Regular") {
      orders = faker.number.int({ min: 4, max: 10 });
      totalSpent = faker.number.int({ min: 300, max: 1000 });
    } else {
      orders = faker.number.int({ min: 11, max: 30 });
      totalSpent = faker.number.int({ min: 1000, max: 5000 });
    }
    
    // Generate date within the last year
    const lastOrderDate = faker.date.recent({ days: 30 });
    const firstPurchaseDate = faker.date.past({ years: 2, refDate: lastOrderDate });
    
    customers.push({
      id: faker.string.uuid(),
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      avatar: faker.image.avatar(),
      totalSpent,
      orders,
      tier: tiers[tierIndex],
      lastOrder: lastOrderDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      firstPurchaseDate: firstPurchaseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      location: locations[locationIndex]
    });
  }
  
  return customers;
};

// Generate 100 sample customers
export const customerData: CustomerItem[] = generateCustomers(100);

// Get top customers by total spending
export const getTopCustomersBySpending = () => {
  return [...customerData]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 10);
};

// Get top customers by order count
export const getTopCustomersByOrders = () => {
  return [...customerData]
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 10);
};

// Get data for new vs returning customer comparison
export const getUserTypeData = () => {
  const newCustomers = customerData.filter(c => c.tier === "New").length;
  const returningCustomers = customerData.length - newCustomers;
  
  return [
    { name: "New", value: newCustomers, percentage: Math.round((newCustomers / customerData.length) * 100) },
    { name: "Returning", value: returningCustomers, percentage: Math.round((returningCustomers / customerData.length) * 100) }
  ];
};

// Get revenue by new vs returning customers
export const getUserTypeRevenue = () => {
  const newCustomers = customerData.filter(c => c.tier === "New");
  const returningCustomers = customerData.filter(c => c.tier !== "New");
  
  const newRevenue = newCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const returningRevenue = returningCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  
  return [
    { name: "New", value: newRevenue },
    { name: "Returning", value: returningRevenue }
  ];
};

// Get average order value (AOV) by user type
export const getUserTypeAOV = () => {
  const newCustomers = customerData.filter(c => c.tier === "New");
  const returningCustomers = customerData.filter(c => c.tier !== "New");
  
  const newRevenue = newCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const newOrders = newCustomers.reduce((sum, customer) => sum + customer.orders, 0);
  
  const returningRevenue = returningCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const returningOrders = returningCustomers.reduce((sum, customer) => sum + customer.orders, 0);
  
  const newAOV = newOrders > 0 ? newRevenue / newOrders : 0;
  const returningAOV = returningOrders > 0 ? returningRevenue / returningOrders : 0;
  
  return [
    { name: "New", value: Math.round(newAOV) },
    { name: "Returning", value: Math.round(returningAOV) }
  ];
};

// Get Customer Lifetime Value (CLV) trend data by quarter
export const getCLVTrendData = () => {
  const quarters = [
    "Q1 2022",
    "Q2 2022",
    "Q3 2022",
    "Q4 2022",
    "Q1 2023",
    "Q2 2023",
    "Q3 2023",
    "Q4 2023"
  ];
  
  // Generate realistic CLV trend with slight growth
  let baseCLV = 350;
  
  return quarters.map(quarter => {
    // Add some variance but with an upward trend
    const variance = faker.number.int({ min: -30, max: 50 });
    baseCLV += variance;
    
    return {
      quarter,
      value: baseCLV
    };
  });
};

// Get CLV distribution data - showing how many customers fall into different CLV ranges
export const getCLVDistributionData = () => {
  const ranges = [
    "$0-$100",
    "$101-$250",
    "$251-$500", 
    "$501-$1000",
    "$1001-$2000",
    "$2000+"
  ];
  
  // Create a realistic distribution
  return [
    { range: ranges[0], value: 18 },
    { range: ranges[1], value: 26 },
    { range: ranges[2], value: 23 },
    { range: ranges[3], value: 16 },
    { range: ranges[4], value: 12 },
    { range: ranges[5], value: 5 }
  ];
};

// Get customer cohort retention data
export const getCohortRetentionData = () => {
  const months = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"];
  
  // Generate cohort data with realistic retention drop-off patterns
  const cohorts = [
    {
      date: "Jan 2023",
      customers: 145,
      retention: [100, 65, 48, 42, 38, 35]
    },
    {
      date: "Feb 2023",
      customers: 162,
      retention: [100, 68, 50, 43, 40, 0]
    },
    {
      date: "Mar 2023",
      customers: 138,
      retention: [100, 62, 46, 40, 0, 0]
    },
    {
      date: "Apr 2023",
      customers: 156,
      retention: [100, 70, 52, 0, 0, 0]
    },
    {
      date: "May 2023",
      customers: 170,
      retention: [100, 64, 0, 0, 0, 0]
    },
    {
      date: "Jun 2023",
      customers: 182,
      retention: [100, 0, 0, 0, 0, 0]
    }
  ];
  
  return { cohorts, months };
};

// Get customer segmentation by location
export const getCustomersByLocation = () => {
  const locationCount = new Map<string, number>();
  
  customerData.forEach(customer => {
    const count = locationCount.get(customer.location) || 0;
    locationCount.set(customer.location, count + 1);
  });
  
  const result = Array.from(locationCount.entries()).map(([name, value]) => ({
    name,
    value,
    percentage: Math.round((value / customerData.length) * 100)
  }));
  
  return result;
};

// Get customer segmentation by spending bracket
export const getCustomersBySpendBracket = () => {
  const brackets = [
    { name: "$0-$100", min: 0, max: 100 },
    { name: "$101-$500", min: 101, max: 500 },
    { name: "$501-$1000", min: 501, max: 1000 },
    { name: "$1001-$2000", min: 1001, max: 2000 },
    { name: "$2000+", min: 2001, max: Infinity }
  ];
  
  const result = brackets.map(bracket => {
    const count = customerData.filter(c => 
      c.totalSpent >= bracket.min && c.totalSpent <= bracket.max
    ).length;
    
    return {
      name: bracket.name,
      value: count,
      percentage: Math.round((count / customerData.length) * 100)
    };
  });
  
  return result;
};

// Get customer segmentation by purchase frequency
export const getCustomersByPurchaseFrequency = () => {
  return [
    { name: "One-time", value: customerData.filter(c => c.orders === 1).length },
    { name: "Occasional (2-3)", value: customerData.filter(c => c.orders >= 2 && c.orders <= 3).length },
    { name: "Regular (4-6)", value: customerData.filter(c => c.orders >= 4 && c.orders <= 6).length },
    { name: "Frequent (7-12)", value: customerData.filter(c => c.orders >= 7 && c.orders <= 12).length },
    { name: "Power (13+)", value: customerData.filter(c => c.orders >= 13).length }
  ];
};
