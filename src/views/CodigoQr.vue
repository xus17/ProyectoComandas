<template>
  <div id="app">
    <heade />
    <div class="qr">
          <img src="../Img/codigoqr.png" alt="" width="350px" height="350px">  
    </div>
  </div>
</template>


<script>
import { db } from "../db";
import heade from "../components/header";
export default {
  name: "App",
  components: {
    heade,
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
      pedido : []
    };
  },
  firestore: {
    productos2: db.collection("Productos")
   
  },
  created() {
  
  },
  methods: {
    enviarZonas: function (producto) {
        console.log(producto);
        this.$notify({ group: 'foo', title: 'Añadido',text: 'Se ha añadido correctamente: '+producto.id+' '  });
        this.pedido = JSON.parse(sessionStorage.getItem("Pedido"));
        this.pedido.push(producto.Id);
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
      }
    },
};
</script>

<style scoped>
.qr {
  display: flex;
  align-items: center;
  justify-content: center;
}

.producto {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(129, 146, 153);
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

</style>