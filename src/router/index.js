import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import Zona from '../views/zonas.vue'
import Mesas from '../views/Mesas.vue'
import Categorias from '../views/Categorias.vue'
import Productos from '../views/Productos.vue'
import CodigoQr from '../views/CodigoQr.vue'
import EditarProductos from '../views/EditarProductos.vue'
import Cobrar from '../views/Cobrar.vue'
import Comandas_Barra from '../views/Comandas_Barra.vue'
import Comandas_Cocina from '../views/Comandas_Cocina.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: index
  },
  {
    path: '/zonas',
    name: 'Zona',
    component: Zona
  },
  {
    path: '/Mesas',
    name: 'Mesas',
    component: Mesas
  },
  {
    path: '/Categorias',
    name: 'Categorias',
    component: Categorias
  },
  {
    path: '/Productos',
    name: 'Productos',
    component: Productos
  },
  {
    path: '/EditarProductos',
    name: 'EditarProductos',
    component: EditarProductos
  },
  {
    path: '/CodigoQr',
    name: 'CodigoQr',
    component: CodigoQr
  },
  {
    path: '/Cobrar',
    name: 'Cobrar',
    component: Cobrar
  },
  {
    path: '/Comandas_Barra',
    name: 'Comandas_Barra',
    component: Comandas_Barra
  },
  {
    path: '/Comandas_Cocina',
    name: 'Comandas_Cocina',
    component: Comandas_Cocina
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
