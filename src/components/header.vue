<template>
  <div >
    <div class="todo">
      <h1>Bar Miramar Xus</h1>
      <img v-if="nomCamarero=='Admin'" src="../Img/logout.png" width="40px" height="40px" @click="salir()">
    </div>
    
    <div class="jider">
      <p v-if="pos == 1">Camarero: {{ nomCamarero }}</p> 
      <p v-if="(pos2 == 1) && (nomCamarero!='Admin')"> / {{ nomZona }}</p>
      <p v-if="(pos3 == 1) && (nomCamarero!='Admin')"> / {{nomMesa}}</p>
    </div>
    
    <hr />
  </div>
</template>

<script>
export default {
  name: "heade",
  data() {
    return {
      nomCamarero: sessionStorage.camarero,
      pos: 0,
      nomZona: sessionStorage.zona,
      pos2: 0,
      nomMesa: sessionStorage.mesa,
      pos3: 0,
    };
  },
  methods: {
    salir:function(){
      this.$router.push('/')
    }
  },
  created: function () {
    if (this.nomCamarero == "") {
      this.pos = 0;
    } else {
      this.pos = 1;
    }
    if (this.nomZona == "") {
      this.pos2 = 0;
    } else {
      this.pos2 = 1;
    }
    if (this.nomMesa == "") {
      this.pos3 = 0;
    } else {
      this.pos3 = 1;
    }
    if (this.nomCategoria == "") {
      this.pos4 = 0;
    } else {
      this.pos4 = 1;
    }
  },
};
</script>
<style scoped>

hr {
  width: 98vw;
  color: black;
}
.jider{
  display: inline-flex;
  font-family: 'Caveat', cursive;
}
.todo{
  width: 99%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  font-family: 'Caveat', cursive;
  
  
}
.todo h1{
  margin-left:2rem;
 width: 150%;
 
}
img{
  cursor: pointer;
}

</style>