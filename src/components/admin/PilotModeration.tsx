import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  UserCheck, 
  UserX, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Shield
} from 'lucide-react';

const PilotModeration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showConfirmModal, setShowConfirmModal] = useState<{ action: string; pilotId: string } | null>(null);
  
  const [pilots, setPilots] = useState([
    {
      id: 'pilot-001',
      name: 'Sarah Johnson',
      email: 'sarah.j@flyeeze.com',
      phone: '+27 82 123 4567',
      location: 'Cape Town',
      avatar: '/placeholder.svg',
      status: 'active',
      rating: 4.9,
      reviewCount: 156,
      completedJobs: 203,
      totalEarnings: 125890,
      joinDate: '2023-06-15',
      lastActive: '2024-01-20',
      verification: {
        license: true,
        insurance: true,
        background: true
      },
      pricingMultiplier: 1.1,
      specialties: ['Aerial Photography', 'Real Estate'],
      flagCount: 0,
      suspensionHistory: []
    },
    {
      id: 'pilot-002',
      name: 'Mike Chen',
      email: 'mike.chen@flyeeze.com',
      phone: '+27 83 987 6543',
      location: 'Johannesburg',
      avatar: '/placeholder.svg',
      status: 'suspended',
      rating: 4.2,
      reviewCount: 89,
      completedJobs: 97,
      totalEarnings: 45670,
      joinDate: '2023-09-10',
      lastActive: '2024-01-18',
      verification: {
        license: true,
        insurance: false,
        background: true
      },
      pricingMultiplier: 0.9,
      specialties: ['Delivery', 'Emergency Response'],
      flagCount: 3,
      suspensionHistory: [
        { date: '2024-01-15', reason: 'Insurance expired', admin: 'Admin Sarah' }
      ]
    },
    {
      id: 'pilot-003',
      name: 'David Rodriguez',
      email: 'david.r@flyeeze.com',
      phone: '+27 81 555 1234',
      location: 'Durban',
      avatar: '/placeholder.svg',
      status: 'pending',
      rating: 0,
      reviewCount: 0,
      completedJobs: 0,
      totalEarnings: 0,
      joinDate: '2024-01-19',
      lastActive: '2024-01-20',
      verification: {
        license: true,
        insurance: true,
        background: false
      },
      pricingMultiplier: 1.0,
      specialties: ['Real Estate Survey'],
      flagCount: 0,
      suspensionHistory: []
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-secondary/20 text-secondary">Active</Badge>;
      case 'suspended':
        return <Badge variant="outline" className="border-red-500 text-red-600">Suspended</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-orange text-orange">Pending Review</Badge>;
      default:
        return null;
    }
  };

  const togglePilotStatus = (pilotId: string, newStatus: string) => {
    setPilots(prev => prev.map(pilot => 
      pilot.id === pilotId 
        ? { 
            ...pilot, 
            status: newStatus,
            suspensionHistory: newStatus === 'suspended' 
              ? [...pilot.suspensionHistory, {
                  date: new Date().toISOString().split('T')[0],
                  reason: 'Admin action',
                  admin: 'Current Admin'
                }]
              : pilot.suspensionHistory
          }
        : pilot
    ));
    setShowConfirmModal(null);
  };

  const filteredPilots = pilots.filter(pilot => {
    const matchesSearch = pilot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pilot.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || pilot.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const ConfirmationModal = () => {
    if (!showConfirmModal) return null;

    const pilot = pilots.find(p => p.id === showConfirmModal.pilotId);
    const isActivating = showConfirmModal.action === 'activate';

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange" />
              <span>Confirm Action</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Are you sure you want to {isActivating ? 'activate' : 'suspend'} <strong>{pilot?.name}</strong>?
            </p>
            {!isActivating && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  This will prevent the pilot from receiving new bookings and completing existing ones.
                </AlertDescription>
              </Alert>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowConfirmModal(null)}>
                Cancel
              </Button>
              <Button 
                variant={isActivating ? "orange" : "destructive"}
                onClick={() => togglePilotStatus(showConfirmModal.pilotId, isActivating ? 'active' : 'suspended')}
              >
                {isActivating ? 'Activate' : 'Suspend'} Pilot
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pilot Moderation</h2>
          <p className="text-muted-foreground">Monitor and manage pilot accounts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{pilots.filter(p => p.status === 'pending').length} Pending</Badge>
          <Badge variant="outline">{pilots.filter(p => p.flagCount > 0).length} Flagged</Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pilots by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              {['all', 'active', 'suspended', 'pending'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="capitalize"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pilots List */}
      <div className="space-y-4">
        {filteredPilots.map((pilot) => (
          <Card key={pilot.id} className="hover:shadow-card transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={pilot.avatar}
                    alt={pilot.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{pilot.name}</h3>
                      {getStatusBadge(pilot.status)}
                      {pilot.flagCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {pilot.flagCount} Flag{pilot.flagCount > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span>{pilot.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{pilot.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>{pilot.location}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{pilot.rating}/5.0 ({pilot.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-muted-foreground" />
                          <span>{pilot.completedJobs} completed jobs</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span>{formatCurrency(pilot.totalEarnings)} earned</span>
                        </div>
                      </div>
                    </div>

                    {/* Verification Status */}
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-1">
                        <Shield className={`h-3 w-3 ${pilot.verification.license ? 'text-secondary' : 'text-muted-foreground'}`} />
                        <span className="text-xs">License</span>
                        {pilot.verification.license ? <CheckCircle className="h-3 w-3 text-secondary" /> : <Clock className="h-3 w-3 text-muted-foreground" />}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className={`h-3 w-3 ${pilot.verification.insurance ? 'text-secondary' : 'text-muted-foreground'}`} />
                        <span className="text-xs">Insurance</span>
                        {pilot.verification.insurance ? <CheckCircle className="h-3 w-3 text-secondary" /> : <Clock className="h-3 w-3 text-muted-foreground" />}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className={`h-3 w-3 ${pilot.verification.background ? 'text-secondary' : 'text-muted-foreground'}`} />
                        <span className="text-xs">Background</span>
                        {pilot.verification.background ? <CheckCircle className="h-3 w-3 text-secondary" /> : <Clock className="h-3 w-3 text-muted-foreground" />}
                      </div>
                    </div>

                    {/* Pricing Multiplier */}
                    <div className="mt-3">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs">Pricing Multiplier: {pilot.pricingMultiplier}x</span>
                        {pilot.pricingMultiplier > 1.15 && (
                          <Badge variant="outline" className="text-xs border-orange text-orange">High</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2">
                  {pilot.status === 'active' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => setShowConfirmModal({ action: 'suspend', pilotId: pilot.id })}
                    >
                      <UserX className="h-4 w-4 mr-1" />
                      Suspend
                    </Button>
                  ) : pilot.status === 'suspended' ? (
                    <Button 
                      variant="orange" 
                      size="sm"
                      onClick={() => setShowConfirmModal({ action: 'activate', pilotId: pilot.id })}
                    >
                      <UserCheck className="h-4 w-4 mr-1" />
                      Activate
                    </Button>
                  ) : (
                    <Button variant="orange" size="sm">
                      <UserCheck className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPilots.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No pilots found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </CardContent>
        </Card>
      )}

      <ConfirmationModal />
    </div>
  );
};

export default PilotModeration;