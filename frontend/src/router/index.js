import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import BooksView from "@/views/BooksView.vue";
import AuthorsView from "@/views/AuthorsView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ProfileView from "@/views/ProfileView.vue";
import { useAuthStore } from "@/stores/auth";

// Configurazione delle route dell'applicazione.
// Ogni route indica se richiede una sessione autenticata.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/books",
      name: "books",
      component: BooksView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/authors",
      name: "authors",
      component: AuthorsView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

// Guard per proteggere le route che richiedono autenticazione.
// Il guard verifica nuovamente lo stato di autenticazione prima di consentire la navigazione.
router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  await authStore.initializeAuth();

  if (
    to.meta.requiresAuth &&
    !authStore.isAuthenticated
  ) {
    return "/login";
  }

  return true;
});

export default router