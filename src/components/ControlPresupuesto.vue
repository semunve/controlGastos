<script setup>
import imagen from "../assets/img/grafico.jpg";
</script>

<template>
  <div class="dos-columnas">
    <div class="contenedor-grafico">
      <img :src="imagen" alt="" />
    </div>
    <div class="contnedor-presupuesto">
      <button class="reset-app">Resetear App</button>
      <p>
        <span>Presupuesto:</span>
      </p>
      <p>
        <span>Disponible:</span>
      </p>
      <p>
        <span>Gastado:</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.dos-columnas {
  display: flex;
  flex-direction: column;
}
.dos-columnas > :first-child {
  margin-bottom: 3rem;
}
@media (min-width: 768px) {
  .dos-columnas {
    flex-direction: row;
    gap: 4rem;
    align-items: center;
  }
  .dos-columnas > :first-child {
    margin-bottom: 0rem;
  }
}
.reset-app {
  background-color: rgb(197, 65, 65);
  border: none;
  padding: 1rem;
  width: 100%;
  font-weight: bold;
  border-radius: 1rem;
  transition-property: background-color;
  transition-duration: 300ms;
}
.reset-app:hover {
  background-color: rgb(165, 56, 56);
  cursor: pointer;
  color: var(--blanco);
}
.contenedor-presupuesto {
  width: 100%;
}
.contenedor-presupuesto p {
  font-size: 2.4rem;
  text-align: center;
}
@media (min-width: 768px) {
  .contenedor-presupuesto p {
    text-align: left;
  }
}
.contenedor-presupuesto span {
  font-weight: 900;
  color: var(--azul);
}
</style>
