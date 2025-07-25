import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Camera, 
  Package, 
  Building, 
  Zap,
  MoreHorizontal,
  Filter
} from 'lucide-react';

const ServiceManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState([
    {
      id: 'aerial-photography',
      name: 'Aerial Photography',
      description: 'Professional aerial photography for events, real estate, and marketing',
      icon: 'Camera',
      baseRate: 1000,
      isActive: true,
      bookingsCount: 245,
      avgRating: 4.8,
      lastModified: '2024-01-20'
    },
    {
      id: 'delivery',
      name: 'Delivery Service',
      description: 'Fast and reliable drone delivery for packages under 5lbs',
      icon: 'Package',
      baseRate: 350,
      isActive: true,
      bookingsCount: 892,
      avgRating: 4.6,
      lastModified: '2024-01-18'
    },
    {
      id: 'real-estate',
      name: 'Real Estate Survey',
      description: 'Comprehensive property surveys and inspection services',
      icon: 'Building',
      baseRate: 1500,
      isActive: true,
      bookingsCount: 156,
      avgRating: 4.9,
      lastModified: '2024-01-15'
    },
    {
      id: 'emergency',
      name: 'Emergency Response',
      description: 'Search and rescue, disaster response, and emergency services',
      icon: 'Zap',
      baseRate: 2500,
      isActive: false,
      bookingsCount: 23,
      avgRating: 5.0,
      lastModified: '2024-01-10'
    }
  ]);

  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    baseRate: 0,
    icon: 'Camera'
  });

  const getIcon = (iconName: string) => {
    const icons = {
      Camera,
      Package,
      Building,
      Zap
    };
    return icons[iconName as keyof typeof icons] || Camera;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const toggleServiceStatus = (serviceId: string) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, isActive: !service.isActive }
        : service
    ));
  };

  const deleteService = (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      setServices(prev => prev.filter(service => service.id !== serviceId));
    }
  };

  const addNewService = () => {
    if (newService.name && newService.description && newService.baseRate > 0) {
      const service = {
        id: newService.name.toLowerCase().replace(/\s+/g, '-'),
        ...newService,
        isActive: true,
        bookingsCount: 0,
        avgRating: 0,
        lastModified: new Date().toISOString().split('T')[0]
      };
      setServices(prev => [...prev, service]);
      setNewService({ name: '', description: '', baseRate: 0, icon: 'Camera' });
      setIsAddingService(false);
    }
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Service Management</h2>
          <p className="text-muted-foreground">Manage drone services and pricing</p>
        </div>
        <Button 
          onClick={() => setIsAddingService(true)}
          className="flex items-center space-x-2"
          variant="orange"
        >
          <Plus className="h-4 w-4" />
          <span>Add Service</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add New Service Modal */}
      {isAddingService && (
        <Card className="border-orange">
          <CardHeader>
            <CardTitle>Add New Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Service Name</Label>
                <Input
                  value={newService.name}
                  onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Aerial Mapping"
                />
              </div>
              <div className="space-y-2">
                <Label>Base Rate (ZAR)</Label>
                <Input
                  type="number"
                  value={newService.baseRate}
                  onChange={(e) => setNewService(prev => ({ ...prev, baseRate: parseInt(e.target.value) }))}
                  placeholder="1000"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={newService.description}
                onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the service..."
              />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <select 
                value={newService.icon}
                onChange={(e) => setNewService(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full p-2 border border-border rounded-md"
              >
                <option value="Camera">Camera</option>
                <option value="Package">Package</option>
                <option value="Building">Building</option>
                <option value="Zap">Lightning</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddingService(false)}>
                Cancel
              </Button>
              <Button onClick={addNewService} variant="orange">
                Add Service
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.map((service) => {
          const IconComponent = getIcon(service.icon);
          
          return (
            <Card key={service.id} className="hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <Badge variant={service.isActive ? "secondary" : "outline"}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span>Base Rate: {formatCurrency(service.baseRate)}</span>
                        <span>•</span>
                        <span>{service.bookingsCount} bookings</span>
                        <span>•</span>
                        <span>⭐ {service.avgRating}/5.0</span>
                        <span>•</span>
                        <span>Updated {service.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`toggle-${service.id}`} className="text-sm">
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Label>
                      <Switch
                        id={`toggle-${service.id}`}
                        checked={service.isActive}
                        onCheckedChange={() => toggleServiceStatus(service.id)}
                      />
                    </div>
                    
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      onClick={() => deleteService(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No services found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServiceManager;