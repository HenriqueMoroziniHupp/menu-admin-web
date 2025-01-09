import { computed } from "vue";
import { useUserStore } from "@/store/userStore";

const { slug } = useUserStore()

export function useUtils() {
    const menuURL = computed(() => `https://${slug}.upzini.com`)
    const menuSimpleURL = computed(() => `${slug}.upzini.com`)

    return { menuURL, menuSimpleURL }
}
