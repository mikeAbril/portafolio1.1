<template>
  <q-card class="q-pa-md">
    <h5>Cerradura engañosa</h5>
    <p>{{ message }}</p>

    <div class="bg-grey-10 q-pa-md text-center text-h5 q-my-md">
      {{ code }}
    </div>

    <div class="row q-gutter-sm justify-center">
      <q-btn
        v-for="n in 9"
        :key="n"
        @click="code += n"
        :label="n.toString()"
        color="primary"
      />
      <q-btn color="primary" label="0" @click="code += '0'" />
    </div>

    <div class="row q-mt-md justify-between">
      <q-btn color="negative" label="Borrar" @click="code = ''" />
      <q-btn color="accent" label="Enviar" @click="submit" />
    </div>
  </q-card>
</template>

<script setup>
import { ref } from "vue"

const code = ref("")
const message = ref("Introduce un código de 4 dígitos. Cualquiera sirve.")

function submit() {
  message.value = "¡Desbloqueado! Aunque no era necesario."
  setTimeout(() => emit("advance"), 800)
}
</script>
