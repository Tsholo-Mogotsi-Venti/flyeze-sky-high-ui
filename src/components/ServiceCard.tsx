import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Home, Map, Package, Video, Settings } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: string;
    startingPrice: number;
    duration: string;
    features: string[];
    isPopular?: boolean;
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const getIcon = (iconName: string) => {
    const icons = {
      camera: Camera,
      home: Home,
      map: Map,
      package: Package,
      video: Video,
      settings: Settings,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Camera;
    return <IconComponent className="h-6 w-6" />;
  };

  return (
    <div className="relative bg-card rounded-xl shadow-card hover:shadow-elegant transition-all duration-300 overflow-hidden group hover:scale-105">
      {/* Popular Badge */}
      {service.isPopular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-hero text-white border-0">
            Most Popular
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-gradient-primary p-3 rounded-lg shadow-card">
            <div className="text-white">
              {getIcon(service.icon)}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-card-foreground">
              {service.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {service.duration}
            </p>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Features */}
      <div className="px-6 pb-4">
        <ul className="space-y-2">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span className="text-card-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Transparency & Action */}
      <div className="px-6 py-4 bg-accent/50 border-t border-border">
        {/* Price Transparency Widget */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-card-foreground">Price Estimate:</span>
            <div className="text-lg font-bold text-card-foreground">
              R{Math.round(service.startingPrice * 0.8)} - R{Math.round(service.startingPrice * 1.2)}
            </div>
          </div>
          <div className="text-xs text-muted-foreground mb-2">
            Base: R{service.startingPrice} × Pilot adjustment: 0.8x-1.2x
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex-1 bg-border rounded-full h-1.5">
              <div className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full w-2/3" />
            </div>
            <span className="text-xs text-muted-foreground">Most pilots charge here</span>
          </div>
        </div>
        
        <Button variant="navy" className="w-full">
          Get Quote
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;