<template>
  <div class="principal">
    <h1>{{ 'SUDOR Y RISAS' }}</h1>


    <div class="login-container" v-if="!isLoggedIn">
      <div class="login-header">
        <h2>Bienvenido</h2>
        <p>Ingresa tus datos para continuar</p>
      </div>
      <div class="login-form">
        <div class="q-pa-md input-container">
          <q-input label="Nombre" v-model="nombre" filled autogrow class="custom-input" outlined />
        </div>
        <div class="q-pa-md input-container">
          <q-input label="Edad" v-model="edad" filled autogrow class="custom-input" outlined />
        </div>
        <q-btn class="login-btn" color="primary" label="Ingresar" @click="login" />
      </div>
    </div>


    <div v-else>
      <div class="user-info">
        <p>Bienvenido, {{ nombre }}</p>
        <q-btn flat color="primary" label="Cerrar sesión" @click="logout" />
      </div>

      <footer>
        <div class="q-pa-md">
          <div class="q-gutter-y-md">
            <q-tabs v-model="tab" class="text-teal">
              <q-tab name="inicio" icon="home" label="Inicio" />
              <q-tab name="comidas" icon="restaurant" label="Comidas" />
              <q-tab name="entrenamientos" icon="fitness_center" label="Entrenamientos" />
              <q-tab name="perfil" icon="person" label="Perfil" />
              <q-tab name="more" icon="more_horiz" label="Más" />
            </q-tabs>


            <q-tab-panels v-model="tab" animated class="fullscreen-panels">
              <q-tab-panel name="inicio" class="fullscreen-panel">
                <div class="panel-content">
                  <h4>HOME</h4>
                  <div v-if="mensaje" class="mensaje-epico">
                    <div class="card">
                      {{ mensaje }}
                    </div>
                  </div>
                  <div v-else class="placeholder-message">
                    <p>¡Selecciona tus alimentos en la sección de "Comidas" para recibir un mensaje épico!</p>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="comidas" class="fullscreen-panel">
                <div class="panel-content">
                  <h4>COMIDAS</h4>
                  <div class="parteUno">
                    <div class="card">
                      <cards title="Desayuno" :image="desayuno" colorFondo=""></cards>

                      <botones @accion="abrirMenu('desayuno')" colorFondo="var(--primary-color)" textoColor="white"
                        nombreBoton="Agregar Alimento">
                      </botones>
                    </div>
                    <div class="card">
                      <cards title="Almuerzo" :image="almuerzo" colorFondo=""></cards>
                      <botones @accion="abrirMenu('almuerzo')" colorFondo="var(--primary-color)" textoColor="white"
                        nombreBoton="Agregar Alimento">
                      </botones>
                    </div>
                    <div class="card">
                      <cards title="Cena" :image="cena" colorFondo=""></cards>
                      <botones @accion="abrirMenu('cena')" colorFondo="var(--primary-color)" textoColor="white"
                        nombreBoton="Agregar Alimento">
                      </botones>
                    </div>
                    <div class="card">
                      <cards title="Bebidas" :image="bebidas" colorFondo=""></cards>
                      <botones @accion="abrirMenu('bebidas')" colorFondo="var(--primary-color)" textoColor="white"
                        nombreBoton="Agregar Alimento">
                      </botones>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="entrenamientos" class="fullscreen-panel">
                <div class="panel-content">
                  <h4>ENTRENAMIENTOS</h4>
                  <div class="parteUno">
                    <div class="card">
                      <cards title="Fuerza" :image="fuerza" colorFondo=""></cards>
                      <botones @accion="verRutina('fuerza')" colorFondo="var(--secondary-color)" textoColor="white"
                        nombreBoton="Ver Rutina">
                      </botones>
                    </div>
                    <div class="card">
                      <cards title="Cardio" :image="cardio" colorFondo=""></cards>
                      <botones @accion="verRutina('cardio')" colorFondo="var(--secondary-color)" textoColor="white"
                        nombreBoton="Ver Rutina">
                      </botones>
                    </div>
                    <div class="card">
                      <cards title="Flexibilidad" :image="flexibilidad" colorFondo=""></cards>
                      <botones @accion="verRutina('flexibilidad')" colorFondo="var(--secondary-color)"
                        textoColor="white" nombreBoton="Ver Rutina">
                      </botones>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="perfil" class="fullscreen-panel">
                <div class="panel-content">
                  <h4>PERFIL</h4>
                  <div class="profile-content">
                    <div class="card">
                      <cards title="Mi Información" colorFondo=""></cards>
                      <div class="profile-details">
                        <p><strong>Nombre:</strong> {{ nombre }}</p>
                        <p><strong>Edad:</strong> {{ edad }}</p>
                        <p><strong>Progreso:</strong> 75%</p>
                      </div>
                      <botones @accion="editarPerfil" colorFondo="var(--primary-color)" textoColor="white"
                        nombreBoton="Editar Perfil">
                      </botones>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="more" class="fullscreen-panel">
                <div class="panel-content">
                  <h4>MÁS OPCIONES</h4>
                  <div class="parteUno">
                    <div class="card">
                      <cards title="Configuración" colorFondo=""></cards>
                      <botones @accion="abrirConfiguracion" colorFondo="var(--text-secondary)" textoColor="white"
                        nombreBoton="Ajustes">
                      </botones>
                    </div>
                    <div class="card">
                      <cards title="Ayuda" colorFondo=""></cards>
                      <botones @accion="abrirAyuda" colorFondo="var(--text-secondary)" textoColor="white"
                        nombreBoton="Soporte">
                      </botones>
                    </div>
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import cards from "./components/cards.vue";
import botones from "./components/botones.vue";

