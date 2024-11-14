import { computed } from "vue";
import { useUserStore } from "@/store/userStore";

const { slug } = useUserStore()

export function useUtils() {
    const menuURL = computed(() => `https://${slug}.upzini.shop`)
    const menuSimpleURL = computed(() => `${slug}.upzini.shop`)

    return { menuURL, menuSimpleURL }
}
