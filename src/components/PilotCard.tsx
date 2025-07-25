import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Camera, Shield, Clock } from 'lucide-react';

interface PilotCardProps {
  pilot: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    location: string;
    specialties: string[];
    hourlyRate: number;
    responseTime: string;
    isVerified: boolean;
    availableToday: boolean;
  };
}

const PilotCard: React.FC<PilotCardProps> = ({ pilot }) => {
  return (
    <div className="bg-card rounded-xl shadow-card hover:shadow-elegant transition-all duration-300 overflow-hidden group hover:scale-105">
      {/* Header */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={pilot.avatar}
              alt={pilot.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
            />
            {pilot.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-secondary rounded-full p-1">
                <Shield className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-lg text-card-foreground truncate">
                {pilot.name}
              </h3>
              {pilot.availableToday && (
                <Badge variant="secondary" className="text-xs">
                  Available Today
                </Badge>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium text-sm">{pilot.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({pilot.reviewCount} reviews)
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{pilot.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specialties */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {pilot.specialties.map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="px-6 py-4 bg-accent/50 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-card-foreground">
              ${pilot.hourlyRate}
              <span className="text-sm font-normal text-muted-foreground">/hour</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Responds in {pilot.responseTime}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full">
              View Profile
            </Button>
            <Button variant="orange" size="sm" className="w-full">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PilotCard;