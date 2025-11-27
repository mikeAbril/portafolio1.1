<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-dark">
      <q-toolbar>
        <q-toolbar-title>Escape Room — Callejones Sin Salida</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding class="bg-dark text-white">
        <div class="q-pa-md">
          <q-card class="q-pa-lg glass-card">
            <h2>Escape Room — Callejones Sin Salida</h2>
            <p class="text-grey">Todas las pistas son falsas. Nada tiene sentido. ¡Pero igual felicidades!</p>

            <q-separator spaced />

            <div class="q-my-md">
              <h4>Sala {{ currentRoom + 1 }} — {{ currentRoomConfig.title }}</h4>
              <p>{{ currentRoomConfig.description }}</p>
            </div>

            <component :is="currentRoomConfig.component" @advance="openCongrats" />

            <div class="row q-mt-lg justify-between">
              <q-btn color="primary" label="‹ Anterior" :disable="currentRoom === 0" @click="currentRoom--" />

              <q-btn
                color="primary"
                label="Siguiente ›"
                :disable="currentRoom === rooms.length - 1"
                @click="currentRoom++"
              />

              <q-btn color="negative" label="Reiniciar" @click="resetGame" />
            </div>
          </q-card>

          <q-card class="q-pa-md q-mt-xl">
            <h5>Progreso</h5>
            <q-list separator>
              <q-item v-for="(r, i) in rooms" :key="i">
                <q-item-section>
                  Sala {{ i + 1 }} — {{ r.title }}
                  <span v-if="i < currentRoom" class="text-positive">(visitada)</span>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>

        <!-- Modal Felicitaciones falsas -->
        <q-dialog v-model="showCongrats">
          <q-card class="q-pa-lg">
            <h4>¡Felicidades... más o menos!</h4>
            <p>
              Avanzaste aunque no tengas idea de qué está pasando.
              Nadie entiende nada aquí. ¡Sigue así!
            </p>

            <q-btn
              color="accent"
              label="Continuar"
              class="full-width q-mt-md"
              @click="closeCongrats"
            />
          </q-card>
        </q-dialog>

      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue"

// ❤️ tus componentes funcionan igual
import RoomRiddle from "./components/RoomRiddle.vue"
import RoomMath from "./components/RoomMath.vue"
import RoomPattern from "./components/RoomPattern.vue"
import RoomLock from "./components/RoomLock.vue"

const currentRoom = ref(0)
const showCongrats = ref(false)

const rooms = [
  { title: "Sala de Adivinanzas", description: "Pistas confusas y respuestas que no aclaran.", component: RoomRiddle },
  { title: "Sala de Matemáticas", description: "Operaciones imposibles que siempre aplauden.", component: RoomMath },
  { title: "Sala de Patrones", description: "Patrones que no llevan a nada.", component: RoomPattern },
  { title: "Sala de Cerradura", description: "Un código que siempre abre.", component: RoomLock }
]

const currentRoomConfig = computed(() => rooms[currentRoom.value])

function openCongrats() {
  showCongrats.value = true
}

function closeCongrats() {
  showCongrats.value = false
  if (currentRoom.value < rooms.length - 1) currentRoom.value++
}

function resetGame() {
  currentRoom.value = 0
  showCongrats.value = false
}
</script>

<style>
.bg-dark {
  background: #0b0f17;
}

.glass-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(6px);
  border-radius: 12px;
}
</style>
