import axios from "axios";

// Istanza condivisa di Axios usata per comunicare con il backend Django.
// Centralizzare questa configurazione mantiene la logica API coerente in tutta l'app.
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Allega il JWT a ogni richiesta in uscita quando esiste.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Gestisce le risposte 401 provando a rinnovare il token di accesso.
// Se il refresh fallisce, l'utente viene rimandato alla pagina di login.
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("token/")
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        const response = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh,
          }
        );

        const newAccess = response.data.access;

        localStorage.setItem("token", newAccess);

        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccess}`;

        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        return api(originalRequest);

      } catch (refreshError) {

        localStorage.removeItem("token");
        localStorage.removeItem("refresh");

        delete api.defaults.headers.common["Authorization"];

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;