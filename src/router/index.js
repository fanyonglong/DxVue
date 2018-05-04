import Router from 'vue-router'
import Vue from 'vue'
import input from '@/components/input'
Vue.use(Router);
export default new Router({
    mode: 'history',
    routes:[{
        name:"input",
        path:"input",
        component:input
    }]
});