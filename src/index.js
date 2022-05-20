import './index.less'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import App from './App.vue'
import { store } from "./store";

var app = new Vue({
    store: store,
    render: function (h) {
        return h(App);
    }
}).$mount('#app');