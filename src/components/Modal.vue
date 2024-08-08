<script setup>
import cerrarModal from "../assets/img/cerrar.svg";
import { ref } from "vue";
import AlertaVue from "./Alerta.vue";

const error = ref("");

const emit = defineEmits([
  "cerrar-modal",
  "update:nombre",
  "update:cantidad",
  "update:categoria",
]);
const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  cantidad: {
    type: [String, Number],
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
});

const agregarGasto = () => {
  //validar que no haya campos vacios

  const { cantidad, categoria, nombre } = props;
  if ([cantidad, nombre, categoria].includes("")) {
    error.value = "Todos los campos son obligatorios";
    setTimeout(() => {
      error.value = "";
    }, 1500);
    return;
  }
  //validar cantidad
  if (cantidad <= 0) {
    error.value = "Cantidad no valida";

    setTimeout(() => {
      error.value = "";
    }, 1500);
  }
};
</script>

<template>
  <div class="modal">
    <div class="cerrar-modal">
      <img
        :src="cerrarModal"
        alt=""
        @click="($event) => $emit('cerrar-modal')"
      />
    </div>
    <div
      class="contenedor contenedor-formulario"
      :class="[modal.animar ? 'animar' : 'cerrar']"
    >
      <form class="nuevo-gasto" @submit.prevent="agregarGasto">
        <legend>Añadir gasto</legend>
        <AlertaVue v-if="error">{{ error }}</AlertaVue>
        <div class="campo">
          <label for="nombre">Nombre del gasto:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añade el nombre del gasto"
            :value="nombre"
            @input="$emit('update:nombre', $event.target.value)"
          />
        </div>
        <div class="campo">
          <label for="nombre">Cantidad:</label>
          <input
            type="text"
            id="cantidad"
            placeholder="Añade la cantidad del gasto"
            :value="cantidad"
            @input="$emit('update:cantidad', $event.target.value)"
          />
        </div>
        <div class="campo">
          <label for="nombre">Categoria</label>
          <select
            id="cegoria"
            :value="categoria"
            @input="$emit('update:categoria', $event.target.value)"
          >
            <option value="">--Seleccione--</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value="Añadir gasto" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0 / 0.9);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.cerrar-modal {
  position: absolute;
  right: 3rem;
  top: 3rem;
}
.cerrar-modal img {
  width: 3rem;
  cursor: pointer;
}
.contenedor-formulario {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in;
  opacity: 0;
}
.contenedor-formulario.animar {
  opacity: 1;
}
.contenedor-formulario.cerrar {
  opacity: 0;
}
.nuevo-gasto {
  margin: 10rem auto 0 auto;
  display: grid;
  gap: 2rem;
  font-weight: 700;
}
.nuevo-gasto legend {
  text-align: center;
  color: var(--blanco);
  font-size: 4rem;
}
.campo {
  display: grid;
  gap: 2rem;
}
.nuevo-gasto input,
.nuevo-gasto select {
  background-color: var(--gris-claro);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
}
.nuevo-gasto label {
  color: var(--blanco);
  font-size: 3rem;
}
.nuevo-gasto input[type="submit"] {
  background-color: var(--azul);
  color: var(--blanco);
  font-weight: 700;
  cursor: pointer;
}
</style>
