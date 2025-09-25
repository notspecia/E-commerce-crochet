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