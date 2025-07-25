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
  MessageCircle
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data for bookings
  const upcomingBookings = [
    {
      id: '1',
      service: 'Aerial Photography',
      date: '2024-01-25',
      time: '2:00 PM',
      location: 'Central Park, NYC',
      pilot: 'Sarah Johnson',
      pilotAvatar: '/placeholder.svg',
      pilotRating: 4.9,
      status: 'confirmed',
      price: 250,
      icon: Camera
    },
    {
      id: '2',
      service: 'Delivery Service',
      date: '2024-01-28',
      time: '10:30 AM',
      location: 'Manhattan Financial District',
      pilot: 'Mike Chen',
      pilotAvatar: '/placeholder.svg',
      pilotRating: 4.8,
      status: 'pending',
      price: 75,
      icon: Package
    }
  ];

  const pastBookings = [
    {
      id: '3',
      service: 'Real Estate Survey',
      date: '2024-01-15',
      time: '11:00 AM',
      location: 'Brooklyn Heights',
      pilot: 'David Rodriguez',
      pilotAvatar: '/placeholder.svg',
      pilotRating: 4.9,
      status: 'completed',
      price: 400,
      icon: Building,
      invoiceId: 'INV-2024-001'
    },
    {
      id: '4',
      service: 'Aerial Photography',
      date: '2024-01-10',
      time: '3:30 PM',
      location: 'Prospect Park, Brooklyn',
      pilot: 'Sarah Johnson',
      pilotAvatar: '/placeholder.svg',
      pilotRating: 4.9,
      status: 'completed',
      price: 275,
      icon: Camera,
      invoiceId: 'INV-2024-002'
    }
  ];

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
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-card-foreground">
              ${booking.price}
            </div>
            <div className="flex space-x-2">
              {isPast ? (
                <>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
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
                    View Details
                  </Button>
                  {booking.status === 'confirmed' && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your bookings and track your drone services</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Upcoming Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Past Bookings</span>
            </TabsTrigger>
          </TabsList>

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
                  <p className="text-muted-foreground mb-4">Book your first drone service to get started</p>
                  <Button>Book a Service</Button>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;