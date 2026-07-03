import { defineStore } from "pinia";
import api from "@/api/axios";

// Store dedicato alla gestione del catalogo libri.
// Mantiene i dati dei libri in memoria così la UI può aggiornarsi senza ricaricare la pagina.
export const useBooksStore = defineStore("books", {
  state: () => ({
    books: [],
    loading: false,
  }),

  actions: {
    // Recupera tutti i libri dal backend e aggiorna lo stato locale.
    async getBooks() {
      this.loading = true;
      try {
        const res = await api.get("libri/");
        this.books = res.data;
      } finally {
        this.loading = false;
      }
    },

    // Crea un nuovo libro e aggiunge il risultato alla lista locale.
    async createBook(book) {
      const res = await api.post("libri/", book);
      this.books.push(res.data);
    },

    // Elimina un libro sia nel backend sia nello stato locale.
    async deleteBook(id) {
      await api.delete(`libri/${id}/`);
      this.books = this.books.filter(b => b.id !== id);
    },

    // Aggiorna un libro esistente e sostituisce il record aggiornato nella lista.
    async updateBook(id, book) {
      const res = await api.put(`libri/${id}/`, book);
      const index = this.books.findIndex(b => b.id === id);
      if (index !== -1) this.books[index] = res.data;
    }
  }
});