import { defineStore } from "pinia";
import api from "@/api/axios";

// Store per la dashboard principale.
// Recupera i dati aggregati mostrati nella home page, come numero di libri e autori.
export const useDashboardStore = defineStore(
  "dashboard",
  {
    state: () => ({
      booksCount: 0,
      authorsCount: 0,
      username: "",
    }),

    actions: {
      // Carica le statistiche da mostrare nella home page.
      async loadStats() {
        const response = await api.get("dashboard/");

        this.booksCount = response.data.books_count;
        this.authorsCount = response.data.authors_count;
        this.username = response.data.username;
      },
    },
  }
);