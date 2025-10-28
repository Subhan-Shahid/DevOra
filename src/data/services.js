export const servicesData = [
  {
    slug: 'software-development',
    title: 'Software Development',
    summary: 'Custom enterprise software solutions built with cutting-edge technologies.',
    description:
      'We build scalable, secure, and maintainable software tailored to your business needs. From architecture to deployment, our team follows best practices and modern tooling to deliver reliable solutions.',
    features: [
      'Microservices and modular architectures',
      'Cloud-native deployments (AWS, Azure, GCP)',
      'Automated testing and CI/CD',
      'Robust security and compliance',
    ],
    iconColor: '#667eea',
    pricingTiers: [
      {
        name: 'Basic',
        price: '35,000 PKR',
        duration: 'Starting from',
        description: 'Perfect for small businesses and startups',
        features: [
          'Single module application',
          'Basic UI/UX design',
          'Database setup',
          'User authentication',
          'Admin panel',
          '30 days support',
          'Basic documentation',
          'Deployment assistance'
        ],
        timeline: '2-4 weeks',
        popular: false
      },
      {
        name: 'Pro',
        price: '75,000 PKR',
        duration: 'Starting from',
        description: 'Ideal for growing businesses',
        features: [
          'Multi-module application',
          'Advanced UI/UX design',
          'Complex database architecture',
          'Role-based access control',
          'API integrations',
          'Payment gateway integration',
          '90 days support',
          'Complete documentation',
          'Cloud deployment',
          'Performance optimization'
        ],
        timeline: '4-8 weeks',
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        duration: 'Quote',
        description: 'For large-scale enterprise solutions',
        features: [
          'Unlimited modules',
          'Custom design system',
          'Microservices architecture',
          'Advanced security features',
          'Third-party integrations',
          'Real-time features',
          'Load balancing & scaling',
          '1 year support',
          'Dedicated project manager',
          'Training sessions',
          'SLA guarantee',
          'Priority support'
        ],
        timeline: '8-16 weeks',
        popular: false
      }
    ],
    timeline: {
      phases: [
        { name: 'Discovery & Planning', duration: '1 week', description: 'Requirements gathering and project planning' },
        { name: 'Design & Architecture', duration: '1-2 weeks', description: 'UI/UX design and system architecture' },
        { name: 'Development', duration: '4-10 weeks', description: 'Core development and feature implementation' },
        { name: 'Testing & QA', duration: '1-2 weeks', description: 'Comprehensive testing and bug fixes' },
        { name: 'Deployment & Launch', duration: '3-5 days', description: 'Production deployment and go-live' }
      ]
    }
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    summary: 'Stunning, responsive websites that convert visitors into customers.',
    description:
      'We craft performant and accessible websites with modern design systems, SEO best practices, and pixel-perfect responsiveness across devices.',
    features: [
      'SEO-optimized architecture',
      'Performance budgets and Lighthouse 95+ scores',
      'Headless CMS integrations',
      'A/B testing and conversion tracking',
    ],
    iconColor: '#f093fb',
    pricingTiers: [
      {
        name: 'Basic',
        price: '30,000 PKR',
        duration: 'Starting from',
        description: 'Perfect for personal and small business sites',
        features: [
          'Up to 5 pages',
          'Responsive design',
          'Contact form',
          'Basic SEO setup',
          'Social media integration',
          'Google Analytics',
          '30 days support',
          'Free domain & hosting (1 year)'
        ],
        timeline: '1-2 weeks',
        popular: false
      },
      {
        name: 'Pro',
        price: '60,000 PKR',
        duration: 'Starting from',
        description: 'Best for professional businesses',
        features: [
          'Up to 15 pages',
          'Custom design',
          'CMS integration',
          'Advanced SEO',
          'Blog functionality',
          'E-commerce ready',
          'Newsletter integration',
          'Live chat widget',
          '90 days support',
          'Performance optimization',
          'Security features'
        ],
        timeline: '2-4 weeks',
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        duration: 'Quote',
        description: 'For complex web applications',
        features: [
          'Unlimited pages',
          'Custom web application',
          'Headless CMS',
          'Multi-language support',
          'Advanced e-commerce',
          'Custom integrations',
          'API development',
          'Progressive Web App (PWA)',
          '1 year support',
          'Dedicated account manager',
          'Training & documentation',
          'Priority updates'
        ],
        timeline: '4-8 weeks',
        popular: false
      }
    ],
    timeline: {
      phases: [
        { name: 'Planning & Strategy', duration: '2-3 days', description: 'Content strategy and sitemap planning' },
        { name: 'Design', duration: '1 week', description: 'UI/UX design and mockups' },
        { name: 'Development', duration: '1-4 weeks', description: 'Frontend and backend development' },
        { name: 'Content & Testing', duration: '3-5 days', description: 'Content population and testing' },
        { name: 'Launch', duration: '1-2 days', description: 'Final deployment and go-live' }
      ]
    }
  },
  {
    slug: 'app-development',
    title: 'App Development',
    summary: 'Native and cross-platform mobile apps that engage users and drive growth.',
    description:
      'We deliver high-quality mobile applications with smooth UX, robust offline support, and secure API integrations for iOS and Android.',
    features: [
      'React Native and native stacks',
      'App Store/Play Store readiness',
      'Push notifications and deep links',
      'Analytics and crash reporting',
    ],
    iconColor: '#4facfe',
    pricingTiers: [
      {
        name: 'Basic',
        price: '50,000 PKR',
        duration: 'Starting from',
        description: 'Simple mobile app for single platform',
        features: [
          'Single platform (iOS or Android)',
          'Up to 5 screens',
          'Basic UI/UX',
          'User authentication',
          'Push notifications',
          'Basic API integration',
          'App store submission',
          '30 days support'
        ],
        timeline: '3-5 weeks',
        popular: false
      },
      {
        name: 'Pro',
        price: '120,000 PKR',
        duration: 'Starting from',
        description: 'Cross-platform app with advanced features',
        features: [
          'iOS & Android (cross-platform)',
          'Up to 15 screens',
          'Custom UI/UX design',
          'Advanced authentication',
          'Real-time features',
          'Payment integration',
          'Offline mode',
          'Analytics & tracking',
          'Social media integration',
          '90 days support',
          'App store optimization'
        ],
        timeline: '6-10 weeks',
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        duration: 'Quote',
        description: 'Complex native apps with enterprise features',
        features: [
          'Native iOS & Android',
          'Unlimited screens',
          'Complex architecture',
          'Advanced security',
          'Backend development',
          'Third-party integrations',
          'Geolocation & maps',
          'Video/audio streaming',
          'AR/VR features',
          'Admin dashboard',
          '1 year support',
          'Dedicated team',
          'Regular updates',
          'White-label option'
        ],
        timeline: '10-20 weeks',
        popular: false
      }
    ],
    timeline: {
      phases: [
        { name: 'Research & Planning', duration: '1 week', description: 'Market research and feature planning' },
        { name: 'Design', duration: '2 weeks', description: 'UI/UX design and prototyping' },
        { name: 'Development', duration: '6-14 weeks', description: 'App development and API integration' },
        { name: 'Testing', duration: '1-2 weeks', description: 'QA testing on multiple devices' },
        { name: 'Deployment', duration: '1 week', description: 'App store submission and launch' }
      ]
    }
  },
];
