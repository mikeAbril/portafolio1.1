<template>
    <div>
        <q-btn @click="accionBoton" :style="{backgroundColor:props.colorFondo, color:props.textoColor}" :label = props.nombreBoton></q-btn>
    </div>
</template>

<script setup>
import { defineProps} from 'vue';
const emit =  defineEmits (['accion'])


function accionBoton (){
    emit("accion")
}

const props = defineProps({
    colorFondo:{
        type: String,
        required: true,
    },
    textoColor:{
        type:String,
        required: true,
        default:"black"
    },
    nombreBoton:{

        type:String,
        required:true,
        default:"Agregar alimento"
    }
})
</script>