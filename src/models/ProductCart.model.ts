import type Product from "./Product.model";

export default interface ProductCart extends Product {
    quantity: number;
}