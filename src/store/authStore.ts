import { API } from '@/settings/axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore(
    'auth',
    () => {
        const authToken = ref<string>('')

        const setToken = (token: string) => {
            (authToken.value = token)
            API.defaults.headers.common.Authorization = `Bearer ${token}`
        }

        const isAuthenticated = computed(() => !!authToken.value)

        const $reset = () => {
            authToken.value = ''
        }

        return { authToken, setToken, isAuthenticated, $reset }
    },
    {
        persist: {
            storage: sessionStorage
        }
    }
)
