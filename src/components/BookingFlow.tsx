import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Camera, 
  CreditCard, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  QrCode 
} from 'lucide-react';

const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const services = [
    { id: 'photography', name: 'Aerial Photography', price: 150, duration: '2 hours' },
    { id: 'inspection', name: 'Property Inspection', price: 200, duration: '1 hour' },
    { id: 'mapping', name: 'Mapping & Surveying', price: 300, duration: '3 hours' },
    { id: 'delivery', name: 'Delivery Service', price: 50, duration: '30 min' }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                currentStep >= step 
                  ? 'bg-primary text-white shadow-elegant' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {currentStep > step ? <Check className="h-5 w-5" /> : step}
              </div>
              {step < 4 && (
                <div className={`w-24 h-1 mx-2 rounded transition-all duration-300 ${
                  currentStep > step ? 'bg-primary' : 'bg-muted'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {currentStep === 1 && 'Select Service'}
            {currentStep === 2 && 'Choose Date & Time'}
            {currentStep === 3 && 'Payment Details'}
            {currentStep === 4 && 'Booking Confirmed'}
          </h2>
          <p className="text-muted-foreground">
            Step {currentStep} of 4
          </p>
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-8 shadow-card">
        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    selectedService === service.id
                      ? 'border-primary bg-accent shadow-elegant'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Camera className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                  </div>
                  <div className="text-muted-foreground mb-3">
                    Duration: {service.duration}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    ${service.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Select Date
                </h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Time Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Available Times
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border transition-all duration-300 ${
                        selectedTime === time
                          ? 'border-primary bg-accent text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Payment Form */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-primary" />
                  Payment Information
                </h3>
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-3 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="p-3 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="p-3 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full p-3 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Order Summary */}
              <div className="bg-accent/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Service</span>
                    <span>Aerial Photography</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date</span>
                    <span>{selectedDate || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time</span>
                    <span>{selectedTime || 'Not selected'}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">$150</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div className="text-center space-y-6">
            <div className="bg-gradient-hero w-20 h-20 rounded-full mx-auto flex items-center justify-center">
              <Check className="h-10 w-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-muted-foreground mb-6">
                Your drone service has been booked successfully. You'll receive a confirmation email shortly.
              </p>
            </div>

            {/* QR Code for pilot verification */}
            <div className="bg-accent/50 rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center mb-4">
                <QrCode className="h-16 w-16 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Show this QR code to your pilot for verification
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Booking ID: #FE-2024-001
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                View Booking Details
              </Button>
              <Button variant="hero">
                Track Pilot
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Navigation Buttons */}
      {currentStep < 4 && (
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="hero"
            onClick={nextStep}
            className="flex items-center"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingFlow;