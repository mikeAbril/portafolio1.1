
<template>
  <div>
 <header>
    <img :src=logoPokemon alt="" class="logo">
    <input type="text" v-model="busqueda"><button  @click="leerAPI()">🔍</button></input>
    <nav>
      <ul><h3>home</h3></ul>
      <ul><h3>about</h3></ul>
      <ul><h3>contact</h3></ul>
    </nav>
  </header>

 <div class="principal">
  
  <div  class="card" >
    
    <div>
      <h3>hp: {{ hp }}/200</h3>
      <div class="barra"><div class="barra-relleno" :style="{ width: (hp / 200 * 100) + '%', background:types==='bug'?'#92BC2C':types==='dark'?'#595761':types==='dragon'?'#0C69C8':types==='electric'?'#F2D94E':types==='fairy'?'#EE90E6':types ==='fighting'?'#D3425F':types==='fire'?'#FBA54C':types==='flying'?'#A1BBEC':types==='ghost'?'#5F6DBC':types==='grass'?'#5FBD58':types==='ground'?'#DA7C4D':types==='ice'?'#75D0C1':types==='normal'?'#A0A29F':types==='poison'?'#B763CF':types==='psychic'?'#FA8581':types==='rock'?'#C9BB8A':types==='steel'?'#5695A3':types==='water'?'#539DDF':'#fff'}"></div></div>
    </div>
    <div>
      <h3>attack: {{ ataque }}/200</h3>
      <div class="barra"><div class="barra-relleno" :style="{ width: (ataque / 200 * 100) + '%', background:types==='bug'?'#92BC2C':types==='dark'?'#595761':types==='dragon'?'#0C69C8':types==='electric'?'#F2D94E':types==='fairy'?'#EE90E6':types ==='fighting'?'#D3425F':types==='fire'?'#FBA54C':types==='flying'?'#A1BBEC':types==='ghost'?'#5F6DBC':types==='grass'?'#5FBD58':types==='ground'?'#DA7C4D':types==='ice'?'#75D0C1':types==='normal'?'#A0A29F':types==='poison'?'#B763CF':types==='psychic'?'#FA8581':types==='rock'?'#C9BB8A':types==='steel'?'#5695A3':types==='water'?'#539DDF':'#fff'}"></div></div>
    </div>
    <div>
      <h3>defense: {{ defensa }}/200</h3>
      <div class="barra"><div class="barra-relleno" :style="{ width: (defensa / 200 * 100) + '%', background:types==='bug'?'#92BC2C':types==='dark'?'#595761':types==='dragon'?'#0C69C8':types==='electric'?'#F2D94E':types==='fairy'?'#EE90E6':types ==='fighting'?'#D3425F':types==='fire'?'#FBA54C':types==='flying'?'#A1BBEC':types==='ghost'?'#5F6DBC':types==='grass'?'#5FBD58':types==='ground'?'#DA7C4D':types==='ice'?'#75D0C1':types==='normal'?'#A0A29F':types==='poison'?'#B763CF':types==='psychic'?'#FA8581':types==='rock'?'#C9BB8A':types==='steel'?'#5695A3':types==='water'?'#539DDF':'#fff'}"></div></div>
    </div>
    <div>
      <h3>especial-attack: {{ ataqueEspecial }}/200</h3>
      <div class="barra"><div class="barra-relleno" :style="{ width: (ataqueEspecial / 200 * 100) + '%', background:types==='bug'?'#92BC2C':types==='dark'?'#595761':types==='dragon'?'#0C69C8':types==='electric'?'#F2D94E':types==='fairy'?'#EE90E6':types ==='fighting'?'#D3425F':types==='fire'?'#FBA54C':types==='flying'?'#A1BBEC':types==='ghost'?'#5F6DBC':types==='grass'?'#5FBD58':types==='ground'?'#DA7C4D':types==='ice'?'#75D0C1':types==='normal'?'#A0A29F':types==='poison'?'#B763CF':types==='psychic'?'#FA8581':types==='rock'?'#C9BB8A':types==='steel'?'#5695A3':types==='water'?'#539DDF':'#fff'}"></div></div>
    </div>
    <div>
      <h3>especial-defense: {{ defensaEspecial }}/200</h3>
      <div class="barra"><div class="barra-relleno" :style="{ width: (defensaEspecial / 200 * 100) + '%', background:types==='bug'?'#92BC2C':types==='dark'?'#595761':types==='dragon'?'#0C69C8':types==='electric'?'#F2D94E':types==='fairy'?'#EE90E6':types ==='fighting'?'#D3425F':types==='fire'?'#FBA54C':types==='flying'?'#A1BBEC':types==='ghost'?'#5F6DBC':types==='grass'?'#5FBD58':types==='ground'?'#DA7C4D':types==='ice'?'#75D0C1':types==='normal'?'#A0A29F':types==='poison'?'#B763CF':types==='psychic'?'#FA8581':types==='rock'?'#C9BB8A':types==='steel'?'#5695A3':types==='water'?'#539DDF':'#fff'}"></div></div>
    </div>
    <div>
      <h3>speed: {{ velocidad }}/200</h3>
      <div class="barra"><div class="barra-relleno" :style="{ width: (velocidad / 200 * 100) + '%', background:types==='bug'?'#92BC2C':types==='dark'?'#595761':types==='dragon'?'#0C69C8':types==='electric'?'#F2D94E':types==='fairy'?'#EE90E6':types ==='fighting'?'#D3425F':types==='fire'?'#FBA54C':types==='flying'?'#A1BBEC':types==='ghost'?'#5F6DBC':types==='grass'?'#5FBD58':types==='ground'?'#DA7C4D':types==='ice'?'#75D0C1':types==='normal'?'#A0A29F':types==='poison'?'#B763CF':types==='psychic'?'#FA8581':types==='rock'?'#C9BB8A':types==='steel'?'#5695A3':types==='water'?'#539DDF':'#fff'}"></div></div>
    </div>
    
  </div>
  <div class="informacion" :style="{ background: obtenerColor(type) }">


    <h2>{{ nombre }}</h2>
    <img :src=image alt="" class="pokemon">
    <h3> altura:{{ altura }}m</h3>
    <h3>peso:{{ peso }}Kg</h3>
  </div>
  <div class="caracteristicas">
     
    <h2>#{{ id }}</h2>
    <div>
      <h3>Tipo del pokemon</h3>
      <div v-for="(it,i) in type" :key="i">     
          <p :class="[ it]">{{ it }}</p>
      </div>
    </div>
       <div>
        <h3>Debilidades</h3>
        <div v-if="debilidades.length">
          <div v-for="(d, i) in debilidades" :key="i">
            <p  :class="[d]">{{ d }}</p>
          </div>
        </div>
        <div v-else>
          <p>No hay debilidades disponibles</p>
        </div>
      </div>
  </div>

 </div>

  </div>
