<template>
  <div id="app">
    <heade />

    <div v-for="categoria in categorias" v-bind:key="categoria.id" class="gr-categorias">
      <p  class="categoria"  @click="enviarZonas(categoria.id)">{{categoria.id}}</p>
    </div>
    <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#exampleModal" @click="precioFinal">
      Precio Total
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ticket </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          
          <table v-if="precioF3.length>0">
              <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
            <tr v-for="prod in precioF3" v-bind:key="prod.id" >
                {{actuArray}}
                <td v-if="prod.cantidad!=0">{{prod.id}}</td>
                <td v-if="prod.cantidad!=0"><input :id ="prod.id" type="number" :value='prod.cantidad' @change="cambiarCant(prod)" min="0"></td>
                <td v-if="prod.cantidad!=0">{{prod.precio}}</td>
              </tr>            
          </table>
            
             
          </div>
          <p><strong>Precio Total: {{precTotal}}</strong></p>
            <p v-if="precioTotal!=0"><strong>Muchas Gracias Por Todo</strong></p>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button v-if="precioTotal>0" type="button" class="btn btn-primary" data-dismiss="modal"  @click="cobrar">Cobrar</button>
          </div>
        </div>
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
  props: {
    producto: {
      type: String,
      default: "",
    },
  },
  components: {
    heade,
    foote
  },
  data() {
    return {
      valor: "",
      nombre: "",
      contra: "",
      productos: [],
      categorias: [],
      categoria: localStorage.categoria,
      precioTotal: 0,
      precioF : [],
      precioF2:[],
      precioF3 : [],
      precioF4: [],
      comanda: [],
      recorrido: []
    };
  },
  firestore: {
    categorias: db.collection("Categorias"),
    comanda: db.collection('Mesas'),
    productos: db.collection('Productos')
  },
  methods: {
    cobrar: function(){
      
      this.$router.push('/cobrar');
    },
    enviarZonas: function (categoria) {
        sessionStorage.categoria=categoria;
        this.$router.push('/productos');
    },
    precioFinal: function(){
      this.precioF3 = [];
      this.precioF = [];
      this.precioF2 = [];

        this.precioTotal =0;
        for(var i=0;i<this.comanda.length;i++){
              if(this.comanda[i].id==sessionStorage.mesa){
                  for(var x=0;x<this.comanda[i].Productos.length;x++){
                      this.recorrido.push(this.comanda[i].Productos[x]);
                  }

              }
        }
        for(var d = 0;d<this.productos.length-1;d++){
            for(var s = 0;s<this.recorrido.length;s++){
                if(this.productos[d].Id==this.recorrido[s]){
                      this.precioF.push({id:this.productos[d].id,cantidad:1,precio:this.productos[d].Precio,Id:this.recorrido[s]});
                      this.precioTotal += this.productos[d].Precio;
                }
            }
        }
        
        for(var m=0;m<this.precioF.length;m++){
          if(this.precioF2.length==0){
            this.precioF2.push(this.precioF[m]);
          }else{
            var duplicado = false;
            for(var g=0;g<this.precioF2.length;g++){
              
              if(this.precioF[m].id==this.precioF2[g].id){
                duplicado = true;
              }
            }
            if(duplicado==false){
              this.precioF2.push(this.precioF[m]);
            }
          }
        }
        
        for(var n =0;n<this.precioF2.length;n++){
          var cant =0;
          for(var u=0;u<this.precioF.length;u++){
            if(this.precioF2[n].id==this.precioF[u].id){
              cant++;
            }
          }
          this.precioF3.push({id:this.precioF2[n].id,cantidad:cant,precio:this.precioF2[n].precio,Id: this.precioF2[n].Id});
        }
        this.recorrido= [];
        
        
      },
      cambiarCant: function(prod){
        var input = parseInt(document.getElementById(prod.id).value);
        var cant =0;
        for(var i=0;i<this.precioF.length;i++){
          if(prod.Id==this.precioF[i].Id){
            cant= cant+1;
          }
        }
        if(cant> input){
          var produ =[];
          var menos = cant - input;
          for(var d = 0;d<this.precioF.length;d++){
            if(menos>0){
              if(this.precioF[d].Id==prod.Id){
                menos =menos -1;
              }else {
                produ.push(this.precioF[d].Id);
              }
            }else{
              produ.push(this.precioF[d].Id);
            }
          }
          db.collection("Mesas").doc(sessionStorage.mesa).update({
              Productos: produ,
          });
        }else if( cant<input){
          var menos2 = input-cant;
          for(var b = 0;b<this.precioF.length;b++){
            if(menos2>0){
              if(this.precioF[b].Id==prod.Id){
                var produ2 =[];
                this.precioF.push(prod);
                for(var a=0;a<this.precioF.length;a++){
                  produ2.push(this.precioF[a].Id);
                }
                db.collection("Mesas").doc(sessionStorage.mesa).update({
                  Productos: produ2,
                });
                menos2 =menos2 -1;
              }
            }
          }
        }
      },
      
  },
  created:function(){
        sessionStorage.categoria="";

    },
  computed: {
    actuArray() {
      this.precioFinal();
      return "";
    },
    precTotal(){
      var preci=0;
      for(var i=0;i<this.precioF.length;i++){
        preci+= this.precioF[i].precio;
      }
      return preci;
    }
  },
  mounted(){
    if(sessionStorage.camarero=="Admin"){
            this.$router.push('/')
            sessionStorage.camarero ="";
        }
  }
};
</script>

<style scoped>
.gr-categorias {
  display: inline-flex;
  margin-bottom: 2rem;
}
.categoria {
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
.categoria:hover {
  cursor: pointer;
}

.foot {
  position:sticky;
  bottom: 0;
}
.modal-body{
  text-align: center;
  display: flex;
  justify-content: center;
}
 td, th {
  padding:0 2rem 0 2rem;
}
table tr td input{
  width: 2.5rem;
  text-align: center;
}
</style>