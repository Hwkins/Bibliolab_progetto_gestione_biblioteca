<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const errorMessage = ref("");
const successMessage = ref("");

// Gestisce la registrazione dell'utente e mostra messaggi di errore o successo.
async function handleRegister() {
  errorMessage.value = "";
  successMessage.value = "";

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Le password non coincidono";
    return;
  }

  const result = await authStore.register({
    username: username.value,
    email: email.value,
    password: password.value,
  });

  if (result.success) {
    successMessage.value = "Registrazione completata";

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } else {
    errorMessage.value =
      typeof result.message === "string"
        ? result.message
        : JSON.stringify(result.message);
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">

      <div class="col-md-6">

        <div class="card shadow">

          <div class="card-header">
            <h3>Registrazione</h3>
          </div>

          <div class="card-body">

            <div
              v-if="errorMessage"
              class="alert alert-danger"
            >
              {{ errorMessage }}
            </div>

            <div
              v-if="successMessage"
              class="alert alert-success"
            >
              {{ successMessage }}
            </div>

            <form @submit.prevent="handleRegister">

              <div class="mb-3">
                <label class="form-label">
                  Username
                </label>

                <input
                  v-model="username"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">
                  Email
                </label>

                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">
                  Password
                </label>

                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">
                  Conferma Password
                </label>

                <input
                  v-model="confirmPassword"
                  type="password"
                  class="form-control"
                  required
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100"
              >
                Registrati
              </button>

            </form>

            <hr />

            <router-link to="/login">
              Hai già un account? Accedi
            </router-link>

          </div>

        </div>

      </div>

    </div>
  </div>
</template>