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
        name: 'CreateSweepstake',
        component: () =>
          import ('../pages/sweepstake/Create.vue')
      },
      {
        path: '/admin/sorteios',
        name: 'IndexSweepstake',
        component: () =>
          import ('../pages/sweepstake/Index.vue')
      },
      {
        path: '/admin/categorias',
        name: 'IndexCategory',
        component: () =>
          import ('../pages/category/Index.vue')
      },
      {
        path: '/admin/categoria/create',
        name: 'CreateCategory',
        component: () =>
          import ('../pages/category/Create.vue')
      },
      {
        path: '/admin/membros',
        name: 'IndexMember',
        component: () =>
          import ('../pages/member/Index.vue')
      },
      {
        path: '/admin/membro/create',
        name: 'CreateMember',
        component: () =>
          import ('../pages/member/Create.vue')
      },
      {
        path: '/admin/membros/edit/:id',
        name: 'EditMember',
        component: () =>
          import ('../pages/member/Edit.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: () =>
      import ('../pages/Home.vue')
  },
  {
    path: '/home/inscricao/:id',
    name: 'Inscricao',
    component: () =>
      import ('../pages/Inscricao.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () =>
      import ('../pages/errors/NotFound.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router