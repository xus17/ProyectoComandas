<template>
  <div id="app">
    <heade />

    
    <h3 > Precio Total : {{cobrar}}</h3>
    <div class="pagar">
        <p>Efectivo: </p><input type="number" v-model="dinero">
        <button @click="rellenarEfectivo(cobrar)">Rellenar</button>
    </div>
    <div class="pagar">
        <p>Tarjeta: </p><input type="number" v-model="tarjeta">
        <button @click="rellenarTarjeta(cobrar)">Rellenar</button>
    </div>
    <button @click="PagarFinal(cobrar)">Pagar</button>
  </div>
</template>


<script>
import { db } from "../db";
import heade from "../components/header";

export default {
  name: "App",
  props: {
    producto: {
      type: String,
      default: "",
    },
  },
  components: {
    heade
  },
  data() {
    return {
      productos: [],
      categorias: [],
      categoria: localStorage.categoria,
      precioTotal: 0,
      comanda: [],
      comandasb: [],
      comandasc : [],
      grafico : [],
      recorrido: [],
      dinero : 0,
      tarjeta:0 
    };
  },
  firestore: {
    categorias: db.collection("Categorias"),
    comanda: db.collection('Mesas'),
    productos: db.collection('Productos'),
    grafico : db.collection('Grafico'),
    comandasb: db.collection('Barra'),
    comandasc : db.collection('Cocina')
    
  },
  methods: {
    rellenarEfectivo:function (cobrar){
        this.dinero = cobrar;
    },
    rellenarTarjeta:function (cobrar){
        this.tarjeta = cobrar;
    },
    borraryredireccionar : function (cobrar){
    for(var i=0;i<this.comanda.length;i++){            
        if(this.comanda[i].id==sessionStorage.mesa){
            
            db.collection("Mesas").doc(this.comanda[i].id).set({
                Zona : this.comanda[i].Zona,
                Productos : []
            });
        }
    }
    var Fecha = new Date();
    
    db.collection("Grafico").add({Mes:Fecha.getMonth()+1,Cuenta:cobrar});

    for(var n=0;n<this.comandasb.length;n++){
      if(this.comandasb[n].Mesa==sessionStorage.mesa){
        db.collection("Barra").doc(this.comandasb[n].id).delete();
      }
    }
    for(var j=0;j<this.comandasc.length;j++){
      if(this.comandasc[j].Mesa==sessionStorage.mesa){
        db.collection("Cocina").doc(this.comandasc[j].id).delete();
      }

    }

    this.$router.push('/');
    },
    PagarFinal: function (cobrar){
        this.tarjeta = parseFloat(this.tarjeta);
        this.dinero = parseFloat(this.dinero);
        if(this.tarjeta>0 && this.dinero>0){
            if((this.dinero+this.tarjeta)==cobrar){
                this.$notify({ group: 'foo', title: 'Cobrado',text: 'Se ha cobrado correctamente'  });
                 this.borraryredireccionar(cobrar);
            }else if((this.dinero+this.tarjeta)>cobrar){
                let devolver = (cobrar -this.tarjeta)-this.dinero;
                devolver = devolver *-1;
                this.$notify({ group: 'foo', title: 'Cobrado',text: 'Se debe :'+devolver  });
                setTimeout(2000);
                 this.borraryredireccionar(cobrar);
            }else if((this.dinero+this.tarjeta)<cobrar){
                this.$notify({ group: 'foo', type:"error", title: 'Error',text: 'Falta dinero'  });
            }
        }else if((this.dinero==cobrar) || (this.tarjeta==cobrar)){           
                this.$notify({ group: 'foo', title: 'Cobrado',text: 'Se ha cobrado correctamente'  });
                this.borraryredireccionar(cobrar);
        }else{
            this.$notify({ group: 'foo', type:"error", title: 'Error',text: 'Introduce la cantidad a cobrar'  });
        }
        
    }

  },
  computed:{
      cobrar :function () {
         let comand = this.comanda;
         let recor = this.recorrido;
         let produc = this.productos;
         let precio = 0;

        for(var i=0;i<comand.length;i++){  
              if(comand[i].id==sessionStorage.mesa){
                  for(var x=0;x<comand[i].Productos.length;x++){
                      recor.push(comand[i].Productos[x]); 
              }
        }
        }
        for(var d = 0;d<produc.length-1;d++){
            for(var s = 0;s<recor.length;s++){
                if(produc[d].Id==recor[s]){
                      precio += produc[d].Precio;
                }
            }
        }
        return precio;

        
    }
    
  },
  mounted(){
    if(sessionStorage.categoria!=null){
        this.$bind("productos",db.collection("Productos"));
        this.$bind("comanda",db.collection("Mesas"));
        this.$bind("grafico",db.collection("Grafico"));
        }}
};
</script>

<style scoped>
.pagar {
    display: flex;
    justify-content: center;
    padding: 1rem;
}
.pagar p {
    font-size:1.5rem ;
}
button{
    color: white;
    background: black;
    border-radius: 20%;
}

</style>