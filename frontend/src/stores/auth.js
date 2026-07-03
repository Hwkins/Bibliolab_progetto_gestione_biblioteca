import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import api from "@/api/axios";
import { useProfileStore } from "@/stores/profile";

// Controlla se il token JWT presente in locale è ancora valido.
// La validità viene verificata confrontando la data di scadenza con il timestamp attuale.
function isTokenValid(token) {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

// Store principale per l'autenticazione.
// Tiene traccia dello stato di login, del token e dei dati dell'utente corrente.
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    user: null,
  }),

  getters: {
    authenticated: (state) => state.isAuthenticated,
  },

  actions: {
    // Carica le informazioni dell'utente corrente dall'endpoint /me/.
    async loadUser() {
      try {
        const response = await api.get("me/");
        this.user = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    // Registra un nuovo utente tramite l'API di backend.
    async register(userData) {
      try {
        await api.post("register/", userData);

        return {
          success: true,
          message: "Registrazione completata",
        };
      } catch (error) {
        console.error(error);

        return {
          success: false,
          message:
            error.response?.data ||
            "Errore durante la registrazione",
        };
      }
    },

    // Effettua il login salvando access token e refresh token nel browser.
    async login(username, password) {
      try {
        const response = await api.post("token/", {
          username,
          password,
        });

        this.token = response.data.access;
        this.isAuthenticated = true;

        localStorage.setItem("token", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);

        await this.loadUser();

        const profileStore = useProfileStore();
        await profileStore.loadProfile();

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    // Cancella i dati di sessione e forza il logout locale.
    logout() {
      this.token = null;
      this.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
    },

    // Richiede un nuovo access token usando il refresh token salvato.
    async refreshAccessToken() {
      try {
        const refresh = localStorage.getItem("refresh");

        const response = await api.post(
          "token/refresh/",
          {
            refresh,
          }
        );

        localStorage.setItem("token", response.data.access);

        this.token = response.data.access;
        this.isAuthenticated = true;

        return true;
      } catch {
        this.logout();
        return false;
      }
    },

    // Verifica lo stato di autenticazione all'avvio dell'app.
    // Se il token è ancora valido, usa quello; altrimenti prova il refresh.
    async initializeAuth() {
      const token = localStorage.getItem("token");

      if (isTokenValid(token)) {
        this.token = token;
        this.isAuthenticated = true;

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await this.loadUser();

        const profileStore = useProfileStore();
        await profileStore.loadProfile();
        return;
      }

      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        await this.loadUser();

        const profileStore = useProfileStore();
        await profileStore.loadProfile();
      }

      this.isAuthenticated = refreshed;
    },
  },
});