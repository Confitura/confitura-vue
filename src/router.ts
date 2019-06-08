import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Faq from './views/Faq.vue';
import VueScrollTo from 'vue-scrollto';
import Partners from '@/views/Partners.vue';
import PartnerPage from '@/views/PartnerPage.vue';
import Login from '@/views/Login.vue';
import RegisterPage from '@/views/profile/RegisterPage.vue';
import store from './store';
import ProfilePage from '@/views/profile/ProfilePage.vue';
import PresentationForm from '@/views/profile/PresentationForm.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy.vue';
import Admin from '@/views/admin/Admin.vue';
import Users from '@/views/admin/Users.vue';
import Presentations from '@/views/admin/Presentations.vue';
import Workshops from '@/views/Workshops.vue';
import Vote4Papers from '@/views/Vote4Papers.vue';
import RegistrationInfoPage from '@/views/RegistrationInfoPage.vue';
import ParticipatePage from '@/views/participant/ParticipatePage.vue';
import ParticipantPage from '@/views/participant/ParticipantPage.vue';

Vue.use(Router);
Vue.use(VueScrollTo, {
  container: '.home__container',
});

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (to.hash) {
          next();
        } else {
          next('/#home');
        }
      },
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq,
    },
    {
      path: '/partners',
      name: 'partners',
      component: Partners,
    },
    {
      path: '/partners/:id',
      name: 'partner',
      component: PartnerPage,
    },
    {
      path: '/login/:service?',
      alias: '/c4p/:service?',
      name: 'login',
      component: Login,
    },
    {
      path: '/register/:id?',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/profile/:id?',
      name: 'profile',
      component: ProfilePage,
    },
    {
      path: '/profile/:userId/presentation/:id?',
      name: 'presentation',
      component: PresentationForm,
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicy,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        { path: 'users', component: Users },
        { path: 'presentations', component: Presentations },
      ],
    },
    {
      path: '/workshops',
      name: 'workshops',
      component: Workshops,
    },
    {
      path: '/v4p',
      name: 'v4p',
      component: Vote4Papers,
    },    {
      path: '/tickets',
      name: 'tickets',
      component: RegistrationInfoPage,
    },
    {
      path: '/participate',
      name: 'participate',
      component: ParticipatePage,
    },
    {
      path: '/participant/:id',
      name: 'participant',
      component: ParticipantPage,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return VueScrollTo.scrollTo(to.hash, 500);
    }
  },

});
router.beforeEach((to, from, next) => {
  const isSessionActive = store.getters.isLogin;
  const accessingProtectedResource = ['/register', '/profile', '/presentation'].includes(to.path);
  if (accessingProtectedResource && !isSessionActive) {
    // next('login');
    next();
  } else {
    next();
  }
});
export default router;
