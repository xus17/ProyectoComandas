<template>
  <div>
    <heade />
    <div v-for="zona in users" v-bind:key="zona.id" class="gr-zonas">
      <div @click="enviarZonas(zona.id)" class="zona " v-if="zona.id=='Barra'">
          <p v-if="zona.id=='Barra'"> {{zona.id}} </p>
          <img src="../Img/Barra.png"  width="100px" height="100px" alt="">
      </div>
      <div @click="enviarZonas(zona.id)" class="zona " v-if="zona.id=='Comedor'">
          <p v-if="zona.id=='Comedor'"> {{zona.id}} </p>
          <img src="../Img/Comedor.png"  width="100px" height="100px" alt="">
      </div>
      <div @click="enviarZonas(zona.id)" class="zona " v-if="zona.id=='Terraza 1'">
          <p v-if="zona.id=='Terraza 1'"> {{zona.id}} </p>
          <img src="../Img/Terraza1.png"  width="100px" height="100px" alt="">
      </div>
      <div @click="enviarZonas(zona.id)" class="zona " v-if="zona.id=='Terraza 2'">
          <p v-if="zona.id=='Terraza 2'">{{zona.id}} </p>
          <img src="../Img/Terraza2.png"  width="100px" height="100px" alt="">
      </div>
    </div>
    <foote class="foot" />
  </div>
</template>


<script>
import heade from "../components/header";
import foote from "../components/footer";
import { db } from "../db";
export default {
  name: "note",
  components: {
    heade,
    foote
  },

  data() {
    return {
      valor: "",
      nombre: "",
      contra: "",
      users: [],
      zonas: [],
      camarero: localStorage.camarero,
    };
  },
  firestore: {
    users: db.collection("Zonas"),
  },
  methods: {
    enviarZonas: function (zona) {
        sessionStorage.zona=zona;
        this.$router.push('/Mesas')
    },
  },
  created:function(){
        sessionStorage.zona=""
        window.sessionStorage.setItem("Pedido", JSON.stringify([]));       

    },
  computed: {
    totalTareas: function () {
      return this.users.length;
    },
  },
  mounted (){
    if(sessionStorage.camarero=="Admin"){
            this.$router.push('/')
            sessionStorage.camarero ="";
        }
  }
};
</script>

<style scoped>
.gr-zonas {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.zona {
  font-size: 3rem;
  border:1px solid black;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin: 2rem;
  justify-content: center;
  width: 18rem;
}
.zona:hover {
  cursor: pointer;
}
.zona img{
 padding-bottom: 1rem;
 padding-left:1rem ;
}
.foot{
    position: sticky;
}
</style>