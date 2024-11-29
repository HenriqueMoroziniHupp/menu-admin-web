import { createI18n } from 'vue-i18n'
import pt from "./pt";
import en from "./en";

const locale = (() =>{
    const navigatorLocale = navigator.language || navigator.languages[0];
    const normalizedLocale = navigatorLocale.slice(0,2);

    return normalizedLocale;
})();

const i18n = createI18n({
    locale,
    fallbackLocale: 'en',
    messages: {
        pt,
        en
    }
})

export default i18n
