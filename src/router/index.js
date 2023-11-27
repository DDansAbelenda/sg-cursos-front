import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import CourseView from '../views/CourseView.vue'
import EditionView from '../views/EditionView.vue'
import AboutUsView from '../views/AboutUsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/employee/:section?',
    name: 'employee',
    component: EmployeeView
  },
  {
    path: '/course',
    name: 'course',
    component: CourseView
  },
  {
    path: '/edition',
    name: 'edition',
    component: EditionView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutUsView
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
