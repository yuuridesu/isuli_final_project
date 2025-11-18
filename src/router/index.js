import { createRouter, createWebHistory } from 'vue-router'

// User Pages
import LoginPage from '../pages/auth/LoginPage.vue'
import RegisterPage from '../pages/auth/RegisterPage.vue'
import UserDashboard from '../pages/user/UserDashboard.vue'
import ItemDetails from '../pages/user/ItemDetails.vue'
import ReportItem from '../pages/user/ReportItem.vue'
import MyItem from '@/pages/user/MyItem.vue'
import Profile from '../pages/user/Profile.vue'
import MyRequest from '@/pages/user/MyRequest.vue'


// Admin Pages

import AdminDashboard from '../pages/admin/AdminDashboard.vue'
import AdminUsers from '../pages/admin/AdminUsers'
import AdminItems from '../pages/admin/AdminItems'
import AdminReports from '../pages/admin/AdminReports'
import AdminLayout from '@/pages/admin/AdminLayout.vue'
import AdminRequest from '@/pages/admin/AdminRequest.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },

  // User pages
  { path: '/user', name: 'UserDashboard', component: UserDashboard },
  { path: '/user/items/:id', name: 'ItemDetails', component: ItemDetails },
  {path: '/user/reportItem', name: 'ReportItem', component: ReportItem},
  { path: '/user/myItem', name: 'MyItem', component: MyItem},
  { path: '/user/myrequest', name: 'Myrequest', component: MyRequest},
   { path: '/user/profile', name: 'UserProfile', component: Profile },

  // // Admin pages
  // { path: '/admin', name: 'AdminDashboard', component: AdminDashboard },
  //  { path: '/admin/users', name: 'AdminUsers', component: AdminUsers },
  //   { path: '/admin/items', name: 'AdminItems', component: AdminItems },
  //    { path: '/admin/reports', name: 'AdminReports', component: AdminReports },

   {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'users', name: 'AdminUsers', component: AdminUsers },
      { path: 'items', name: 'AdminItems', component: AdminItems },
      { path: 'reports', name: 'AdminReports', component: AdminReports },
       { path: 'request', name: 'AdminRequest', component: AdminRequest },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router














// import { createRouter, createWebHistory } from 'vue-router'

// // ✅ Import your pages
// import LoginPage from '../pages/auth/LoginPage.vue'
// import RegisterPage from '../pages/auth/RegisterPage.vue'

// import UserDashboard from '../pages/user/UserDashboard.vue'
// import ItemDetails from '../pages/user/ItemDetails.vue'

// import AdminDashboard from '../pages/admin/AdminDashboard.vue'

// // ✅ Define your routes
// const routes = [
//   // Redirect root URL to login
//   { path: '/', redirect: '/login' },

//   // Public routes
//   { path: '/login', name: 'Login', component: LoginPage },
//   { path: '/register', name: 'Register', component: RegisterPage },

//   // User route
//   { path: '/user',
//     component: UserDashboard,
//     children: [

//       {path: '', name: 'UserDashboard', component: UserDashboard}, //default
//       {path: 'user/items/:id', name: 'ItemDetails', component: ItemDetails}


      
//     ]
//   },
    


//   // Admin route (only one definition)
//   {
//     path: '/admin',
//     name: 'AdminDashboard',
//     component: AdminDashboard,
//     // you can add children later if needed:
//     // children: [
//     //   { path: 'items', name: 'AdminItems', component: Items },
//     //   { path: 'users', name: 'AdminUsers', component: Users },
//     // ]
//   }
// ]

// // ✅ Create and export router
// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// export default router
