<template>
  <div id="app">
    <heade />
    
    <h2>Mesas</h2>
    <div class="separar"><h3 >Mesas</h3><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#mesas"></div>

    <div id="mesas" class="collapse">
        <div v-for="mesa in mesas" v-bind:key="mesa.id" class="com">
            <h3>{{mesa.id}}</h3>
        </div>
    </div>

    <div class="separar"><h3 >Añadir Mesas</h3><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#addmesas"></div>

    <div id="addmesas" class="collapse">
        <div class="separar">
            <select id="selectAddMesa" value="">
                <option v-for="zona in zonas" v-bind:key="zona" >{{zona}}</option>
            </select>
            <img src="../Img/add.png" alt="" width="20px"  height="20px" @click="addMesa()">
        </div>
        
    </div>

    <div class="separar"><h3 >Borrar Mesas</h3><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#borrarmesas"></div>
    <div id="borrarmesas" class="collapse">
        <div class="separar">
            <select id="selectBorrarMesa" value="">
                <option v-for="zona in zonas" v-bind:key="zona" >{{zona}}</option>
            </select>
            <img src="../Img/add.png" alt="" width="20px"  height="20px" @click="borrarMesa()">
        </div>
    </div>
    
    <br>
    <h2>Productos</h2>
    <div class="separar"><h3 >Productos</h3><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#productos"></div>

    <div id="productos" class="collapse">
        <div v-for="(producto,index) in productos" v-bind:key="producto.Id" class="com">
            <h3>{{producto.Nombre}}</h3>
            <p>Nombre: <input type="text" :placeholder=producto.Nombre :id="'nomProducto'+index" ></p>
            <p> Precio: <input type="number" :placeholder=producto.Precio :id="'precioProducto'+index"> </p>
            <p> Categoria:
                <select :id="'selectCategoria'+index" v-model="producto.Categoria">
                    <option v-for="categoria in categorias" v-bind:key="categoria.id">{{categoria.id}}</option>
                </select> 
            </p>
            <p>
            <button @click="editarProd(producto,index)">Editar</button>
            <button @click="borrarProd(producto)">Borrar</button>
            </p>
        </div>
    </div>

    <div class="separar"><h3 >Añadir Productos</h3><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#addproductos"></div>
    <div id="addproductos" class="collapse">
        <div class="separar">
            <p>Nombre: <input type="text" placeholder="Aqui el nombre..." v-model="nomProducto"> </p>
            <p> Precio: <input type="number" placeholder="2.4" v-model="precioProducto"> </p>
            <p> Categoria:
                <select id="selectAddProductos" value="">
                    <option v-for="categoria in categorias" v-bind:key="categoria.id" >{{categoria.id}}</option>
                </select> 
            </p>
            
            <img src="../Img/add.png" alt="" width="20px"  height="20px" @click="addProductos()">
        </div>
        
    </div>

    <br>
     <h2>Camareros</h2>
     <div class="separar"><h3 >Camareros</h3><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#camareros"></div>
    <div class="collapse" id="camareros">
        <div v-for="(camarero,index) in users" v-bind:key="camarero.id" class="separar">
            <p v-if="camarero.id!='Administrador'">Nombre: <input type="text" :placeholder=camarero.Nombre :id="'nomnuevoCamarero'+index"> </p>        
            <button @click="editarCamarero(camarero,index)" v-if="camarero.id!='Administrador'">Editar</button>
            <button @click="borrarCamarero(camarero)" v-if="camarero.id!='Administrador'">Borrar</button>        </div>
        
    </div>    

    <div class="separar"><h3 >Añadir Camareros</h3><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#addcamareros"></div>
    <div id="addcamareros" class="collapse">
        <div class="separar">
            <p>Nombre: <input type="text" placeholder="Aqui el nombre..." v-model="nomCamarero"> </p>        
            <img src="../Img/add.png" alt="" width="20px"  height="20px" @click="addCamarero()">
        </div>
        
    </div>
    <br>
    
     <h2>Categorias</h2>
     <div class="separar"><h3 >Categorias</h3><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#categorias"></div>
    <div class="collapse" id="categorias">
        <div v-for="categoria in categorias" v-bind:key="categoria.id" class="separar">
            <p >Categoria: &nbsp;&nbsp; &nbsp; &nbsp;{{categoria.id}} </p>        
            <button @click="borrarCategoria(categoria)" >Borrar</button>        </div>
        
    </div>    

    <div class="separar"><h3 >Añadir Categoria</h3><img src="../Img/drop.png" width="20px"  height="20px" alt="" data-toggle="collapse" data-target="#addcategoria"></div>
    <div id="addcategoria" class="collapse">
        <div class="separar">
            <p>Categoria: <input type="text" placeholder="Aqui la categoria..." v-model="nomCatego"> </p>        
            <img src="../Img/add.png" alt="" width="20px"  height="20px" @click="addCategoria()">
        </div>
        
    </div>
    <br>
    <!-- type : Piechart -->
    <h2>Grafica Ingresos</h2>
    <button @click="cambiargrafica">Cambiar Grafica</button>
         <GChart id="grafica"
        :settings="{ packages: ['corechart', 'table', 'map'] }"
        :type= tipoGrafica
        :data= "implementarGrafica"
        :options="chartOptions"
    />
   
     
     <br>
    
  </div>

