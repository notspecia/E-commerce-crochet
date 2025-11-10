import { createRouter, createWebHistory } from 'vue-router'

// import pages routes of the application
import Home from '@/views/Home/Home.vue';
import Products from '@/views/Products/Products.vue';
import Detail from '@/views/Detail/Detail.vue';
import Checkout from '@/views/Checkout/Checkout.vue';
import FAQ from '@/views/FAQ/FAQ.vue';
import Contacts from '@/views/Contacts/Contacts.vue';
import Login from '@/views/Login/Login.vue';
import Register from '@/views/Register/Register.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy/PrivacyPolicy.vue';

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
        component: Detail,
    },
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
    {
        path: '/checkout',
        name: 'checkout',
        component: Checkout
    },
]

// export the router instance with the defined routes and history mode into the main.ts to use it in the application
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;