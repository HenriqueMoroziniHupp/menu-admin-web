import User from '@/service/User'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface IUser {
    id: number,
	slug: string,
	email: string,
	name: string
	role: string
	rememberMeToken: boolean | null
}

export const useUserStore = defineStore('user', () => {
        const user = ref<IUser>()

        const getUser = async () => {
            const response = await User.getLoggedAccount()

            user.value = response.data
        }

        const getSlug = computed(() => user.value.slug)

        function $reset() {
            user.value = null
        }

        return { user, getUser, getSlug, $reset }
    },
    {
        persist: {
            storage: sessionStorage
        }
    }
)
