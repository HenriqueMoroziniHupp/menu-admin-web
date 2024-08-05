import User from '@/service/User'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user',() => {
        const user = ref()

        const getUser = async () => {
            const response = await User.getLoggedAccount()

            user.value = response.data
        }

        return { user, getUser }
    },
    {
        persist: {
            storage: sessionStorage
        }
    }
)
