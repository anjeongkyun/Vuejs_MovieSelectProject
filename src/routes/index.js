import { createRouter, createWebHashHistory } from 'vue-router'
import MyHome from './MyHome'
import MyMovie from './MyMovie'
import MyAbout from './MyAbout'

export default createRouter({
    // Hash or History
    history: createWebHashHistory(),
    // pages
    routes: [
        {
            path: '/',
            component: MyHome 
        },
        {
            path: '/movie',
            component: MyMovie 
        },
        {
            path: '/about',
            component : MyAbout
        }
    ]
})