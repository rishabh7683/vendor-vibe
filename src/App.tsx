
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Sales from "./pages/dashboard/Sales";
import Products from "./pages/dashboard/Products";
import Orders from "./pages/dashboard/Orders";
import Customers from "./pages/dashboard/Customers";
import Apps from "./pages/dashboard/Apps";
import Inventory from "./pages/dashboard/Inventory";
import Revenue from "./pages/dashboard/Revenue";
import Performance from "./pages/dashboard/Performance";
import Settings from "./pages/dashboard/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/sales" element={<Sales />} />
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/customers" element={<Customers />} />
          <Route path="/dashboard/apps" element={<Apps />} />
          <Route path="/dashboard/inventory" element={<Inventory />} />
          <Route path="/dashboard/revenue" element={<Revenue />} />
          <Route path="/dashboard/performance" element={<Performance />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
