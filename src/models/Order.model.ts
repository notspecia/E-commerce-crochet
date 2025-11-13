import type ProductSelected from "./ProductSelected.model";

export default interface Order {
    stripeId: string, // ID dell'ordine in Stripe
    amountTotalCents: number,
    products: ProductSelected[],
    userId: number,
}