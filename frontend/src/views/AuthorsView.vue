<template>
  <div class="container mt-4">
    <h1>Autori</h1>

    <!-- Tabella che mostra tutti gli autori disponibili. -->
    <AuthorTable
      :authors="authorsStore.authors"
      @edit="selectAuthor"
      @delete="authorsStore.deleteAuthor"
    />

    <!-- Form per creare o modificare un autore. -->
    <AuthorForm
      :modelValue="selectedAuthor"
      :editMode="!!selectedAuthor"
      @save="saveAuthor"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useAuthorsStore } from "@/stores/authors";

import AuthorTable from "@/components/AuthorTable.vue";
import AuthorForm from "@/components/AuthorForm.vue";

const authorsStore = useAuthorsStore();

// Mantiene l'autore attualmente selezionato per la modifica.
const selectedAuthor = ref(null);

// Carica gli autori appena la vista viene montata.
onMounted(() => {
  authorsStore.getAuthors();
});

// Imposta l'autore da modificare.
const selectAuthor = (author) => {
  selectedAuthor.value = author;
};

// Salva un autore nuovo oppure aggiorna quello esistente.
const saveAuthor = async (author) => {
  if (selectedAuthor.value) {
    await authorsStore.updateAuthor(
      selectedAuthor.value.id,
      author
    );
  } else {
    await authorsStore.createAuthor(author);
  }

  selectedAuthor.value = null;
};
</script>