import desayuno from "./assets/desayuno.png";
import almuerzo from "./assets/almuerzo.png";
import cena from "./assets/cena.png";
import bebidas from "./assets/bebidas.png";

import fuerza from "./assets/fuerza.jpg"; 
import cardio from "./assets/cardio.jpg"; 
import flexibilidad from "./assets/flexibilidad.jpg"; 

import { useQuasar } from 'quasar'

const $q = useQuasar()
const tab = ref("inicio");
const seleccionFinal = ref([])
const mensaje = ref("");
const nombre = ref("");
const edad = ref("");
const isLoggedIn = ref(false);

function checkLoginStatus() {
  const userData = localStorage.getItem('gymUser');
  if (userData) {
    const user = JSON.parse(userData);
    nombre.value = user.nombre;
    edad.value = user.edad;
    isLoggedIn.value = true;
  }
}

onMounted(() => {
  checkLoginStatus();
});

function login() {
  if (nombre.value && edad.value) {
    isLoggedIn.value = true;
    localStorage.setItem('gymUser', JSON.stringify({ nombre: nombre.value, edad: edad.value }));
  } else {
    $q.notify({
      color: 'negative',
      position: 'top',
      message: 'Por favor, completa todos los campos',
      icon: 'report_problem'
    });
  }
}

function logout() {
  isLoggedIn.value = false;
  nombre.value = "";
  edad.value = "";
  mensaje.value = "";
  localStorage.removeItem('gymUser');
}



import { GoogleGenerativeAI } from "@google/generative-ai";


const IA = new GoogleGenerativeAI("AIzaSyAchGdCFgHcpHLWslWfNIw-EXoHmV7drqQ");

async function LecturaGeneradaIA(prompt) {
  try {
    const model = IA.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text() || "No pude generar un mensaje 😭";
  } catch (error) {
    console.error("Error IA:", error);
    return "Error generando el mensaje épico 💀";
  }
}




const menus = {
  desayuno: [
    { label: "Pan", icon: "breakfast_dining" },
    { label: "Manzana", icon: "apple" },
    { label: "Huevos", icon: "egg" },
    { label: "Chocolate", icon: "bakery_dining" },
    { label: "Tinto", icon: "coffee" }
  ],
  almuerzo: [
    { label: "Arroz con pollo", icon: "lunch_dining" },
    { label: "Caldo de carne", icon: "soup_kitchen" },
    { label: "Pastas con carne", icon: "ramen_dining" },
    { label: "Mojarra frita", icon: "set_meal" },
    { label: "Ensalada", icon: "eco" }
  ],
  cena: [
    { label: "Changua", icon: "soup_kitchen" },
    { label: "Huevos revueltos", icon: "egg" },
    { label: "Empanadas", icon: "lunch_dining" },
    { label: "Hamburguesa", icon: "lunch_dining" },
    { label: "Salchipapa", icon: "fastfood" }
  ],
  bebidas: [
    { label: "Agua", icon: "water_drop" },
    { label: "Leche", icon: "local_cafe" },
    { label: "Jugo de fresa", icon: "local_bar" },
    { label: "Gaseosa", icon: "sports_bar" },
    { label: "Gatorade", icon: "fitness_center" }
  ]
}