</template>


<script setup>
import axios from "axios";
import { ref } from "vue";

  let busqueda= ref("");
  let nombre = ref("");
  let image = ref("");
  let hp = ref("");
  let ataque = ref("");
  let defensa = ref("");
  let ataqueEspecial = ref("");
  let defensaEspecial = ref("");
  let velocidad = ref("");
  let altura = ref("");
  let peso = ref("");
  let id = ref("");
  let types = ref("");
  let type = ref([]);
  let tipos =ref([]);
  let debilidades =ref([]);


  let logoPokemon =ref("data:image/jpeg;base64,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")

  async function leerAPI (){
  let respuesta = await axios.get("https://pokeapi.co/api/v2/pokemon/"+ busqueda.value);
  console.log(respuesta.data);
  
  image.value = respuesta.data.sprites.other.dream_world.front_default;
  nombre.value = respuesta.data.name;
  hp.value = respuesta.data.stats[0].base_stat;
  ataque.value = respuesta.data.stats[1].base_stat;
  defensa.value = respuesta.data.stats[2].base_stat;
  ataqueEspecial.value = respuesta.data.stats[3].base_stat;
  defensaEspecial.value = respuesta.data.stats[4].base_stat;
  velocidad.value = respuesta.data.stats[5].base_stat;
  altura.value = respuesta.data.height;
  peso.value = respuesta.data.weight;
  id.value = respuesta.data.id;
  types.value = respuesta.data.types[0].type.name;
  type.value = respuesta.data.types.map(i => i.type.name);
  tipos.value = respuesta.data.types || []


  const detallesdebil = await Promise.all(
  tipos.value.map(async (tipo) => {
    const jsontipo = await axios.get(tipo.type.url);
    return jsontipo.data.damage_relations?.double_damage_from?.map(d => d.name) || [];
  })
);

// aplanamos las debilidades (por ejemplo: [['fire','ice'],['ground']] → ['fire','ice','ground'])
debilidades.value = [...new Set(detallesdebil.flat())]
    console.log("Debilidades:", debilidades.value)

 }

