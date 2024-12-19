<script setup lang="ts">
import { useUserStore } from '@/store/userStore';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import AppMenuItem from './AppMenuItem.vue';
import { useUtils } from '@/composables/utils';

const { t } = useI18n()
const { menuURL } = useUtils()
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
            { label: t('DASHBOARD.MODULE'), icon: 'pi pi-fw pi-home', to: '/' },
            { label: t('SETTINGS.MODULE'), icon: 'pi pi-fw pi-cog', to: '/settings' },
            { label: t('CATEGORIES.MODULE'), icon: 'pi pi-fw pi-clone', to: '/categories' },
            { label: t('PRODUCTS.MODULE'), icon: 'pi pi-fw pi-list', to: '/products' },
            { label: t('QR_CODE.MODULE'), icon: 'pi pi-fw pi-qrcode', to: '/qrcode' },
            { label: t('MENU_APP'), icon: 'pi pi-fw pi-external-link', url: menuURL, target: '_blank' },
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
