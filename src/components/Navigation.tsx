import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plane, Menu, X, User, Search, Bell } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-hero p-2 rounded-lg shadow-elegant">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              FlyEeze
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-smooth font-medium">
              Find Pilots
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-smooth font-medium">
              Services
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-smooth font-medium">
              How it Works
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-smooth font-medium">
              Become a Pilot
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button variant="orange" size="lg">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-slide-up">
            <a href="#" className="block text-foreground hover:text-primary transition-smooth font-medium py-2">
              Find Pilots
            </a>
            <a href="#" className="block text-foreground hover:text-primary transition-smooth font-medium py-2">
              Services
            </a>
            <a href="#" className="block text-foreground hover:text-primary transition-smooth font-medium py-2">
              How it Works
            </a>
            <a href="#" className="block text-foreground hover:text-primary transition-smooth font-medium py-2">
              Become a Pilot
            </a>
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button variant="orange" className="w-full">
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;