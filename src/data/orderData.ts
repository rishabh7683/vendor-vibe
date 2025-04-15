import { faker } from "@faker-js/faker";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  date: string;
  customer: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  shippingAddress: string;
  trackingNumber?: string;
}

// Generate realistic customer data
const generateCustomer = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    avatar: faker.image.avatar(),
  };
};

// Generate product data
const generateProduct = () => {
  const price = parseFloat(faker.commerce.price({ min: 10, max: 500 }));
  const quantity = faker.number.int({ min: 1, max: 5 });

  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: price,
    quantity: quantity,
  };
};

// Generate order status with weighted distribution
const generateStatus = (): OrderStatus => {
  const statuses: OrderStatus[] = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  const weights = [0.15, 0.25, 0.2, 0.3, 0.1]; // 15% pending, 25% processing, etc.

  const random = Math.random();
  let sum = 0;

  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random < sum) return statuses[i];
  }

  return "processing";
};

// Generate a tracking number for shipped/delivered orders
const generateTrackingNumber = (status: OrderStatus) => {
  if (status === "shipped" || status === "delivered") {
    return `TRK${faker.string.alphanumeric(10).toUpperCase()}`;
  }
  return undefined;
};

// Generate payment method
const generatePaymentMethod = () => {
  const methods = [
    "Credit Card",
    "PayPal",
    "Apple Pay",
    "Google Pay",
    "Bank Transfer",
  ];
  return methods[Math.floor(Math.random() * methods.length)];
};

// Generate random date within last 30 days
const generateDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - faker.number.int({ min: 0, max: 30 }));
  return date.toISOString();
};

// Generate orders
export const generateOrders = (count: number): Order[] => {
  const orders: Order[] = [];

  for (let i = 0; i < count; i++) {
    const customer = generateCustomer();
    const product = generateProduct();
    const status = generateStatus();
    const total = parseFloat((product.price * product.quantity).toFixed(2));

    orders.push({
      id: `ORD-${faker.string.alphanumeric(6).toUpperCase()}`,
      date: generateDate(),
      customer,
      product,
      total,
      status,
      paymentMethod: generatePaymentMethod(),
      shippingAddress: faker.location.streetAddress({ useFullAddress: true }),
      trackingNumber: generateTrackingNumber(status),
    });
  }

  // Sort by date (newest first)
  return orders.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// Generate 100 orders
export const orderData: Order[] = generateOrders(100);

// Get order counts by day (last 7 days)
export const getOrderCountsByDay = () => {
  const days = 7;
  const result = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const dayOrders = orderData.filter((order) => {
      const orderDate = new Date(order.date);
      return orderDate >= date && orderDate < nextDate;
    });

    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

    result.unshift({
      day: dayName,
      total: dayOrders.length,
      delivered: dayOrders.filter((order) => order.status === "delivered")
        .length,
      processing: dayOrders.filter((order) => order.status === "processing")
        .length,
      cancelled: dayOrders.filter((order) => order.status === "cancelled")
        .length,
    });
  }

  return result;
};

// Get orders by status percentages
export const getOrderStatusDistribution = () => {
  const statusCounts = {
    pending: orderData.filter((order) => order.status === "pending").length,
    processing: orderData.filter((order) => order.status === "processing")
      .length,
    shipped: orderData.filter((order) => order.status === "shipped").length,
    delivered: orderData.filter((order) => order.status === "delivered").length,
    cancelled: orderData.filter((order) => order.status === "cancelled").length,
  };

  const total = orderData.length;

  return [
    {
      name: "Pending",
      value: statusCounts.pending,
      percent: Math.round((statusCounts.pending / total) * 100),
    },
    {
      name: "Processing",
      value: statusCounts.processing,
      percent: Math.round((statusCounts.processing / total) * 100),
    },
    {
      name: "Shipped",
      value: statusCounts.shipped,
      percent: Math.round((statusCounts.shipped / total) * 100),
    },
    {
      name: "Delivered",
      value: statusCounts.delivered,
      percent: Math.round((statusCounts.delivered / total) * 100),
    },
    {
      name: "Cancelled",
      value: statusCounts.cancelled,
      percent: Math.round((statusCounts.cancelled / total) * 100),
    },
  ];
};
