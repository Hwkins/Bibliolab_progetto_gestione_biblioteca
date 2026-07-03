<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Titolo</th>
        <th>Anno</th>
        <th>Genere</th>
        <th>Autore</th>
        <th
          v-if="
            profileStore.isAdmin ||
            profileStore.isLibrarian
          "
        >
          Azioni
        </th>
      </tr>
    </thead>

    <tbody>
      <!-- Mostra ogni libro presente nella lista insieme alle azioni disponibili. -->
      <tr v-for="book in books" :key="book.id">
        <td>{{ book.titolo }}</td>
        <td>{{ book.anno }}</td>
        <td>{{ book.genere }}</td>
        <td>{{ book.autore_nome }}</td>

        <td>
          <!-- Pulsante per eliminare il libro, visibile solo agli admin. -->
          <button
            v-if="profileStore.isAdmin"
            class="btn btn-sm btn-danger"
            @click="$emit('delete', book.id)"
          >
            Elimina
          </button>

          <!-- Pulsante per modificare il libro, visibile a admin e librarian. -->
          <button
            v-if="profileStore.isAdmin || profileStore.isLibrarian"
            class="btn btn-sm btn-warning ms-2"
            @click="$emit('edit', book)"
          >
            Modifica
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useProfileStore } from "@/stores/profile";

// Store usato per capire quale tipo di azioni mostrare in base al ruolo.
const profileStore = useProfileStore();

// Riceve la lista dei libri dal componente padre.
defineProps({
  books: Array
});
</script>