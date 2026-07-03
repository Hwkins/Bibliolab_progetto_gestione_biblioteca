<template>
  <div class="container mt-5">
    <div class="card p-4 shadow">
      <h2 class="mb-4">Login</h2>

      <!-- Campo per inserire il nome utente. -->
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input v-model="username" class="form-control">
      </div>

      <!-- Campo per inserire la password. -->
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control">
      </div>

      <!-- Pulsante che avvia il processo di autenticazione. -->
      <button class="btn btn-primary" @click="handleLogin">
        Accedi
      </button>

      <router-link to="/register">
        Non hai un account? Registrati
      </router-link>

      <!-- Messaggio mostrato quando le credenziali non sono valide. -->
      <div v-if="error" class="alert alert-danger mt-3">
        Credenziali non valide
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const username = ref("");
const password = ref("");
const error = ref(false);

const router = useRouter();
const authStore = useAuthStore();

// Esegue il login e reindirizza l'utente alla pagina dei libri.
const handleLogin = async () => {
  error.value = false;

  const success = await authStore.login(
    username.value,
    password.value
  );

  if (success) {
    router.push("/books");
  } else {
    error.value = true;
  }
};
</script>