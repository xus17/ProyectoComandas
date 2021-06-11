<template>
  <div id="app">
    <heade />
    <div v-for="mesa in mesas" v-bind:key="mesa.id" class="gr-camareros">
      <div class="camarero" @click="enviarZonas(mesa.id)">
        <p    >{{mesa.id}}</p>
        <img src="https://image.flaticon.com/icons/png/512/51/51882.png"  width="100px" height="100px" alt="">
      </div>
      
    </div>
    <foote class="foot" />
  </div>
</template>


<script>
import { db } from "../db";
import heade from "../components/header";
import foote from "../components/footer";

export default {
  name: "App",
  components: {
    heade,
    foote
  },
  data() {
    return {
      valor: "",
      nombre: "",
      contra: "",
      mesas: [],
      camareros: [],
      camarero: sessionStorage.camarero,
    };
  },
  firestore: {
    // mesas: db.collection("Mesas"),
  },
  mounted() {
    if(sessionStorage.camarero=="Admin"){
            this.$router.push('/')
            sessionStorage.camarero ="";
        }
      if(sessionStorage.zona!=null){
        this.$bind("mesas",db.collection("Mesas").where("Zona","==",sessionStorage.zona));
      }
  },
  methods: {
    enviarZonas: function (mesa) {
        sessionStorage.mesa=mesa;
        this.$router.push('/Categorias')
    },
  },
  
  created:function(){
        sessionStorage.mesa="";
        window.sessionStorage.setItem("Menus", JSON.stringify([]));

    },
    
  computed: {
    totalTareas: function () {
      return this.mesas.length;
    },
  },
};
</script>

<style scoped>
.gr-camareros {
  display: inline-flex;
  margin-bottom: 5rem;
}
.camarero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  columns: 1fr;
  padding: 1.8rem;
  margin: 2rem;
  text-align: center;
  text-decoration: none;
  color: black;
  border: 1px solid black;
  border-radius: 2rem;
  font-size:2rem;
}
.camarero:hover {
  cursor: pointer;
}
body {
  background-color: rgb(166, 224, 221);
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.foot {
  position:sticky;
  bottom: 0;
}
</style>