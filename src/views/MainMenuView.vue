<MainNavbar />

<template>
  <div class="menu">
    <br /><br />
    <div class="container">
      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="button" @click="$router.push('cadparceiro')">
          Cadastro de parceiro de negócio
        </button>
        <button class="btn btn-primary" type="button" @click="$router.push('listaparceiro')">
          Lista de parceiro de negócio
        </button>
        <button class="btn btn-primary" type="button">Button</button>
      </div>
    </div>
  </div>
</template>
