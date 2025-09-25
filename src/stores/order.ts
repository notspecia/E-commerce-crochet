// import { defineStore } from 'pinia';
// import { type OrderProduct } from '../models/OrderProduct.model';
// import { type ShippingInfo } from '../models/ShippingInfo.model';



// export const useOrderStore = defineStore('order', {
//     state: () => ({
//         products: [] as OrderProduct[],
//         shipping_info: {} as ShippingInfo,
//     }),
//     actions: {
//         setProducts(products: OrderProduct[]) {
//             this.products = products;
//         },
//         setShippingInfo(info: ShippingInfo) {
//             this.shipping_info = info;
//         },
//         resetOrder() {
//             this.products = [];
//             this.shipping_info = {} as ShippingInfo;
//         }
//     }
// });