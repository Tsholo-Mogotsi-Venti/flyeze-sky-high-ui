import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import PricingControlPanel from '@/components/admin/PricingControlPanel';
import ServiceManager from '@/components/admin/ServiceManager';
import PilotModeration from '@/components/admin/PilotModeration';
import AuditLog from '@/components/admin/AuditLog';
import { 
  DollarSign, 
  Users, 
  Settings, 
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Revenue',
      value: 'R 245,890',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-secondary'
    },
    {
      title: 'Active Pilots',
      value: '127',
      change: '+3',
      trend: 'up',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Pending Reviews',
      value: '8',
      change: '-2',
      trend: 'down',
      icon: Clock,
      color: 'text-orange'
    },
    {
      title: 'System Health',
      value: '99.9%',
      change: 'Optimal',
      trend: 'stable',
      icon: CheckCircle,
      color: 'text-secondary'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'pricing',
      message: 'Base rate updated for Aerial Photography',
      user: 'Admin Sarah',
      timestamp: '2 min ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'pilot',
      message: 'Pilot verification completed for Mike Chen',
      user: 'System',
      timestamp: '15 min ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'alert',
      message: 'Pricing multiplier exceeded limit - requires review',
      user: 'System',
      timestamp: '1 hour ago',
      status: 'warning'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <Badge 
                        variant={stat.trend === 'up' ? 'default' : stat.trend === 'down' ? 'destructive' : 'outline'}
                        className="text-xs"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-primary/10 ${stat.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 text-left border rounded-lg hover:bg-muted/50 transition-colors">
                <DollarSign className="h-5 w-5 text-primary mb-2" />
                <p className="font-medium text-sm">Update Pricing</p>
                <p className="text-xs text-muted-foreground">Modify base rates</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-muted/50 transition-colors">
                <Users className="h-5 w-5 text-primary mb-2" />
                <p className="font-medium text-sm">Review Pilots</p>
                <p className="text-xs text-muted-foreground">Pending approvals</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-muted/50 transition-colors">
                <Activity className="h-5 w-5 text-primary mb-2" />
                <p className="font-medium text-sm">View Reports</p>
                <p className="text-xs text-muted-foreground">Analytics dashboard</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-muted/50 transition-colors">
                <AlertTriangle className="h-5 w-5 text-orange mb-2" />
                <p className="font-medium text-sm">System Alerts</p>
                <p className="text-xs text-muted-foreground">3 pending issues</p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-secondary' :
                    activity.status === 'warning' ? 'bg-orange' : 'bg-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">by {activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage FlyEeze platform operations</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                Administrator
              </Badge>
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                SA
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Pricing</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="pilots" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Pilots</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Audit</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <PricingControlPanel />
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <ServiceManager />
          </TabsContent>

          <TabsContent value="pilots" className="space-y-6">
            <PilotModeration />
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <AuditLog />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;