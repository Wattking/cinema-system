import { createRouter, createWebHistory } from 'vue-router' //Hash会有#
import Films from '../Views/Films.vue'
import Cinemas from '../Views/Cinemas.vue'
import Center from '../Views/Center.vue'
import NotFound from '../Views/NotFound.vue'
import NowPlaying from '../Views/Films/NowPlaying.vue'
import SoonPlaying from '../Views/Films/SoonPlaying.vue'
import Login from '../Views/Login.vue'
import City from '../Views/City.vue'
const routes = [
    {
        path: '/city',
        component: City
    },
    {
        path: '/detail/:myid',
        component: () => import('../Views/Detail.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: "/films",
        component: Films,
        children: [{
            path: "/films/nowplaying",
            component: NowPlaying
        },
        {
            path: "/films/soonplaying",
            component: SoonPlaying
        },
        {
            path: "/films",
            redirect: "/films/nowplaying"
        }]
    },
    {
        path: "/cinemas",
        component: Cinemas
    },
    {
        path: "/center",
        component: Center,
        meta: {
            requiredAuth: true
        }
    },
    {
        path: '/',
        redirect: '/films'     //重定向
    },
    {
        path: '/:pathMatch(.*)*',   //路由错误时
        component: NotFound
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // 使用环境变量
    routes
})

//全局路由拦截
router.beforeEach(async (to, _from, next) => {
    let isAuthenticated = await localStorage.getItem("token")

    if (to.name !== 'login' && !isAuthenticated && to.meta.requiredAuth) next({ name: 'login' })
    else next()
})

export default router