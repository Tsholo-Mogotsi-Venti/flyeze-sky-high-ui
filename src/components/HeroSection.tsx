import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Calendar, Star } from 'lucide-react';
import heroImage from '@/assets/hero-drone.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Hero Text */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Professional Drone Services
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                On Demand
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Connect with certified drone pilots for aerial photography, surveying, 
              delivery, and inspection services in minutes.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-elegant p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location Input */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Service Type */}
              <div className="relative">
                <select className="w-full px-4 py-3 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-transparent appearance-none">
                  <option>Aerial Photography</option>
                  <option>Property Inspection</option>
                  <option>Mapping & Surveying</option>
                  <option>Delivery Service</option>
                  <option>Event Coverage</option>
                </select>
              </div>

              {/* Date Picker */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Search Button */}
              <Button variant="professional" size="lg" className="w-full">
                <Search className="h-5 w-5 mr-2" />
                Find Pilots
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
              <div className="text-gray-300">Certified Pilots</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">10k+</div>
              <div className="text-gray-300">Successful Flights</div>
            </div>
            <div className="text-center space-y-2 flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <span className="text-3xl md:text-4xl font-bold text-white">4.9</span>
                <Star className="h-8 w-8 text-yellow-400 fill-current" />
              </div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements - Updated for warm palette */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default HeroSection;