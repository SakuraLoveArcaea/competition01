import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import Top16Page from '../pages/Top16Page.vue';
import Top8Page from '../pages/Top8Page.vue';
import Top8BracketPage from '../pages/Top8BracketPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/top16',
    name: 'Top16',
    component: Top16Page,
  },
  {
    path: '/top8list',
    name: 'Top8List',
    component: Top8Page,
  },
  {
    path: '/top8',
    name: 'Top8Bracket',
    component: Top8BracketPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
