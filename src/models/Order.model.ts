import type ProductSelected from "./ProductSelected.model";
import type Shipping from "./Shipping.model";

export default interface Order {
    id: number,
    documentId: string,
    createdAt: string,
    updatedAt: string,
    status_order: string,
    stripeId: string, // ID dell'ordine in Stripe
    amount_total_cents: number,
    products: ProductSelected[],
    shipping_address: Shipping, // dati di spedizione utente
    phone_number: string,
    customer_email: string,
    userId: number,
}