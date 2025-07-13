import { Briefcase, Building, User, Users, Settings } from 'lucide-react';

export const ADMIN_NAV_ITEMS = [
  { path: '/admin', icon: 'Home', label: 'Dashboard' },
  { path: '/admin/jobs', icon: 'Briefcase', label: 'Job Listings' },
  { path: '/admin/housing', icon: 'Building', label: 'Housing Listings' },
  { path: '/admin/users', icon: 'User', label: 'User Accounts' },
] as const;

export const QUICK_ACTIONS = [
  {
    to: '/admin/jobs/create',
    icon: Briefcase,
    label: 'Add Job Listing',
    color: 'text-red-500'
  },
  {
    to: '/admin/housing/create',
    icon: Building,
    label: 'Add Housing Listing',
    color: 'text-red-500'
  },
  {
    to: '/admin/users/create',
    icon: User,
    label: 'Add User',
    color: 'text-red-500'
  },
  {
    to: '/admin/settings',
    icon: Settings,
    label: 'Settings',
    color: 'text-red-500'
  }
] as const;

export const STAT_CONFIG = [
  {
    key: 'totalJobs' as const,
    title: 'Jobs',
    description: 'Active job listings',
    icon: Briefcase,
    link: '/admin/jobs'
  },
  {
    key: 'totalHousing' as const,
    title: 'Housing',
    description: 'Available properties',
    icon: Building,
    link: '/admin/housing'
  },
  {
    key: 'totalUsers' as const,
    title: 'Users',
    description: 'Registered users',
    icon: Users,
    link: '/admin/users'
  },
  {
    key: 'totalEmployers' as const,
    title: 'Employers',
    description: 'Registered employers',
    icon: User,
    link: '/admin/users?type=employer'
  }
] as const;