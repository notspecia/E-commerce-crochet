export default interface Review {
    titleProduct: string,
    productDocumentId: string, // identificativo per fare la get filter delle review con quel documentId prodotto
    email: string,
    rating: number,
    comment: string,
    originLang: string,
    publishedAt: string,
    approved: boolean
}   