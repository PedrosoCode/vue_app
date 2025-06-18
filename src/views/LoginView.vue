<script setup lang="ts">
import { reactive, ref } from 'vue'
import MainNavbar from '@/components/MainNavbar.vue'
import axios from 'axios'
import { onMounted } from 'vue'

const tabAtual = ref<'login' | 'cadastro'>('login')

const initCadastro: CadastroState = {
  sNomeUsuario: '',
  sEmail: '',
  sSenha: '',
  nCodigoEmpresa: 0,
}

const initLogin: LoginState = {
  sNomeUsuario: '',
  sSenha: '',
  nCodigoEmpresa: 0,
}

export interface CadastroState {
  sNomeUsuario: string
  sEmail: string
  sSenha: string
  nCodigoEmpresa: number
}

export interface LoginState {
  sNomeUsuario: string
  sSenha: string
  nCodigoEmpresa: number
}

interface cboEmpresaState {
  nome_fantasia: string
  razao_social: string
  codigo: number
}

const cboEmpresaValues = ref<cboEmpresaState[]>([])

const loginForm = reactive<LoginState>({ ...initLogin })
const registerForm = reactive<CadastroState>({ ...initCadastro })

function btnLogarClick() {
  axios
    .post(import.meta.env.VITE_DEFAULT_API_LINK + '/loginsignup/login', {
      sNomeUsuario: loginForm.sNomeUsuario,
      sSenha: loginForm.sSenha,
      nCodigoEmpresa: loginForm.nCodigoEmpresa,
    })
    .then((response) => {
      localStorage.setItem('jwtToken', response.data.token)

      window.location.href = '/'
    })
    .catch((error) => {
      console.log(error)
      alert('Login falhou: ' + (error.response?.data?.message || 'Erro desconhecido'))
    })
}

function btnCadastroClick() {
  console.log(registerForm)

  axios
    .post(import.meta.env.VITE_DEFAULT_API_LINK + '/loginsignup/cadastrar', {
      sNomeUsuario: registerForm.sNomeUsuario,
      sEmail: registerForm.sEmail,
      sSenha: registerForm.sSenha,
      nCodigoEmpresa: registerForm.nCodigoEmpresa,
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
}

async function loadComboEmpresa() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_DEFAULT_API_LINK + '/loginsignup/combo/empresas',
    )
    cboEmpresaValues.value = response.data
    console.log('Dados carregados:', cboEmpresaValues.value)
  } catch (error) {
    console.error('Erro ao carregar empresas:', error)
  }
}

function PrepararForm() {
  try {

    tabAtual.value = 'login'

  } catch (error) {
    console.error('Erro ao preparar formulário:', error)
  }
}

function trocarTab() {
  tabAtual.value = tabAtual.value === 'login' ? 'cadastro' : 'login'
}


onMounted(() => {
  loadComboEmpresa()
  PrepararForm()
})
</script><template>
  <main>
    <div class="min-h-screen bg-slate-100 py-2 sm:py-4 md:py-6 lg:py-8">
      <div class="flex justify-center pt-5">
        <h1 class="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800">
          Bem vindo ao CMMS
        </h1>
      </div>

      <!-- Wrapper unificado com largura responsiva -->
      <div class="mx-4 sm:mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mt-8 mb-6">
        <!-- Toggle Login/Cadastro sem espaçamento -->
        <div class="flex bg-slate-200 border border-gray-300 rounded-t-lg shadow-lg">
          <button @click="trocarTab()"
            class="flex-1 text-center py-2 font-medium text-gray-700 hover:bg-indigo-100 first:rounded-tl-lg last:rounded-tr-lg"
            :class="{
              'bg-indigo-300 outline-indigo-600 outline-2': tabAtual === 'login',
              'border-b': tabAtual !== 'login'
            }">
            Login
          </button>
          <button @click="trocarTab()"
            class="flex-1 text-center py-2 font-medium text-gray-700 hover:bg-indigo-100 first:rounded-tl-lg last:rounded-tr-lg"
            :class="{
              'bg-indigo-300 outline-indigo-600 outline-2': tabAtual === 'cadastro',
              'border-b': tabAtual !== 'cadastro'
            }">
            Cadastro
          </button>
        </div>
        <!-- fim cabeçalho -->
        <!-- Card de Formulário cadastro-->
        <div v-if="tabAtual == 'cadastro'"
          class="bg-slate-200 border border-t-0 border-gray-300 shadow-lg p-4 sm:p-6 md:p-8 space-y-6">
          <!-- Usuário -->
          <div>
            <label class="block text-sm sm:text-base font-medium text-gray-700">
              Usuário
            </label>
            <input type="text" v-model="registerForm.sNomeUsuario"
              class="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50" />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm sm:text-base font-medium text-gray-700">
              Email
            </label>
            <input type="email" v-model="registerForm.sEmail"
              class="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50" />
          </div>

          <!-- Empresa -->
          <div>
            <label class="block text-sm sm:text-base font-medium text-gray-700">
              Empresa
            </label>
            <select v-model="registerForm.nCodigoEmpresa"
              class="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50">
              <option value="0">Selecione uma empresa</option>
                <option
                  v-for="empresa in cboEmpresaValues"
                  :key="empresa.codigo"
                  :value="empresa.codigo"
                >
                  {{ empresa.nome_fantasia }}
                </option>
            </select>
          </div>

          <!-- Senha -->
          <div>
            <label class="block text-sm sm:text-base font-medium text-gray-700">
              Senha
            </label>
            <input type="password" v-model="registerForm.sSenha"
              class="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50" />
          </div>
        </div>
        <!-- Card formulário login -->
        <div v-if="tabAtual == 'login'"
          class="bg-slate-200 border border-t-0 border-gray-300 shadow-lg p-4 sm:p-6 md:p-8 space-y-6">
          <!-- Usuário -->
          <div>
            <label class="block text-sm sm:text-base font-medium text-gray-700">
              Usuário
            </label>
            <input type="text" v-model="loginForm.sNomeUsuario"
              class="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50" />
          </div>

          <!-- Empresa -->
          <div>
            <label class="block text-sm sm:text-base font-medium text-gray-700">
              Empresa
            </label>
            <select v-model="loginForm.nCodigoEmpresa"
              class="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50">
              <option value="0">Selecione uma empresa</option>
                <option
                  v-for="empresa in cboEmpresaValues"
                  :key="empresa.codigo"
                  :value="empresa.codigo"
                >
                  {{ empresa.nome_fantasia }}
                </option>
            </select>
          </div>

          <!-- Senha -->
          <div>
            <label class="block text-sm sm:text-base font-medium text-gray-700">
              Senha
            </label>
            <input type="password" v-model="loginForm.sSenha"
              class="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50" />
          </div>
        </div>
        <div class="flex bg-slate-200 border border-gray-300 rounded-b-lg shadow-lg">
          <button v-if="tabAtual == 'cadastro'" @click="btnCadastroClick()"
            class="flex-1 text-center py-2 font-medium text-gray-700 hover:bg-indigo-300 hover:outline-indigo-600 hover:outline-2 hover:rounded-4xl">
            Cadastrar novo Usuário
          </button>
          <button v-if="tabAtual == 'login'" @click="btnLogarClick()"
            class="flex-1 text-center py-2 font-medium text-gray-700 hover:bg-indigo-300 hover:outline-indigo-600 hover:outline-2 hover:rounded-4xl">
            Entrar
          </button>
        </div>
      </div>
    </div>
  </main>
</template>