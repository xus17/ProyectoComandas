<template>
    <div id="app">
        <heade  />
         <div v-for="camarero in users"  v-bind:key="camarero.id" class="gr-camareros">
             <div class="camarero" v-if="camarero.Nombre!='admin@admin.com'"   @click="enviarZonas(camarero.Nombre)">
                <p>{{camarero.Nombre}}</p>    
                <img src="../Img/camarero.png" alt="" width="100px" height="100px">
             </div>
             
    </div>
        <foote class="foot" />
    </div>
</template>


<script>
import {db} from "../db";
import heade from '../components/header'
import foote from "../components/footer";

export default {
    name: "App",
    components:{
        heade,
        foote
    },
    data(){
    return {
        valor : "",
        nombre:"Xus",
        contra:"",
        users: [],
        camareros:[],
        Nombre2:"",
        Categoria:"",
        Precio:"",
        Id:""
    };
    },
    created:function(){
        sessionStorage.camarero="",
        sessionStorage.zona="",
        sessionStorage.mesa=""
    },
    firestore:{
    users : db.collection("Usuarios")
    
  },
 
  methods: {    
      enviarZonas: function(nombre){
        sessionStorage.camarero=nombre;
        this.$router.push('/zonas')

    },

   
    
  },
  mounted(){

  },
  
  computed: {
    totalTareas: function () {
      return this.users.length;
    },
    
  
}
}
</script>

<style scoped>
    .gr-camareros{
        display: inline-flex;
        margin-bottom: 5rem;
    }
    .junto{
        display: grid;
        grid-column: 1fr 1fr;
    }
    .camarero{
        padding: 5rem;
        margin: 1rem;
        width: 5rem;
        height: 5rem;
        text-decoration: none;
        color: black;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        border-radius:2rem ;
    }
    .camarero:hover{
        cursor: pointer;
    }
    .camarero img{
        margin-bottom: 1rem;
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