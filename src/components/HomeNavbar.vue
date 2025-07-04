<template>
  <nav class="bg-slate-200 border-b border-gray-200 shadow-md">
    <div class="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
      
      <!-- Logo / Título -->
      <span class="text-3xl font-bold text-gray-800 dark:text-white select-none">CMMS</span>

      <!-- Botão para telas pequenas (opcional se quiser um menu futuro) -->
      <div class="md:hidden">
      </div>

      <div class="hidden md:flex gap-2">
        <button 
          @click="$router.push('login')" 
          class="px-4 py-2 bg-indigo-600 text-white font-medium text-lg rounded-lg border border-indigo-700 transition-all hover:bg-indigo-700 hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Iniciar
        </button>
      </div>
    </div>
  </nav>
</template>
