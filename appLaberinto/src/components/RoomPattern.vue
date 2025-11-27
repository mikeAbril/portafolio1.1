<template>
  <q-card class="q-pa-md">
    <h5>Patrón Ilusorio</h5>
    <p>Elige el patrón que *parece* continuar la secuencia.</p>

    <div class="row q-my-md q-gutter-md">
      <q-btn
        v-for="(o, i) in options"
        :key="i"
        :label="o"
        color="secondary"
        flat
        @click="picked = i"
        :class="picked === i ? 'text-accent' : ''"
      />
    </div>

    <q-btn color="accent" label="Confirmar" @click="submit" />

    <p class="q-mt-md">{{ info }}</p>
  </q-card>
</template>

<script setup>
import { ref } from "vue"

const options = ["▲▲▼", "●●○", "A B A B", "★ ☆ ★"]
const picked = ref(null)
const info = ref("")

function submit() {
  info.value = "Patrón válido (según nosotros)."
  setTimeout(() => emit("advance"), 500)
}
</script>
