import { createRouter, createWebHistory } from 'vue-router'

// import pages routes of the application
import Home from '@/views/Home/Home.vue';
import Products from '@/views/Products/Products.vue';
import DetailProduct from '@/views/DetailProduct/DetailProduct.vue';
import Orders from '@/views/Orders/Orders.vue';
// import DetailOrder from '@/views/DetailOrder/DetailOrder.vue';
// import Checkout from '@/views/Checkout/Checkout.vue';
import FAQ from '@/views/FAQ/FAQ.vue';
import Contacts from '@/views/Contacts/Contacts.vue';
import Login from '@/views/Login/Login.vue';
import Register from '@/views/Register/Register.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy/PrivacyPolicy.vue';
import SuccessPayment from '@/views/SuccessPayment/SuccessPayment.vue';


// define the routes for the application + components to render
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/products',
        name: 'products',
        component: Products
    },
    {
        path: '/products/:documentId',
        name: 'ProductDetail',
        component: DetailProduct,
    },
    {
        path: '/orders',
        name: 'orders',
        component: Orders
    },
    {
        path: '/success-payment',
        name: 'success-payment',
        component: SuccessPayment
    },
    // {
    //     path: '/orders/:documentId',
    //     name: 'OrderDetail',
    //     component: DetailOrder
    // },
    {
        path: '/FAQ',
        name: 'FAQ',
        component: FAQ
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: Contacts
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/privacy-policy',
        name: 'privacy-policy',
        component: PrivacyPolicy
    },
]

// export the router instance with the defined routes and history mode into the main.ts to use it in the application
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;