const obtenerColor = (type) => {
  console.log(type);
  
  if (!type || type.length === 0) return 'linear-gradient(to bottom right, #ccc, #999)';
  
  const colores = {
    bug: '#92BC2C',
    dark: '#595761',
    dragon: '#0C69C8',
    electric: '#F2D94E',
    fairy: '#EE90E6',
    fighting: '#D3425F',
    fire: '#FBA54C',
    flying: '#A1BBEC',
    ghost: '#5F6DBC',
    grass: '#5FBD58',
    ground: '#DA7C4D',
    ice: '#75D0C1',
    normal: '#A0A29F',
    poison: '#B763CF',
    psychic: '#FA8581',
    rock: '#C9BB8A',
    steel: '#5695A3',
    water: '#539DDF'
  };
  
  if (type.length === 1) {
    return colores[type[0]] || '#fff';
  }
  
  if (type.length === 2) {
    const color1 = colores[type[0]] || '#fff';
    const color2 = colores[type[1]] || '#fff';
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  }
  
  return '#fff';
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');
#app{
  margin: 0;
  padding: 0;
}
body{
  background: black;
  color: white;
 
}
header{
  display: flex;
  align-self: center;
  gap: 100px;
  height: 150px;
}
.logo{
  margin-left: 10vw;
  height: 200px;
}
input{
  margin: auto;
  height: 25px;
  width: 25vw;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  color: black;
}
button{
  height: 30px;
background-color: #062d48;
  align-self: center;
}
nav{
  display: flex;
  gap: 15px;
  place-self: center;
  font-family: 'Satisfy', cursive;
}
.principal{
  display: flex;
  justify-content: space-between;
}
.card{
  margin-left: 50px;
  font-family: 'Orbitron', sans-serif;
}
.barra-relleno{
  height: 15px;
  border-radius: 15px;
}
.barra{
  width: 250px;
  border: 1px solid white;
  border-radius: 15px;
}
.navegador{
  display: flex;
  gap: 15px;
}
.pokemon{
  height: 350px;
  width: 250px;
}
.informacion{
  font-family: 'Orbitron', sans-serif;
  width: 30vw;
  border-radius: 20px;
  margin-bottom: 15px;
}
.caracteristicas{
  border: 2px solid #062d48;
  color: white;
  border-radius: 10px;
  font-family: 'Orbitron', sans-serif;
}


.bug { background: #92BC2C; }
.dark { background: #595761; }
.dragon { background: #0C69C8; }
.electric { background: #F2D94E; }
.fairy { background: #EE90E6; }
.fighting { background: #D3425F; }
.fire { background: #FBA54C; }
.flying { background: #A1BBEC; }
.ghost { background: #5F6DBC; }
.grass { background: #5FBD58; }
.ground { background: #DA7C4D; }
.ice { background: #75D0C1; }
.normal { background: #A0A29F; }
.poison { background: #B763CF; }
.psychic { background: #FA8581; }
.rock { background: #C9BB8A; }
.steel { background: #5695A3; }
.water { background: #539DDF; }
 
</style>
