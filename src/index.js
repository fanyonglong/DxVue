
import App from './app'
import Vue from 'vue';
import router from './router'

new Vue({
    el:'#app',
    template:'<App/>',
    router,
    components:{
        App
    }
})