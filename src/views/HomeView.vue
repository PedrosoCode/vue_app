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
        </nav>
      </div>
    </header>
  </main>
</template>
