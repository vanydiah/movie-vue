import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'home', component: () => import('pages/IndexPage.vue') }, { path: 'form-movie/:id?', name: 'formMovie', component: () => import('src/pages/FormEdit.vue') }, { path: 'form-filter', name: 'formFilter', component: () => import('pages/FilterRow.vue') }],
  },
  {
    path: '/my-collection',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'my-collection', component: () => import('pages/MyCollection.vue') }, { path: 'form-movie/:id?', name: 'formMovie', component: () => import('src/pages/FormEdit.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
