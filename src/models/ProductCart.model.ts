export default interface ProductCart {
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
    quantity: number, // quantity added to cart products model
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