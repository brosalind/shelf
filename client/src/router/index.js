import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import BookPage from '../views/BookPage.vue'
import BookDetailPage from '../views/BookDetailPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import HomePage from '../views/HomePage.vue'
import NotFound from '../views/notFound.vue'
import ShelfPage from '../views/ShelfPage.vue'
import DiscussionThread from '../components/DiscussionThread.vue'
import ProfilePage from '../views/ProfilePage.vue'
import BookDetailUserPage from '../views/BookDetailUser.vue'
import NotesForm from '../components/NotesForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/books',
      name: 'books',
      component: BookPage
    },
    {
      path: '/books/:id',
      name: 'booksDetail',
      component: BookDetailPage
    },
    {
      path: '/thread',
      name: 'thread',
      component: DiscussionThread
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/shelf',
      name: 'shelf',
      component: ShelfPage
    },
    {
      path: '/shelf/:id',
      name: 'userbookDetail',
      component: BookDetailUserPage
    },
    {
      path: '/notes/add/:id',
      name: 'addnotes',
      component: NotesForm
    },
    {
      path: '/user',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound
    },
  ]
})
router.beforeEach((to, from, next) => {
  if (((to.name === 'shelf') || (to.name ==='home')) && !localStorage.access_token) {
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'register') && localStorage.access_token) {
    next({ name: 'shelf' })
  }
  else {
    next()
  }
})


export default router
