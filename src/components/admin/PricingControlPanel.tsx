import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Save, 
  RefreshCw,
  Calculator,
  MapPin
} from 'lucide-react';

const PricingControlPanel = () => {
  const [services, setServices] = useState([
    {
      id: 'aerial-photography',
      name: 'Aerial Photography',
      baseRate: 1000,
      minMultiplier: 0.8,
      maxMultiplier: 1.2,
      regionalPricing: true,
      isModified: false
    },
    {
      id: 'delivery',
      name: 'Delivery Service',
      baseRate: 350,
      minMultiplier: 0.9,
      maxMultiplier: 1.1,
      regionalPricing: false,
      isModified: false
    },
    {
      id: 'real-estate',
      name: 'Real Estate Survey',
      baseRate: 1500,
      minMultiplier: 0.8,
      maxMultiplier: 1.2,
      regionalPricing: true,
      isModified: false
    }
  ]);

  const [globalSettings, setGlobalSettings] = useState({
    capeTownMultiplier: 1.15,
    durbanMultiplier: 1.05,
    emergencyMultiplier: 2.0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateService = (serviceId: string, field: string, value: any) => {
    setServices(prev => prev.map(service => {
      if (service.id === serviceId) {
        const updated = { ...service, [field]: value, isModified: true };
        
        // Validation
        const newErrors = { ...errors };
        delete newErrors[`${serviceId}-${field}`];
        
        if (field === 'minMultiplier' && (value < 0.8 || value > 1.2)) {
          newErrors[`${serviceId}-${field}`] = 'Multiplier must be between 0.8 and 1.2';
        }
        if (field === 'maxMultiplier' && (value < 0.8 || value > 1.2)) {
          newErrors[`${serviceId}-${field}`] = 'Multiplier must be between 0.8 and 1.2';
        }
        if (field === 'baseRate' && value < 0) {
          newErrors[`${serviceId}-${field}`] = 'Base rate must be positive';
        }
        
        setErrors(newErrors);
        return updated;
      }
      return service;
    }));
  };

  const saveService = (serviceId: string) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, isModified: false } : service
    ));
    // Here you would make API call to save
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculatePriceRange = (service: any) => {
    const min = service.baseRate * service.minMultiplier;
    const max = service.baseRate * service.maxMultiplier;
    return { min, max };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pricing Control Panel</h2>
          <p className="text-muted-foreground">Manage base rates and multiplier constraints</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Data</span>
        </Button>
      </div>

      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Regional Pricing Multipliers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Cape Town Multiplier</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  step="0.05"
                  value={globalSettings.capeTownMultiplier}
                  onChange={(e) => setGlobalSettings(prev => ({
                    ...prev,
                    capeTownMultiplier: parseFloat(e.target.value)
                  }))}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">+{((globalSettings.capeTownMultiplier - 1) * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Durban Multiplier</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  step="0.05"
                  value={globalSettings.durbanMultiplier}
                  onChange={(e) => setGlobalSettings(prev => ({
                    ...prev,
                    durbanMultiplier: parseFloat(e.target.value)
                  }))}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">+{((globalSettings.durbanMultiplier - 1) * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Emergency Multiplier</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  step="0.1"
                  value={globalSettings.emergencyMultiplier}
                  onChange={(e) => setGlobalSettings(prev => ({
                    ...prev,
                    emergencyMultiplier: parseFloat(e.target.value)
                  }))}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">+{((globalSettings.emergencyMultiplier - 1) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Pricing Cards */}
      <div className="space-y-4">
        {services.map((service) => {
          const priceRange = calculatePriceRange(service);
          const hasErrors = Object.keys(errors).some(key => key.startsWith(service.id));
          
          return (
            <Card key={service.id} className={`transition-all duration-300 ${service.isModified ? 'ring-2 ring-orange' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>{service.name}</span>
                    {service.isModified && (
                      <Badge variant="outline" className="border-orange text-orange">
                        Modified
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {service.regionalPricing && (
                      <Badge variant="secondary" className="text-xs">
                        Regional Pricing
                      </Badge>
                    )}
                    <Button
                      variant={service.isModified ? "orange" : "outline"}
                      size="sm"
                      onClick={() => saveService(service.id)}
                      disabled={!service.isModified || hasErrors}
                      className="flex items-center space-x-1"
                    >
                      <Save className="h-3 w-3" />
                      <span>Save</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Base Rate */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor={`base-rate-${service.id}`}>Base Rate (ZAR)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`base-rate-${service.id}`}
                        type="number"
                        value={service.baseRate}
                        onChange={(e) => updateService(service.id, 'baseRate', parseInt(e.target.value))}
                        className="pl-10"
                        min="0"
                      />
                    </div>
                    {errors[`${service.id}-baseRate`] && (
                      <p className="text-sm text-red-600">{errors[`${service.id}-baseRate`]}</p>
                    )}
                  </div>

                  {/* Price Range Calculator */}
                  <div className="space-y-3">
                    <Label className="flex items-center space-x-2">
                      <Calculator className="h-4 w-4" />
                      <span>Effective Price Range</span>
                    </Label>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-lg font-semibold">
                        {formatCurrency(priceRange.min)} - {formatCurrency(priceRange.max)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pilots may charge within this range
                      </p>
                    </div>
                  </div>
                </div>

                {/* Multiplier Sliders */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Minimum Multiplier</Label>
                      <span className="text-sm font-medium">{service.minMultiplier.toFixed(2)}x</span>
                    </div>
                    <Slider
                      value={[service.minMultiplier]}
                      onValueChange={([value]) => updateService(service.id, 'minMultiplier', value)}
                      min={0.8}
                      max={1.2}
                      step={0.05}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0.8x</span>
                      <span>1.0x</span>
                      <span>1.2x</span>
                    </div>
                    {errors[`${service.id}-minMultiplier`] && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-600">
                          {errors[`${service.id}-minMultiplier`]}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Maximum Multiplier</Label>
                      <span className="text-sm font-medium">{service.maxMultiplier.toFixed(2)}x</span>
                    </div>
                    <Slider
                      value={[service.maxMultiplier]}
                      onValueChange={([value]) => updateService(service.id, 'maxMultiplier', value)}
                      min={0.8}
                      max={1.2}
                      step={0.05}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0.8x</span>
                      <span>1.0x</span>
                      <span>1.2x</span>
                    </div>
                    {errors[`${service.id}-maxMultiplier`] && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-600">
                          {errors[`${service.id}-maxMultiplier`]}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>

                {/* Live Preview */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-medium text-primary">Live Price Preview</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Base:</span> {formatCurrency(service.baseRate)} × 
                    <span className="font-medium"> Pilot adjustment:</span> {service.minMultiplier}x-{service.maxMultiplier}x
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Final range: {formatCurrency(priceRange.min)} - {formatCurrency(priceRange.max)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PricingControlPanel;