export const MAX_RESULTS = 10;
export const API_BASE_URL = "http://localhost:1337"; // Base URL for the API, change as needed from localhost to production URL
// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Array of supported languages with their codes, labels, and flag image paths
export const languages = [
    { code: 'it', label: 'Italiano', flag: 'flags/it.svg' },
    { code: 'en', label: 'English', flag: 'flags/en.svg' },
    { code: 'fr', label: 'Français', flag: 'flags/fr.svg' },
    { code: 'es', label: 'Español', flag: 'flags/es.svg' },
    { code: 'de', label: 'Deutsch', flag: 'flags/de.svg' },
];

// Array of platforms social links and icons
export const platforms = [
    { id: 'facebook', name: 'Facebook', url: 'https://www.facebook.com/tuapagina', icon: 'bi-facebook' },
    { id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/tuapagina', icon: 'bi-instagram' },
    { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/tuacanale', icon: 'bi-youtube' },
    { id: 'vinted', name: 'Vinted', url: 'https://www.vinted.it', icon: 'bi-bag' } // fallback per Vinted
];