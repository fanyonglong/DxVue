import Router from 'vue-router'
import Vue from 'vue'
import input from '@/components/input'
import list from '@/components/list/list'
Vue.use(Router);
export default new Router({
 //   mode: 'history',
    routes:[{
        name:"input",
        path:"input/index",
        component:input
    },{
        name:"list",
        path:"/list",
        component:list
    }]
});