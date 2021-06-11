<template>
  <div id="app">
    <heade />
    <div class="divp">
      <div class="login">
        <table>
          <tr>
            <td>Usuario:</td>
          </tr>
          <tr>
            <td><input type="text" v-model="usuario" placeholder="Aqui el usuario..." required></td>
          </tr>
          <tr>
            <td>Contraseña:</td>
          </tr>
          <tr>  
            <td><input type="password" v-model="passw" placeholder="Aqui la contraseña.." required></td>
          </tr>
          <tr>
            <td> <button @click="comprobarAdmin" class="butini">Entrar</button></td>
          </tr>
        </table>

       
    </div>
    </div>
    
  </div>
</template>


<script>
import { db } from "../db";
import heade from "../components/header";

export default {
  name: "App",
  components: {
    heade
  },
  data() {
    return {
      users:[],
      usuario: "",
      passw: ""
    };
  },
  firestore: {
    comandas: db.collection("Cocina")
  },
  methods: {
  comprobarAdmin: function(){
      if((this.usuario!="") && (this.passw!="")){
          if((this.usuario ==this.users[0].Nombre) && (this.passw == this.users[0].Password)){
              sessionStorage.camarero = "Admin";
                this.$notify({ group: 'foo', title: 'Correcto', type: 'success', text: 'Modo Administrador activado'});
                this.$router.push('/Admin');

          }else{
            this.$notify({ group: 'foo', title: 'Error', type: 'error', text: 'Se ha equivocado en algun campo'});

          }
      }else{
            this.$notify({ group: 'foo', title: 'Error', type: 'error', text: 'Añade los dos campos'});
      }
  }
    
  },
  created:function(){

    },
    mounted(){
        this.$bind("users",db.collection("Usuarios"));
    },
    computed: {
    
    },
};
</script>

<style scoped>

.divp{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.login{
  padding: size(sm);
    box-shadow: 2px 2px 10px black;
    width: 15rem;
    border-radius: 20px;
    height: 12rem;
    margin: 2rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: rgb(129, 146, 153);
  padding: 0.5rem;
  border: solid 1px black;
  justify-content: center;
  align-items: center;
}
input{
  width: 10rem;
}
.login button{
    width: 4rem;
    float: right;
}
.butini {
      width: 6rem;
      margin-top: 0.5rem;
      background-color: #898E93;
      border: solid #000000 1px;
      color: #FFFFFF;
      border-radius: 20px;
      font-family: Brush Script MT;
    }
  
   .butini:hover{
      background: #000000;
      border: solid #000000 1px;
      -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
      border-radius: 20px;
      text-decoration: none;
      text-shadow: 1px 1px 6px #FFFFFF;

   }
</style>