</template>



<script>
import { db } from "../db";
import heade from "../components/header";
import { GChart } from 'vue-google-charts';


export default {
  name: "App",
  components: {
    heade,
    GChart
  },
  data() {
    return {
      productos:[],
      mesas : [],
      categorias: [],
      users: [],
      grf:0,
      tipoGrafica:"ColumnChart",
      zonas : ["Barra","Comedor","Terraza 1","Terraza 2"],
      selected: "",
      editar : false,
      nomProducto: "",
      nomCatego: "",
      precioProducto : "",
      nomCamarero : "",
      nomnuevoCamarero : "",
      grafica: [],
      chartData: []
      ,
      chartOptions: {
        chart: {
          title: 'Grafica Ingresos',
        },
        backgroundColor: {
            fill: '#819299'
        },
      }
    };
  },
  firestore: {
    productos: db.collection("Productos"),
    mesas : db.collection("Mesas"),
    categorias: db.collection("Categorias"),
    users : db.collection("Usuarios"),
    grafica : db.collection("Grafico")
  },
  methods: {
    cambiargrafica(){
        if(this.grf == 0){
            this.grf++;
            this.tipoGrafica='PieChart';
        }else if(this.grf==1){
            this.grf++;
            this.tipoGrafica='LineChart'
        }else{
            this.grf=0;
            this.tipoGrafica='ColumnChart'
        }
    },
    addMesa: function(){
        var select = document.getElementById("selectAddMesa");
        
        var ref=0;
        for(var i=0;i<this.mesas.length;i++){

            if(select.value=="Barra"){
                if(this.mesas[i].Zona==select.value){  
                    if(parseInt(this.mesas[i].id.substring(5,9))>ref){
                        ref=parseInt(this.mesas[i].id.substring(5,9));
                    }
                }
            }else if(select.value=="Comedor"){
                if(this.mesas[i].Zona==select.value){  
                    if(parseInt(this.mesas[i].id.substring(8,12))>ref){
                        ref=parseInt(this.mesas[i].id.substring(8,12));
                    }
                }
            }else if(select.value=="Terraza 1"){
               if(this.mesas[i].Zona==select.value){  
                    if(parseInt(this.mesas[i].id.substring(4,8))>ref){
                        ref=parseInt(this.mesas[i].id.substring(4,8));
                    }
                }
            }else if(select.value=="Terraza 2"){
                if(this.mesas[i].Zona==select.value){  
                    if(parseInt(this.mesas[i].id.substring(4,8))>ref){
                        ref=parseInt(this.mesas[i].id.substring(4,8));
                    }
                }
            }
        }

        if((select.value=="Barra") || (select.value=="Comedor")){
            ref = select.value+" "+(ref+1);
        }else{
            ref = "Mesa "+(ref+1);
        }
        this.$notify({ group: 'foo', title: 'Añadido',type:"success" ,text: 'Se ha añadido una mesa en : '+select.value+' '  });
        db.collection("Mesas").doc(ref).set({Zona:select.value, Productos:[]});

    },
    borrarMesa : function(){
        var select = document.getElementById("selectBorrarMesa");
        
        var ref=0;
        for(var i=0;i<this.mesas.length;i++){

            if(select.value=="Barra"){
                if(this.mesas[i].Zona==select.value){  
                    if(parseInt(this.mesas[i].id.substring(5,9))>ref){
                        ref=parseInt(this.mesas[i].id.substring(5,9));
                    }
                }
            }else if(select.value=="Comedor"){
                if(this.mesas[i].Zona==select.value){  
                    if(parseInt(this.mesas[i].id.substring(8,12))>ref){
                        ref=parseInt(this.mesas[i].id.substring(8,12));
                    }
                }
            }else if(select.value=="Terraza 1"){
               if(this.mesas[i].Zona==select.value){  
                    if(parseInt(this.mesas[i].id.substring(4,8))>ref){
                        ref=parseInt(this.mesas[i].id.substring(4,8));
                    }
                }
            }else if(select.value=="Terraza 2"){
                if(this.mesas[i].Zona==select.value){  
                    if(parseInt(this.mesas[i].id.substring(4,8))>ref){
                        ref=parseInt(this.mesas[i].id.substring(4,8));
                    }
                }
            }
        }

        if((select.value=="Barra") || (select.value=="Comedor")){
            ref = select.value+" "+ref;
        }else{
            ref = "Mesa "+ref;
        }
        
        this.$notify({ group: 'foo', title: 'Borrado',type:"success",text: 'Se ha borrado una mesa en : '+select.value+' '  });

        db.collection("Mesas").doc(ref).delete();
    },
    addProductos: function(){
        var select = document.getElementById("selectAddProductos");

        var ref=0;
        for(var i=0;i<this.productos.length;i++){
            if(parseInt(this.productos[i].Id.substring(4,7))>ref){
                ref=parseInt(this.productos[i].Id.substring(4,7));
            }
        }
        ref = "Ref-"+(ref+1);
        
        let precio = parseFloat(this.precioProducto);

        console.log(this.nomProducto+" "+select.value+" "+precio);
        db.collection("Productos").doc(this.nomProducto).set({Id: ref, Nombre: this.nomProducto, Precio: precio, Categoria: select.value})
        this.$notify({ group: 'foo', title: 'Añadido',type:"success" ,text: 'Se ha añadido : '+this.nomProducto+' '  });

    },
    editarProd : function(producto,index){
        var select = document.getElementById("selectCategoria"+index);
        var inputNombre = document.getElementById("nomProducto"+index);
        var inputPrecio = document.getElementById("precioProducto"+index);

        if(inputNombre.value!="" && inputPrecio.value!=""){
            let precio = parseFloat(inputPrecio.value);
            
            db.collection("Productos").doc(producto.id).set({Categoria: select.value, Nombre: inputNombre.value, Precio: precio, Id: producto.Id});
            this.$notify({ group: 'foo', title: 'Editado',type:"success" ,text: 'Se ha editado : '+this.nomProducto+' '  });
        }
    },
    borrarProd: function(producto){
        this.$notify({ group: 'foo', title: 'Borrado',type:"success",text: 'Se ha borrado : '+producto.id+' '  });
        db.collection("Productos").doc(producto.id).delete();
        
    },
    addCamarero : function(){
        if(this.nomCamarero!=""){
        var ref = 0
        for(var i=0;i<this.users.length;i++){
            if(this.users[i].id.length==9){
                
                ref=parseInt(this.users[i].id.substring(8,9));
                
            }
        }
        ref = ref +1;
        this.$notify({ group: 'foo', title: 'Agregado',type:"success",text: 'Se ha agregado: '+this.nomCamarero+' '  });
         db.collection("Usuarios").doc("Camarero"+ref).set({Nombre: this.nomCamarero});
        }
    },
     editarCamarero : function(camarero,index){
        var inputNombre = document.getElementById("nomCategoria"+index);

        if(inputNombre.value!=""){
        this.$notify({ group: 'foo', title: 'Agregado',type:"success",text: 'Se ha editado: '+this.nomnuevoCamarero+' '  });
         db.collection("Usuarios").doc(camarero.id).set({Nombre: inputNombre.value});
         this.nomnuevoCamarero="";
        }
    },
    borrarCamarero : function(camarero){
         db.collection("Usuarios").doc(camarero.id).delete();
        this.$notify({ group: 'foo', title: 'Eliminado',type:"success",text: 'Se ha eliminado correctamente '});

    },
    addCategoria : function(){
        if(this.nomCatego!=""){
        this.$notify({ group: 'foo', title: 'Agregado',type:"success",text: 'Se ha agregado: '+this.nomCatego+' '  });
         db.collection("Categorias").doc(this.nomCatego).set({Nombre: this.nomCatego});
         this.nomCatego="";
        }
    },
    borrarCategoria : function(catego){
        var resultado = window.confirm('Estas seguro?');
        if (resultado === true) {
            db.collection("Categorias").doc(catego.id).delete();
        this.$notify({ group: 'foo', title: 'Eliminado',type:"success",text: 'Se ha eliminado correctamente '});
        } else { 
            this.$notify({ group: 'foo', title: 'Cancelado',type:"success",text: 'No se ha eliminado.'});
        }
        

    }

   
    
  },
  created:function(){

    },
    mounted(){
         this.$bind("mesas",db.collection("Mesas"));
         sessionStorage.mesa ="";
         sessionStorage.zona = "";
         sessionStorage.camarero ="Admin";
         this.$bind("grafica",db.collection("Grafico"));
        },
  computed: {
    implementarGrafica: function(){
        let valores = [
        ['Mes', 'Ingresos'],
        ['Enero', 0],
        ['Febrero', 0],
        ['Marzo', 0],
        ['Abril', 0],
        ['Mayo', 0],
        ['Junio', 0],
        ['Julio', 20],
        ['Agosto', 0],
        ['Septiembre', 0],
        ['Octubre', 0],
        ['Noviembre', 0],
        ['Diciembre', 0]]
        ;
        let val = this.grafica;
        for(var i=0;i<val.length;i++){
            if(val[i].Mes==1){
                var cant = valores[1][1];
                valores[1][1]= cant + val[i].Cuenta;
            }else if(val[i].Mes==2){
                var cant2 = valores[2][1];
                valores[2][1]= cant2 + val[i].Cuenta;
            }else if(val[i].Mes==3){
                var cant3 = valores[3][1];
                valores[3][1]= cant3 + val[i].Cuenta;
            }else if(val[i].Mes==4){
                var cant4 = valores[4][1];
                valores[4][1]= cant4 + val[i].Cuenta;
            }else if(val[i].Mes==5){
                var cant5 = valores[5][1];
                valores[5][1]= cant5 + val[i].Cuenta;
            }else if(val[i].Mes==6){
                var cant6 = valores[6][1];
                valores[6][1]= cant6 + val[i].Cuenta;
            }else if(val[i].Mes==7){
                var cant7 = valores[7][1];
                valores[7][1]= cant7 + val[i].Cuenta;
            }else if(val[i].Mes==8){
                var cant8 = valores[8][1];
                valores[8][1]= cant8 + val[i].Cuenta;
            }else if(val[i].Mes==9){
                var cant9 = valores[9][1];
                valores[9][1]= cant9 + val[i].Cuenta;
            }else if(val[i].Mes==10){
                var cant10 = valores[10][1];
                valores[10][1]= cant10 + val[i].Cuenta;
            }else if(val[i].Mes==11){
                var cant11 = valores[11][1];
                valores[11][1]= cant11 + val[i].Cuenta;
            }else if(val[i].Mes==12){
                var cant12 = valores[12][1];
                valores[12][1]= cant12 + val[i].Cuenta;
            }
        }
        return valores 
    }
  },
};

    


</script>

<style scoped>

.com{
  display: flex;
  background-color: #819299;
  padding: 0.5rem;
  border: solid 1px black;
  flex-wrap:wrap ;
}
.com p{
  margin-left: 0.5rem;
}
.separar {
    display: flex;
    justify-content: space-between;
    background-color: rgb(129, 146, 153);
    padding: 0.5rem;
    border: solid 1px black;
    flex-wrap: wrap;

}
.separar img{
    cursor: pointer;
}
#grafica {
      border: solid 1px black;
}

</style>