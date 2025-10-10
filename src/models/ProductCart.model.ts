import type Product from "./Product.model";

// product interface model + quantity of the product selected 
export default interface ProductCart extends Product {
    quantity: number;
}