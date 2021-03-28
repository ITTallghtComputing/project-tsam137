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
    component: () => import('../views/User/RegisterUser')
  },

  {
    path: '',
    name: 'login',
    component: () => import('../views/User/Login')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/User/UserList'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/User/Admin')
  },
  {
    
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/User/UserEdit')
  },
  {
    path: '/room',
    name: 'room',
    component: () => import('../views/Chat/Room.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/chatroom',
    name: 'chatroom',
    component: () => import('../views/Chat/Chatroom'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/chat',
    name: 'chat',
    component: () => import('../views/Chat/Chat'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/chatroomLanguage',
    name: 'chatroomLanguage',
    component: () => import('../views/Chat/ChatroomLanguage'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/meetingrequest',
    name: 'meetingrequest',
    component: () => import('../views/Meeting/MeetingRequest'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/usermeetings',
    name: 'usermeetings',
    component: () => import('../views/Meeting/UserMeetings'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/meetingEdit',
    name: 'meetingEdit',
    component: () => import('../views/Meeting/MeetingEdit'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/meetingRating',
    name: 'meetingRating',
    component: () => import('../views/Meeting/MeetingRating'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/User/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/premium/:id',
    name: 'premium',
    component: () => import('../views/User/Premium.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/test-language',
    name: 'testLanguage',
    component: () => import('../views/Test/TestLanguage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/userProfile',
    name: 'userProfile',
    component: () => import('../views/User/UserProfile.vue'),
    meta: {
      requiresAuth: true
    }
  }
]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next('/');
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