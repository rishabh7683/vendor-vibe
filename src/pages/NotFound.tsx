
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark">
      <div className="text-center max-w-md mx-auto p-6 space-y-6 matrix-flow glow">
        <div className="flex justify-center">
          <AlertTriangle className="h-24 w-24 text-warning animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold terminal-text text-glow">404</h1>
        <p className="text-xl text-muted-foreground">
          Page not found in the system
        </p>
        <p className="text-sm text-muted-foreground">
          The requested URL <code className="text-primary">{location.pathname}</code> could not be located
        </p>
        <Button asChild className="mt-4">
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
