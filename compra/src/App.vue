
<template>
 
 <div class="body" >
  
  
  <div class="productos">
       
      <div v-for="(producto, i) in items" :key="i" class="producto">
        <div>
         
          <h6>{{ producto.nombre }}</h6>
          <h6  class="text-positive">${{ producto.precio }}</h6>
        </div>
        <q-btn outline style="color: goldenrod;" label="agregar al carrito" v-show="producto.cantidad===0" @click="aumentarCantidad(i)"/>
         
              <div class="botones"  v-show="producto.cantidad>0">
                  <q-btn style="background: goldenrod; color: white" label="+agregar" @click="aumentarCantidad(i)"/>
                   <h6>{{ producto.cantidad}}</h6>
                  <q-btn style="background: goldenrod; color: white" label="disminuir" @click="disminuirCantidad(i)"/>
               </div>
      </div>
  </div>

  <div class="resumen">
    <q-icon name="shopping_cart" class="text-orange" size="3em" />Resumen del Carrito 
  
      <div class="valores">
        <h6>total de Productos:</h6>
        <h6>${{ totalItems }}</h6>
      </div>
      <div class="valores">
        <h6>SubTotal:</h6>
        <h6>${{subTotal}}</h6>

      </div>
      <div class="valores">
        <h6>Impuesto (16%):</h6>
        <h6>${{ impuesto }}</h6>

      </div>
      <br>
      
      <div class="valores">
        <div style="display: flex;">
          <q-icon name="attach_money" class="text-orange" size="2em"/>
          <h6>Total A Pagar</h6>
        </div>
           <h4>${{ totalAPagar }}</h4>
      </div>
  
  </div>
    
 </div>
 
</template>


<script setup>
import Swal from 'sweetalert2';
import { computed, ref, watch } from 'vue';

const alertaMostrada = ref(false);

 let items = ref([
  {nombre: "burger", precio: 450, cantidad: 0},
  {nombre: "nachos", precio: 200, cantidad: 0},
  {nombre: "donuts", precio: 10, cantidad:0},
  {nombre: "perro", precio: 150, cantidad: 0},
  {nombre: "tamal", precio: 300, cantidad: 0},
  {nombre: "natilla", precio: 200, cantidad: 0}
 ])
 watch(
  items,
  (newValue) => {
    console.log("Guardando en localStorage:", newValue);
    localStorage.setItem("carrito", JSON.stringify(newValue));
  },
  { deep: true }
);
 function aumentarCantidad(i) {
  items.value[i].cantidad++;
 }
 function disminuirCantidad(i) {
   items.value[i].cantidad--;
 }

 const totalItems = computed(()=>{
  return items.value.reduce((i, producto)=>i+ producto.cantidad,0);
 });
 const subTotal = computed(()=>{
  return items.value.reduce((i, producto)=>i+ (producto.precio*producto.cantidad),0);
 });
 const impuesto = computed(()=>{
  return subTotal.value*(0.16);
 });
 const totalAPagar = computed(()=>{
  return subTotal.value+impuesto.value;
 })

 watch(()=>totalAPagar.value,(newValue)=>{
    if (newValue>1000 && !alertaMostrada.value) {
        Swal.fire({
          icon: "success",
          title: "Compra mayor a $1000",
          text: "¡Envío gratis incluido!",
          showConfirmButton: false,
          timer: 2000 
      });
      alertaMostrada.value = true;
    }if (newValue<1000) {
      alertaMostrada.value = false;
    } 
    
 });
  
</script>


<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
.body{
  display: grid;
  grid-template-columns: 1fr 1fr ;
  background-color: #050a14;
}
.botones{
  display: flex;
}
 
.producto{
  display: flex;
  justify-content: space-between;
  border: 1px solid white;
  margin: 10px 0;
  border-radius: 15px;
 }
.q-btn{
  margin-top: 10px;
  height: 40px;
}
.resumen{
  height: 463.3px;
  border: 1px solid white;
  border-radius: 15px;
}
.valores{
  display: flex;
  justify-content: space-evenly;
}
@media(max-width:650px){
  .body{
    grid-template-columns: 1fr;
  }
}
</style>
 