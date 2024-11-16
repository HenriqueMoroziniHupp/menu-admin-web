<script setup lang="ts">
import FloatingConfigurator from '@/components/FloatingConfigurator.vue'
import API from '@/service/AuthService'
import { useAuthStore } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const hasError = ref(false)

const onSubmit = async () => {
    try {
        loading.value = true
        hasError.value = false
        const data = { email: email.value, password: password.value }
        const response = await API.postAuth(data)
        if (response.data.token) authStore.setToken(response.data.token)

        await userStore.getUser()

        router.push({ name: 'dashboard' })
    } catch (error) {
        showErrorMessage()
    } finally {
        loading.value = false
    }
}

const showErrorMessage = () => {
    hasError.value = true;

    setTimeout(() => {
        hasError.value = false;
    }, 5500);
}

</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-8 px-8 sm:py-20 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <Image src="/pwa-192x192.png" alt="Logo" width="96" class="mb-8 flex justify-center"/>
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to MenuZini!</div>
                        <span class="text-muted-color font-medium">Sign in to continue</span>
                    </div>
                    <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText required id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                        </div>
                        <div class="relative">
                            <Button label="Sign In" class="w-full" @click="onSubmit" :loading></Button>
                            <Message v-if="hasError" severity="error" :life="50000" class="mt-4 absolute w-full flex justify-center">Email ou senha invalidos</Message>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}


.form-error-enter-active,
.form-error-leave-active {
  transition: all 0.3s ease;
}

.form-error-enter-to,
.form-error-leave-from {
  height: 32px;
}

.form-error-leave-to,
.form-error-enter-from {
  height: 15px;
}
</style>
