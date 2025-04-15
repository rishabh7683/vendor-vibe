
import { faker } from "@faker-js/faker";

export interface LocationData {
  name: string;
  value: number;
  coordinates: [number, number];
}

// Sales by Channel data
export const getSalesByChannel = () => {
  return [
    { name: "Online Store", value: 68500, icon: "globe", percent: 52 },
    { name: "POS", value: 42300, icon: "store", percent: 32 },
    { name: "Social", value: 21200, icon: "smartphone", percent: 16 },
  ];
};

// Sales by Location data
export const getSalesByLocation = (): LocationData[] => {
  const locations: LocationData[] = [
    {
      name: "New York",
      value: faker.number.int({ min: 8000, max: 35000 }),
      coordinates: [
        faker.location.longitude({ max: -60, min: -125 }),
        faker.location.latitude({ max: 50, min: 25 }),
      ],
    },
    {
      name: "Los Angeles",
      value: faker.number.int({ min: 8000, max: 35000 }),
      coordinates: [
        faker.location.longitude({ max: -60, min: -125 }),
        faker.location.latitude({ max: 50, min: 25 }),
      ],
    },
    {
      name: "Chicago",
      value: faker.number.int({ min: 8000, max: 35000 }),
      coordinates: [
        faker.location.longitude({ max: -60, min: -125 }),
        faker.location.latitude({ max: 50, min: 25 }),
      ],
    },
    {
      name: "Seattle",
      value: faker.number.int({ min: 8000, max: 35000 }),
      coordinates: [
        faker.location.longitude({ max: -60, min: -125 }),
        faker.location.latitude({ max: 50, min: 25 }),
      ],
    },
  ];

  // Return the locations directly instead of incorrectly mapping them
  return locations;
};

// Sales by Device data
export const getSalesByDevice = () => {
  return [
    { name: "Desktop", value: 83700, percent: 63 },
    { name: "Mobile", value: 39500, percent: 30 },
    { name: "Tablet", value: 8800, percent: 7 },
  ];
};

// Peak Sales Times data (heatmap)
export const getPeakSalesTimes = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const data = [];

  days.forEach((day) => {
    hours.forEach((hour) => {
      const value = faker.number.int({
        min: hour >= 9 && hour <= 20 ? 30 : 5,
        max: hour >= 9 && hour <= 20 ? 100 : 30,
      });

      // Add higher values during lunch hours and after work
      const boost =
        (hour >= 12 && hour <= 13) || (hour >= 17 && hour <= 19) ? 1.5 : 1;
      // Weekend boost
      const weekendBoost =
        (day === "Saturday" || day === "Sunday") && hour >= 11 && hour <= 16
          ? 1.3
          : 1;

      data.push({
        day,
        hour: `${hour}:00`,
        value: Math.round(value * boost * weekendBoost),
        hourNum: hour,
      });
    });
  });

  return data;
};

// Discount Code Performance data
export const getDiscountCodePerformance = () => {
  const generateDiscountCode = () => {
    const prefixes = [
      "SAVE",
      "SUMMER",
      "SPECIAL",
      "NEW",
      "WELCOME",
      "FLASH",
      "HOLIDAY",
    ];
    const numbers = faker.string.numeric(2);
    return `${faker.helpers.arrayElement(prefixes)}${numbers}`;
  };

  return Array.from({ length: 10 }, () => {
    const usageCount = faker.number.int({ min: 30, max: 500 });
    const avgDiscount = faker.number.int({ min: 10, max: 30 });
    const totalDiscount = usageCount * avgDiscount;
    const revenueGenerated =
      usageCount * faker.number.int({ min: 50, max: 150 });

    return {
      code: generateDiscountCode(),
      usageCount,
      avgDiscount,
      totalDiscount,
      revenueGenerated,
    };
  }).sort((a, b) => b.revenueGenerated - a.revenueGenerated);
};

// Average Order Value data
export const getAOVData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months.map((month) => ({
    name: month,
    value: faker.number.float({ min: 80, max: 120, precision: 0.01 }),
  }));
};

// Order Status Overview data
export const getOrderStatusData = () => {
  const fulfilled = faker.number.int({ min: 1200, max: 1800 });
  const partial = faker.number.int({ min: 300, max: 500 });
  const unfulfilled = faker.number.int({ min: 400, max: 800 });

  const avgOrderValue = faker.number.float({
    min: 70,
    max: 90,
    precision: 0.01,
  });

  return [
    {
      name: "Fulfilled",
      count: fulfilled,
      value: Math.round(fulfilled * avgOrderValue),
    },
    {
      name: "Partially Fulfilled",
      count: partial,
      value: Math.round(partial * avgOrderValue * 1.2), // Higher value orders tend to be partially fulfilled
    },
    {
      name: "Unfulfilled",
      count: unfulfilled,
      value: Math.round(unfulfilled * avgOrderValue * 0.9), // Lower value orders might be waiting
    },
  ];
};

// Abandoned Checkouts data
export const getAbandonedCheckouts = () => {
  const totalCheckouts = faker.number.int({ min: 3000, max: 4000 });
  const abandonedCount = faker.number.int({ min: 600, max: 1200 });
  const rate = Math.round((abandonedCount / totalCheckouts) * 100);

  const avgValue = faker.number.float({ min: 60, max: 90, precision: 0.01 });
  const totalValue = Math.round(abandonedCount * avgValue);

  const recoveredPercent = faker.number.int({ min: 15, max: 30 });
  const recoveredValue = Math.round(totalValue * (recoveredPercent / 100));

  return {
    totalCheckouts,
    abandonedCount,
    rate,
    value: totalValue,
    recovered: recoveredValue,
    recoveryRate: recoveredPercent,
    potentialLost: totalValue - recoveredValue,
  };
};
