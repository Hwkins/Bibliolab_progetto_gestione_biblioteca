<script setup>
// Il layout principale rende sempre la navbar condivisa e poi delega
// l'area di contenuto alla route attualmente attiva.
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <!-- Manteniamo la navigazione visibile in tutte le pagine per una UX coerente. -->
  <Navbar />

  <!-- Qui viene renderizzato il componente della route attiva. -->
  <router-view />
</template>

<style scoped></style>
