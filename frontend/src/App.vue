<template>
  <div id="app">
    <md-toolbar class="md-primary">
      <h3 class="md-title" style="flex: 1">
        Olá {{usuario.nome}} Bem-vindo(a)
      </h3>
      <md-button class="md-icon-button" @click="reset()">
        <md-tooltip md-direction="top">Resetar Conta</md-tooltip>
        <md-icon>cached</md-icon>
      </md-button>
    </md-toolbar>
    <router-view class="mb-5 mb-3"></router-view>
    <div class="phone-viewport">
      <md-bottom-bar class="md-primary" md-type="shift" md-alignment="centered" :md-active-item="activeVal">
        <router-link to="/">
          <md-bottom-bar-item md-label="Home" md-icon="home" id="Home"></md-bottom-bar-item>
        </router-link>
        <router-link to="/contato">
          <md-bottom-bar-item md-label="Contatos" md-icon="contacts" id="Contato"></md-bottom-bar-item>
        </router-link>
        <router-link to="/transferencia">
          <md-bottom-bar-item md-label="Histórico de transferencias" md-icon="timeline" id="Transferencia"></md-bottom-bar-item>
        </router-link>
      </md-bottom-bar>
    </div>
  </div>
</template>

<script>
import MainService from './services/main.service'

export default {
  name: 'App',
  created: ()=>{
    if(!window.localStorage.getItem('token')){
      MainService.getUsuarioIntial().catch(()=> window.localStorage.removeItem('token'))
    }
  },
  mounted(){
    if(this.usuario == null){
      setTimeout(()=>{
        this.refresh()
      }, 1000)
    }
  },
  data(){
    return {
      activeVal:"Home"
    }
  },
  computed: {
    usuario: ()=>{
      return MainService.getUsuario()
    }
  },
  watch:{
    $route (to){
      this.activeVal = to.name
    }
  },
  methods: {
    reset:()=>{
      MainService.getUsuarioIntial().then(()=>{
        window.location.reload()
      })
    },
    refresh:()=>{
      window.location.reload()
    }
  }
}
</script>

<style scoped>
  .phone-viewport {
    width: 100%;
    bottom: 0;
    display: inline-flex;
    align-items: flex-start;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
    position: fixed;
    z-index: 10;
  }
</style>

