<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

interface stFabricanteInfo {
  rSdescricao: string
  rIcodigoEmpresa: number
  rIcodigo: number
}

const DadosFabricante = ref<stFabricanteInfo[]>([])

async function LoadFabricantes() {
  try {
    const { data } = await axios.post<stFabricanteInfo[]>(
      `${import.meta.env.VITE_DEFAULT_API_LINK}/fabricante/listagem`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        }
      }
    )
    DadosFabricante.value = data
  } catch (error) {
    console.error('Erro ao carregar fabricantes:', error)
  }
}

function fnEditarFabricante(nCodigoFabricante : Number) {
    
}

function fnExcluirFabricante(nCodigoFabricante : Number) {
    
}

function fnInserirNovoFabricante() {
    LoadFabricantes()
}


onMounted(LoadFabricantes)
</script>

<template>
    <main class="min-h-screen bg-slate-100 py-8">
        <div class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
            <!-- Cabeçalho -->
            <h1 class="text-2xl font-bold text-gray-800 text-center">Cadastro de Fabricantes</h1>

            <!-- Grid de Inputs -->
            <div class="grid grid-cols-1 gap-6 mt-6">

                <div>
                    <label class="block text-sm font-medium text-gray-700">Descrição</label>
                    <input type="text"
                        class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50" />
                </div>

            </div>

            <!-- Botões de Ação -->
            <div class="flex justify-end space-x-4 mt-8">
                <button class="bg-gray-300 text-gray-800 rounded-lg px-6 py-3 hover:bg-gray-400 transition">
                    Cancelar
                </button>
                <button @click="fnInserirNovoFabricante()" class="bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 transition">
                    Inserir
                </button>
            </div>
        </div>

        <div class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg my-4">
            <!-- Div para permitir scroll horizontal em telas pequenas -->
            <div class="overflow-x-auto">
                <table class="table-fixed w-full">
                    <thead>
                        <tr>
                            <th class="p-2 text-left">Descrição</th>
                            <th class="p-2 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="fabricante in DadosFabricante">
                            <td class="p-2 truncate">{{ fabricante.rSdescricao }}</td>
                            <td class="p-2">
                                <div class="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                                    <button @click="fnEditarFabricante(fabricante.rIcodigo)"
                                        class="bg-amber-300 text-white rounded-lg px-4 py-2 hover:bg-amber-400 transition w-full sm:w-auto">
                                        Editar
                                    </button>
                                    <button @click="fnExcluirFabricante(fabricante.rIcodigo)"
                                        class="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition w-full sm:w-auto">
                                        Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </main>
</template>