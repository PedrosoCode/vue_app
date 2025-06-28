<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'
import ModalConfirmacao from '@/components/ModalConfirmacao.vue'

let nCodigoFabricanteAtual: number

const bGatilhoModalCofirmacaoUpdate = ref<boolean>(false)
const bGatilhoModalCofirmacaoDelete = ref<boolean>(false)
const bGatilhoModalCofirmacaoInserir = ref<boolean>(false)

interface stFabricanteInfo {
    rSdescricao: string,
    rIcodigoEmpresa: number,
    rIcodigo: number
}

const stFabricanteInfo = reactive<stFabricanteInfo>({
    rSdescricao: '',
    rIcodigoEmpresa: 0,
    rIcodigo: 0
})

const DadosFabricante = ref<stFabricanteInfo[]>([])

function novo() {
    try {

        nCodigoFabricanteAtual = 0
        stFabricanteInfo.rSdescricao = ''

    } catch (error) {
        console.error('Erro:', error)
    }
}

async function LoadFabricantes() {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_DEFAULT_API_LINK}/fabricante/listagem`,
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

function fnExcluirFabricante(nCodigoFabricante: number) {

    nCodigoFabricanteAtual = nCodigoFabricante
    bGatilhoModalCofirmacaoDelete.value = true

}

function btnInserir_Click() {

    if (nCodigoFabricanteAtual) {

        bGatilhoModalCofirmacaoUpdate.value = true

    } else {
        bGatilhoModalCofirmacaoInserir.value = true
    }

}

function btnEditar_Click(nCodigoFabricante: number, sDescricaoFabricante: string) {

    nCodigoFabricanteAtual = nCodigoFabricante
    stFabricanteInfo.rSdescricao = sDescricaoFabricante

}

async function fnInserirNovoFabricante() {

    try {
        await axios.post(`${import.meta.env.VITE_DEFAULT_API_LINK}/fabricante/novo`,
            { sDescricaoFabricante: stFabricanteInfo.rSdescricao },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            }
        )

    } catch (error) {
        console.error('Erro ao inserir fabricante:', error)
    }

    novo()
    await LoadFabricantes()
}

function fnCancelarFabricante() {
    nCodigoFabricanteAtual = 0
    stFabricanteInfo.rSdescricao = ''
    LoadFabricantes()
}

async function GerenciaModalConfirmacaoUpdatEenviar() {

    try {
        await axios.post(`${import.meta.env.VITE_DEFAULT_API_LINK}/fabricante/atualizar`,
            {
                sDescricaoFabricante: stFabricanteInfo.rSdescricao,
                nCodigoFabricante: nCodigoFabricanteAtual
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            }
        )

    } catch (error) {
        console.error('Erro ao editar fabricante:', error)
    }

    novo()
    bGatilhoModalCofirmacaoUpdate.value = false
    await LoadFabricantes()

}

async function GerenciaModalConfirmacaoInserirEnviar() {

    fnInserirNovoFabricante()
    bGatilhoModalCofirmacaoInserir.value = false
    await LoadFabricantes()

}


async function GerenciaModalConfirmacaoDeleteEnviar() {

    try {
        await axios.post(`${import.meta.env.VITE_DEFAULT_API_LINK}/fabricante/deletar`,
            { nCodigoFabricante: nCodigoFabricanteAtual },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            }
        )

    } catch (error) {
        console.error('Erro ao deletar fabricante:', error)
    }

    novo()
    bGatilhoModalCofirmacaoDelete.value = false
    LoadFabricantes()
}


onMounted(LoadFabricantes)
</script>

<template>
    <main class="min-h-screen bg-slate-100 py-8">

        <!-- Modal Confirmação envio -->
        <ModalConfirmacao v-if="bGatilhoModalCofirmacaoInserir" titulo="Inserir dados"
            mensagem="Deseja confirmar a inserir este novo fabricante?" textoBotaoConfirmar="Confirmar"
            textoBotaoCancelar="Cancelar" corBotaoConfirmar="indigo" corBotaoCancelar="red"
            @confirmar="() => GerenciaModalConfirmacaoInserirEnviar()"
            @cancelar="bGatilhoModalCofirmacaoInserir = false" />

        <!-- Modal Confirmação envio -->
        <ModalConfirmacao v-if="bGatilhoModalCofirmacaoUpdate" titulo="Atualizar dados"
            mensagem="Deseja atualizar o fabricante atual?" textoBotaoConfirmar="Confirmar"
            textoBotaoCancelar="Cancelar" corBotaoConfirmar="indigo" corBotaoCancelar="red"
            @confirmar="GerenciaModalConfirmacaoUpdatEenviar()" @cancelar="bGatilhoModalCofirmacaoUpdate = false" />

        <!-- Modal Confirmação delete -->
        <ModalConfirmacao v-if="bGatilhoModalCofirmacaoDelete" titulo="Deletar dados"
            mensagem="Deseja excluir o fabricante? esta ação não pode ser revertida" textoBotaoConfirmar="Confirmar"
            textoBotaoCancelar="Cancelar" corBotaoConfirmar="indigo" corBotaoCancelar="red"
            @confirmar="GerenciaModalConfirmacaoDeleteEnviar()" @cancelar="bGatilhoModalCofirmacaoDelete = false" />

        <div class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
            <!-- Cabeçalho -->
            <h1 class="text-2xl font-bold text-gray-800 text-center">Cadastro de Fabricantes</h1>

            <!-- Grid de Inputs -->
            <div class="grid grid-cols-1 gap-6 mt-6">

                <div>
                    <label class="block text-sm font-medium text-gray-700">Descrição</label>
                    <input v-model="stFabricanteInfo.rSdescricao" type="text"
                        class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50" />
                </div>

            </div>

            <!-- Botões de Ação -->
            <div class="flex justify-end space-x-4 mt-8">
                <button @click="fnCancelarFabricante()"
                    class="bg-red-600 text-white rounded-lg px-6 py-3 hover:bg-red-700 transition">
                    Cancelar
                </button>
                <button @click="btnInserir_Click()"
                    class="bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 transition">
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
                                    <!-- <button @click="fnEditarFabricante(fabricante.rIcodigo)" -->
                                    <button @click="btnEditar_Click(fabricante.rIcodigo, fabricante.rSdescricao)"
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