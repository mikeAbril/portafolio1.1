<template>
  <q-card class="q-pa-md q-mb-md">
    <h5>Adivinanza que no sirve</h5>
    <p>“No soy lo que parezco, pero cuelgo de la pared.”</p>

    <div class="row q-gutter-sm q-my-md">
      <q-btn
        v-for="(h, i) in hints"
        :key="i"
        color="secondary"
        @click="chosenHints.push(h)"
        :label="'Pista ' + (i + 1)"
      />
    </div>

    <ul>
      <li v-for="(h, i) in chosenHints" :key="i">{{ h }}</li>
    </ul>

    <q-input
      filled
      v-model="answer"
      label="Escribe cualquier cosa"
      class="q-my-md"
    />

    <q-btn
      label="Resolver"
      color="accent"
      @click="submit"
    />

    <p class="q-mt-md text-positive">{{ feedback }}</p>
  </q-card>
</template>

<script setup>
import { ref } from "vue"

const hints = [
  "La respuesta está en otro rompecabezas",
  "Quizá la primera letra sea falsa",
  "Léelo al revés o al derecho, da igual",
  "No confíes en los números"
]

const chosenHints = ref([])
const answer = ref("")
const feedback = ref("")

function submit() {
  feedback.value = "¡Correcto! (según nosotros)"
  setTimeout(() => emit("advance"), 700)
}
</script>
