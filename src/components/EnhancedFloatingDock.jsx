import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FloatingDock } from './ui/floating-dock';
import {
  IconHome,
  IconBriefcase,
  IconUsers,
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCode,
} from '@tabler/icons-react';

const EnhancedFloatingDock = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href) => {
    if (href.startsWith('http')) {
      // External link
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (href.startsWith('#')) {
      // Anchor link - smooth scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Internal route
      navigate(href);
    }
  };

  const dockLinks = [
    {
      title: "Home",
      icon: (
        <IconHome 
          className={`h-full w-full transition-colors ${
            location.pathname === '/' 
              ? 'text-blue-500 dark:text-blue-400' 
              : 'text-neutral-500 dark:text-neutral-300'
          }`} 
        />
      ),
      href: "/",
    },
    {
      title: "Services",
      icon: (
        <IconCode 
          className={`h-full w-full transition-colors ${
            location.pathname.includes('/services') 
              ? 'text-purple-500 dark:text-purple-400' 
              : 'text-neutral-500 dark:text-neutral-300'
          }`} 
        />
      ),
      href: "/services",
    },
    {
      title: "Portfolio",
      icon: <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300 hover:text-green-500 dark:hover:text-green-400 transition-colors" />,
      href: "#portfolio",
    },
    {
      title: "Contact",
      icon: (
        <IconMail 
          className={`h-full w-full transition-colors ${
            location.pathname === '/contact' 
              ? 'text-red-500 dark:text-red-400' 
              : 'text-neutral-500 dark:text-neutral-300'
          }`} 
        />
      ),
      href: "/contact",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300 hover:text-gray-800 dark:hover:text-white transition-colors" />,
      href: "https://github.com/devora-team",
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />,
      href: "https://linkedin.com/company/devora",
    },
  ];

  // Convert href to onClick handlers
  const enhancedLinks = dockLinks.map(link => ({
    ...link,
    href: "#", // Prevent default navigation
    onClick: (e) => {
      e.preventDefault();
      handleNavigation(link.href);
    }
  }));

  return (
    <FloatingDock 
      items={enhancedLinks}
      desktopClassName={`backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-lg ${className || ''}`}
      mobileClassName="backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10"
    />
  );
};

export default EnhancedFloatingDock;
