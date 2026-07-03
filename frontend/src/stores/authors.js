import { defineStore } from "pinia";
import api from "@/api/axios";

// Store dedicato alla gestione degli autori.
// Mantiene la lista degli autori sincronizzata con il backend e semplifica le operazioni CRUD.
export const useAuthorsStore = defineStore("authors", {
  state: () => ({
    authors: [],
    loading: false,
  }),

  actions: {
    // Carica tutti gli autori dal backend e aggiorna lo stato locale.
    async getAuthors() {
      this.loading = true;

      try {
        const response = await api.get("autori/");
        this.authors = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    // Crea un nuovo autore e aggiunge il risultato alla lista locale.
    async createAuthor(author) {
      const response = await api.post("autori/", author);
      this.authors.push(response.data);
    },

    // Elimina un autore sia nel backend sia nello stato locale.
    async deleteAuthor(id) {
      await api.delete(`autori/${id}/`);
      this.authors = this.authors.filter(a => a.id !== id);
    },

    // Aggiorna un autore esistente e sostituisce la voce modificata nella lista.
    async updateAuthor(id, author) {
      const response = await api.put(`autori/${id}/`, author);

      const index = this.authors.findIndex(a => a.id === id);

      if (index !== -1) {
        this.authors[index] = response.data;
      }
    }
  }
});