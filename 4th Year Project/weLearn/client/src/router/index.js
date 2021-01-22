import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../../src/store';

Vue.use(VueRouter)

/* Paths To all Pages */
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  


 routes: [
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterUser')
  },

  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/UserList')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin')
  },
  {
    
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/UserEdit')
  },
  {
    path: '/room',
    name: 'room',
    component: () => import('../views/Room.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/chatroom',
    name: 'chatroom',
    component: () => import('../views/Chatroom'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/premium',
    name: 'premium',
    component: () => import('../views/Premium.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/userProfile',
    name: 'userProfile',
    component: () => import('../views/UserProfile.vue'),
    // meta: {
    //   requiresAuth: true
    // }
  }
]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next('/profile');
    } else {
      next();
    }
  } else {
    next()
  }
});



export default router