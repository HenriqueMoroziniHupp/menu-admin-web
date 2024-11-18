<script setup lang="ts">
import { useUserStore } from '@/store/userStore';
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const userStore = useUserStore()

const model = ref([
    {
        label: 'Sistema',
        role: 'superadmin',
        separator: true,
        items: [
            { label: 'Clientes', icon: 'pi pi-fw pi-user-plus', to: '/private/clients' }
        ]
    },
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/settings' },
            { label: 'Categorias', icon: 'pi pi-fw pi-clone', to: '/categories' },
            { label: 'Produtos', icon: 'pi pi-fw pi-list', to: '/products' },
            { label: 'QR Code', icon: 'pi pi-fw pi-qrcode', to: '/qrcode' },
        ],
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.role || userStore.user.role === 'superadmin'" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
