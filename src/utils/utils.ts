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