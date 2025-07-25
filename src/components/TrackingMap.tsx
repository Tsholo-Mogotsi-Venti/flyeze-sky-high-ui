import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  MessageCircle, 
  AlertTriangle,
  Battery,
  Signal
} from 'lucide-react';

const TrackingMap = () => {
  const [droneStatus, setDroneStatus] = useState({
    location: { lat: 37.7749, lng: -122.4194 },
    altitude: 150,
    battery: 85,
    signal: 'Strong',
    eta: '12 minutes',
    status: 'En Route'
  });

  const [isTracking, setIsTracking] = useState(true);

  // Simulate drone movement
  useEffect(() => {
    if (!isTracking) return;

    const interval = setInterval(() => {
      setDroneStatus(prev => ({
        ...prev,
        location: {
          lat: prev.location.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.location.lng + (Math.random() - 0.5) * 0.001
        },
        battery: Math.max(20, prev.battery - Math.random() * 2),
        eta: `${Math.max(1, Math.floor(Math.random() * 15))} minutes`
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isTracking]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="p-6 h-96 lg:h-[600px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Live Tracking</h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
            </div>
            
            {/* Simulated Map */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-full relative overflow-hidden">
              {/* Grid pattern to simulate map */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-gray-300"></div>
                  ))}
                </div>
              </div>

              {/* Drone Position */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-glow"></div>
                  <div className="absolute -inset-2 border-2 border-primary rounded-full animate-ping opacity-50"></div>
                </div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-card text-xs font-medium">
                  Drone
                </div>
              </div>

              {/* Destination */}
              <div className="absolute bottom-1/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <MapPin className="h-6 w-6 text-red-500" />
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-card text-xs font-medium">
                  Destination
                </div>
              </div>

              {/* Flight Path */}
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M 50% 33% Q 60% 40% 66% 75%"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </Card>
        </div>

        {/* Status Panel */}
        <div className="space-y-6">
          {/* Drone Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Drone Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="font-medium text-green-600">{droneStatus.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ETA</span>
                <span className="font-medium">{droneStatus.eta}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Altitude</span>
                <span className="font-medium">{droneStatus.altitude}ft</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Battery className="h-4 w-4 mr-1" />
                  Battery
                </span>
                <span className={`font-medium ${droneStatus.battery > 50 ? 'text-green-600' : droneStatus.battery > 20 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {Math.floor(droneStatus.battery)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Signal className="h-4 w-4 mr-1" />
                  Signal
                </span>
                <span className="font-medium text-green-600">{droneStatus.signal}</span>
              </div>
            </div>
          </Card>

          {/* Pilot Contact */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Your Pilot</h3>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                alt="Pilot"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">Marcus Rodriguez</div>
                <div className="text-sm text-muted-foreground">Licensed Pilot</div>
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call Pilot
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button 
                variant={isTracking ? "outline" : "default"} 
                className="w-full" 
                size="sm"
                onClick={() => setIsTracking(!isTracking)}
              >
                <Navigation className="h-4 w-4 mr-2" />
                {isTracking ? 'Pause Tracking' : 'Resume Tracking'}
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                Flight History
              </Button>
              <Button variant="danger" className="w-full" size="sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Stop
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;