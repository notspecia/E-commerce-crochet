export default interface Product {
    id: number,
    documentId: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    title: string,
    price: number,
    width: number,
    height: number,
    description: string,
    keychain: boolean,
    avaible: boolean,
    images: {
        documentId: string,
        url: string,
        alternativeText: string,
        formats: {
            thumbnail: {
            }
        },
    }[]
}