import AppLayout from '@/layout/AppLayout.vue'
import { useAuthStore } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            meta: { requiresAuth: true },
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/settings',
                    name: 'Settings',
                    component: () => import('@/views/pages/Settings.vue')
                },
                {
                    path: '/categories',
                    name: 'Categories',
                    component: () => import('@/views/pages/Categories.vue')
                },
                {
                    path: '/products',
                    name: 'Products',
                    component: () => import('@/views/pages/Products.vue')
                },
                {
                    path: 'qrcode',
                    name: 'QRCode',
                    component: () => import('@/views/pages/QRCode.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/pages/Documentation.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        },
        {
            path: '/private',
            meta: { requiresAuth: true, requireMaster: true },
            component: AppLayout,
            children: [
                {
                    path: 'clients',
                    name: 'Clients',
                    component: () => import('@/views/pages/admin/Clients.vue')
                }
            ]
        },
    ]
})

router.beforeEach((to, from) => {
    const authStore = useAuthStore()
    const userStore = useUserStore()

    if (to.name === 'login' && authStore.isAuthenticated) return { path: '/' }

    if (to.meta.requiresAuth && !authStore.isAuthenticated && to.name !== 'login') return { name: 'login' }

    if (to.meta.requireMaster && userStore.user.role !== 'superadmin') return { path: '/' }
})

export default router
