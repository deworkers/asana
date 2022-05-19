import './index.less'

import Vue from 'vue'
import App from './App.vue'

var checkout = new Vue({
    render: function (h) {
        return h(App);
    }
}).$mount('#app');