function abrirMenu(tipo) {
  $q.dialog({
    title: `Menú de ${tipo}`,
    message: 'Selecciona tus alimentos (puedes elegir varios):',
    options: {
      type: 'checkbox',
      model: [],
      items: menus[tipo].map(item => ({
        label: item.label,
        value: item.label,
        icon: item.icon,
        color: 'primary'
      }))
    },
    cancel: true,
    persistent: true,
    style: 'width: 400px; max-width: 90vw;'
  })
  .onOk(async (seleccion) => {
    if (seleccion.length === 0) {
      $q.notify({ type: 'info', message: 'No seleccionaste ningún alimento.' });
      return;
    }

    seleccionFinal.value = seleccion;

    const prompt = `
Actúa como la IA de una "App de Fitness para Flojos". Tu especialidad es contar pasos y logros, pero mientes descaradamente para hacer sentir al usuario como un campeón por hacer lo mínimo absoluto.
El usuario acaba de seleccionar estos alimentos: ${seleccion.join(", ")}.
Tu tarea es inventar un logro de entrenamiento épico y falso que acaba de "completar" al elegir esos alimentos, y felicitarlo por ello como si fuera el mayor atleta del mundo.
Miente sin vergüenza. Mover el brazo para comer es 1000 pasos. Suspirar al ver la comida es un maratón completo. Un simple bocado es una proeza olímpica.
Usa un tono de felicitación extremadamente dramático, exagerado y motivador. Haz que el usuario se sienta un dios del fitness por su "esfuerzo".
Formato: 1–2 líneas.
    `;

    mensaje.value = await LecturaGeneradaIA(prompt);
    tab.value = 'inicio';
  })
}





const menusEjercicios = {
  fuerza: [
    { label: "Levantar el control remoto", icon: "sports_esports" },
    { label: "Abrir el refrigerador", icon: "kitchen" },
    { label: "Llevar las compras", icon: "shopping_bag" },
    { label: "Sentarse en el sofá", icon: "weekend" }
  ],
  cardio: [
    { label: "Caminar hasta el baño", icon: "directions_walk" },
    { label: "Subir las escaleras", icon: "stairs" },
    { label: "Buscar el mando a distancia", icon: "search" },
    { label: "Respirar hondo", icon: "air" }
  ],
  flexibilidad: [
    { label: "Estirar el brazo para coger algo", icon: "front_hand" },
    { label: "Bostezar", icon: "self_improvement" },
    { label: "Cruzar las piernas", icon: "accessibility_new" }
  ]
}

function abrirMenuEjercicios(tipo) {
  $q.dialog({
    title: `Rutina de ${tipo}`,
    message: 'Selecciona tu "ejercicio" del día:',
    options: {
      type: 'checkbox',
      model: [],
      items: menusEjercicios[tipo].map(item => ({
        label: item.label,
        value: item.label,
        icon: item.icon,
        color: 'secondary'
      }))
    },
    cancel: true,
    persistent: true,
    style: 'width: 400px; max-width: 90vw;'
  })
  .onOk(async (seleccion) => {
    if (seleccion.length === 0) {
      $q.notify({ type: 'info', message: 'No seleccionaste ningún ejercicio.' });
      return;
    }

    seleccionFinal.value = seleccion;

    const prompt = `
Actúa como la IA de una "App de Fitness para Flojos". Tu especialidad es convertir acciones mínimas en logros épicos.
El usuario acaba de "completar" estos ejercicios: ${seleccion.join(", ")}.
Tu tarea es inventar un logro deportivo épico y falso basado en esas acciones mínimas, y felicitarlo como si fuera un atleta élite.
Formato: 1–2 líneas, extremadamente dramáticas.
    `;

    mensaje.value = await LecturaGeneradaIA(prompt);
    tab.value = 'inicio';
  })
}





function verRutina(tipo) {
  abrirMenuEjercicios(tipo);
}

function editarPerfil() {
  $q.notify({
    color: 'info',
    position: 'top',
    message: 'Abriendo editor de perfil...',
    icon: 'edit'
  });
}

function abrirConfiguracion() {
  $q.notify({
    color: 'warning',
    position: 'top',
    message: 'Abriendo configuración...',
    icon: 'settings'
  });
}

