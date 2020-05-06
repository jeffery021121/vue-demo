import Vue from 'vue';
import VueRouter from 'vue-router';
import OutSideClick from '../page/OutSideClick';
import LazyImgLoad from '../page/LazyImgLoad';
import Compiler from '../page/Compiler';
import Form from '../page/Form';

Vue.use(VueRouter)

let routes = [
    {
        path: '/outSideClick',
        component: OutSideClick,
    },
    {
        path: '/lazyImgLoad',
        component: LazyImgLoad
    },
    {
        path: '/compiler',
        component: Compiler
    },
    {
        path: '/form',
        component: Form,
    }
]

let router = new VueRouter({
    mode: 'hash',
    routes
})

export default router