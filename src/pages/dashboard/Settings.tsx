import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  User,
  Store,
  Mail,
  Bell,
  Shield,
  CreditCard,
  Truck,
  Globe,
  Smartphone,
  Clock,
  Settings as SettingsIcon,
  HelpCircle,
  Info,
  Save,
  BarChart3,
  Users,
  Package,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const userData = {
  name: "Jane Cooper",
  email: "jane.cooper@example.com",
  storeUrl: "mystore.myshopify.com",
  plan: "Advanced",
  timezone: "America/New_York",
  currency: "USD",
  logo: "/placeholder.svg",
};

const SettingsTab = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-6">{children}</div>;
};

const FormRow = ({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
      <Label className="md:pt-2.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="md:col-span-3">{children}</div>
    </div>
  );
};

const Settings = () => {
  const isMobile = useIsMobile();

  return (
    <DashboardLayout>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight terminal-text">
            Settings
          </h1>
        </div>

        <Card className="matrix-flow">
          <CardHeader>
            <CardTitle className="text-lg font-medium terminal-text">
              Account Settings
            </CardTitle>
            <CardDescription>
              Manage your store settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              {isMobile ? (
                <div className="mb-6">
                  <Select defaultValue="profile">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select tab" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profile">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </div>
                      </SelectItem>

                      <SelectItem value="notifications">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <span>Notifications</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="security">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span>Security</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="billing">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Billing</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="advanced">
                        <div className="flex items-center gap-2">
                          <SettingsIcon className="h-4 w-4" />
                          <span>Advanced</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-6">
                  <TabsTrigger
                    value="profile"
                    className="flex items-center gap-1"
                  >
                    <User className="h-4 w-4 md:mr-1" />
                    <span className="hidden md:inline">Profile</span>
                  </TabsTrigger>
                  {/* <TabsTrigger
                    value="store"
                    className="flex items-center gap-1"
                  >
                    <Store className="h-4 w-4 md:mr-1" />
                    <span className="hidden md:inline">Store</span>
                  </TabsTrigger> */}
                  <TabsTrigger
                    value="notifications"
                    className="flex items-center gap-1"
                  >
                    <Bell className="h-4 w-4 md:mr-1" />
                    <span className="hidden md:inline">Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="flex items-center gap-1"
                  >
                    <Shield className="h-4 w-4 md:mr-1" />
                    <span className="hidden md:inline">Security</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing"
                    className="flex items-center gap-1"
                  >
                    <CreditCard className="h-4 w-4 md:mr-1" />
                    <span className="hidden md:inline">Billing</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="advanced"
                    className="flex items-center gap-1"
                  >
                    <SettingsIcon className="h-4 w-4 md:mr-1" />
                    <span className="hidden md:inline">Advanced</span>
                  </TabsTrigger>
                </TabsList>
              )}

              <TabsContent value="profile">
                <SettingsTab>
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your account information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormRow label="Name" required>
                        <Input defaultValue={userData.name} />
                      </FormRow>
                      <FormRow label="Email" required>
                        <Input defaultValue={userData.email} type="email" />
                      </FormRow>
                      <FormRow label="Profile Picture">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 rounded-full overflow-hidden border">
                            <img
                              src={userData.logo}
                              alt="Profile"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Change
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-muted-foreground"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </FormRow>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button className="matrix-flow">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </SettingsTab>
              </TabsContent>

              <TabsContent value="store">
                <SettingsTab>
                  <Card>
                    <CardHeader>
                      <CardTitle>Store Information</CardTitle>
                      <CardDescription>
                        Manage your store details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormRow label="Store URL" required>
                        <div className="flex items-center gap-2">
                          <Input defaultValue={userData.storeUrl} />
                          <Button variant="outline" size="sm">
                            <Globe className="h-4 w-4 mr-2" />
                            Visit
                          </Button>
                        </div>
                      </FormRow>
                      <FormRow label="Store Name" required>
                        <Input defaultValue="My Awesome Store" />
                      </FormRow>
                      <FormRow label="Currency">
                        <Select defaultValue={userData.currency}>
                          <SelectTrigger className="w-full md:w-[240px]">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">
                              GBP - British Pound
                            </SelectItem>
                            <SelectItem value="CAD">
                              CAD - Canadian Dollar
                            </SelectItem>
                            <SelectItem value="AUD">
                              AUD - Australian Dollar
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormRow>
                      <FormRow label="Timezone">
                        <Select defaultValue={userData.timezone}>
                          <SelectTrigger className="w-full md:w-[240px]">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">
                              Eastern Time (ET)
                            </SelectItem>
                            <SelectItem value="America/Chicago">
                              Central Time (CT)
                            </SelectItem>
                            <SelectItem value="America/Denver">
                              Mountain Time (MT)
                            </SelectItem>
                            <SelectItem value="America/Los_Angeles">
                              Pacific Time (PT)
                            </SelectItem>
                            <SelectItem value="Europe/London">
                              London (GMT)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormRow>
                      <FormRow label="Business Address">
                        <Textarea
                          defaultValue="123 Commerce Street&#10;Suite 101&#10;San Francisco, CA 94103"
                          className="min-h-[120px]"
                        />
                      </FormRow>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button className="matrix-flow">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Store Appearance</CardTitle>
                      <CardDescription>
                        Customize how your dashboard looks
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormRow label="Logo">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded overflow-hidden border">
                            <img
                              src={userData.logo}
                              alt="Logo"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Upload
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-muted-foreground"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </FormRow>
                      <FormRow label="Theme">
                        <div className="grid grid-cols-3 gap-4">
                          <div
                            className={cn(
                              "flex flex-col items-center p-4 rounded-md border cursor-pointer",
                              "bg-background border-primary"
                            )}
                          >
                            <div className="h-10 w-full rounded bg-background border mb-2"></div>
                            <div className="h-20 w-full rounded bg-card"></div>
                            <span className="mt-2 text-xs font-medium">
                              Current Theme
                            </span>
                          </div>
                          <div
                            className={cn(
                              "flex flex-col items-center p-4 rounded-md border cursor-pointer",
                              "border-muted-foreground/20 hover:border-muted-foreground/50 transition-colors"
                            )}
                          >
                            <div className="h-10 w-full rounded bg-white border mb-2"></div>
                            <div className="h-20 w-full rounded bg-gray-50"></div>
                            <span className="mt-2 text-xs font-medium">
                              Light Mode
                            </span>
                          </div>
                          <div
                            className={cn(
                              "flex flex-col items-center p-4 rounded-md border cursor-pointer",
                              "border-muted-foreground/20 hover:border-muted-foreground/50 transition-colors"
                            )}
                          >
                            <div className="h-10 w-full rounded bg-gray-900 border mb-2"></div>
                            <div className="h-20 w-full rounded bg-gray-800"></div>
                            <span className="mt-2 text-xs font-medium">
                              Dark Mode
                            </span>
                          </div>
                        </div>
                      </FormRow>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button className="matrix-flow">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </SettingsTab>
              </TabsContent>

              <TabsContent value="notifications">
                <SettingsTab>
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Control when and how you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Email Notifications
                        </h3>
                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Order Notifications</Label>
                            <p className="text-xs text-muted-foreground">
                              Receive emails about new orders and updates
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Inventory Alerts</Label>
                            <p className="text-xs text-muted-foreground">
                              Get notified when products are low or out of stock
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Customer Reviews</Label>
                            <p className="text-xs text-muted-foreground">
                              Receive notifications about new customer reviews
                            </p>
                          </div>
                          <Switch />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Marketing Updates</Label>
                            <p className="text-xs text-muted-foreground">
                              Receive tips and news about marketing your store
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <h3 className="text-sm font-medium">
                          Mobile Notifications
                        </h3>
                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <Label>Push Notifications</Label>
                              <Badge className="bg-green-500 text-white">
                                Connected
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Receive push notifications on your mobile device
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Order Alerts</Label>
                            <p className="text-xs text-muted-foreground">
                              Get notified immediately about new orders
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Daily Summary</Label>
                            <p className="text-xs text-muted-foreground">
                              Get a daily summary of your store's activity
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button className="matrix-flow">
                        <Save className="h-4 w-4 mr-2" />
                        Save Preferences
                      </Button>
                    </CardFooter>
                  </Card>
                </SettingsTab>
              </TabsContent>

              <TabsContent value="security">
                <SettingsTab>
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage your account security
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormRow label="Change Password">
                        <div className="space-y-4">
                          <Input
                            type="password"
                            placeholder="Current password"
                          />
                          <Input type="password" placeholder="New password" />
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                          />
                          <Button variant="outline">Update Password</Button>
                        </div>
                      </FormRow>

                      <Separator />

                      <FormRow label="Two-Factor Authentication">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Enable 2FA</Label>
                              <p className="text-xs text-muted-foreground">
                                Add an extra layer of security to your account
                              </p>
                            </div>
                            <Switch />
                          </div>
                          <Button variant="outline" disabled>
                            Set Up 2FA
                          </Button>
                        </div>
                      </FormRow>

                      <Separator />

                      <FormRow label="API Access">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>API Keys</Label>
                              <p className="text-xs text-muted-foreground">
                                Manage API keys for integrations
                              </p>
                            </div>
                            <Button variant="outline">Manage Keys</Button>
                          </div>
                        </div>
                      </FormRow>

                      <Separator />

                      <FormRow label="Session Management">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Active Sessions</Label>
                              <p className="text-xs text-muted-foreground">
                                View and manage your active login sessions
                              </p>
                            </div>
                            <Button variant="destructive">
                              Sign Out All Devices
                            </Button>
                          </div>
                          <div className="border rounded-md">
                            <div className="p-4 flex items-start justify-between border-b">
                              <div>
                                <div className="font-medium">
                                  Current Session
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Chrome on macOS • San Francisco, CA
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Started 1 hour ago
                                </div>
                              </div>
                              <Badge className="bg-green-500">Current</Badge>
                            </div>
                            <div className="p-4 flex items-start justify-between">
                              <div>
                                <div className="font-medium">Mobile App</div>
                                <div className="text-xs text-muted-foreground">
                                  iPhone • New York, NY
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Last active 2 days ago
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground h-8"
                              >
                                Sign Out
                              </Button>
                            </div>
                          </div>
                        </div>
                      </FormRow>
                    </CardContent>
                  </Card>
                </SettingsTab>
              </TabsContent>

              <TabsContent value="billing">
                <SettingsTab>
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Information</CardTitle>
                      <CardDescription>
                        Manage your subscription and billing details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 bg-gradient-to-b from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium flex items-center gap-2">
                              Current Plan
                              <Badge className="bg-primary">Advanced</Badge>
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Your plan renews on April 21, 2023
                            </p>
                          </div>
                          <Button variant="outline">Upgrade Plan</Button>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-card rounded-md border">
                            <p className="text-xs text-muted-foreground">
                              Products
                            </p>
                            <p className="font-bold">Unlimited</p>
                          </div>
                          <div className="text-center p-3 bg-card rounded-md border">
                            <p className="text-xs text-muted-foreground">
                              Staff Accounts
                            </p>
                            <p className="font-bold">15</p>
                          </div>
                          <div className="text-center p-3 bg-card rounded-md border">
                            <p className="text-xs text-muted-foreground">
                              Transaction Fee
                            </p>
                            <p className="font-bold">0.5%</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <FormRow label="Payment Method">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-3 border rounded-md">
                            <div className="h-10 w-16 bg-card rounded-md border flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">Visa ending in 4242</p>
                              <p className="text-xs text-muted-foreground">
                                Expires 04/2025
                              </p>
                            </div>
                            <div className="ml-auto">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                          <Button variant="outline">Add Payment Method</Button>
                        </div>
                      </FormRow>

                      <Separator />

                      <FormRow label="Billing Address">
                        <div className="space-y-4">
                          <Textarea
                            defaultValue="Jane Cooper&#10;123 Commerce Street&#10;Suite 101&#10;San Francisco, CA 94103&#10;United States"
                            className="min-h-[120px]"
                          />
                          <Button variant="outline">Update Address</Button>
                        </div>
                      </FormRow>

                      <Separator />

                      <FormRow label="Billing History">
                        <div className="space-y-4">
                          <div className="border rounded-md">
                            <div className="grid grid-cols-4 p-3 border-b font-medium text-sm">
                              <div>Date</div>
                              <div>Description</div>
                              <div>Amount</div>
                              <div className="text-right">Invoice</div>
                            </div>
                            <div className="grid grid-cols-4 p-3 border-b text-sm">
                              <div>Apr 1, 2023</div>
                              <div>Advanced Plan - Monthly</div>
                              <div>$299.00</div>
                              <div className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8"
                                >
                                  <Mail className="h-4 w-4 mr-1" />
                                  PDF
                                </Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 p-3 border-b text-sm">
                              <div>Mar 1, 2023</div>
                              <div>Advanced Plan - Monthly</div>
                              <div>$299.00</div>
                              <div className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8"
                                >
                                  <Mail className="h-4 w-4 mr-1" />
                                  PDF
                                </Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 p-3 text-sm">
                              <div>Feb 1, 2023</div>
                              <div>Advanced Plan - Monthly</div>
                              <div>$299.00</div>
                              <div className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8"
                                >
                                  <Mail className="h-4 w-4 mr-1" />
                                  PDF
                                </Button>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline">View All Invoices</Button>
                        </div>
                      </FormRow>
                    </CardContent>
                  </Card>
                </SettingsTab>
              </TabsContent>

              <TabsContent value="advanced">
                <SettingsTab>
                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Settings</CardTitle>
                      <CardDescription>
                        Configure advanced store settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormRow label="Store Timezone">
                        <Select defaultValue={userData.timezone}>
                          <SelectTrigger className="w-full md:w-[240px]">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">
                              Eastern Time (ET)
                            </SelectItem>
                            <SelectItem value="America/Chicago">
                              Central Time (CT)
                            </SelectItem>
                            <SelectItem value="America/Denver">
                              Mountain Time (MT)
                            </SelectItem>
                            <SelectItem value="America/Los_Angeles">
                              Pacific Time (PT)
                            </SelectItem>
                            <SelectItem value="Europe/London">
                              London (GMT)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormRow>

                      <FormRow label="Weight Unit">
                        <Select defaultValue="lb">
                          <SelectTrigger className="w-full md:w-[240px]">
                            <SelectValue placeholder="Select weight unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lb">Pounds (lb)</SelectItem>
                            <SelectItem value="oz">Ounces (oz)</SelectItem>
                            <SelectItem value="kg">Kilograms (kg)</SelectItem>
                            <SelectItem value="g">Grams (g)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormRow>

                      <FormRow label="Dimension Unit">
                        <Select defaultValue="in">
                          <SelectTrigger className="w-full md:w-[240px]">
                            <SelectValue placeholder="Select dimension unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in">Inches (in)</SelectItem>
                            <SelectItem value="ft">Feet (ft)</SelectItem>
                            <SelectItem value="cm">Centimeters (cm)</SelectItem>
                            <SelectItem value="m">Meters (m)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormRow>

                      <Separator />

                      <FormRow label="Shipping Settings">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Free Shipping Threshold</Label>
                              <p className="text-xs text-muted-foreground">
                                Minimum order amount for free shipping
                              </p>
                            </div>
                            <Input
                              type="number"
                              defaultValue="100"
                              className="w-24 text-right"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Calculate Tax Based on</Label>
                              <p className="text-xs text-muted-foreground">
                                Where tax calculations are applied
                              </p>
                            </div>
                            <Select defaultValue="shipping">
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select address" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="shipping">
                                  Shipping Address
                                </SelectItem>
                                <SelectItem value="billing">
                                  Billing Address
                                </SelectItem>
                                <SelectItem value="store">
                                  Store Address
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Shipping Rate Calculations</Label>
                              <p className="text-xs text-muted-foreground">
                                How shipping rates are calculated
                              </p>
                            </div>
                            <Select defaultValue="weight">
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select calculation" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="weight">
                                  By Weight
                                </SelectItem>
                                <SelectItem value="price">By Price</SelectItem>
                                <SelectItem value="quantity">
                                  By Quantity
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </FormRow>

                      <Separator />

                      <FormRow label="API Integrations">
                        <div className="space-y-4">
                          <Button variant="outline">
                            <Globe className="h-4 w-4 mr-2" />
                            Manage API Keys
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Configure API keys to connect with third-party
                            services
                          </p>
                        </div>
                      </FormRow>

                      <Separator />

                      <FormRow label="Data Export">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button variant="outline">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Export Analytics
                            </Button>
                            <Button variant="outline">
                              <Users className="h-4 w-4 mr-2" />
                              Export Customers
                            </Button>
                            <Button variant="outline">
                              <Package className="h-4 w-4 mr-2" />
                              Export Products
                            </Button>
                            <Button variant="outline">
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Export Orders
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Export your store data in CSV format for backup or
                            analysis
                          </p>
                        </div>
                      </FormRow>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button className="matrix-flow">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-destructive/5 border-destructive/20">
                    <CardHeader>
                      <CardTitle className="text-destructive">
                        Danger Zone
                      </CardTitle>
                      <CardDescription>
                        These actions cannot be undone
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-destructive">
                            Reset Store Data
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            This will delete all products, customers, and orders
                          </p>
                        </div>
                        <Button variant="destructive">Reset Store</Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-destructive">
                            Close Store
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            This will make your store inaccessible to customers
                          </p>
                        </div>
                        <Button variant="destructive">Close Store</Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-destructive">
                            Delete Account
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            This will permanently delete your account and all
                            data
                          </p>
                        </div>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </CardContent>
                  </Card>
                </SettingsTab>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Settings;