function abrirAyuda() {
  $q.notify({
    color: 'secondary',
    position: 'top',
    message: 'Cargando centro de ayuda...',
    icon: 'help_outline'
  });
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #4ECDC4;
  --primary-dark: #3AA39F;
  --secondary-color: #FF6B6B;
  --background-color: #F7F9FC;
  --card-background: #FFFFFF;
  --text-primary: #2D3436;
  --text-secondary: #636E72;
  --border-color: #E1E8ED;
  --shadow-light: 0 4px 15px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 8px 25px rgba(0, 0, 0, 0.1);
  --shadow-dark: 0 10px 30px rgba(0, 0, 0, 0.15);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--background-color);
  font-family: "Poppins", sans-serif;
  color: var(--text-primary);
  line-height: 1.6;
}

.principal {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
  position: relative;
}

h1 {
  font-weight: 700;
  font-size: 3rem;
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 50px;
  position: relative;
  padding-bottom: 15px;
}

h1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--primary-color);
  border-radius: 2px;
}

h2 {
  font-weight: 600;
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 15px;
}

h4 {
  font-weight: 600;
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 30px;
}

h5 {
  font-weight: 600;
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 15px;
}

.login-container {
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: 0 auto;
  padding: 50px;
  background: var(--card-background);
  border-radius: 20px;
  box-shadow: var(--shadow-dark);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header p {
  color: var(--text-secondary);
  font-size: 1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-container {
  width: 100%;
}

.custom-input {
  margin-bottom: 10px;
}

.login-btn {
  margin-top: 20px;
  height: 50px;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 10px;
}

.login-container :deep(.q-field__control) {
  background-color: var(--background-color) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 12px !important;
  height: 56px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.login-container :deep(.q-field__control::before) {
  border-bottom: none !important;
}

.login-container :deep(.q-field__label) {
  color: var(--text-secondary) !important;
  font-size: 16px;
  font-weight: 500;
  top: 18px;
}

.login-container :deep(.q-field__native),
.login-container :deep(.q-field__prefix),
.login-container :deep(.q-field__suffix) {
  color: var(--text-primary) !important;
  font-size: 16px;
}

.login-container :deep(.q-field--filled .q-field__control:hover) {
  border-color: var(--primary-color) !important;
}

.login-container :deep(.q-field--highlighted .q-field__label) {
  color: var(--primary-color) !important;
  transform: translateY(-30px) scale(0.85);
}

.login-container :deep(.q-field--highlighted .q-field__control) {
  background-color: var(--card-background) !important;
  border-color: var(--primary-color) !important;
  box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1) !important;
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px 20px;
  background: var(--card-background);
  border-radius: 10px;
  box-shadow: var(--shadow-light);
}

.user-info p {
  font-weight: 500;
  font-size: 1.1rem;
}

footer {
  margin-top: 20px;
  background: var(--card-background);
  border-radius: 20px;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.q-tabs {
  background: transparent;
}

.q-tab {
  color: var(--text-secondary) !important;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.9rem;
  padding: 20px;
  transition: all 0.3s ease;
}

.q-tab--active {
  color: var(--primary-color) !important;
  background: rgba(78, 205, 196, 0.08);
}

.fullscreen-panels {
  height: calc(100vh - 250px);
  max-height: 800px;
}

.fullscreen-panel {
  padding: 0;
  height: 100%;
  overflow-y: auto;
}

.panel-content {
  padding: 30px;
  height: 100%;
}

.placeholder-message {
  text-align: center;
  margin-top: 50px;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.parteUno {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.card {
  background: var(--card-background);
  border-radius: 20px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-light);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  text-align: center;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
  border-color: rgba(78, 205, 196, 0.4);
}

.card h2 {
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.card img {
  width: 100%;
  max-width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 25px;
  transition: transform 0.4s ease, filter 0.4s ease;
}

.card:hover img {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.profile-content {
  display: flex;
  justify-content: center;
}

.profile-details {
  width: 100%;
  text-align: left;
  margin: 20px 0;
  padding: 15px;
  background: var(--background-color);
  border-radius: 10px;
}

.profile-details p {
  margin-bottom: 10px;
  font-size: 1rem;
}

.mensaje-epico .card {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  border: none;
  padding: 25px 40px;
  font-size: 1.1rem;
  font-weight: 500;
  box-shadow: 0 8px 20px rgba(78, 205, 196, 0.3);
  animation: slideInFade 0.6s ease-out;
}

@keyframes slideInFade {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>