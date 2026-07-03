import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from "@/stores/auth";

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// Questo è il punto di bootstrap dell'applicazione.
// Creiamo l'istanza Vue, registriamo lo stato globale, inizializziamo l'autenticazione
// e attacchiamo il router prima di montare l'interfaccia.
const app = createApp(App);

// Pinia fornisce il layer di gestione dello stato globale usato in tutta l'app.
const pinia = createPinia();
app.use(pinia);

// Inizializziamo l'autenticazione il prima possibile così l'app può decidere
// se le route protette devono essere accessibili prima di renderizzare la prima vista.
const authStore = useAuthStore(pinia);
await authStore.initializeAuth();

// Registriamo il router così le pagine possono navigare e proteggere le route sensibili.
app.use(router);

// Montiamo l'applicazione Vue nel DOM.
app.mount("#app");
