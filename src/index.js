import './index.less'

import Vue from 'vue'

import { store } from "./store";
import { router } from "./router";

import App from './App.vue'

var app = new Vue({
    store,
    router,
    render: function (h) {
        return h(App);
    }
}).$mount('#app');


import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);