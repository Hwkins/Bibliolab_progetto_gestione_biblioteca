<script setup>
import { onMounted } from "vue";
import { useProfileStore } from "@/stores/profile";

const profileStore = useProfileStore();

// Carica il profilo utente quando la vista viene montata.
onMounted(async () => {
  await profileStore.loadProfile();
});
</script>

<template>
  <div class="container mt-4">

    <div
      v-if="profileStore.profile"
      class="card shadow"
    >

      <div class="card-header">
        <h3>Profilo Utente</h3>
      </div>

      <div class="card-body">

        <p>
          <strong>Username:</strong>
          {{ profileStore.profile.username }}
        </p>

        <p>
          <strong>Email:</strong>
          {{ profileStore.profile.email }}
        </p>

        <p>
          <strong>Ruolo:</strong>
          {{ profileStore.profile.role }}
        </p>

        <p>
          <strong>Creato il:</strong>
          {{ profileStore.profile.created_at }}
        </p>

      </div>

    </div>

  </div>
</template>