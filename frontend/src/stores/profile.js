import { defineStore } from "pinia";
import api from "@/api/axios";

// Store dedicato al profilo utente e ai suoi privilegi.
// Contiene il ruolo corrente che viene poi usato per decidere quali parti dell'interfaccia mostrare.
export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: null,
  }),

  getters: {
    // True se l'utente ha ruolo reader.
    isReader: (state) => state.profile?.role === "reader",

    // True se l'utente ha ruolo librarian.
    isLibrarian: (state) => state.profile?.role === "librarian",

    // True se l'utente ha ruolo admin.
    isAdmin: (state) => state.profile?.role === "admin",
  },

  actions: {
    // Carica il profilo completo dell'utente autenticato.
    async loadProfile() {
      const response = await api.get("profile/");
      this.profile = response.data;
    },
  },
});