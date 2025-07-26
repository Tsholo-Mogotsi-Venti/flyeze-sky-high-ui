import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Upload, 
  Camera, 
  Package, 
  Building, 
  Zap,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';

const PilotSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [insuranceUploaded, setInsuranceUploaded] = useState(false);

  const services = [
    {
      id: 'aerial-photography',
      name: 'Aerial Photography',
      icon: Camera,
      baseRate: 150,
      description: 'Professional aerial photography for events, real estate, and marketing'
    },
    {
      id: 'delivery',
      name: 'Delivery Service',
      icon: Package,
      baseRate: 50,
      description: 'Fast and reliable drone delivery for packages under 5lbs'
    },
    {
      id: 'real-estate',
      name: 'Real Estate Survey',
      icon: Building,
      baseRate: 200,
      description: 'Comprehensive property surveys and inspection services'
    },
    {
      id: 'emergency',
      name: 'Emergency Response',
      icon: Zap,
      baseRate: 300,
      description: 'Search and rescue, disaster response, and emergency services'
    }
  ];

  const serviceAreas = [
    'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island',
    'Jersey City', 'Hoboken', 'Newark', 'Long Island', 'Westchester'
  ];

  const weekDays = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' }
  ];

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleAreaToggle = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
        <p className="text-muted-foreground">Tell us about yourself and your drone pilot experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="Enter your first name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Enter your last name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="Enter your phone number" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Professional Bio</Label>
        <Textarea 
          id="bio" 
          placeholder="Tell customers about your experience, specialties, and what makes you a great pilot..."
          className="min-h-[120px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience</Label>
        <Input id="experience" type="number" placeholder="How many years have you been flying drones professionally?" />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Licenses & Certifications</h2>
        <p className="text-muted-foreground">Upload your required documents to get verified</p>
      </div>

      {/* Part 107 License */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Part 107 Remote Pilot License</span>
            {licenseUploaded && <CheckCircle className="h-5 w-5 text-secondary" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Upload Part 107 License</p>
            <p className="text-muted-foreground mb-4">PDF, JPG, or PNG files up to 10MB</p>
            <Button 
              variant="outline" 
              onClick={() => setLicenseUploaded(true)}
            >
              Choose File
            </Button>
            {licenseUploaded && (
              <div className="mt-4 flex items-center justify-center space-x-2 text-secondary">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">part107_license.pdf uploaded</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Insurance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Liability Insurance</span>
            {insuranceUploaded && <CheckCircle className="h-5 w-5 text-secondary" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Upload Insurance Certificate</p>
            <p className="text-muted-foreground mb-4">Minimum $1M liability coverage required</p>
            <Button 
              variant="outline"
              onClick={() => setInsuranceUploaded(true)}
            >
              Choose File
            </Button>
            {insuranceUploaded && (
              <div className="mt-4 flex items-center justify-center space-x-2 text-secondary">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">insurance_cert.pdf uploaded</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-primary">Verification Process</p>
            <p className="text-sm text-muted-foreground mt-1">
              Our team will review your documents within 24-48 hours. You'll receive an email notification once approved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Services & Pricing</h2>
        <p className="text-muted-foreground">Select the services you offer and set your rates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => {
          const IconComponent = service.icon;
          const isSelected = selectedServices.includes(service.id);
          
          return (
            <Card 
              key={service.id}
              className={`cursor-pointer transition-all duration-300 ${
                isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-card'
              }`}
              onClick={() => handleServiceToggle(service.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">Base: R{service.baseRate}/hr</p>
                    </div>
                  </div>
                  <Checkbox checked={isSelected} />
                </div>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                
                {isSelected && (
                  <div className="space-y-3 border-t pt-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor={`rate-${service.id}`} className="text-sm">Your hourly rate (ZAR)</Label>
                    </div>
                    <Input 
                      id={`rate-${service.id}`}
                      type="number" 
                      placeholder={`R${service.baseRate}`}
                      className="w-full"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Service Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Service Areas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Select the areas where you're willing to provide services</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {serviceAreas.map((area) => (
              <div 
                key={area}
                className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedAreas.includes(area) 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleAreaToggle(area)}
              >
                <Checkbox checked={selectedAreas.includes(area)} />
                <span className="text-sm">{area}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Availability Schedule</h2>
        <p className="text-muted-foreground">Set your working hours and availability preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Weekly Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {weekDays.map((day) => (
            <div key={day.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Checkbox />
                <span className="font-medium">{day.label}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm">From:</Label>
                  <Input type="time" className="w-24" defaultValue="09:00" />
                </div>
                <div className="flex items-center space-x-2">
                  <Label className="text-sm">To:</Label>
                  <Input type="time" className="w-24" defaultValue="17:00" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Booking Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Minimum advance booking time</Label>
            <select className="w-full p-2 border border-border rounded-md">
              <option>2 hours</option>
              <option>4 hours</option>
              <option>8 hours</option>
              <option>24 hours</option>
              <option>48 hours</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label>Maximum booking duration per day</Label>
            <select className="w-full p-2 border border-border rounded-md">
              <option>4 hours</option>
              <option>6 hours</option>
              <option>8 hours</option>
              <option>10 hours</option>
              <option>No limit</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox />
            <Label className="text-sm">Allow weekend bookings</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox />
            <Label className="text-sm">Accept emergency bookings (2x rate)</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Pilot Profile Setup</h1>
            <Badge variant="outline">{currentStep} of 4</Badge>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between max-w-4xl mx-auto mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <div className="flex space-x-4">
            <Button variant="outline">
              Save Draft
            </Button>
            {currentStep < 4 ? (
              <Button onClick={nextStep} variant="orange">
                Next Step
              </Button>
            ) : (
              <Button variant="orange">
                Complete Setup
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PilotSetup;