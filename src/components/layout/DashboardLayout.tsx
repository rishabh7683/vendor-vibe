import React, { useState, useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // Use localStorage to persist sidebar collapsed state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar - hidden on mobile, visible on desktop */}
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* Main content area */}
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <main
            className="relative flex-1 overflow-y-auto focus:outline-none p-4 md:p-6"
            style={{
              transition: "padding 0.3s ease",
              paddingLeft: sidebarCollapsed ? "1rem" : "1.5rem",
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
