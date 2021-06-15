<template>
  <div id="app">
    <heade />
    <div class="gr-productos">
      <div v-if='catego==Menu' class="menu">
        <h2>Primeros</h2>
        <div id="menu1">
          
          <div  v-for="producto in productos" v-bind:key="producto.id+''+producto.Nombre" >
            <p  v-if="producto.Primero==true" class="producto"  @click="comprobarMenu(producto)">{{ producto.Nombre }}</p>
          </div>
        </div> 
        
        <h2>Segundos</h2>
        <div id="menu2">
          <div  v-for="producto in productos" v-bind:key="producto.id" class="menu" >
            <p  v-if="producto.Segundo==true" class="producto"  @click="comprobarMenu2(producto)">{{ producto.Nombre }}</p>
          </div>
      </div>
      </div>
      <div  v-else  v-for="producto in productos" v-bind:key="producto.id">
        <p  class="producto"  @click="enviarZonas(producto)">{{ producto.Nombre }}</p>
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
      categoria:"",
      pos: 0,
      productos: [],
       productos2: [],
      producto: localStorage.producto,
      pedido : [],
      catego : "",
      Menu : "Menu",
      menus: []
    };
  },
  firestore: {
    productos2: db.collection("Productos")
   
  },
  created() {
  
  },
  methods: {
    enviarZonas: function (producto) {
        this.$notify({ group: 'foo', title: 'Añadido',text: 'Se ha añadido correctamente: '+producto.id+' '  });
        this.pedido = JSON.parse(sessionStorage.getItem("Pedido"));
        this.pedido.push({id:producto.Id, nota: ''});
        window.sessionStorage.setItem("Pedido", JSON.stringify(this.pedido));       
      },
      comprobarMenu : function(producto){
        this.$notify({ group: 'foo', title: 'Añadido',text: 'Se ha añadido primer plato '+producto.Nombre+' '  });
        var menu1 = document.getElementById('menu1');
        var menu2 = document.getElementById('menu2');
        menu1.style.display="none";
        menu2.style.display="flex";
        sessionStorage.menu1 = producto.Nombre;
      },
      comprobarMenu2 : function (producto){
          this.$notify({ group: 'foo', title: 'Añadido',text: 'Se ha añadido segundo plato '+producto.Nombre+' '  });
          var menu1 = document.getElementById('menu1');
          var menu2 = document.getElementById('menu2');
          menu1.style.display="flex";
          menu2.style.display="none";
          var men = ('Primero:' +sessionStorage.menu1 +"/ Segundo: "+producto.Nombre);
          this.pedido = JSON.parse(sessionStorage.getItem("Pedido"));
          this.pedido.push({id:"Ref-157",nota:men});
          window.sessionStorage.setItem("Pedido", JSON.stringify(this.pedido));
      }
    },
    mounted() {
      if(sessionStorage.camarero=="Admin"){
            this.$router.push('/')
            sessionStorage.camarero ="";
        }
      if(sessionStorage.categoria!=null){
        this.$bind("productos",db.collection("Productos").where("Categoria","==",sessionStorage.categoria));
        this.catego = sessionStorage.categoria;
        sessionStorage.menu1 ="";
      }
    },
};
</script>

<style scoped>
.gr-productos {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  justify-content: center;
}

#menu h2{
   display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  justify-content: center;
}

#menu1{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  }
#menu2{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  display: none;
}


.producto {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #819299;
  padding: 3rem;
  margin: 1rem;
  width: 5rem;
  height: 5rem;
  text-decoration: none;
  color: black;
  border: 1px solid black;

  border-radius: 2rem;
}
.producto:hover {
  cursor: pointer;
}
.foot{
  
    position: sticky;
    bottom: 0;

}

</style>