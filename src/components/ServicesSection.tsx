import React from 'react';
import ServiceCard from './ServiceCard';

const ServicesSection = () => {
  const services = [
    {
      id: 'photography',
      title: 'Aerial Photography',
      description: 'Professional aerial photography for real estate, events, and marketing campaigns with stunning high-resolution images.',
      icon: 'camera',
      startingPrice: 150,
      duration: '1-3 hours',
      features: [
        'High-resolution 4K photos',
        'Multiple angles and perspectives',
        'Professional editing included',
        'Fast 24-hour delivery'
      ],
      isPopular: true
    },
    {
      id: 'inspection',
      title: 'Property Inspection',
      description: 'Comprehensive property inspections for roofs, solar panels, and infrastructure with detailed reports.',
      icon: 'home',
      startingPrice: 200,
      duration: '1-2 hours',
      features: [
        'Thermal imaging capability',
        'Detailed inspection report',
        'Safety compliance certified',
        'Insurance documentation'
      ]
    },
    {
      id: 'mapping',
      title: 'Mapping & Surveying',
      description: 'Precision mapping and surveying services for construction, agriculture, and land development projects.',
      icon: 'map',
      startingPrice: 300,
      duration: '2-4 hours',
      features: [
        'GPS-accurate mapping',
        '3D terrain modeling',
        'Progress monitoring',
        'CAD-compatible exports'
      ]
    },
    {
      id: 'delivery',
      title: 'Delivery Service',
      description: 'Fast and secure drone delivery for small packages, medical supplies, and urgent deliveries.',
      icon: 'package',
      startingPrice: 25,
      duration: '15-45 minutes',
      features: [
        'Real-time tracking',
        'Secure payload handling',
        'Weather-resistant delivery',
        'Contactless drop-off'
      ]
    },
    {
      id: 'cinematography',
      title: 'Cinematography',
      description: 'Professional video production with cinematic drone footage for films, commercials, and documentaries.',
      icon: 'video',
      startingPrice: 250,
      duration: '2-6 hours',
      features: [
        '4K video recording',
        'Stabilized footage',
        'Creative shot composition',
        'Post-production support'
      ]
    },
    {
      id: 'monitoring',
      title: 'Site Monitoring',
      description: 'Continuous monitoring and surveillance for security, construction progress, and environmental studies.',
      icon: 'settings',
      startingPrice: 100,
      duration: '1-8 hours',
      features: [
        'Live streaming capability',
        'Automated flight patterns',
        'Motion detection alerts',
        'Data analytics reporting'
      ]
    }
  ];

  return (
    <section className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional drone services for every need, delivered by certified pilots with state-of-the-art equipment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-primary hover:text-primary-hover font-medium text-lg underline underline-offset-4 transition-smooth">
            View All Services →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;