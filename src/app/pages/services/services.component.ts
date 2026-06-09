import { Component } from '@angular/core';

interface ServiceBlock {
  title: string;
  description: string;
  items: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services: ServiceBlock[] = [
    {
      title: 'Property Buying',
      description: 'We help clients find residential, commercial, and investment properties that match their requirements and budget. Our team provides expert guidance throughout the buying process, including property selection, market evaluation, negotiations, and documentation support.',
      items: [
        'Residential property purchase assistance',
        'Commercial property consultation',
        'Investment property guidance',
        'Property verification and due diligence',
        'Legal and documentation support'
      ]
    },
    {
      title: 'Property Selling',
      description: 'Selling a property requires the right strategy and market understanding. We assist property owners in achieving the best possible value through professional marketing, buyer outreach, and smooth transaction management.',
      items: [
        'Property valuation and market analysis',
        'Professional property marketing',
        'Buyer coordination and negotiations',
        'Documentation and legal assistance',
        'End-to-end sales support'
      ]
    },
    {
      title: 'Construction Services',
      description: 'SVR Property Landmark provides quality construction solutions for residential, commercial, and infrastructure projects. We focus on delivering projects that meet modern standards of safety, functionality, and design while ensuring timely completion and attention to detail.',
      items: [
        'Residential construction',
        'Commercial building projects',
        'Turnkey construction solutions',
        'Renovation and redevelopment',
        'Project planning and management'
      ]
    },
    {
      title: 'Land Development',
      description: 'Our land development services are designed to transform land into productive and valuable assets. From planning and approvals to infrastructure development and project execution, we manage the complete development process with professionalism and efficiency.',
      items: [
        'Land acquisition support',
        'Site planning and development',
        'Layout and infrastructure planning',
        'Project approvals and coordination',
        'Residential and commercial land development'
      ]
    }
  ];
}
