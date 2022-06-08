
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import Board from './views/Board.vue'
import Login from './views/Login.vue'

const routes = [
    {
        path: '/', 
        name: 'board',
        component: Board
    },
    {
        path: '/login', 
        name: 'login',
        component: Login
    }
];

const router = new VueRouter({
    routes
});

export {router};