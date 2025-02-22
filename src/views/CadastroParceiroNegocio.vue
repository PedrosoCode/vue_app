<script setup lang="ts">
import MainNavbar from '@/components/MainNavbar.vue'
import { reactive, ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface stFormInfo {
  sRazaoSocialParceiro: string
  sNomeFantasiaParceiro: string
  nCodigoTipoParceiro: number
  sTipoParceiroNegocio: string
  sEmailParceiro: string
  sTelefoneParceiro: string
  sContatoParceiro: string
  sLogradouro: string
  sBairroParceiro: string
  sComplementoParceiro: string
  sNumeroParceiro: string
  sCepParceiro: string
  nCodigoPaisParceiro: number | null
  nCodigoCidadeParceiro: number | null
  nCodigoEstadoParceiro: number | null
}

const stFormInfo = reactive<stFormInfo>({
  sRazaoSocialParceiro: '',
  sNomeFantasiaParceiro: '',
  nCodigoTipoParceiro: 0,
  sTipoParceiroNegocio: '',
  sEmailParceiro: '',
  sTelefoneParceiro: '',
  sContatoParceiro: '',
  sLogradouro: '',
  sBairroParceiro: '',
  sComplementoParceiro: '',
  sNumeroParceiro: '',
  sCepParceiro: '',
  nCodigoPaisParceiro: null,
  nCodigoCidadeParceiro: null,
  nCodigoEstadoParceiro: null,
})

const DadosParceiro = ref<stFormInfo[]>([])

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

interface stateComboTipoParceiro {
  sSigla: number
  sTipoParceiro: string
  nCodigoTipoParceiro: number
}
const stCboTipoParceiro = ref<stateComboTipoParceiro[]>([])

const route = useRoute();
const jwtToken = localStorage.getItem('jwtToken')

const urlCodigoParceiro: number | null = route.params.id === undefined || isNaN(Number(route.params.id))
    ? null
    : Number(route.params.id);

function btnEnviarClick() {
  //console.log(urlCodigoParceiro)
  axios
    .post(import.meta.env.VITE_DEFAULT_API_LINK + '/', {
      nCodigoParceiro : urlCodigoParceiro,
      sRazaoSocial: stFormInfo.sRazaoSocialParceiro,
      sNomeFantasia: stFormInfo.sNomeFantasiaParceiro,
      sTipoParceiro: stFormInfo.sTipoParceiroNegocio,
      nTipoParceiro: stFormInfo.nCodigoTipoParceiro,
      sEmail: stFormInfo.sEmailParceiro,
      sTelefone: stFormInfo.sTelefoneParceiro,
      sContato: stFormInfo.sContatoParceiro,
      sLogradouro: stFormInfo.sLogradouro,
      sBairro: stFormInfo.sBairroParceiro,
      sComplemento: stFormInfo.sComplementoParceiro,
      sNumero: stFormInfo.sNumeroParceiro,
      sCep: stFormInfo.sCepParceiro,
      nCodigoPais: stFormInfo.nCodigoPaisParceiro,
      nCodigoCidade: stFormInfo.nCodigoCidadeParceiro,
      nCodigoEstado: stFormInfo.nCodigoEstadoParceiro,
    })
    .catch((error) => console.log(error))
}

async function LoadComboTipoParceiro() {
  try {
    const response = await axios.get(import.meta.env.VITE_DEFAULT_API_LINK + '/genericos/tipo_parceiro')
    stCboTipoParceiro.value = response.data
    //console.log('Dados carregados:', stCboTipoParceiro.value)
  } catch (error) {
    console.error('Erro ao carregar tipo parceiro:', error)
  }
}


async function loadComboPais() {
  try {
    const response = await axios.get(import.meta.env.VITE_DEFAULT_API_LINK + '/genericos/pais')
    stCboPais.value = response.data
    //console.log('Dados carregados:', stCboPais.value)
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
    //console.log('Dados carregados:', stCboCidade.value)
  } catch (error) {
    console.error('Erro ao carregar Cidades:', error)
  }
}

async function loadComboEstado() {
  try {
    const response = await axios.get(import.meta.env.VITE_DEFAULT_API_LINK + '/genericos/estado')
    stCboEstado.value = response.data
    //console.log('Dados carregados:', stCboEstado.value)
  } catch (error) {
    console.error('Erro ao carregar estados/uf:', error)
  }
}

async function LoadDadosParceiro(nCodigoParceiro : number | null) {

  if (nCodigoParceiro != null) {

      try {

        const response = await axios.post(import.meta.env.VITE_DEFAULT_API_LINK + '/cadparceiros/lista_unico',
          {nCodigoParceiro : nCodigoParceiro},
          {headers: {Authorization: `Bearer ${jwtToken}`} }
        )

        DadosParceiro.value  = response.data
        Object.assign(stFormInfo, response.data[0])

      } catch (error) {
        console.log("erro ao carregar dados do parceiro", error)
      }

  }
}

async function loadCombos() {
  await Promise.all([
    loadComboPais(),
    loadComboEstado(),
    LoadComboTipoParceiro(),
  ]);

  await LoadDadosParceiro(urlCodigoParceiro);

  if (stFormInfo.nCodigoEstadoParceiro) {
    await loadComboCidade(stFormInfo.nCodigoEstadoParceiro);
  }
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
                    v-model="stFormInfo.sRazaoSocialParceiro"
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
                    v-model="stFormInfo.sNomeFantasiaParceiro"
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
                <select v-model="stFormInfo.sTipoParceiroNegocio" id="" class="form-select mb-3">
                  <option :value="null">Selecione o Tipo de Parceiro</option>
                  <option v-for="tipoParceiro in stCboTipoParceiro" :key="tipoParceiro.nCodigoTipoParceiro" :value="tipoParceiro.sTipoParceiro">
                    {{ tipoParceiro.sTipoParceiro }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-4">
                <div class="mb-3">
                  <label for="" class="form-label">E-Mail</label>
                  <input
                    v-model="stFormInfo.sEmailParceiro"
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
                    v-model="stFormInfo.sTelefoneParceiro"
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
                    v-model="stFormInfo.sContatoParceiro"
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
                    v-model="stFormInfo.sBairroParceiro"
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
                    v-model="stFormInfo.sComplementoParceiro"
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
                    v-model="stFormInfo.sNumeroParceiro"
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
                    v-model="stFormInfo.sCepParceiro"
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
                <select v-model="stFormInfo.nCodigoPaisParceiro" id="" class="form-select mb-3">
                  <option v-for="pais in stCboPais" :key="pais.nCodigoPais" :value="pais.nCodigoPais">
                    {{ pais.sNomePais }}
                  </option>
                </select>
              </div>
              <div class="col-md-5">
                <label for="" class="form-label">Cidade</label>
                <select v-model="stFormInfo.nCodigoCidadeParceiro" id="" class="form-select mb-3">
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
                  v-model="stFormInfo.nCodigoEstadoParceiro"
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
