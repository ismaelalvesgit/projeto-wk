<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col">
        <p class="md-title">Histórico de transferencias</p>
        <md-empty-state 
          v-if="transferencias.length == 0"
          md-icon="leaderboard"
          md-label="Faça sua primeira transferencia... prometo que vai ser bem rapido 😉"
          md-description="Clique no botão abaixo para fazer a sua primeira transferencia.">
          <md-button class="md-primary md-raised" @click="openDialog('Realizar uma nova transferencia 😋')">
            Cadastrar
          </md-button>
        </md-empty-state>
        <md-table md-card  v-if="transferencias.length > 0">
          <md-table-toolbar>
            <h1 class="md-title" style="flex: 1">Tranferencias</h1>
            <md-button class="md-primary md-raised" @click="openDialog('Realizar uma nova transferencia 😋')">
              Cadastrar
            </md-button>
          </md-table-toolbar>

          <md-table-row>
            <md-table-head md-numeric>ID</md-table-head>
            <md-table-head>Nome</md-table-head>
            <md-table-head>Valor</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Data</md-table-head>
          </md-table-row>

          <md-table-row v-for="(tran, i) in transferencias" :key="tran._id">
            <md-table-cell md-numeric>{{i+1}}</md-table-cell>
            <md-table-cell>{{tran.contato.nome}}</md-table-cell>
            <md-table-cell>R$ {{tran.valor}}</md-table-cell>
            <md-table-cell>{{tran.status}}</md-table-cell>
            <md-table-cell>{{tran.dataRegistro | date}}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>{{showDialogTitle}}</md-dialog-title>
      <div class="col">
         <md-field :class="$v.transferencia.valor.$error ? 'md-invalid': ''">
          <label>Valor *</label>
          <md-input v-model="$v.transferencia.valor.$model" type="number"></md-input>
          <span class="md-error" v-if="!$v.transferencia.valor.required">Valor e Requirido </span>
          <span class="md-error" v-if="!$v.transferencia.valor.minValue">Valor necessario ser maior que 0 </span>
        </md-field>
        <md-field :class="$v.transferencia.contato.$error ? 'md-invalid': ''">
          <label for="contato">Contato</label>
          <md-select v-model="$v.transferencia.contato.$model" id="contato">
            <md-option v-for="cont in contatos" :key="cont._id" :value="cont._id">
              {{cont.nome}}
            </md-option>
          </md-select>
          <span class="md-error" v-if="!$v.transferencia.contato.required">Valor e Requirido </span>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog()">Fechar</md-button>
        <md-button class="md-primary" type="submit" @click="submit()" :disabled="$v.$invalid">Salvar</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbarSucess" md-persistent>
      <span>Tranferecia realizada com sucesso😄</span>
    </md-snackbar>
  </div>
</template>

<script>
import MainService from '../services/main.service'
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: "Tranferecia",
  data: ()=> ({
    transferencias: [],
    contatos: [],
    transferencia:{
      contato: '',
      valor: 0
    },
    showDialog: false,
    showDialogTitle: '',
    showSnackbarSucess: false
  }),
  validations:{
    transferencia:{
      contato: {
        required
      },
      valor: {
        required,
        minValue: minValue(1)
      }
    },
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      MainService.getGenreric('/transferencia').then((result)=>{
        this.transferencias = result.data.items
      }).catch((error)=>{
        if(error.response.status == 403){
          this.$swal.fire(
            "Tempo de uso!",
            "Ops parece que você precisa fazer sua reautenticação",
            'info'
          ).then(()=>{
            MainService.getUsuarioIntial()
          })
        }else{
          this.$swal.fire(
            error.response.data[0].nome,
            error.response.data[0].mensagem,
            'info'
          )
        }
      })
    },
    openDialog(title){
      MainService.getGenreric('/contato').then((result)=>{
        if(result.data.items.length > 0){
          this.contatos = result.data.items
          this.showDialogTitle = title
          this.showDialog = true
        }else{
          this.$swal.fire(
            'Lista de Contatos!',
            'Antes que você possa fazer sua tranferencia e necessario ter um contato cadastrado',
            'info'
          ).then(()=>{
            this.$router.push("/contato")
          })
        }
      }).catch((error)=>{
        if(error.response.status == 403){
          this.$swal.fire(
            "Tempo de uso!",
            "Ops parece que você precisa fazer sua reautenticação",
            'info'
          ).then(()=>{
            MainService.getUsuarioIntial()
          })
        }else{
          this.$swal.fire(
            error.response.data[0].nome,
            error.response.data[0].mensagem,
            'info'
          )
        }
      })
    },
    closeDialog(){
      this.showDialog = false
      this.$v.$reset()
    },
    submit(){
      MainService.getGenreric('/usuario').then((result)=>{
        const usuario = result.data
        const data = this.transferencia
        if(data.valor > usuario.saldo && (data.valor < usuario.saldo + usuario.saldoLimite)){
          // Caso o valor da transferencia utrapasse o saldo do usuario
          this.$swal.fire({
            title: 'você tem certeza ? 👀',
            text: "Será utilizado seu saldo limite para cobrir sua transferencia",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, continuar!'
          }).then((result) => {
            if (result.isConfirmed) {
              MainService.postGenreric('/transferencia', data).then((result) => {
                MainService.setUsuario(result.data.usuario)
                this.$v.$reset()
                this.getData()
                this.showDialog = false
                this.showSnackbarSucess = true
                this.$swal.fire(
                  'Sucesso!',
                  'operação realizada com sucesso',
                  'success'
                )
              }).catch((error)=>{
                this.showDialog = false
                if(error.response.status == 403){
                  this.$swal.fire(
                    "Tempo de uso!",
                    "Ops parece que você precisa fazer sua reautenticação",
                    'info'
                  ).then(()=>{
                    MainService.getUsuarioIntial()
                  })
                }else{
                  this.$swal.fire(
                    error.response.data[0].nome,
                    error.response.data[0].mensagem,
                    'info'
                  )
                }
              })
            }
          })
        }else if((data.valor > usuario.saldo) && (data.valor > usuario.saldo + usuario.saldoLimite)){
          // Caso usuário não tenha mais limite de saldo
          this.$swal.fire(
            'Atenção!',
            'Usuário não possui saldo suficiente para realiza a transferencia',
            'warning'
          )
        }else{
          // Cadastro normal
          MainService.postGenreric('/transferencia', data).then((result)=>{
            MainService.setUsuario(result.data.usuario)
            this.$v.$reset()
            this.getData()
            this.showDialog = false
            this.showSnackbarSucess = true
          }).catch((error)=>{
            this.showDialog = false
            if(error.response.status == 403){
              this.$swal.fire(
                "Tempo de uso!",
                "Ops parece que você precisa fazer sua reautenticação",
                'info'
              ).then(()=>{
                MainService.getUsuarioIntial()
              })
            }else{
              this.$swal.fire(
                error.response.data[0].nome,
                error.response.data[0].mensagem,
                'info'
              )
            }
          })
        }
      })
    }
  }
}
</script>