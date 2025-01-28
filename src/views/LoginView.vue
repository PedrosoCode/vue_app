<script setup lang="ts">
import MainNavbar from '@/components/MainNavbar.vue'
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
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="login-tab"
        >
          <div class="container border border-secondary-subtle rounded">
            <br />
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Endereço de E-mail</label>
                <input placeholder="E-mail" type="email" class="form-control" id="" />
                <div id="" class="form-text">Suas informações estão seguras conosco.</div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Senha</label>
                <input type="password" class="form-control" id="" />
              </div>
              <button type="submit" class="btn btn-primary">Entrar</button>
            </form>
            <br />
          </div>
          <br />
        </div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="cadastro-tab">
          <div class="container border border-secondary-subtle rounded">
            <br />
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Endereço de E-mail</label>
                <input placeholder="E-mail" type="email" class="form-control" id="" />
                <div id="" class="form-text">Suas informações estão seguras conosco.</div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Senha</label>
                <input type="password" class="form-control" id="" />
              </div>
              <button type="submit" class="btn btn-primary">Entrar</button>
            </form>
            <br />
          </div>
          <br />
        </div>
      </div>
    </div>
  </main>
</template>
