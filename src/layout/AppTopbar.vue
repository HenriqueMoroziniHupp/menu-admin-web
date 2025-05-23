<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import { API } from '@/settings/axios';
import { useResetStore } from '@/store/resetStore';
import { useUserStore } from '@/store/userStore';
import type Menu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const router = useRouter()
const { user } = useUserStore()
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout()
const userMenu = ref<InstanceType<typeof Menu>>()
const toggleUserMenu = (event) => userMenu.value.toggle(event)

const logout = () => {
    useResetStore()
    delete API.defaults.headers.common.Authorization
    router.replace({ name: 'login' })
}

const items = ref<MenuItem[]>([
    {
        separator: true
    },
    {
        label: t('TOP_BAR.PROFILE'),
        items: [
            {
                label: t('SETTINGS.MODULE'),
                icon: 'pi pi-cog',
                shortcut: '⌘+O',
                action: () => router.push({ name: 'Settings' })
            },
            {
                label: t('LOGIN.LOGOUT'),
                icon: 'pi pi-sign-out',
                shortcut: '⌘+Q',
                action: () => logout()
            }
        ]
    }
])
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <Image src="/pwa-192x192.png" alt="Logo" width="40" />
                <span>UPZINI</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>

                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action" @click="toggleUserMenu">
                        <i class="pi pi-user"></i>
                        <span>{{ $t('TOP_BAR.PROFILE') }}</span>
                    </button>
                    <Menu ref="userMenu" id="overlay_menu" class="w-60 isso" :model="items" :popup="true">
                        <template #start>
                            <button
                                v-ripple
                                class="mt-1 p-2 pl-4 items-center relative overflow-hidden w-full border-0 bg-transparent flex items-start hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-800"
                            >
                                <Avatar :label="user.name[0]" class="mr-2" shape="circle" />
                                <span class="inline-flex flex-col items-start">
                                    <span class="font-bold">{{ user.name }}</span>
                                    <span class="text-sm">{{ user.role }}</span>
                                </span>
                            </button>
                        </template>
                        <template #submenulabel="{ item }">
                            <span class="text-primary font-bold">{{ item.label }}</span>
                        </template>
                        <template #item="{ item, props }">
                            <button v-ripple class="flex items-center" v-bind="props.action" @click="item.action">
                                <span :class="item.icon" />
                                <span>{{ item.label }}</span>
                                <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                                <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                            </button>
                        </template>
                    </Menu>
                </div>
            </div>
        </div>
    </div>
</template>
