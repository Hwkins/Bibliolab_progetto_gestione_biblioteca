<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

// Mostra il nome utente corrente nella navbar quando è disponibile.
const username = computed(() => {
  return authStore.user?.username || "";
});

// Esegue il logout e reindirizza l'utente alla pagina di accesso.
function logout() {
  authStore.logout();
  router.push("/login");
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">

      <router-link
        class="navbar-brand"
        to="/"
      >
        BookShelf
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        id="navbarContent"
      >

        <ul
          v-if="authStore.isAuthenticated"
          class="navbar-nav me-auto"
        >

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/"
            >
              Home
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/books"
            >
              Libri
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/authors"
            >
              Autori
            </router-link>
          </li>

        </ul>

        <ul class="navbar-nav ms-auto">

          <template v-if="authStore.isAuthenticated">

            <li class="nav-item dropdown">

              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                {{ username }}
              </a>

              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link
                  class="dropdown-item"
                  to="/profile"
                  >
                  Profilo
                  </router-link>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    @click="logout"
                  >
                    Logout
                  </button>
                </li>

              </ul>

            </li>

          </template>

          <template v-else>

            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/login"
              >
                Login
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/register"
              >
                Registrati
              </router-link>
            </li>

          </template>

        </ul>

      </div>

    </div>
  </nav>
</template>