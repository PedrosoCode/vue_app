<script setup lang="ts">
import MainNavbar from '@/components/MainNavbar.vue'
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
          <RouterLink to="/ordem_servico">Ordem de serviço</RouterLink>
        </nav>
      </div>
    </header>
  </main>
</template>
