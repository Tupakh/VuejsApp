import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './router'

/*Vue.config.productionTip = true;*/
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
