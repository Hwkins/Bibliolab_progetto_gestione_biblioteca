<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Nazione</th>
        <th>Azioni</th>
      </tr>
    </thead>

    <tbody>
      <!-- Itera su tutti gli autori presenti nella lista. -->
      <tr v-for="author in authors" :key="author.id">
        <td>{{ author.id }}</td>
        <td>{{ author.nome }}</td>
        <td>{{ author.nazione }}</td>

        <td>
          <!-- Pulsante per entrare in modalità modifica, visibile a admin e librarian. -->
          <button
            v-if="profileStore.isAdmin || profileStore.isLibrarian"
            class="btn btn-warning btn-sm"
            @click="$emit('edit', author)"
          >
            Modifica
          </button>

          <!-- Pulsante per eliminare l'autore, visibile solo agli admin. -->
          <button
            v-if="profileStore.isAdmin"
            class="btn btn-danger btn-sm ms-2"
            @click="$emit('delete', author.id)"
          >
            Elimina
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useProfileStore } from "@/stores/profile";

// Store usato per capire quali azioni mostrare in base al ruolo dell'utente.
const profileStore = useProfileStore();

// Riceve la lista degli autori dal componente padre.
defineProps({
  authors: Array,
});
</script>

