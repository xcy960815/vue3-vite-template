import {
    createRouter,
    createWebHashHistory,
    RouteComponent,
    RouteRecordRaw,
} from 'vue-router'

import Home from '../views/Home.vue'

export interface RouteItem
    extends Pick<
        RouteRecordRaw,
        Exclude<
            keyof RouteRecordRaw,
            'meta' | 'component' | 'path' | 'children'
        >
    > {
    path: string // 路由唯一标识
    children?: Array<RouteItem>
    component?: RouteComponent
    meta: {
        menuName: string
        showInLeftMenu?: boolean
        highLightActive?: string // 左侧菜单栏高亮的菜单
        link?: string // 外部链接
        target?: '_blank' | '_self' | '_parent' | '_top' // 跳转外部链接的方式
        menuIcon?: string
        permission?: string | Array<string>
    }
}

const routeList: Array<RouteItem> = [
    {
        path: '/',
        name: '/',
        meta: {
            menuName: '根目录',
            showInLeftMenu: false,
        },
        redirect: '/home',
    },
    {
        path: '/home',
        name: '/home',
        meta: {
            menuName: '首页',
            menuIcon: 'el-icon-eleme',
        },
        component: Home,
    },
]

const routes = routeList as Array<RouteRecordRaw>

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
