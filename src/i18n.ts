// file configuration for i18n whit langugaes JSON
import { createI18n } from 'vue-i18n';
import { it } from './locales/it.json';
import { en } from './locales/en.json';
// import { fr } from './locales/fr.json';
// import { es } from './locales/es.json';
// import { de } from './locales/de.json';


// creazione dell'istanza di i18n
export const i18n = createI18n({
    legacy: false,
    locale: 'it', // lingua predefinita
    fallbackLocale: 'en', // lingua di fallback
    // messaggi delle lingue presi dai file JSON
    messages: {
        it,
        en,
        // fr,
        // es,
        // de
    }
});