const userRoutes = [
  {
    name: 'UserList',
    path: '/users',
  },
  {
    name: 'TrendList',
    path: '/trends',
  },
  {
    name: 'Trend',
    path: '/trends/:animal_id',
    hasParams: true,
  },
]

const serialRoutes = [
  {
    name: 'SerialList',
    path: '/serials',
  },
  {
    name: 'Serial',
    path: '/serials/:serial_id',
    hasParams: true,
  },
  {
    name: 'OrderList',
    path: '/orders',
  },
]

export {
  userRoutes,
  serialRoutes,
}
