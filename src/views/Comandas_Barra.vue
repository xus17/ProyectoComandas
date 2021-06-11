<template>
  <div id="app">
    <heade />
    <h2 v-if="comandas.length==0">No hay comandas para la barra....</h2>
    <div v-for="comanda in comandas" v-bind:key="comanda.id" >
      <div class="com" v-if="comanda.Completado==false">
        <hr>
        <h3>{{comanda.Mesa}}</h3>
        <p>{{comanda.Producto}} Hora: {{comanda.Hora}} Completado : <input  v-if="comanda.Completado==true" type="checkbox" id="cbox1" checked  @click=" completar(comanda)">
        <input  v-else type="checkbox" id="cbox1"   @click=" completar(comanda)"></p>
      </div>
      <div class="com" v-if="(comanda.Nota!='') && (comanda.Completado==false)">
        <p>Nota: {{comanda.Nota}}</p>
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
      comandas:[]
    };
  },
  firestore: {
    comandas: db.collection("Barra")
  },
  methods: {
    completar: function(producto){
      if(producto.Completado==false){
          db.collection("Barra").doc(producto.id).set({
            Completado : true,
            Hora : producto.Hora,
            Mesa : producto.Mesa,
            Zona: producto.Zona,
            Producto: producto.Producto,
            Camarero : producto.Camarero,
            Nota: producto.Nota
          });
      }else{
        db.collection("Barra").doc(producto.id).set({
          Completado : false,
          Hora : producto.Hora,
          Mesa : producto.Mesa,
          Zona: producto.Zona,
          Producto: producto.Producto,
          Camarero : producto.Camarero,
          Nota: producto.Nota
        });
      }
      
    }
  },
  created:function(){

    },
    mounted(){
      if(sessionStorage.camarero=="Admin"){
            this.$router.push('/')
            sessionStorage.camarero ="";
        }
         this.$bind("comandas",db.collection("Barra"));
        },
  computed: {
    
  },
};
</script>

<style scoped>

.com{
  display: flex;
  background-color: rgb(129, 146, 153);
  padding: 0.5rem;
  border: solid 1px black;
}
.com p{
  margin-left: 0.5rem;
}
</style>