
import { createRouter, createWebHistory } from 'vue-router'

// ✅ User Pages
import LoginPage from '../pages/auth/LoginPage.vue'
import RegisterPage from '../pages/auth/RegisterPage.vue'
import UserDashboard from '../pages/user/UserDashboard.vue'
import ItemDetails from '../pages/user/ItemDetails.vue'
import ReportItem from '../pages/user/ReportItem.vue'
import MyItem from '@/pages/user/MyItem.vue'
import Profile from '../pages/user/Profile.vue'
import MyRequest from '@/pages/user/MyRequest.vue'
import Notification from '@/pages/user/Notification.vue'

// ✅ Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard.vue'
import AdminUsers from '../pages/admin/AdminUsers.vue'
import AdminItems from '../pages/admin/AdminItems.vue'
import AdminRequest from '@/pages/admin/AdminRequest.vue'
import AdminLayout from '@/pages/admin/AdminLayout.vue'
import AuditLogs from '@/pages/admin/AuditLogs.vue'

// ✅ Define routes
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },

  // User pages
  { path: '/user', name: 'UserDashboard', component: UserDashboard },
  { path: '/user/items/:id', name: 'ItemDetails', component: ItemDetails },
  { path: '/user/reportItem', name: 'ReportItem', component: ReportItem },
  { path: '/user/myItem', name: 'MyItem', component: MyItem },
  { path: '/user/myrequest', name: 'MyRequest', component: MyRequest },
  { path: '/user/profile', name: 'UserProfile', component: Profile },
  { path: '/user/notification', name:'UserNotification', component: Notification },

  // Admin pages with layout
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'users', name: 'AdminUsers', component: AdminUsers },
      { path: 'items', name: 'AdminItems', component: AdminItems },
      // { path: 'reports', name: 'AdminReports', component: AdminReports,,
      {path: 'auditlogs', name: 'AuditLogs', component: AuditLogs},
      {path: 'request', name: 'AdminRequest', component:AdminRequest},
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)

  // Try-catch in case localStorage is empty or malformed
  let loggedInUser = null
  try {
    loggedInUser = JSON.parse(localStorage.getItem('user'))
  } catch (err) {
    loggedInUser = null
  }

  if (authRequired && !loggedInUser) {
    return next('/login')
  }

  // Optional role-based guard
  if (to.path.startsWith('/admin') && loggedInUser?.role !== 'admin') {
    return next('/login')
  }
  if (to.path.startsWith('/user') && loggedInUser?.role !== 'user') {
    return next('/login')
  }

  next()
})


export default router









