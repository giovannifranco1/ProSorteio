import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [
  // {
  //       path: '/',
  //       name: 'Home',
  //       component: Home
  //   },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import ('../pages/Login.vue')
  },
  {
    path: '/admin',
    name: 'Container',
    component: () =>
      import ('../components/admin/TheContainer.vue'),
    children: [{
        path: '/admin/sorteio/create',
        name: 'Create',
        component: () =>
          import ('../pages/sweepstake/Create.vue')
      },
      {
        path: '/admin/sorteios',
        name: 'Index',
        component: () =>
          import ('../pages/sweepstake/Index.vue')
      },
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router