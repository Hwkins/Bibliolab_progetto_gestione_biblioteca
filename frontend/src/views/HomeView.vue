<script setup>
import { onMounted } from "vue";
import { useDashboardStore } from "@/stores/dashboard";

const dashboardStore = useDashboardStore();

// Carica le statistiche della home page appena la vista viene montata.
onMounted(async () => {
  await dashboardStore.loadStats();
});
</script>

<template>
  <div class="container mt-4">

    <h2>
      Benvenuto
      {{ dashboardStore.username }}
    </h2>

    <div class="row mt-4">

      <div class="col-md-6">

        <div class="card shadow">

          <div class="card-body text-center">

            <h5>Libri</h5>

            <h1>
              {{ dashboardStore.booksCount }}
            </h1>

          </div>

        </div>

      </div>

      <div class="col-md-6">

        <div class="card shadow">

          <div class="card-body text-center">

            <h5>Autori</h5>

            <h1>
              {{ dashboardStore.authorsCount }}
            </h1>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>