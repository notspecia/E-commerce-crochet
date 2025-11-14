import type ProductSelected from "./ProductSelected.model";

export default interface Order {
    id: number,
    documentId: string,
    createdAt: string,
    updatedAt: string,
    stripeId: string, // ID dell'ordine in Stripe
    amount_total_cents: number,
    products: ProductSelected[],
    userId: number,
}