import { getActivePinia } from "pinia";

// map through that list and use the **$reset** fn to reset the state
export const useResetStore = () => {
    getActivePinia()._s.forEach(store => store.$reset());
}
