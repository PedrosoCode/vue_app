<script setup lang="ts">
import { ref } from "vue";
import MainNavbar from "@/components/MainNavbar.vue";

const pessoas = ref([
  { id: 1, nome: "Alberto", sobrenome: "bbb", idade: 10, olho: "azul" },
  { id: 2, nome: "Bartolomeu", sobrenome: "bbb", idade: 20, olho: "marrom" },
  { id: 3, nome: "Clebinho", sobrenome: "ddd", idade: 30, olho: "verde" },
  { id: 4, nome: "Diogo", sobrenome: "braguinha", idade: 40, olho: "marrom" },
]);

// Pegando os nomes das propriedades do primeiro objeto
const tableHeader = Object.keys(pessoas.value[0] || {});
//console.log(tableHeader)
</script>

<template>
  <main>
    <header>
      <MainNavbar />

      <div>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/menu">módulos</RouterLink>
          <RouterLink to="/listaparceiro">parceiro</RouterLink>
        </nav>
      </div>
    </header>
  </main>
</template>
