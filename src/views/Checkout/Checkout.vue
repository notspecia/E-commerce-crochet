<script setup lang="ts">
import { requiredField } from '../../utils/utils';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../../stores/cart';
import { useUserStore } from '../../stores/user';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';


/* CART and USER STORE PINIA STATES */
const cartStore = useCartStore();
const userStore = useUserStore();
// const orderStore = useOrderStore();


/* SCHEMA YUP VALIDATION, using function util for custom require message */
const schema = yup.object({
    email: yup.string()
        .trim()
        .email('Devi inserire una email valida')
        .required(requiredField('email')),
    name: yup.string()
        .trim()
        .required(requiredField('nome')),
    surname: yup.string()
        .trim()
        .required(requiredField('cognome')),
    address: yup.string()
        .trim()
        .required(requiredField('indirizzo')),
    zip: yup.string()
        .trim()
        .required(requiredField('CAP')),
    city: yup.string()
        .trim()
        .required(requiredField('città')),
    province: yup.string()
        .trim()
        .required(requiredField('provincia')),
    phone: yup.string()
        .trim()
        .required(requiredField('telefono')),
});


// VeeValidate form TO DO REWORK
const {
    handleSubmit,
    errors
} = useForm({
    validationSchema: schema,
    initialValues: {
        email: userStore.stateUser.user?.email || '',
    }
});
// campi singoli
const { value: email } = useField('email');
const { value: name } = useField('name');
const { value: surname } = useField('surname');
const { value: address } = useField('address');
const { value: zip } = useField('zip');
const { value: city } = useField('city');
const { value: province } = useField('province');
const { value: phone } = useField('phone');


/* FUNCTIONS */
// Submit ordine
const onSubmit = handleSubmit(values => {
    console.log('Form values:', values);
    // Salva dati ordine nello store
    // orderStore.setProducts(
    //     cartStore.productsCart.map(p => ({ id: p.id, quantity: p.quantity }))
    // );
    // orderStore.setShippingInfo(values);

    // Qui puoi chiamare la tua API per creare l'ordine e avviare Stripe
    // Esempio: await createOrder(orderStore.products, orderStore.shipping_info)
    // ...
});
</script>


<template>
    <section class="checkout">
        <!-- banner top 100% width -->
        <h2 class="banner-checkout text-center py-2">
            Checkout
            <RouterLink to="/">
                <img src="/images/logos/giogi-mascotte-logo.png" alt="logo sito" class="logo">
            </RouterLink>
        </h2>

        <div class="row gx-5 pb-5">
            <!-- LEFT COL: shipping datas -->
            <!-- Disclaimer unico -->
            <!-- <div id="privacyHint" class="form-text hint mb-3">
                    I tuoi dati sono protetti e non saranno condivisi con nessuno.
                </div> -->
            <div class="col-lg-8">
                <form class="w-100 px-1" @submit.prevent="onSubmit">
                    <!-- Contacts -->
                    <h3 class="fs-2 mb-4 fw-bold">Contact Information</h3>
                    <div class="form-floating mb-4">
                        <input type="email" id="email" v-model="email" class="form-control" placeholder="Email"
                            required />
                        <label for="email">Email</label>
                        <span class="text-danger">{{ errors.email }}</span>
                    </div>

                    <!-- Shipping datas -->
                    <h3 class="fs-2 fw-bold mb-4 mt-5">Where's this order going?</h3>
                    <!-- Nome + Cognome (using flex for spacing the fields) -->
                    <div class="d-flex gap-2 gap-lg-4 mb-4">
                        <div class="flex-fill form-floating">
                            <input type="text" id="name" v-model="name" class="form-control" placeholder="Nome" />
                            <label for="name">Nome</label>
                            <span class="text-danger">{{ errors.name }}</span>
                        </div>
                        <div class="flex-fill form-floating">
                            <input type="text" id="surname" v-model="surname" class="form-control"
                                placeholder="Cognome" />
                            <label for="surname">Cognome</label>
                            <span class="text-danger">{{ errors.surname }}</span>
                        </div>
                    </div>
                    <!-- ADRESS -->
                    <div class="form-floating mb-4">
                        <input type="text" id="address" v-model="address" class="form-control"
                            placeholder="Indirizzo" />
                        <label for="address">Indirizzo</label>
                        <span class="text-danger">{{ errors.address }}</span>
                    </div>
                    <!-- CITY + CAP + PROVINCE -->
                    <div class="d-flex gap-2 gap-lg-5 mb-4">
                        <div class="flex-fill form-floating">
                            <input type="text" id="city" v-model="city" class="form-control" placeholder="Città" />
                            <label for="city">Città</label>
                            <span class="text-danger">{{ errors.city }}</span>
                        </div>
                        <div class="flex-fill form-floating">
                            <input type="number" id="zip" v-model="zip" class="form-control" placeholder="CAP" />
                            <label for="zip">CAP</label>
                            <span class="text-danger">{{ errors.zip }}</span>
                        </div>
                        <div class="flex-fill form-floating">
                            <input type="text" id="province" v-model="province" class="form-control"
                                placeholder="Provincia" />
                            <label for="province">Provincia</label>
                            <span class="text-danger">{{ errors.province }}</span>
                        </div>
                    </div>
                    <!-- TEL -->
                    <div class="form-floating">
                        <input type="tel" id="phone" v-model="phone" class="form-control" placeholder="Telefono"
                            aria-describedby="phoneHelpBlock" />
                        <label for="phone">Telefono</label>
                        <span class="text-danger">{{ errors.phone }}</span>
                        <div id="phoneHelpBlock" class="form-text w-75">
                            Il numero di telefono è necessario per eventuali comunicazioni riguardanti la consegna.
                            Assicurati che sia corretto e raggiungibile.
                        </div>
                    </div>

                    <!-- Gift option checkbox -->
                </form>
            </div>

            <!-- RIGHT COL: review order -->
            <div class="col-lg-4 mt-5 mt-lg-0">
                <div class="cart-summary">
                    <h4>Riepilogo ordine ({{ cartStore.cartCount }})</h4>
                    <ul class="list-group mb-3">
                        <li v-for="prod in cartStore.productsCart" :key="prod.id"
                            class="list-group-item d-flex justify-content-between align-items-center">
                            <span>{{ prod.title }} x{{ prod.quantity }}</span>
                            <strong>€{{ prod.price * prod.quantity }}</strong>
                        </li>
                    </ul>
                    <div class="summary-totals">
                        <div>Subtotale: €{{ cartStore.cartSubtotal }}</div>
                        <div>Spedizione: €{{ cartStore.shippingCost }}</div>
                        <div>IVA (9%): €{{ cartStore.tax }}</div>
                        <div class="fw-bold mt-2">Totale: €{{ cartStore.cartTotal }}</div>
                    </div>
                    <button class="btn btn-one mt-3 w-100" @click="onSubmit">Pagamento</button>
                </div>
            </div>
        </div>

    </section>
</template>



<style scoped lang="scss">
// render the banner checkout full width instead of container width boostrap
.banner-checkout {
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
    background-color: $color-primary;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    padding: 1rem;
    border-top: none;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    margin-bottom: 7rem;

    img {
        width: 60px;
    }
}

.hint {
    font-size: 1rem;
    color: $color-gray-500;
}

.form-control {
    border: 2px solid $color-gray-900;
}

.cart-summary {
    padding: 1rem;
    color: $color-black;
    background-color: $color-gray-100;
    border: 2px solid $color-gray-800;
    border-radius: 10px;
    box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.1);
}
</style>