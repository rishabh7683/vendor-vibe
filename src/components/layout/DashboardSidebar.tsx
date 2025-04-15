import {
  BarChart3,
  ShoppingCart,
  Users,
  Home,
  CircleDollarSign,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardSidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

const DashboardSidebar = ({
  collapsed,
  setCollapsed,
}: DashboardSidebarProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const mainLinks = [
    {
      href: "/",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/dashboard/sales",
      label: "Sales",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      href: "/dashboard/orders",
      label: "Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      href: "/dashboard/customers",
      label: "Customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/dashboard/revenue",
      label: "Revenue",
      icon: <CircleDollarSign className="h-5 w-5" />,
    },
  ];

  const settingsLinks = [
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  // Check if a link is active
  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <>
      {/* Mobile toggle button - only visible on mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-40 flex items-center justify-center md:hidden hover:bg-accent shadow-sm rounded-md bg-background/80 backdrop-blur-sm border border-border/50"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </Button>

      {/* Mobile overlay with animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar with animation */}
      <motion.div
        className={cn(
          "flex flex-col fixed md:sticky top-0 h-screen z-40 overflow-hidden",
          "bg-white shadow-lg border-r border-gray-100",
          collapsed ? "w-[70px]" : "w-[240px]"
        )}
        initial={isMobile ? { x: "-100%" } : false}
        animate={{
          x: mobileOpen || !isMobile ? 0 : "-100%",
          width: collapsed ? 70 : 240,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      >
        {/* Logo area with gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 flex items-center justify-between h-16 px-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            {!collapsed && (
              <span className="whitespace-nowrap overflow-hidden font-bold text-2xl text-white">
                VendorVibe
              </span>
            )}
            {collapsed && (
              <span className="text-2xl font-bold text-white">VV</span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col justify-between h-[calc(100vh-4rem)] py-6 scrollbar-thin">
          <div className="space-y-4">
            <ul className="space-y-1 px-2">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200",
                      isActive(link.href)
                        ? "bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 font-medium border-l-4 border-indigo-500"
                        : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-50",
                      collapsed && "justify-center px-0"
                    )}
                    onClick={() => {
                      if (mobileOpen) setMobileOpen(false);
                    }}
                  >
                    <div
                      className={cn(
                        "flex items-center",
                        isActive(link.href)
                          ? "text-indigo-600"
                          : "text-gray-500",
                        collapsed && "justify-center w-full"
                      )}
                    >
                      {link.icon}
                    </div>

                    {!collapsed && (
                      <motion.span
                        layout
                        className="whitespace-nowrap overflow-hidden"
                        style={{ display: "inline-block" }}
                        transition={{
                          duration: 0.15,
                          ease: "easeOut",
                        }}
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Settings section - pushed to bottom */}
          <div className="mt-auto border-t border-gray-100 pt-4 px-2">
            <ul className="space-y-1">
              {settingsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200",
                      isActive(link.href)
                        ? "bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 font-medium border-l-4 border-indigo-500"
                        : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-50",
                      collapsed && "justify-center px-0"
                    )}
                    onClick={() => {
                      if (mobileOpen) setMobileOpen(false);
                    }}
                  >
                    <div
                      className={cn(
                        "flex items-center",
                        isActive(link.href)
                          ? "text-indigo-600"
                          : "text-gray-500",
                        collapsed && "justify-center w-full"
                      )}
                    >
                      {link.icon}
                    </div>

                    {!collapsed && (
                      <motion.span
                        layout
                        className="whitespace-nowrap overflow-hidden"
                        style={{ display: "inline-block" }}
                        transition={{
                          duration: 0.15,
                          ease: "easeOut",
                        }}
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </motion.div>
    </>
  );
};

export default DashboardSidebar;
