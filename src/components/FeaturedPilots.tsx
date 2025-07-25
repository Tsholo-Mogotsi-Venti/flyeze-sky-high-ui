import React from 'react';
import PilotCard from './PilotCard';

const FeaturedPilots = () => {
  const featuredPilots = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 127,
      location: 'San Francisco, CA',
      specialties: ['Aerial Photography', 'Real Estate', 'Events'],
      hourlyRate: 150,
      responseTime: '< 1 hour',
      isVerified: true,
      availableToday: true
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 93,
      location: 'Austin, TX',
      specialties: ['Inspection', 'Mapping', 'Construction'],
      hourlyRate: 120,
      responseTime: '< 2 hours',
      isVerified: true,
      availableToday: false
    },
    {
      id: '3',
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 156,
      location: 'Seattle, WA',
      specialties: ['Cinematography', 'Wedding', 'Commercial'],
      hourlyRate: 200,
      responseTime: '< 30 min',
      isVerified: true,
      availableToday: true
    },
    {
      id: '4',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.7,
      reviewCount: 84,
      location: 'Denver, CO',
      specialties: ['Delivery', 'Surveillance', 'Search & Rescue'],
      hourlyRate: 100,
      responseTime: '< 1 hour',
      isVerified: true,
      availableToday: true
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Pilots
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with our top-rated, certified drone pilots ready to bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPilots.map((pilot) => (
            <PilotCard key={pilot.id} pilot={pilot} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-primary hover:text-primary-hover font-medium text-lg underline underline-offset-4 transition-smooth">
            View All Pilots →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPilots;