<script setup lang="ts">
import { useCartStore } from '../../stores/cart';
// import { useOrderStore } from '../../stores/order';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';


/* CART STORE PINIA STATES */
const cartStore = useCartStore();
// const orderStore = useOrderStore();


/* SCHEMA YUP VALIDATION */
const schema = yup.object({
    name: yup.string().required('Nome obbligatorio'),
    email: yup.string().email('Email non valida').required('Email obbligatoria'),
    address: yup.string().required('Indirizzo obbligatorio'),
    city: yup.string().required('Città obbligatoria'),
    zip: yup.string().required('CAP obbligatorio'),
    country: yup.string().required('Paese obbligatorio'),
});


// VeeValidate form TO DO REWORK
const { handleSubmit, errors } = useForm(
    {
        validationSchema: schema,
    }
);
const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: address } = useField('address');
const { value: city } = useField('city');
const { value: zip } = useField('zip');
const { value: country } = useField('country');


// Submit ordine
const onSubmit = handleSubmit(values => {
    // Salva dati ordine nello store
    orderStore.setProducts(
        cartStore.productsCart.map(p => ({ id: p.id, quantity: p.quantity }))
    );
    orderStore.setShippingInfo(values);

    // Qui puoi chiamare la tua API per creare l'ordine e avviare Stripe
    // Esempio: await createOrder(orderStore.products, orderStore.shipping_info)
    // ...
});
</script>

<template>
    <section class="checkout w-75 mx-auto">
        <h2 class="header text-center mb-4">Checkout</h2>

        <div class="mb-4">
            <h4>Riepilogo prodotti</h4>
            <ul>
                <li v-for="prod in cartStore.productsCart" :key="prod.id">
                    {{ prod.title }} x{{ prod.quantity }} - €{{ prod.price * prod.quantity }}
                </li>
            </ul>
            <div class="fw-bold mt-2">Totale: €{{ cartStore.cartTotal }}</div>
        </div>

        <form @submit.prevent="onSubmit" class="checkout-form">
            <h4 class="mb-3">Dati spedizione</h4>
            <div class="mb-2">
                <label>Nome</label>
                <input v-model="name" type="text" class="form-control" />
                <span class="text-danger">{{ errors.name }}</span>
            </div>
            <div class="mb-2">
                <label>Email</label>
                <input v-model="email" type="email" class="form-control" />
                <span class="text-danger">{{ errors.email }}</span>
            </div>
            <div class="mb-2">
                <label>Indirizzo</label>
                <input v-model="address" type="text" class="form-control" />
                <span class="text-danger">{{ errors.address }}</span>
            </div>
            <div class="mb-2">
                <label>Città</label>
                <input v-model="city" type="text" class="form-control" />
                <span class="text-danger">{{ errors.city }}</span>
            </div>
            <div class="mb-2">
                <label>CAP</label>
                <input v-model="zip" type="text" class="form-control" />
                <span class="text-danger">{{ errors.zip }}</span>
            </div>
            <div class="mb-2">
                <label>Paese</label>
                <input v-model="country" type="text" class="form-control" />
                <span class="text-danger">{{ errors.country }}</span>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Conferma ordine</button>
        </form>
    </section>
</template>



<style scoped lang="scss">
.checkout-form {
    max-width: 500px;
    margin: 0 auto;
}
</style>