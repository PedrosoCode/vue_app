<script setup lang="ts">
import MainNavbar from '@/components/MainNavbar.vue'
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

interface Filtro {
  sNomeParceiro: string
}

interface Parceiro {
  sNomeFantasiaParceiro: string
  sRazaoSocialParceiro: string
  sDescricaoCidade: string
  nCodigoParceiro: number
}

const filtro = reactive<Filtro>({
  sNomeParceiro: '',
})

const dadosParceiros = ref<Parceiro[]>([])
const jwtToken = localStorage.getItem('jwtToken')
const router = useRouter()

function verDetalhes(codigoParceiro: number) {
  router.push({
    name: 'detalhes_parceiro',
    params: { id: codigoParceiro }
  })
}

async function getListaParceiros() {
  try {
    const response = await axios.post(
      import.meta.env.VITE_DEFAULT_API_LINK + '/cadparceiros/listagem',
      { sNomeParceiro: filtro.sNomeParceiro },
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    )

    dadosParceiros.value = response.data
    console.log('Dados recebidos:', dadosParceiros.value)

  } catch (error) {
    console.error('Erro ao carregar parceiros:', error)
    dadosParceiros.value = []
  }
}

function btnFiltrarClicked() {
  getListaParceiros()
}

onMounted(() => {
  getListaParceiros()
})
</script>

<template>
  <main>
    <header>
      <MainNavbar />
    </header>

    <div class="container">
      <form @submit.prevent="btnFiltrarClicked">
        <div class="row g-3">
          <div class="col-md-6">
            <label for="txtNomeParceiro" class="form-label">Nome do Parceiro</label>
            <input
              type="text"
              class="form-control"
              id="txtNomeParceiro"
              v-model="filtro.sNomeParceiro"
            >
          </div>
          <div class="col-6 align-content-end">
            <button type="submit" class="btn btn-primary">Filtrar</button>
          </div>
        </div>
      </form>
    </div>

    <div class="container mt-4">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome Fantasia</th>
            <th scope="col">Razão Social</th>
            <th scope="col">Localização</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(parceiro, index) in dadosParceiros"
            :key="index"
          >
            <th scope="row">{{ parceiro.nCodigoParceiro }}</th>
            <td>{{ parceiro.sNomeFantasiaParceiro}}</td>
            <td>{{ parceiro.sRazaoSocialParceiro}}</td>
            <td>{{ parceiro.sDescricaoCidade}}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="verDetalhes(parceiro.nCodigoParceiro)"
              >
                Detalhes
              </button>
            </td>
          </tr>
          <tr v-if="dadosParceiros.length === 0">
            <td colspan="5" class="text-center">Nenhum parceiro encontrado</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
