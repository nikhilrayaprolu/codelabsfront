import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Create New Lab',
    icon: 'thermometer-plus-outline',
    link: '/pages/newlab',
  },
  {
    title: 'My Tracks',
    icon: 'thermometer-outline',
    link: '/pages/mytracks',
  },
  {
    title: 'All Courses',
    icon: 'camera-outline',
    link: '/pages/courses',
  },
  {
    title: 'Profile',
    icon: 'person-outline',
    link: '/pages/profile',
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
