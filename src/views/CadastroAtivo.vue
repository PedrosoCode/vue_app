<script></script>
<template>
  <main class="min-h-screen bg-slate-100 py-8">
    <div class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <!-- Cabeçalho -->
      <h1 class="text-2xl font-bold text-gray-800 text-center">Cadastro de Ativos</h1>

      <!-- Grid de Inputs -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Observação</label>
          <input
            type="text"
            class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Descrição</label>
          <input
            type="text"
            class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
            placeholder="Ex: Máquina de impressão..."
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">N° Série</label>
          <input
            type="text"
            class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
            placeholder="Ex: SN123456"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Cor</label>
          <input
            type="text"
            class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
            placeholder="Ex: Cinza"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Tipo de máquina</label>
          <select
            class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
          >
            <option value="">Selecione o modelo de máquina</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Parceiro de negócio</label>
          <select
            class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
          >
            <option value="">Selecione o parceiro de negócio</option>
          </select>
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="flex justify-end space-x-4 mt-8">
        <button
          class="bg-gray-300 text-gray-800 rounded-lg px-6 py-3 hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button
          class="bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 transition"
        >
          Salvar
        </button>
      </div>
    </div>
  </main>
</template>
