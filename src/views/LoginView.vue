<script setup lang="ts">
import { reactive, ref } from 'vue'
import MainNavbar from '@/components/MainNavbar.vue'
import axios from 'axios'
import { onMounted } from 'vue'

const initCadastro: CadastroState = {
  sEmail: '',
  sSenha: '',
  nCodigoEmpresa: 0,
}

const initLogin: LoginState = {
  sEmail: '',
  sSenha: '',
  nCodigoEmpresa: 0,
}

export interface CadastroState {
  sEmail: string
  sSenha: string
  nCodigoEmpresa: number
}

export interface LoginState {
  sEmail: string
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
    .post('/login', {
      email: loginForm.sEmail,
      senha: loginForm.sSenha,
      empresa: loginForm.nCodigoEmpresa,
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
}

function btnCadastroClick() {
  axios
    .post('/user', {
      email: registerForm.sEmail,
      senha: registerForm.sSenha,
      empresa: registerForm.nCodigoEmpresa,
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
}

async function loadComboEmpresa() {
  try {
    const response = await axios.get('http://localhost:3042/loginsignup/combo/empresas')
    cboEmpresaValues.value = response.data
    console.log('Dados carregados:', cboEmpresaValues.value)
  } catch (error) {
    console.error('Erro ao carregar empresas:', error)
  }
}

onMounted(() => {
  loadComboEmpresa()
})
</script>

<template>
  <main>
    <MainNavbar />
    <br />

    <div class="container">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Login
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Cadastrar
          </button>
        </li>
      </ul>

      <div class="tab-content" id="myTabContent">
        <!-- Formulário de Login -->
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="login-tab"
        >
          <div class="container border border-secondary-subtle rounded">
            <br />
            <form @submit.prevent="btnLogarClick">
              <div class="mb-3">
                <label for="loginEmail" class="form-label">Endereço de E-mail</label>
                <input
                  v-model="loginForm.sEmail"
                  placeholder="E-mail"
                  type="email"
                  class="form-control"
                  id="loginEmail"
                />
                <div id="emailHelp" class="form-text">Suas informações estão seguras conosco.</div>
              </div>
              <select
                v-model="loginForm.nCodigoEmpresa"
                class="form-select"
                id="loginEmpresa"
                required
              >
                <option value="0">Selecione uma empresa</option>
                <option
                  v-for="empresa in cboEmpresaValues"
                  :key="empresa.codigo"
                  :value="empresa.codigo"
                >
                  {{ empresa.nome_fantasia }}
                </option>
              </select>
              <div class="mb-3">
                <label for="loginPassword" class="form-label">Senha</label>
                <input
                  v-model="loginForm.sSenha"
                  type="password"
                  class="form-control"
                  id="loginPassword"
                />
              </div>
              <button type="submit" class="btn btn-primary">Entrar</button>
            </form>
            <br />
          </div>
          <br />
        </div>

        <!-- Formulário de Cadastro -->
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="cadastro-tab">
          <div class="container border border-secondary-subtle rounded">
            <br />
            <form @submit.prevent="btnCadastroClick">
              <div class="mb-3">
                <label for="registerEmail" class="form-label">Endereço de E-mail</label>
                <input
                  v-model="registerForm.sEmail"
                  placeholder="E-mail"
                  type="email"
                  class="form-control"
                  id="registerEmail"
                />
                <div id="emailHelp" class="form-text">Suas informações estão seguras conosco.</div>
              </div>
              <select
                v-model="registerForm.nCodigoEmpresa"
                class="form-select"
                id="registerEmpresa"
                required
              >
                <option value="0">Selecione uma empresa</option>
                <option
                  v-for="empresa in cboEmpresaValues"
                  :key="empresa.codigo"
                  :value="empresa.codigo"
                >
                  {{ empresa.nome_fantasia }}
                </option>
              </select>
              <div class="mb-3">
                <label for="registerPassword" class="form-label">Senha</label>
                <input
                  v-model="registerForm.sSenha"
                  type="password"
                  class="form-control"
                  id="registerPassword"
                />
              </div>
              <button type="submit" class="btn btn-primary">Cadastrar</button>
            </form>
            <br />
          </div>
          <br />
        </div>
      </div>
    </div>
  </main>
</template>
