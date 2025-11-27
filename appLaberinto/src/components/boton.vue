<template>
    <q-btn @click="accionBoton" class="btn-personalizado" :style="{ backgroundColor: colorFondo, color: textoColor }"
        :label="nombreBoton" unelevated />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['accion'])

function accionBoton() {
    emit('accion')
}

const { colorFondo, textoColor, nombreBoton } = defineProps({
    colorFondo: {
        type: String,
        required: true
    },
    textoColor: {
        type: String,
        default: 'white'
    },
    nombreBoton: {
        type: String,
        default: 'Jugar Ahora'
    }
})
</script>

<style scoped>
.btn-personalizado {
    border-radius: 12px;
    padding: 10px 24px;
    font-weight: bold;
    transition: all 0.25s ease;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
}

.btn-personalizado:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.35);
    filter: brightness(1.1);
}

.btn-personalizado:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
