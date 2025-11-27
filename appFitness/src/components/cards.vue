<template>
    <div :style="{ backgroundColor: props.colorFondo }">
    <h2>{{ props.title }}</h2>
    <img v-if="props.image" :src="props.image" alt="Imagen" />
  </div>

</template>

<script setup>
import { defineProps } from 'vue';


const props = defineProps({
    title: {
        type: String,
        required: true,
        default: ""
    },
    image: {
        type: String,
       
    },
    colorFondo: {
        type: String,
        required: true,
        default: ""
    },

})
</script>