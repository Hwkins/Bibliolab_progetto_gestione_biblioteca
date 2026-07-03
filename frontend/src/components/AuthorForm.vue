<template>
  <div class="card p-3 mt-4">
    <h4>
      {{ editMode ? "Modifica Autore" : "Nuovo Autore" }}
    </h4>

    <!-- Campo per inserire il nome dell'autore. -->
    <input
      v-model="form.nome"
      class="form-control mb-2"
      placeholder="Nome"
    />

    <!-- Campo per inserire la nazione dell'autore. -->
    <input
      v-model="form.nazione"
      class="form-control mb-2"
      placeholder="Nazione"
    />

    <!-- Invia i dati al componente padre dopo la conferma. -->
    <button
      class="btn btn-primary"
      @click="submit"
    >
      Salva
    </button>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  modelValue: Object,
  editMode: Boolean,
});

const emit = defineEmits(["save"]);

// Stato locale del form, inizializzato con valori vuoti.
const form = reactive({
  nome: "",
  nazione: "",
});

// Se viene passato un autore da modificare, carichiamo i suoi dati nel form.
watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      Object.assign(form, value);
    }
  },
  { immediate: true }
);

// Invia i dati al componente padre e resetta il form.
const submit = () => {
  emit("save", { ...form });

  form.nome = "";
  form.nazione = "";
};
</script>