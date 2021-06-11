<template>
  <div id="app">
    <router-view/>
    <notifications group="foo" />
  </div>
  
</template>

<style>
body {
        background-color: rgb(230, 228, 228);
        width: 98vw;
        height: 97vh;
        text-align: center;
        margin: 0 auto;
        font-family: 'Caveat', cursive;
    }
</style>
