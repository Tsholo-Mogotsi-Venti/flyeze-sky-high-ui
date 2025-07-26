import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, AlertCircle } from 'lucide-react';

interface ServiceAreaMapProps {
  onServiceAreaChange: (location: { lat: number; lng: number; radius: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number; radius: number; address: string };
}

const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({ onServiceAreaChange, initialLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [radius, setRadius] = useState(initialLocation?.radius || 25);
  const [location, setLocation] = useState(initialLocation || { 
    lat: -26.2041, 
    lng: 28.0473, 
    radius: 25, 
    address: 'Johannesburg, South Africa' 
  });
  const [apiKey, setApiKey] = useState('');
  const [needsApiKey, setNeedsApiKey] = useState(true);

  const initializeMap = async (googleApiKey: string) => {
    if (!mapRef.current) return;

    try {
      const loader = new Loader({
        apiKey: googleApiKey,
        version: 'weekly',
        libraries: ['places']
      });

      const google = await loader.load();
      
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: location.lat, lng: location.lng },
        zoom: 11,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: false,
      });

      mapInstanceRef.current = map;

      // Create marker
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        draggable: true,
        title: 'Service Center',
      });

      markerRef.current = marker;

      // Create circle
      const circle = new google.maps.Circle({
        strokeColor: 'hsl(18, 100%, 62%)',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'hsl(18, 100%, 62%)',
        fillOpacity: 0.2,
        map: map,
        center: { lat: location.lat, lng: location.lng },
        radius: radius * 1000, // Convert km to meters
      });

      circleRef.current = circle;

      // Initialize geocoder
      const geocoder = new google.maps.Geocoder();

      // Handle marker drag
      marker.addListener('dragend', () => {
        const position = marker.getPosition();
        if (position) {
          const newLat = position.lat();
          const newLng = position.lng();
          
          // Update circle position
          circle.setCenter({ lat: newLat, lng: newLng });
          
          // Reverse geocode to get address
          geocoder.geocode({ location: { lat: newLat, lng: newLng } }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const newLocation = {
                lat: newLat,
                lng: newLng,
                radius: radius,
                address: results[0].formatted_address
              };
              setLocation(newLocation);
              onServiceAreaChange(newLocation);
            }
          });
        }
      });

      // Handle map click
      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const newLat = e.latLng.lat();
          const newLng = e.latLng.lng();
          
          // Update marker position
          marker.setPosition({ lat: newLat, lng: newLng });
          
          // Update circle position
          circle.setCenter({ lat: newLat, lng: newLng });
          
          // Reverse geocode to get address
          geocoder.geocode({ location: { lat: newLat, lng: newLng } }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const newLocation = {
                lat: newLat,
                lng: newLng,
                radius: radius,
                address: results[0].formatted_address
              };
              setLocation(newLocation);
              onServiceAreaChange(newLocation);
            }
          });
        }
      });

      setIsLoaded(true);
      setNeedsApiKey(false);
    } catch (error) {
      console.error('Error loading Google Maps:', error);
    }
  };

  const handleRadiusChange = (newRadius: number) => {
    setRadius(newRadius);
    if (circleRef.current) {
      circleRef.current.setRadius(newRadius * 1000); // Convert km to meters
    }
    const newLocation = { ...location, radius: newRadius };
    setLocation(newLocation);
    onServiceAreaChange(newLocation);
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      initializeMap(apiKey);
    }
  };

  if (needsApiKey) {
    return (
      <div className="space-y-4 p-6 border border-border rounded-lg bg-muted/20">
        <div className="flex items-center space-x-2 text-amber-600">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">Google Maps API Key Required</span>
        </div>
        <p className="text-sm text-muted-foreground">
          To use the interactive map, please enter your Google Maps API key. 
          You can get one from the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Cloud Console</a>.
        </p>
        <div className="space-y-2">
          <Label htmlFor="api-key">Google Maps API Key</Label>
          <div className="flex space-x-2">
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Google Maps API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleApiKeySubmit}>Load Map</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Service Radius (km)</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              min="1"
              max="200"
              value={radius}
              onChange={(e) => handleRadiusChange(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">km</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Current Location</Label>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground truncate">{location.address}</span>
          </div>
        </div>
      </div>
      
      <div 
        ref={mapRef} 
        className="w-full h-96 border border-border rounded-lg"
        style={{ minHeight: '400px' }}
      />
      
      {isLoaded && (
        <div className="text-sm text-muted-foreground">
          <p>• Click anywhere on the map to set your service center</p>
          <p>• Drag the marker to adjust your location</p>
          <p>• Adjust the radius to define your service area</p>
        </div>
      )}
    </div>
  );
};

export default ServiceAreaMap;