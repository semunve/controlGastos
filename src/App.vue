<script setup>
import Presupuesto from "./components/Presupuesto.vue";
import { ref, reactive, watch, computed, onMounted } from "vue";
import ControlPresupuesto from "./components/ControlPresupuesto.vue";
import iconcoNuevoGasto from "./assets/img/nuevo-gasto.svg";
import ModalVue from "./components/Modal.vue";
import { generaId } from "./helpers";
import GastoVue from "./components/Gasto.vue";
import FiltrosVue from "./components/Filtros.vue";
const modal = reactive({
  mostrar: false,
  animar: false,
});
const presupuesto = ref(0);
const disponible = ref(0);
const gastado = ref(0);
const filtro = ref("");

const gasto = reactive({
  nombre: "",
  cantidad: "",
  categoria: "",
  id: null,
  fecha: Date.now(),
});

const gastos = ref([]);

watch(
  gastos,
  () => {
    const totalGastado = gastos.value.reduce(
      (total, gasto) => parseFloat(gasto.cantidad) + total,
      0
    );

    gastado.value = totalGastado;
    disponible.value = presupuesto.value - totalGastado;
    localStorage.setItem("gastos", JSON.stringify(gastos.value));
  },
  {
    deep: true,
  }
);

watch(
  modal,
  () => {
    if (!modal.mostrar) {
      //Reinicio de objeto para edición de gasto
      reiniciarGasto();
    }
  },

  {
    deep: true,
  }
);

watch(presupuesto, () => {
  localStorage.setItem("presupuesto", presupuesto.value);
});

onMounted(() => {
  const presupuestoStorage = localStorage.getItem("presupuesto");

  if (presupuestoStorage) {
    presupuesto.value = Number(presupuestoStorage);
    disponible.value = Number(presupuestoStorage);
  }
  const gastoStorage = localStorage.getItem("gastos");
  if (gastoStorage) {
    gastos.value = JSON.parse(gastoStorage);
  }
});

const definirPresupuesto = (cantidad) => {
  presupuesto.value = cantidad;
  disponible.value = cantidad;
};

const mostrarModal = () => {
  modal.mostrar = true;
  setTimeout(() => {
    modal.animar = true;
  }, 300);
};

const cerrarModal = () => {
  modal.animar = false;
  setTimeout(() => {
    modal.mostrar = false;
  }, 300);
};

const guardarGasto = () => {
  if (gasto.id) {
    const { id } = gasto;
    const i = gastos.value.findIndex((gasto) => gasto.id === id);
    gastos.value[i] = { ...gasto };
  } else {
    gastos.value.push({
      ...gasto,
      id: generaId(),
    });
  }

  cerrarModal();
  reiniciarGasto();
};

const reiniciarGasto = () => {
  Object.assign(gasto, {
    nombre: "",
    cantidad: "",
    categoria: "",
    id: null,
    fecha: Date.now(),
  });
};

const seleccionarGasto = (id) => {
  const gastoEditar = gastos.value.filter((gasto) => gasto.id === id)[0];
  Object.assign(gasto, gastoEditar);
  mostrarModal();
};

const eliminarGasto = () => {
  gastos.value = gastos.value.filter(
    (gastoState) => gastoState.id !== gasto.id
  );
  cerrarModal();
};

const gastosFiltrados = computed(() => {
  if (filtro.value) {
    return gastos.value.filter((gasto) => gasto.categoria === filtro.value);
  }
  return gastos.value;
});
const resetApp = () => {
  if (confirm("¿Desea resetear todo el gasto?")) {
    gastos.value = [];
    presupuesto.value = 0;
  }
};
</script>

<template>
  <div :class="{ fijar: modal.mostrar }">
    <header>
      <h1>Planificador de gastos</h1>
      <div class="contenedor-header contenedor sombra">
        <Presupuesto
          v-if="presupuesto === 0"
          @definir-presupuesto="definirPresupuesto"
        />
        <ControlPresupuesto
          v-else
          :presupuesto="presupuesto"
          :disponible="disponible"
          :gastado="gastado"
          @reset-app="resetApp"
        />
      </div>
    </header>
    <main v-if="presupuesto > 0">
      <FiltrosVue v-model:filtro="filtro" />
      <div class="listado-gastos contenedor">
        <h2>{{ gastosFiltrados.length > 0 ? "Gastos" : "No hay gastos" }}</h2>
        <GastoVue
          v-for="gasto in gastosFiltrados"
          :key="gasto.id"
          :gasto="gasto"
          @seleccionar-gasto="seleccionarGasto"
        />
      </div>
      <div class="crear-gasto">
        <img
          :src="iconcoNuevoGasto"
          alt="icono nuevo gasto"
          @click="mostrarModal"
        />
      </div>
      <ModalVue
        v-if="modal.mostrar"
        @cerrar-modal="cerrarModal"
        @guardar-gasto="guardarGasto"
        @eliminar-gasto="eliminarGasto"
        :modal="modal"
        :disponible="disponible"
        :id="gasto.id"
        v-model:nombre="gasto.nombre"
        v-model:cantidad="gasto.cantidad"
        v-model:categoria="gasto.categoria"
      />
    </main>
  </div>
</template>

<style>
:root {
  --azul: #3b82f6;
  --blanco: #fff;
  --gris-claro: #cacbcc;
  --gris-oscuro: #64748b;
  ---negro: #000;
}
html {
  font-size: 62.5%;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
body {
  font-size: 1.6rem;
  font-family: "lato", sans-serif;
  background-color: var(--gris-claro);
}
h1 {
  font-size: 4rem;
}
h2 {
  font-size: 3rem;
}
.fijar {
  overflow: hidden;
  height: 100vh;
}
header {
  background-color: var(--azul);
}
header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--blanco);
  text-align: center;
}
.contenedor {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}
.contenedor-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}

.sombra {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--blanco);
  border-radius: 1.2rem;
  padding: 5rem;
}

.crear-gasto {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}
.crear-gasto img {
  width: 5rem;
}
.crear-gasto img:hover {
  cursor: pointer;
}
.listado-gastos {
  margin-top: 10rem;
}
.listado-gastos h2 {
  font-weight: 900;
  color: var(--gris-oscuro);
}
</style>
