<template>
    <div class="container mt-3">
        <div class="row justify-content-center mb-3">
            <div class="col">
                <md-card>
                    <md-card-header>
                        <div class="md-title md-display-1">Saldo disponivel</div>
                    </md-card-header>
                    <md-card-content>
                        <h3 class="md-subheading">R$ {{usuario.saldo}}</h3>
                    </md-card-content>
                </md-card>
                
            </div>
            <div class="col">
                <md-card>
                    <md-card-header>
                        <div class="md-title md-display-1">Saldo Limite</div>
                    </md-card-header>
                    <md-card-content>
                        <h3 class="md-subheading">R$ {{usuario.saldoLimite}}</h3>
                    </md-card-content>
                </md-card>
            </div>
        </div>
        <md-divider></md-divider>
        <div class="row mt-3">
            <div class="col">
                <p class="md-title">Ùltimas tranferencias</p>
                <md-empty-state 
                    v-if="transferencias.length == 0"
                    md-icon="leaderboard"
                    md-label="Faça sua primeira transferencia... prometo que vai ser bem rapido 😉"
                    md-description="Clique no botão abaixo para fazer a sua primeira transferencia.">
                    <router-link to="/transferencia">
                        <md-button class="md-primary md-raised">Tranferecia</md-button>
                    </router-link>
                </md-empty-state>
                <md-table md-card  v-if="transferencias.length > 0">
                    <md-table-toolbar>
                        <h1 class="md-title" style="flex: 1">Tranferencias</h1>
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
    </div>
</template>

<script>
import MainService from '../services/main.service'

export default {
    name: "HomePage",
    data(){
        return {
            transferencias: [],
            contatos: [],
            showDialogTranferencias: false,
            tranferencia: {
                valor: 0,
                contato: ""
            }
        }
    },
    computed: {
        usuario: ()=>{
            return MainService.getUsuario()
        }
    },
    mounted(){
        MainService.getGenreric('/transferencia').then((result)=>{
            this.transferencias = result.data.items
        })
    }
}
</script>