import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Navigation as NavigationIcon,
  Phone,
  MessageCircle,
  CheckCircle,
  X,
  Calendar,
  TrendingUp,
  Star,
  Camera,
  Package,
  Building,
  AlertTriangle,
  Eye
} from 'lucide-react';

const JobManagement = () => {
  const [activeTab, setActiveTab] = useState('requests');

  // Mock data for job requests
  const jobRequests = [
    {
      id: 'job-001',
      service: 'Aerial Photography',
      customer: 'Sarah Williams',
      customerAvatar: '/placeholder.svg',
      location: 'Cape Town Waterfront',
      date: '2024-01-25',
      time: '14:00',
      duration: '2 hours',
      baseRate: 1000,
      multiplier: 1.1,
      totalAmount: 1100,
      description: 'Wedding photography at waterfront venue with sunset shots',
      urgency: 'standard',
      icon: Camera,
      distance: '12.5 km'
    },
    {
      id: 'job-002',
      service: 'Package Delivery',
      customer: 'Tech Solutions Ltd',
      customerAvatar: '/placeholder.svg',
      location: 'Sandton Business District',
      date: '2024-01-24',
      time: '10:30',
      duration: '1 hour',
      baseRate: 350,
      multiplier: 1.0,
      totalAmount: 350,
      description: 'Urgent document delivery to corporate client',
      urgency: 'urgent',
      icon: Package,
      distance: '8.2 km'
    }
  ];

  const activeJobs = [
    {
      id: 'job-003',
      service: 'Real Estate Survey',
      customer: 'Prime Properties',
      customerAvatar: '/placeholder.svg',
      location: 'Stellenbosch Wine Estate',
      date: '2024-01-23',
      time: '09:00',
      duration: '3 hours',
      baseRate: 1500,
      multiplier: 1.2,
      totalAmount: 1800,
      status: 'in-progress',
      progress: 60,
      icon: Building,
      estimatedCompletion: '11:30'
    }
  ];

  const completedJobs = [
    {
      id: 'job-004',
      service: 'Aerial Photography',
      customer: 'Adventure Tours SA',
      location: 'Table Mountain',
      date: '2024-01-20',
      completedAt: '2024-01-20 16:30',
      duration: '2 hours',
      totalAmount: 1200,
      rating: 5,
      review: 'Exceptional work! The aerial shots were breathtaking.',
      icon: Camera
    },
    {
      id: 'job-005',
      service: 'Package Delivery',
      customer: 'Medical Supplies Co.',
      location: 'Groote Schuur Hospital',
      date: '2024-01-19',
      completedAt: '2024-01-19 14:15',
      duration: '45 min',
      totalAmount: 450,
      rating: 4.8,
      review: 'Fast and reliable service as always!',
      icon: Package
    }
  ];

  const earningsData = {
    today: 1800,
    thisWeek: 8450,
    thisMonth: 28900,
    totalEarnings: 125400,
    completedJobs: 203,
    averageRating: 4.9,
    responseTime: '< 2 min'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const acceptJob = (jobId: string) => {
    console.log('Accepting job:', jobId);
    // Here you would make API call to accept the job
  };

  const declineJob = (jobId: string) => {
    console.log('Declining job:', jobId);
    // Here you would make API call to decline the job
  };

  const navigateToJob = (location: string) => {
    console.log('Navigating to:', location);
    // Here you would integrate with Maps API
  };

  const JobCard = ({ job, type = 'request' }: { job: any; type?: string }) => {
    const IconComponent = job.icon;
    const isUrgent = job.urgency === 'urgent';
    
    return (
      <Card className={`hover:shadow-card transition-all duration-300 ${isUrgent ? 'border-orange' : ''}`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isUrgent ? 'bg-orange/10 text-orange' : 'bg-primary/10 text-primary'
              }`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{job.service}</h3>
                <p className="text-sm text-muted-foreground">{job.customer}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-card-foreground">
                {formatCurrency(job.totalAmount)}
              </div>
              {type === 'request' && job.multiplier !== 1.0 && (
                <div className="text-xs text-muted-foreground">
                  {job.multiplier}x multiplier
                </div>
              )}
            </div>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{job.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{job.time || job.estimatedCompletion}</span>
            </div>
            {job.distance && (
              <div className="flex items-center space-x-2">
                <NavigationIcon className="h-4 w-4 text-muted-foreground" />
                <span>{job.distance}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {job.description && (
            <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
          )}

          {/* Progress Bar for Active Jobs */}
          {type === 'active' && job.progress && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{job.progress}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className="bg-secondary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Rating for Completed Jobs */}
          {type === 'completed' && job.rating && (
            <div className="mb-4 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{job.rating}/5.0</span>
              </div>
              <p className="text-sm text-muted-foreground italic">"{job.review}"</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {type === 'request' && (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => declineJob(job.id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Decline
                </Button>
                <Button 
                  variant="orange" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => acceptJob(job.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Accept
                </Button>
              </>
            )}
            
            {type === 'active' && (
              <>
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-1" />
                  Call Customer
                </Button>
                <Button 
                  variant="orange" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => navigateToJob(job.location)}
                >
                  <NavigationIcon className="h-4 w-4 mr-1" />
                  Navigate
                </Button>
              </>
            )}
            
            {type === 'completed' && (
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
            )}
          </div>

          {/* Urgency Badge */}
          {isUrgent && (
            <div className="mt-3 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange" />
              <Badge variant="outline" className="border-orange text-orange text-xs">
                Urgent Request
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const EarningsOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6 text-center">
          <DollarSign className="h-8 w-8 text-secondary mx-auto mb-2" />
          <div className="text-2xl font-bold">{formatCurrency(earningsData.today)}</div>
          <div className="text-sm text-muted-foreground">Today</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold">{formatCurrency(earningsData.thisWeek)}</div>
          <div className="text-sm text-muted-foreground">This Week</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <Calendar className="h-8 w-8 text-orange mx-auto mb-2" />
          <div className="text-2xl font-bold">{formatCurrency(earningsData.thisMonth)}</div>
          <div className="text-sm text-muted-foreground">This Month</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-8 w-8 text-secondary mx-auto mb-2" />
          <div className="text-2xl font-bold">{earningsData.completedJobs}</div>
          <div className="text-sm text-muted-foreground">Total Jobs</div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Job Management</h1>
          <p className="text-muted-foreground">Manage your drone service requests and track earnings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="requests" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Requests ({jobRequests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Active ({activeJobs.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Completed</span>
            </TabsTrigger>
            <TabsTrigger value="earnings" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Earnings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            {jobRequests.length > 0 ? (
              <div className="space-y-4">
                {jobRequests.map((job) => (
                  <JobCard key={job.id} job={job} type="request" />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No pending requests</h3>
                  <p className="text-muted-foreground">New job requests will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            {activeJobs.length > 0 ? (
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <JobCard key={job.id} job={job} type="active" />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No active jobs</h3>
                  <p className="text-muted-foreground">Accepted jobs will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="space-y-4">
              {completedJobs.map((job) => (
                <JobCard key={job.id} job={job} type="completed" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <EarningsOverview />
            
            {/* Detailed Earnings */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {formatCurrency(earningsData.totalEarnings)}
                    </div>
                    <p className="text-muted-foreground">Total Lifetime Earnings</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">
                      {earningsData.averageRating}⭐
                    </div>
                    <p className="text-muted-foreground">Average Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange mb-2">
                      {earningsData.responseTime}
                    </div>
                    <p className="text-muted-foreground">Response Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JobManagement;