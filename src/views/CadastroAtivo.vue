<script setup lang="ts">

import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'
import ModalConfirmacao from '@/components/ModalConfirmacao.vue'

//TODO - UPDATE
//TODO - SELECT (LISTAGEM)
//TODO - SELECT (EDITAR),
//TODO - UPDATE
//TODO - DELETE

interface inFormAtivo {
  sObservacao: string,
  nDescricao: string,
  nSerie: string,
  sCor: string,
  nCodigoTipoMaquina: number,
  nCodigoParceiroNegocio: number
}

const stFormAtivo = reactive<inFormAtivo>({
  sObservacao: '',
  nDescricao: '',
  nSerie: '',
  sCor: '',
  nCodigoTipoMaquina: 0,
  nCodigoParceiroNegocio: 0
})

interface inComboParceiroNegocio {
  nCodigoParceiroNegocio: number,
  sDescricaoParceiroNegocio: string,
}

const lsComboParceiroNegocio = ref<inComboParceiroNegocio[]>([])

interface inComboTipoMaquina {
  nCodigoTipoMaquina: number,
  sDescricaoTipoMaquina: string,
}

const lsComboTipoMaquina = ref<inComboParceiroNegocio[]>([])


async function CarregarCombos() {
  try {
    const response = await axios.post(import.meta.env.VITE_DEFAULT_API_LINK + '/genericos/combo_parceiro_negocio', {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        }
      })
    lsComboParceiroNegocio.value = response.data
  } catch (error) {
    console.error('Erro ao carregar parceiros de negócio:', error)
  }
}

async function inserirAtivo(stReqFormAtivo : inFormAtivo) {
  try {
    const response = await axios.post(import.meta.env.VITE_DEFAULT_API_LINK + '/ativo/inserirAtivo', {stReqFormAtivo},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        }
      })
    lsComboParceiroNegocio.value = response.data
  } catch (error) {
    console.error('Erro ao carregar parceiros de negócio:', error)
  }
}

onMounted(CarregarCombos)

</script>
<template>
  <main class="min-h-screen bg-slate-100 py-8">
    <div class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <!-- Cabeçalho -->
      <h1 class="text-2xl font-bold text-gray-800 text-center">Cadastro de Ativos</h1>

      <!-- Grid de Inputs -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Observação</label>
          <input v-model="stFormAtivo.sObservacao" type="text"
            class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Descrição</label>
          <input v-model="stFormAtivo.nDescricao" type="text"
            class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
            placeholder="Ex: Máquina de impressão..." />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">N° Série</label>
          <input v-model="stFormAtivo.nSerie" type="text"
            class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
            placeholder="Ex: SN123456" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Cor</label>
          <input v-model="stFormAtivo.sCor" type="text"
            class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
            placeholder="Ex: Cinza" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Tipo de máquina</label>
          <select v-model="stFormAtivo.nCodigoTipoMaquina"
            class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50">
            <option value="">Selecione o modelo de máquina</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Parceiro de negócio</label>
          <select v-model="stFormAtivo.nCodigoParceiroNegocio"
            class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50">
            <option value="" disabled>Selecione o parceiro de negócio</option>
            <option v-for="parceiro in lsComboParceiroNegocio" :key="parceiro.nCodigoParceiroNegocio"
              :value="parceiro.nCodigoParceiroNegocio"> {{ parceiro.sDescricaoParceiroNegocio }} </option>
          </select>
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="flex justify-end space-x-4 mt-8">
        <button class="bg-gray-300 text-gray-800 rounded-lg px-6 py-3 hover:bg-gray-400 transition">
          Cancelar
        </button>
        <button @click="inserirAtivo(stFormAtivo)" class="bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 transition">
          Salvar
        </button>
      </div>
    </div>
  </main>
</template>
