import { NavItem } from '@/types';

export const siteConfig = {
  name: 'RealXDeal',
  url: '',
  ogImage: '',
  description: '',
  mainNav: [
    {
      title: 'Game',
      href: '/'
    },
    {
      title: 'How to play',
      href: '/'
    },
    {
      title: 'Marketplace',
      href: '/'
    },
    {
      title: 'About us',
      href: '/'
    }
  ],
  sideNav: [
    {
      title: 'Home',
      href: '/home',
      icon: 'GameController'
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: 'Alien'
    },
    {
      title: 'Task',
      href: '/tasks',
      icon: 'PuzzlePiece'
    },
    {
      title: 'LeaderBoard',
      href: '/leadboard',
      icon: 'Medal'
    },
    {
      title: 'Marketplace',
      href: '/marketplace',
      icon: 'Storefront'
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: 'GearSix'
    }
  ] satisfies NavItem[],
  links: {
    twitter: '',
    discord: '',
    telegram: ''
  }
};

export type SiteConfig = typeof siteConfig;
