import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  X, 
  Eye,
  Camera,
  Package,
  Building,
  Star,
  Phone,
  MessageCircle,
  Heart,
  TrendingUp,
  Wallet,
  Info
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for bookings with ZAR pricing and pilot multipliers
  const upcomingBookings = [
    {
      id: '1',
      service: 'Aerial Photography',
      date: '2024-01-25',
      time: '2:00 PM',
      location: 'Cape Town, Western Cape',
      pilot: 'Sarah Johnson',
      pilotAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      pilotRating: 4.9,
      status: 'confirmed',
      basePrice: 1200,
      pilotMultiplier: 1.1,
      finalPrice: 1320,
      priceBreakdown: {
        base: 1200,
        multiplier: '1.1x (5-star rating)',
        total: 1320
      },
      icon: Camera
    },
    {
      id: '2',
      service: 'Package Delivery',
      date: '2024-01-28',
      time: '10:30 AM',
      location: 'Johannesburg, Gauteng',
      pilot: 'Mike Chen',
      pilotAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      pilotRating: 4.8,
      status: 'pending',
      basePrice: 800,
      pilotMultiplier: 0.9,
      finalPrice: 720,
      priceBreakdown: {
        base: 800,
        multiplier: '0.9x (promotional rate)',
        total: 720
      },
      icon: Package
    }
  ];

  const pastBookings = [
    {
      id: '3',
      service: 'Real Estate Survey',
      date: '2024-01-15',
      time: '11:00 AM',
      location: 'Durban, KwaZulu-Natal',
      pilot: 'David Rodriguez',
      pilotAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      pilotRating: 4.9,
      status: 'completed',
      basePrice: 1500,
      pilotMultiplier: 1.0,
      finalPrice: 1500,
      priceBreakdown: {
        base: 1500,
        multiplier: '1.0x (standard rate)',
        total: 1500
      },
      icon: Building,
      invoiceId: 'INV-2024-001'
    }
  ];

  const savedPilots = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      specialties: ['Aerial Photography', 'Real Estate'],
      location: 'Cape Town',
      bookingsCount: 3
    },
    {
      id: '2',
      name: 'David Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      specialties: ['Real Estate', 'Construction'],
      location: 'Durban',
      bookingsCount: 1
    }
  ];

  // Calculate spending stats
  const totalSpent = [...upcomingBookings, ...pastBookings].reduce((sum, booking) => sum + booking.finalPrice, 0);
  const monthlySpent = pastBookings.reduce((sum, booking) => sum + booking.finalPrice, 0);
  const avgSavings = [...upcomingBookings, ...pastBookings].reduce((sum, booking) => {
    const savings = booking.basePrice - booking.finalPrice;
    return sum + (savings > 0 ? savings : 0);
  }, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="secondary" className="bg-secondary/20 text-secondary">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-orange text-orange">Pending</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-navy text-navy">Completed</Badge>;
      default:
        return null;
    }
  };

  const BookingCard = ({ booking, isPast = false }: { booking: any, isPast?: boolean }) => {
    const IconComponent = booking.icon;
    const savings = booking.basePrice - booking.finalPrice;
    
    return (
      <Card className="hover:shadow-card transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <IconComponent className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">{booking.service}</h3>
                <p className="text-sm text-muted-foreground">Booking #{booking.id}</p>
              </div>
            </div>
            {getStatusBadge(booking.status)}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{booking.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm col-span-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{booking.location}</span>
            </div>
          </div>

          {/* Price Transparency Widget */}
          <div className="bg-muted/30 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Price Breakdown</span>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex justify-between">
                <span>Base Rate:</span>
                <span>R{booking.basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Pilot Adjustment:</span>
                <span className={booking.pilotMultiplier > 1 ? 'text-orange' : booking.pilotMultiplier < 1 ? 'text-green-600' : ''}>
                  {booking.priceBreakdown.multiplier}
                </span>
              </div>
              <div className="flex justify-between font-medium text-card-foreground border-t pt-1">
                <span>Total:</span>
                <span>R{booking.finalPrice.toLocaleString()}</span>
              </div>
              {savings > 0 && (
                <div className="text-green-600 text-xs">
                  You saved R{savings.toLocaleString()}!
                </div>
              )}
            </div>
          </div>

          {/* Pilot Info */}
          <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <img
                src={booking.pilotAvatar}
                alt={booking.pilot}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-sm">{booking.pilot}</p>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-muted-foreground">{booking.pilotRating}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Phone className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <MessageCircle className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Heart className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <div className="text-xl font-bold text-card-foreground">
              R{booking.finalPrice.toLocaleString()}
            </div>
            <div className="flex space-x-2">
              {isPast ? (
                <>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  {booking.invoiceId && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Invoice
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  {booking.status === 'confirmed' && (
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive/80">
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const SavedPilotCard = ({ pilot }: { pilot: any }) => (
    <Card className="hover:shadow-card transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={pilot.avatar}
            alt={pilot.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground">{pilot.name}</h3>
            <div className="flex items-center space-x-1 mb-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-sm text-muted-foreground">{pilot.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground">{pilot.location}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {pilot.specialties.slice(0, 2).map((specialty: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {pilot.bookingsCount} booking{pilot.bookingsCount !== 1 ? 's' : ''}
          </span>
          <Button size="sm" variant="orange">
            Book Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Customer Dashboard</h1>
          <p className="text-muted-foreground">Track your bookings, manage saved pilots, and view spending insights</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Upcoming</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
            <TabsTrigger value="pilots" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Saved Pilots</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Spending Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Total Spent</h3>
                  </div>
                  <p className="text-2xl font-bold text-card-foreground">R{totalSpent.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">All time</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-5 w-5 text-secondary" />
                    <h3 className="font-semibold">This Month</h3>
                  </div>
                  <p className="text-2xl font-bold text-card-foreground">R{monthlySpent.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">January 2024</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">Total Saved</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-600">R{avgSavings.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">With smart pricing</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[...upcomingBookings.slice(0, 1), ...pastBookings.slice(0, 1)].map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    isPast={booking.status === 'completed'} 
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No upcoming bookings</h3>
                  <p className="text-muted-foreground mb-4">Book your next drone service</p>
                  <Button variant="orange">Browse Services</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} isPast={true} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No past bookings</h3>
                  <p className="text-muted-foreground">Your completed bookings will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pilots" className="space-y-6">
            {savedPilots.length > 0 ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Saved Pilots ({savedPilots.length})</h2>
                  <Button variant="outline">Browse All Pilots</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedPilots.map((pilot) => (
                    <SavedPilotCard key={pilot.id} pilot={pilot} />
                  ))}
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No saved pilots</h3>
                  <p className="text-muted-foreground mb-4">Save your favorite pilots for quick rebooking</p>
                  <Button variant="orange">Browse Pilots</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;