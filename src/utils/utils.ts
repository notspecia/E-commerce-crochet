/**
 * goTopPage
 * scrolls the page to the top smoothly
 */
export const goTopPage = (): void => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// function used for format required fields in forms
export const requiredField = (field: string): string => `${field} obbligatorio`;
