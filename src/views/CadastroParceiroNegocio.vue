<script setup lang="ts">
import MainNavbar from '@/components/MainNavbar.vue'
import { reactive, ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'

interface stFormInfo {
  sRazaoSocial: string
  sNomeFantasia: string
  sTipoParceiro: string
  sEmail: string
  sTelefone: string
  sContato: string
  sLogradouro: string
  sBairro: string
  sComplemento: string
  sNumero: string
  sCep: string
  nCodigoPais: number | null
  nCodigoCidade: number | null
  nCodigoEstado: number | null
}

const stFormInfo = reactive<stFormInfo>({
  sRazaoSocial: '',
  sNomeFantasia: '',
  sTipoParceiro: '',
  sEmail: '',
  sTelefone: '',
  sContato: '',
  sLogradouro: '',
  sBairro: '',
  sComplemento: '',
  sNumero: '',
  sCep: '',
  nCodigoPais: null,
  nCodigoCidade: null,
  nCodigoEstado: null,
})

interface stateCboPais {
  nCodigoPais: number
  sNomePais: string
  nUfCidade: number
}
const stCboPais = ref<stateCboPais[]>([])

interface stateComboCidade {
  nCodigoCidade: number
  sDescricaoCidade: string
  nUfCidade: number
}
const stCboCidade = ref<stateComboCidade[]>([])

interface stateComboEstado {
  nCodigoEstado: number
  sNomeEstado: string
  sUF: string
}
const stCboEstado = ref<stateComboEstado[]>([])

function btnEnviarClick() {
  console.log(stFormInfo)
  axios
    .post(import.meta.env.VITE_DEFAULT_API_LINK + '/', {
      sRazaoSocial: stFormInfo.sRazaoSocial,
      sNomeFantasia: stFormInfo.sNomeFantasia,
      sTipoParceiro: stFormInfo.sTipoParceiro,
      sEmail: stFormInfo.sEmail,
      sTelefone: stFormInfo.sTelefone,
      sContato: stFormInfo.sContato,
      sLogradouro: stFormInfo.sLogradouro,
      sBairro: stFormInfo.sBairro,
      sComplemento: stFormInfo.sComplemento,
      sNumero: stFormInfo.sNumero,
      sCep: stFormInfo.sCep,
      nCodigoPais: stFormInfo.nCodigoPais,
      nCodigoCidade: stFormInfo.nCodigoCidade,
      nCodigoEstado: stFormInfo.nCodigoEstado,
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
}

async function loadComboPais() {
  try {
    const response = await axios.get(import.meta.env.VITE_DEFAULT_API_LINK + '/genericos/pais')
    stCboPais.value = response.data
    console.log('Dados carregados:', stCboPais.value)
  } catch (error) {
    console.error('Erro ao carregar empresas:', error)
  }
}

async function loadComboCidade(nCodigoEstado: number | null) {
  try {
    const response = await axios.request({
      method: 'POST',
      url: import.meta.env.VITE_DEFAULT_API_LINK + '/genericos/cidade',
      data: { nCodigoEstado },
    })
    stCboCidade.value = response.data
    console.log('Dados carregados:', stCboCidade.value)
  } catch (error) {
    console.error('Erro ao carregar Cidades:', error)
  }
}

async function loadComboEstado() {
  try {
    const response = await axios.get(import.meta.env.VITE_DEFAULT_API_LINK + '/genericos/estado')
    stCboEstado.value = response.data
    console.log('Dados carregados:', stCboEstado.value)
  } catch (error) {
    console.error('Erro ao carregar estados/uf:', error)
  }
}

async function loadCombos() {
  loadComboPais()
  loadComboCidade(null)
  loadComboEstado()
}

function ComboEstadoSelectedChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const codigoEstado = target.value ? Number(target.value) : null
  loadComboCidade(codigoEstado)
}

onMounted(() => {
  loadCombos()
})
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
      <br />
      <form @submit.prevent="btnEnviarClick">
        <div class="container border border-subtle rounded">
          <div>
            <br />
            <div class="text-center">
              <label class="form-label">Formulário de Cadastro de parceiros de negócio</label>
            </div>
            <div class="text-start">
              <div>
                <label class="form-label">Data do Cadastro:</label>
              </div>
              <div>
                <label class="form-label">Data Última Alteração:</label>
              </div>
              <br />
            </div>
          </div>
          <div class="row justify-content-center">
            <br />
            <div class="row justify-content-center">
              <div class="col-5">
                <div class="mb-3">
                  <label for="" class="form-label">Razão Social</label>
                  <input
                    v-model="stFormInfo.sRazaoSocial"
                    type="text"
                    id=""
                    class="form-control"
                    placeholder="Insira a razão social"
                    required
                  />
                </div>
              </div>
              <div class="col-5">
                <div class="mb-3">
                  <label for="disabledTextInput" class="form-label">Nome Fantasia</label>
                  <input
                    v-model="stFormInfo.sNomeFantasia"
                    type="text"
                    id=""
                    class="form-control"
                    placeholder="Insira o Nome Fantasia"
                    required
                  />
                </div>
              </div>
              <div class="col-md-2">
                <label for="" class="form-label">Tipo Parceiro</label>
                <select v-model="stFormInfo.sTipoParceiro" id="" class="form-select">
                  <option selected></option>
                </select>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-4">
                <div class="mb-3">
                  <label for="" class="form-label">E-Mail</label>
                  <input
                    v-model="stFormInfo.sEmail"
                    type="text"
                    id=""
                    class="form-control"
                    placeholder="Insira o E-mail"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label for="" class="form-label">Telefone</label>
                  <input
                    v-model="stFormInfo.sTelefone"
                    type="text"
                    id=""
                    class="form-control"
                    placeholder="Insira o Telefone"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label for="" class="form-label">Contato</label>
                  <input
                    v-model="stFormInfo.sContato"
                    type=""
                    id=""
                    class="form-control"
                    placeholder="Insira o Contato"
                  />
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-6">
                <div class="mb-3">
                  <label for="" class="form-label">Logradouro</label>
                  <input
                    v-model="stFormInfo.sLogradouro"
                    type="text"
                    id=""
                    class="form-control"
                    placeholder="Insira o logradouro"
                  />
                </div>
              </div>
              <div class="col-3">
                <div class="mb-3">
                  <label for="disabledTextInput" class="form-label">Bairro</label>
                  <input
                    v-model="stFormInfo.sBairro"
                    type="text"
                    id=""
                    class="form-control"
                    placeholder="Insira o Bairro"
                  />
                </div>
              </div>
              <div class="col-3">
                <div class="mb-3">
                  <label for="disabledTextInput" class="form-label">Complemento</label>
                  <input
                    v-model="stFormInfo.sComplemento"
                    type="text"
                    id=""
                    class="form-control"
                    placeholder="Insira o Complemento caso aplicável"
                  />
                </div>
              </div>
            </div>
            <div class="row justify-content-start">
              <div class="col-2">
                <div class="mb-3">
                  <label for="" class="form-label">Número</label>
                  <input
                    v-model="stFormInfo.sNumero"
                    type="text"
                    id=""
                    class="form-control"
                    placeholder="Insira o N°"
                  />
                </div>
              </div>

              <div class="col-3">
                <div class="mb-3">
                  <label for="" class="form-label">CEP</label>
                  <input
                    v-model="stFormInfo.sCep"
                    type="text"
                    id=""
                    class="form-control"
                    placeholder="Insira o CEP"
                  />
                </div>
              </div>
            </div>
            <div class="row justify-content-start">
              <div class="col-md-3">
                <label for="" class="form-label">País</label>
                <select v-model="stFormInfo.nCodigoPais" id="" class="form-select mb-3">
                  <option v-for="pais in stCboPais" :key="pais.nCodigoPais" :value="pais.nCodigoPais">
                    {{ pais.sNomePais }}
                  </option>
                </select>
              </div>
              <div class="col-md-5">
                <label for="" class="form-label">Cidade</label>
                <select v-model="stFormInfo.nCodigoCidade" id="" class="form-select mb-3">
                  <option
                    v-for="cidade in stCboCidade"
                    :key="cidade.nCodigoCidade"
                    :value="cidade.nCodigoCidade"
                  >
                    {{ cidade.sDescricaoCidade }}
                  </option>
                </select>
              </div>
              <div class="col-md-2">
                <label for="" class="form-label">Estado</label>
                <select
                  v-model="stFormInfo.nCodigoEstado"
                  @change="ComboEstadoSelectedChange"
                  class="form-select mb-3"
                >
                  <option :value="null">Selecione um estado</option>
                  <option
                    v-for="estado in stCboEstado"
                    :key="estado.nCodigoEstado"
                    :value="estado.nCodigoEstado"
                  >
                    {{ estado.sNomeEstado }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="row justify-content-end">
            <div class="col-md-2 mb-3">
              <button type="submit" class="btn btn-primary">Enviar</button>
            </div>
          </div>
        </div>

      </form>
      <br><br>
    </header>
  </main>
</template>
