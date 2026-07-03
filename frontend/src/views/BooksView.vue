<template>
  <div class="container mt-4">
    <h1>Catalogo Libri</h1>

    <!-- Tabella principale dei libri. -->
    <BookTable
      :books="booksStore.books"
      @delete="booksStore.deleteBook"
      @edit="selectBook"
    />

    <!-- Avviso mostrato agli utenti con accesso solo in lettura. -->
    <div
      v-if="profileStore.isReader"
      class="alert alert-info mt-3"
    >
      Hai accesso in sola lettura al catalogo.
    </div>

    <!-- Form per aggiungere o modificare un libro, visibile solo a admin e librarian. -->
    <BookForm
      v-if="
        profileStore.isAdmin ||
        profileStore.isLibrarian
      "
      :modelValue="selectedBook"
      :editMode="!!selectedBook"
      :authors="authorsStore.authors"
      @save="saveBook"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useBooksStore } from "@/stores/books";
import { useAuthorsStore } from "@/stores/authors";
import { useProfileStore } from "@/stores/profile";

import BookTable from "@/components/BookTable.vue";
import BookForm from "@/components/BookForm.vue";

const profileStore = useProfileStore();
const authorsStore = useAuthorsStore();
const booksStore = useBooksStore();

// Mantiene il libro attualmente selezionato per la modifica.
const selectedBook = ref(null);

// Carica libri e autori quando la vista viene montata.
onMounted(() => {
  booksStore.getBooks();
  authorsStore.getAuthors();
});

// Seleziona un libro da modificare.
const selectBook = (book) => {
  selectedBook.value = book;
};

// Salva un libro nuovo oppure aggiorna quello esistente.
const saveBook = async (book) => {
  if (selectedBook.value) {
    await booksStore.updateBook(selectedBook.value.id, book);
  } else {
    await booksStore.createBook(book);
  }

  selectedBook.value = null;
};
</script>