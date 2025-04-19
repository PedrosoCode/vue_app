<script setup lang="ts">
import MainNavbar from "@/components/MainNavbar.vue";
</script>

<template>
  <main>
    <header>
      <MainNavbar />
    </header>
    <div class="container border border-secondary-subtle rounded-2">
      <div class="row justify-content-center text-center m-3">
        <div class="col-4">Dados do parceiro</div>
      </div>
      <form>
        <div class="row g-3">
          <div class="col-md-12">
            <label for="" class="form-label">Parceiro de negócio</label>
            <select id="" class="form-select mb-3">
              <option :value="null">Selecione o Parceiro</option>
            </select>
          </div>
        </div>
      </form>
    </div>
    <br />
    <div class="container border border-secondary-subtle rounded-2 p-3">
      <div class="row justify-content-center text-center m-3">
        <div class="col-4">Dados do ativo</div>
      </div>
      <div class="row g-3">
        <div class="col-sm-6 col-md-3">
          <label for="dataEntrada" class="form-label">Data Entrada</label>
          <input type="date" id="dataEntrada" class="form-control" />
        </div>
        <div class="col-sm-6 col-md-3">
          <label for="dataSaida" class="form-label">Data Saída</label>
          <input type="date" id="dataSaida" class="form-control" />
        </div>
      </div>
      <div class="mb-3">
        <label for="" class="form-label">Informações/Observações</label>
        <textarea class="form-control" id="" rows="3"></textarea>
      </div>
    </div>
    <br />
    <div class="container border border-secondary-subtle rounded-2 p-3">
      <div class="row justify-content-center text-center m-3">
        <div class="col-4">Serviços realizados</div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Cod. Serviço</th>
            <th scope="col">Descrição</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>aaa</td>
            <td>aaa</td>
            <td>aaa</td>
            <td>aaa</td>
            <td>aaa</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    <div class="container border border-secondary-subtle rounded-2 p-3">
      <div class="row justify-content-center text-center m-3">
        <div class="col-4">Produtos Utilizados</div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Cod. item</th>
            <th scope="col">Descrição</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>aaa</td>
            <td>aaa</td>
            <td>aaa</td>
            <td>aaa</td>
            <td>aaa</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
  </main>
</template>
