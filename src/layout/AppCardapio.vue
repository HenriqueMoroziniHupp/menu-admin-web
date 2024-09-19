<script setup>
import { useLayout } from '@/layout/composables/layout'
import { computed, ref, watch } from 'vue'
import AppFooter from './AppFooter.vue'
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'

const { layoutConfig, layoutState, isSidebarActive, resetMenu } = useLayout()

const outsideClickListener = ref(null)

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener()
    } else {
        unbindOutsideClickListener()
    }
})

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive
    }
})
const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                resetMenu()
            }
        }
        document.addEventListener('click', outsideClickListener.value)
    }
}
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener)
        outsideClickListener.value = null
    }
}
const isOutsideClicked = (event) => {
    const sidebarEl = document.querySelector('.layout-sidebar')
    const topbarEl = document.querySelector('.layout-menu-button')

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target))
}
</script>

<template>
    <div class="layout-wrapper select-none" :class="containerClass">
        <!-- <app-topbar></app-topbar> -->
        <app-sidebar></app-sidebar>
        <div class="layout-cardapio-container">
            <div class="layout-cardapio">
                <!-- <router-view v-slot="{ Component }">
                    <transition mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view> -->
                <router-view></router-view>
            </div>
            <app-footer></app-footer>
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div>
    <Toast />
</template>

<style lang="scss" scoped>

.layout-cardapio-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
    padding: 0;
    transition: margin-left var(--layout-section-transition-duration);
}

.layout-cardapio {
    flex: 1 1 auto;
    padding-bottom: 2rem;
}


</style>
