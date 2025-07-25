import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturedPilots from '@/components/FeaturedPilots';
import ServicesSection from '@/components/ServicesSection';
import BookingFlow from '@/components/BookingFlow';
import TrackingMap from '@/components/TrackingMap';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeDemo, setActiveDemo] = useState('home');

  const renderDemo = () => {
    switch (activeDemo) {
      case 'home':
        return (
          <div>
            <Navigation />
            <HeroSection />
            <ServicesSection />
            <FeaturedPilots />
          </div>
        );
      case 'booking':
        return (
          <div>
            <Navigation />
            <div className="py-8 bg-background">
              <BookingFlow />
            </div>
          </div>
        );
      case 'tracking':
        return (
          <div>
            <Navigation />
            <div className="py-8 bg-background">
              <TrackingMap />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Switcher */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 backdrop-blur-sm rounded-full shadow-elegant p-2">
        <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-transparent">
            <TabsTrigger 
              value="home" 
              className="rounded-full px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Home
            </TabsTrigger>
            <TabsTrigger 
              value="booking" 
              className="rounded-full px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Booking
            </TabsTrigger>
            <TabsTrigger 
              value="tracking" 
              className="rounded-full px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Tracking
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Render Active Demo */}
      <div className="animate-fade-in">
        {renderDemo()}
      </div>
    </div>
  );
};

export default Index;
