<template>
  <div>
      <hr />
      <footer>
        <div id="main">
          <img id="openbtn" class="openbtn btn btn-outline-dark" @click="openNav()" src="../Img/menu.png" alt="" width="30px" height="30px">
          <img src="../Img/send.png" alt="" width="40px" height="30px" @click="pedir" v-if="mesa!=''">
        </div>

        <div id="mySidebar" class="sidebar col-xs-12 col-md-4 col-lg-3">
          <div class="closebtn">
            <p @click="inicio">MyBar</p>
            <a href="javascript:void(0)"  @click="closeNav()">×</a>
          </div>
          <hr v-if="mesa!=''">
          
          <p @click="editComanda" v-if="mesa!=''">Editar</p>
          <hr>
          <p @click="Admin" >Administrador</p>
          <hr v-if="camarero==''">
          <p @click="comandaBarra" v-if="camarero==''">Comandas Barra</p>
          <hr v-if="camarero==''">
          <p @click="comandaCocina" v-if="camarero==''">Comandas Cocina</p>
          <hr>
          <p @click="clickCodigo">Codigo QR</p>
          <hr>
        </div>
      
        

      </footer>

  </div>
</template>

<script>
 import {db} from "../db";

export default {
  name: "foote",
  data() {
    return {
      Pedido: "",
      pos: 0,
      comanda: [],
      camarero: sessionStorage.camarero,
      recorrido: [],
      productos: [],
      precioTotal: 0,
      pedidoF: [],
      pedidoF2: [],
      mesa : sessionStorage.mesa
    };
  },
  created: function () {
    
  },
  firestore:{
      productos: db.collection('Productos'),
       comanda: db.collection('Mesas')
      
  },
  mounted(){
    
            
  },
  methods:{
      pedir: function(){
          this.Pedido = JSON.parse(sessionStorage.getItem("Pedido"));
          if(this.Pedido.length!=0){
            for(var i=0;i<this.comanda.length;i++){
                if(this.comanda[i].id==sessionStorage.mesa){
                    if(this.comanda[i].Productos.length!=0){
                      for(var x=0;x<this.comanda[i].Productos.length;x++){
                        this.recorrido.push(this.comanda[i].Productos[x]);
                      }
                    }

                    for(var d=0;d<this.Pedido.length;d++){
                        this.recorrido.push(this.Pedido[d].id);
                        console.log(this.Pedido[d].id);
                    }
                    db.collection("Mesas").doc(sessionStorage.mesa).update({
                                Productos: this.recorrido,
                        });
                  

                }
            }
            
            for(var j=0;j<this.Pedido.length;j++){
              for(var n =0;n<this.productos.length;n++){
                if(this.Pedido[j].id==this.productos[n].Id){
                  let fecha_actual = new Date()
                  let anio = fecha_actual.getFullYear();
                  let mes  = fecha_actual.getMonth()+1;
                  let dia  = fecha_actual.getDate();
                  let hora = fecha_actual.getHours();
                  let minutos = fecha_actual.getMinutes();
                  let fechaf = hora+":"+minutos+"~"+dia+"/"+mes+"/"+anio+"/";
                  if((this.productos[n].Categoria == "Bebida") || (this.productos[n].Categoria == "Cafe") || (this.productos[n].Categoria == "Cubata") || (this.productos[n].Categoria == "Cerveza")){ 
                  db.collection("Barra").add({
                    Completado : false,
                    Hora: fechaf,
                    Mesa: sessionStorage.mesa,
                    Zona : sessionStorage.zona,
                    Producto: this.productos[n].Nombre,
                    Nota: this.Pedido[j].nota,
                    Camarero: sessionStorage.camarero
                  });
                  }else{
                    db.collection("Cocina").add({
                    Completado : false,
                    Hora: fechaf,
                    Mesa: sessionStorage.mesa,
                    Zona : sessionStorage.zona,
                    Producto: this.productos[n].Nombre,
                    Nota: this.Pedido[j].nota,
                    Camarero: sessionStorage.camarero
                  });
                  }
                }
              }
            }
            this.recorrido= [];
            window.sessionStorage.setItem("Pedido", JSON.stringify([]));
            this.$notify({ group: 'foo', title: 'Añadido', type: 'success', text: 'Se ha enviado correctamente'});
            this.$router.push('Categorias');
          }else{
            this.$notify({ group: 'foo', title: 'Error', type: 'error', text: 'Añade Productos Primero'});
          }
      },
    
      inicio: function(){
        this.$router.push('/');
      },
    openNav: function() {
      document.getElementById("mySidebar").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
      document.getElementById("openbtn").style.display = "none";
      document.getElementById("mySidebar").style.borderRight = "1px solid #000"
    },
    closeNav: function(){
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
      document.getElementById("openbtn").style.display = "inline";
      document.getElementById("mySidebar").style.borderRight = "none"
    },
    editComanda : function(){
      this.pedidoF = JSON.parse(sessionStorage.getItem("Pedido"));

        for(var d = 0;d<this.pedidoF.length;d++){
            for(var s = 0;s<this.productos.length;s++){

                if(this.productos[s].Id==this.pedidoF[d]){
                      this.pedidoF2.push({id:this.productos[s].id,cantidad:1,precio:this.productos[s].Precio});                      
                }
            }
        }
        window.sessionStorage.setItem("Pedido2", JSON.stringify([]));
        window.sessionStorage.setItem("Pedido2", JSON.stringify(this.pedidoF2));
       
      this.$router.push('/EditarProductos');
  },
  clickCodigo : function(){
    this.$router.push('/CodigoQr');
  },
  Admin: function(){
        this.$router.push('/login');
  },
  comandaCocina : function(){
    this.$router.push('/Comandas_Cocina');
  },
  comandaBarra : function(){
    this.$router.push('/Comandas_Barra');
  }
  
  },

  
};
</script>
<style scoped>



hr {
  width: 98vw;
  color: black;
}
img:hover{
  cursor: pointer;
}
img{
  padding:0 0.5rem 0.25rem 0.5rem  ;
}
.sidebar {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(129, 146, 153);
  overflow-x: hidden;
  padding-top: 3.5rem;
  transition: 0.5s;
}

.sidebar li{
  margin-left:1rem;
}
.sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidebar a:hover {
  color: #f1f1f1;
}

.sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}
.sidebar p{
  cursor: pointer;
}

.openbtn {
  cursor: pointer;
  color: white;
  border: none;
  margin-bottom: 0.5rem;
}

.openbtn:hover {
  background-color: #444;
}

#main {
  display: flex;
  justify-content: space-between;
}
.closebtn{
  display: inline-flex;
  font-size: 0.5rem;

}

.closebtn p{
  margin:0rem;
  padding-top: 0.5rem;
}
#mySidebar p:first-child{
  padding-top:0.2rem ;
}
#mySidebar p{
  padding-top:0.5rem ;
  }


</style>
