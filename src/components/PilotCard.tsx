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
      {/* Header with Avatar and Basic Info */}
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          {/* Avatar with verification badge */}
          <div className="relative flex-shrink-0">
            <img
              src={pilot.avatar}
              alt={pilot.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
            />
            {pilot.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-secondary rounded-full p-1">
                <Shield className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          {/* Name and availability */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-lg text-card-foreground truncate">
                {pilot.name}
              </h3>
              {pilot.availableToday && (
                <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                  Available
                </Badge>
              )}
            </div>
            
            {/* Rating and location in one clean line */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{pilot.rating}</span>
                <span className="text-muted-foreground">({pilot.reviewCount})</span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{pilot.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top 2 specialties only */}
        <div className="flex gap-2 mb-4">
          {pilot.specialties.slice(0, 2).map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
          {pilot.specialties.length > 2 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{pilot.specialties.length - 2} more
            </Badge>
          )}
        </div>

        {/* Price and response time */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xl font-bold text-card-foreground">
              ${pilot.hourlyRate}
              <span className="text-sm font-normal text-muted-foreground">/hr</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{pilot.responseTime}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm">
            View Profile
          </Button>
          <Button variant="orange" size="sm">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PilotCard;