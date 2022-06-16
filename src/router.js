
import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from "./store";
Vue.use(VueRouter);

import Board from './views/Board.vue'
import Login from './views/Login.vue'
import Card from './views/Card.vue'

const routes = [
    {
        path: '/', 
        name: 'board',
        component: Board,
        beforeEnter: (to, from, next) => {
            store.dispatch('getCards', '/user/issues').then(next());
        }
    },
    {
        path: '/login', 
        name: 'login',
        component: Login
    },
    {
        path: '/user/:id/issues',
        name: 'userBoard',
        component: Board,
        beforeEnter: (to, from, next) => {
            store.dispatch('getCards', to.path).then(next());
        }
    },
    {
        path: '/project/:id/issues',
        name: 'projectBoard',
        component: Board,
        beforeEnter: (to, from, next) => {
            store.dispatch('getCards', to.path).then(next());
        }
    },
    {
        path: '/card/:id',
        name: 'projectCard',
        component: Card,
        beforeEnter: (to, from, next) => {
            store.dispatch('getDelails', to.params.id).then(next());
            store.state.showDetail = false;
        }
    },
];

const router = new VueRouter({
    routes
});

export {router};