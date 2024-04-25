export const sidebarLinks = [
  {
    id: 1,
    title: 'MAIN',
    listItems: [
      {
        id: 1,
        title: 'Dashboard',
        url: '/admin',
        icon: '/icons/dashboard.svg',
      },
      {
        id: 2,
        title: 'Profile',
        url: `/admin/users/`,
        icon: '/icons/user.svg',
      },
    ],
  },
  {
    id: 2,
    title: 'LISTS',
    listItems: [
      {
        id: 1,
        title: 'Users',
        url: '/admin/users',
        icon: '/icons/user.svg',
      },
      {
        id: 2,
        title: 'Products',
        url: '/products',
        icon: '/icons/product.svg',
      },
      {
        id: 3,
        title: 'Orders',
        url: '/orders',
        icon: '/icons/order.svg',
      },
      {
        id: 4,
        title: 'Posts',
        url: '/posts',
        icon: '/icons/post.svg',
      },
    ],
  },
  {
    id: 3,
    title: 'GENERAL',
    listItems: [
      {
        id: 1,
        title: 'Elements',
        url: '/',
        icon: '/icons/element.svg',
      },
      {
        id: 2,
        title: 'Notes',
        url: '/',
        icon: '/icons/note.svg',
      },
      {
        id: 3,
        title: 'Forms',
        url: '/',
        icon: '/icons/form.svg',
      },
      {
        id: 4,
        title: 'Calendar',
        url: '/admin/calendar',
        icon: '/icons/calendar.svg',
      },
    ],
  },
  {
    id: 4,
    title: 'MAINTENANCE',
    listItems: [
      {
        id: 1,
        title: 'Settings',
        url: '/admin/settings',
        icon: '/icons/setting.svg',
      },
      {
        id: 2,
        title: 'Backups',
        url: '/',
        icon: '/icons/backup.svg',
      },
    ],
  },
  {
    id: 5,
    title: 'ANALYTICS',
    listItems: [
      {
        id: 1,
        title: 'Charts',
        url: '/admin/charts',
        icon: '/icons/chart.svg',
      },
      {
        id: 2,
        title: 'Logs',
        url: '/',
        icon: '/icons/log.svg',
      },
    ],
  },
];
