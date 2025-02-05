<script setup lang="ts">
import MainNavbar from '@/components/MainNavbar.vue'
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
      <form>
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
                    type=""
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
                    type=""
                    id=""
                    class="form-control"
                    placeholder="Insira o Nome Fantasia"
                    required
                  />
                </div>
              </div>
              <div class="col-md-2">
                <label for="" class="form-label">Tipo Parceiro</label>
                <select id="" class="form-select">
                  <option selected></option>
                </select>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-4">
                <div class="mb-3">
                  <label for="" class="form-label">E-Mail</label>
                  <input type="" id="" class="form-control" placeholder="Insira o E-mail" />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label for="" class="form-label">Telefone</label>
                  <input
                    type=""
                    id=""
                    class="form-control"
                    placeholder="Insira o Telefone"
                    required
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label for="" class="form-label">Contato</label>
                  <input type="" id="" class="form-control" placeholder="Insira o Contato" />
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-6">
                <div class="mb-3">
                  <label for="" class="form-label">Logradouro</label>
                  <input
                    type=""
                    id=""
                    class="form-control"
                    placeholder="Insira o logradouro"
                    required
                  />
                </div>
              </div>
              <div class="col-3">
                <div class="mb-3">
                  <label for="disabledTextInput" class="form-label">Bairro</label>
                  <input type="" id="" class="form-control" placeholder="Insira o Bairro" />
                </div>
              </div>
              <div class="col-3">
                <div class="mb-3">
                  <label for="disabledTextInput" class="form-label">Complemento</label>
                  <input
                    type=""
                    id=""
                    class="form-control"
                    placeholder="Insira o Complemento caso aplicável"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row justify-content-start">
              <div class="col-2">
                <div class="mb-3">
                  <label for="" class="form-label">Número</label>
                  <input type="" id="" class="form-control" placeholder="Insira o N°" required />
                </div>
              </div>

              <div class="col-3">
                <div class="mb-3">
                  <label for="" class="form-label">CEP</label>
                  <input type="" id="" class="form-control" placeholder="Insira o CEP" required />
                </div>
              </div>
            </div>
            <div class="row justify-content-start">
              <div class="col-md-3">
                <label for="" class="form-label">País</label>
                <select id="" class="form-select mb-3">
                  <option selected></option>
                </select>
              </div>
              <div class="col-md-5">
                <label for="" class="form-label">Cidade</label>
                <select id="" class="form-select mb-3">
                  <option selected></option>
                </select>
              </div>
              <div class="col-md-2">
                <label for="" class="form-label">Estado</label>
                <select id="" class="form-select mb-3">
                  <option selected></option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </header>
  </main>
</template>
