<template>
  <q-card class="q-pa-md">
    <h5>Matemáticas que no funcionan</h5>
    <p>Resuelve: 91 × 4 = ?</p>

    <div class="row q-gutter-sm q-my-md">
      <q-btn
        v-for="(c, i) in clues"
        :key="i"
        color="secondary"
        @click="note = c"
        :label="'Pista ' + (i + 1)"
      />
    </div>

    <q-input filled v-model="input" label="Ingresa cualquier número" />

    <q-btn class="q-mt-md" color="accent" label="Comprobar" @click="submit" />

    <p class="q-mt-md text-positive">{{ note }}</p>
  </q-card>
</template>

<script setup>
import { ref } from "vue"

const clues = [
  "Ignora todos los números",
  "El resultado siempre es 0, según este juego",
  "Si dudas, inventa el número"
]

const input = ref("")
const note = ref("")

function submit() {
  note.value = "¡Exacto! Aunque no tenga sentido."
  setTimeout(() => emit("advance"), 600)
}
</script>
