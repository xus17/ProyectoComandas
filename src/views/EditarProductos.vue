<template>
  <div id="app">
    <heade />
    {{enviarCambios}}
    <div v-if="products.length!=0" class="principal">
        <div  v-for="(producto,index) in products" v-bind:key="producto.id+index"  class="editar">
        <div class="editindi">
        
            <p>Nombre: {{ producto.id}} </p>
            
          <textarea name=""  cols="30" rows="10" :placeholder=producto.nota :id="'ta'+index"></textarea><br>
           
             <button @click="editarNota(index)">Editar</button>
          <a @click="borrarNota(index)"><img src="../Img/borrar.png" width="25px" height="25px"></a>
          
         
         

          
        </div>
        
      </div>
    </div>
    
    <h2 v-if="products.length==0"> No hay productos para editar</h2>
    <foote class="foot"/>
  </div>
</template>


<script>
import heade from "../components/header";
import foote from "../components/footer";
import {db} from "../db.js";


export default {
  name: "App",
  components: {
    heade,
    foote
  },
  data() {
    return {
      comandas : [],
      products: [],
      productos: null,
      valor:""
       
    };
  },
  firestore: {
   productos : db.collection("Productos")
  },
  created() {
    
  },
  methods: {
    addproducts: function(productoN, productoNo){
      this.products.push({id: productoN ,nota: productoNo});
    },
    valor0: function(){
      this.products=[];
      this.comandas = JSON.parse(sessionStorage.getItem("Pedido"));
    },
    editarNota: function(pos){
      var ta = document.getElementById("ta"+pos);
      this.comandas[pos].nota = ta.value;
      window.sessionStorage.setItem("Pedido", JSON.stringify(this.comandas));
       this.$notify({ group: 'foo', title: 'Editado', type: 'success', text: 'Se ha editado correctamente'});

    },borrarNota : function (pos){
      this.comandas.splice(pos,1);
      
      window.sessionStorage.setItem("Pedido", JSON.stringify(this.comandas));
      this.enviarCambios;
      this.$notify({ group: 'foo', title: 'Eliminado', type: 'success', text: 'Se ha eliminado correctamente.'});

    }
    
    },
    mounted() {

      if(this.productos!=null){
        this.$bind("productos",db.collection("Productos"))
        this.comandas = JSON.parse(sessionStorage.getItem("Pedido"));
      }

    },
    computed:{
      enviarCambios: function(){
      this.valor0();
      for(var i=0;i<this.productos.length;i++){          
            for(var j=0;j<this.comandas.length;j++){
              if(this.productos[i].Id==this.comandas[j].id){
                var productoN=   this.productos[i].Nombre;
                var productoNo = this.comandas[j].nota;
                this.addproducts(productoN, productoNo);
                }
            }
          }
          return "";
    }
    }
};
</script>

<style scoped>
.principal{
  display: flex;
  align-items: center;
  flex-direction: column;

}
  .editar{
    background-color: rgb(129, 146, 153);
    width: 300px;
    border: solid 1px black;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  .editarindi{
    display: flex;
    align-items: center;
    flex-direction: row;
    
  }
  textarea{
    height: 60px;
    resize: none;
  }
  .foot {
  position:sticky;
  bottom: 0;
}
a{
  cursor:pointer;
}

</style>