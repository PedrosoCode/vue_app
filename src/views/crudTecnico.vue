<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'
import ModalConfirmacao from '@/components/ModalConfirmacao.vue'

let nCodigoTecnicoAtual: number

const bGatilhoModalCofirmacaoUpdate = ref<boolean>(false)
const bGatilhoModalCofirmacaoDelete = ref<boolean>(false)
const bGatilhoModalCofirmacaoInserir = ref<boolean>(false)

interface inFormTecnico {
    sApelido: string,
    sNomeCompleto: string,
    nCodigoTecnico: number
}

const stFormTecnico = reactive<inFormTecnico>({
    sApelido: '',
    sNomeCompleto: '',
    nCodigoTecnico: 0
})

const lSTecnico = ref<inFormTecnico[]>([])

function novo() {
    try {

        nCodigoTecnicoAtual = 0
        stFormTecnico.sApelido = ''
        stFormTecnico.sNomeCompleto = ''

    } catch (error) {
        console.error('Erro:', error)
    }
}

async function CarregarTecnicos() {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_DEFAULT_API_LINK}/tecnico/listar`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            }
        )
        lSTecnico.value = data
    } catch (error) {
        console.error('Erro ao carregar tecnicos:', error)
    }
}

function fnExcluirTecnico(nCodigoTecnico: number) {

    nCodigoTecnicoAtual = nCodigoTecnico
    bGatilhoModalCofirmacaoDelete.value = true

}

function btnInserir_Click() {

    if (nCodigoTecnicoAtual) {

        bGatilhoModalCofirmacaoUpdate.value = true

    } else {
        bGatilhoModalCofirmacaoInserir.value = true
    }

}

function btnEditar_Click(nCodigoTecnico: number, sApelido: string, sNomeCompleto: string) {

    nCodigoTecnicoAtual = nCodigoTecnico
    stFormTecnico.sApelido = sApelido
    stFormTecnico.sNomeCompleto = sNomeCompleto

}

async function fnInserirNovoTecnico() {

    try {
        await axios.post(`${import.meta.env.VITE_DEFAULT_API_LINK}/tecnico/novo`,
            { sNome: stFormTecnico.sApelido,
              sNomeCompleto : stFormTecnico.sNomeCompleto
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            }
        )

    } catch (error) {
        console.error('Erro ao inserir tecnico:', error)
    }

    novo()
    await CarregarTecnicos()
}

function fnCancelarTecnico() {
    nCodigoTecnicoAtual = 0
    stFormTecnico.sApelido = ''
    stFormTecnico.sNomeCompleto = ''
    CarregarTecnicos()
}

async function GerenciaModalConfirmacaoUpdatEenviar() {

    try {
        await axios.post(`${import.meta.env.VITE_DEFAULT_API_LINK}/tecnico/atualizar`,
            {
                sNome : stFormTecnico.sApelido,
                sNomeCompleto : stFormTecnico.sNomeCompleto,
                nCodigo : nCodigoTecnicoAtual
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            }
        )

    } catch (error) {
        console.error('Erro ao editar tecnico:', error)
    }

    novo()
    bGatilhoModalCofirmacaoUpdate.value = false
    await CarregarTecnicos()

}

async function GerenciaModalConfirmacaoInserirEnviar() {

    fnInserirNovoTecnico()
    bGatilhoModalCofirmacaoInserir.value = false
    await CarregarTecnicos()

}


async function GerenciaModalConfirmacaoDeleteEnviar() {

    try {
        await axios.post(`${import.meta.env.VITE_DEFAULT_API_LINK}/tecnico/deletar`,
            { nCodigo: nCodigoTecnicoAtual },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            }
        )

    } catch (error) {
        console.error('Erro ao deletar tecnico:', error)
    }

    novo()
    bGatilhoModalCofirmacaoDelete.value = false
    CarregarTecnicos()
}


onMounted(CarregarTecnicos)
</script>

<template>
    <main class="min-h-screen bg-slate-100 py-8">

        <!-- Modal Confirmação envio -->
        <ModalConfirmacao v-if="bGatilhoModalCofirmacaoInserir" titulo="Inserir dados"
            mensagem="Deseja confirmar a inserir este novo técnico?" textoBotaoConfirmar="Confirmar"
            textoBotaoCancelar="Cancelar" corBotaoConfirmar="indigo" corBotaoCancelar="red"
            @confirmar="() => GerenciaModalConfirmacaoInserirEnviar()"
            @cancelar="bGatilhoModalCofirmacaoInserir = false" />

        <!-- Modal Confirmação envio -->
        <ModalConfirmacao v-if="bGatilhoModalCofirmacaoUpdate" titulo="Atualizar dados"
            mensagem="Deseja atualizar o técnico atual?" textoBotaoConfirmar="Confirmar"
            textoBotaoCancelar="Cancelar" corBotaoConfirmar="indigo" corBotaoCancelar="red"
            @confirmar="GerenciaModalConfirmacaoUpdatEenviar()" @cancelar="bGatilhoModalCofirmacaoUpdate = false" />

        <!-- Modal Confirmação delete -->
        <ModalConfirmacao v-if="bGatilhoModalCofirmacaoDelete" titulo="Deletar dados"
            mensagem="Deseja excluir o técnico? esta ação não pode ser revertida" textoBotaoConfirmar="Confirmar"
            textoBotaoCancelar="Cancelar" corBotaoConfirmar="indigo" corBotaoCancelar="red"
            @confirmar="GerenciaModalConfirmacaoDeleteEnviar()" @cancelar="bGatilhoModalCofirmacaoDelete = false" />

        <div class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
            <!-- Cabeçalho -->
            <h1 class="text-2xl font-bold text-gray-800 text-center">Cadastro de Técnicos</h1>

            <!-- Grid de Inputs -->
            <div class="grid grid-cols-1 gap-6 mt-6">

                <div>
                    <label class="block text-sm font-medium text-gray-700">Apelido</label>
                    <input v-model="stFormTecnico.sApelido" type="text"
                        class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input v-model="stFormTecnico.sNomeCompleto" type="text"
                        class="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50" />
                </div>

            </div>

            <!-- Botões de Ação -->
            <div class="flex justify-end space-x-4 mt-8">
                <button @click="fnCancelarTecnico()"
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
                            <th class="p-2 text-left">Apelido</th>
                            <th class="p-2 text-left">Nome Completo</th>
                            <th class="p-2 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tecnico in lSTecnico">
                            <td class="p-2 truncate">{{ tecnico.sApelido }}</td>
                            <td class="p-2 truncate">{{ tecnico.sNomeCompleto }}</td>
                            <td class="p-2">
                                <div class="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                                    <button @click="btnEditar_Click(tecnico.nCodigoTecnico, tecnico.sApelido, tecnico.sNomeCompleto)"
                                        class="bg-amber-300 text-white rounded-lg px-4 py-2 hover:bg-amber-400 transition w-full sm:w-auto">
                                        Editar
                                    </button>
                                    <button @click="fnExcluirTecnico(tecnico.nCodigoTecnico)"
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