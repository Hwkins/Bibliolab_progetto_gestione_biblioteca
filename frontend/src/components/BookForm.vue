<template>
  <div class="card p-3 mt-3">
    <h5>{{ editMode ? "Modifica libro" : "Nuovo libro" }}</h5>

    <!-- Campo per il titolo del libro. -->
    <input v-model="form.titolo" class="form-control mb-2" placeholder="Titolo" />

    <!-- Campo per l'anno di pubblicazione. -->
    <input v-model="form.anno" class="form-control mb-2" placeholder="Anno" />

    <!-- Campo per il genere del libro. -->
    <input v-model="form.genere" class="form-control mb-2" placeholder="Genere" />

    <!-- Selettore dell'autore associato al libro. -->
    <select v-model="form.autore" class="form-select mb-2">
      <option value="">
        Seleziona autore
      </option>

      <option
        v-for="author in authors"
        :key="author.id"
        :value="author.id"
      >
        {{ author.nome }}
      </option>
    </select>

    <!-- Salva i dati del libro nel componente padre. -->
    <button class="btn btn-primary" @click="submit">
      Salva
    </button>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  modelValue: Object,
  editMode: Boolean,
  authors: Array,
});

const emit = defineEmits(["save"]);

// Stato locale del form, inizializzato con valori vuoti.
const form = reactive({
  titolo: "",
  anno: "",
  genere: "",
  autore: ""
});

// Quando arriva un libro da modificare, copiamo i suoi dati nel form.
watch(
  () => props.modelValue,
  (val) => {
    if (val) Object.assign(form, val);
  },
  { immediate: true }
);

// Invia i dati al componente padre dopo la conferma.
const submit = () => {
  emit("save", { ...form });
};
</script>