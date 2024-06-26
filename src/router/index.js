import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/courses',
    name: 'coursesList',
    component: () => import('../views/courses/CoursesListView.vue'),
  },
  {
    path: '/courses/:id',
    name: 'courseDetails',
    component: () => import('../views/courses/CourseDetailsView.vue'),
  },
  {
    path: '/courses/:id/edit',
    name: 'courseEdit',
    component: () => import('../views/courses/CourseEditView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
