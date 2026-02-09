<script setup>
import { computed, ref } from "vue";
import CartItem from "../components/CartItem.vue";
import PaymentForm from "../components/PaymentForm.vue";
import { formatPrice } from "@/utils/format.js";

const props = defineProps({
  cart: Array,
});

const emit = defineEmits(["remove-from-cart", "payment-success", "decrease-quantity", "add-to-cart"]);

const showPaymentForm = ref(false);

//Ici, la constante "total" qui contient une fonction permet de calculer la somme totale des produits ajouter au panier
const total = computed(() =>
  props.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

function validatePayment() {
  showPaymentForm.value = true;
}
</script>

<template>
  <div class="cart-page">
    <h1>Panier</h1>

    <p v-if="cart.length === 0" class="empty">Panier vide</p>
    <!-- :item="item" (est le passage du props au niveau du parent) -->
    <!-- @remove="emit('remove-from-cart', item.id)" (permet d'écouter l'événement/emit au niveau du parent) -->
    <div class="cart-items">
      <CartItem
        v-for="item in cart"
        :key="item.id"
        :item="item"
        @remove="emit('remove-from-cart', item.id)"
        @decrease="emit('decrease-quantity', item.id)"
        @increase="emit('add-to-cart', item)"
      />
    </div>

    <h2 v-if="cart.length" class="total">Total : {{ formatPrice(total) }} $</h2>

    <button
      v-if="cart.length && !showPaymentForm"
      @click="validatePayment"
      class="btn-validate"
    >
      Valider mon paiement
    </button>

    <PaymentForm
      v-if="showPaymentForm"
      :cart="cart"
      @payment-success="emit('payment-success')"
    />
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cart-page {
  max-width: 900px;
  margin: 3rem auto;
  padding: 1rem;
  font-family: "Inter", sans-serif;
}

.cart-page h1 {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1f2937;
}

.empty {
  text-align: center;
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.total {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: right;
  margin-bottom: 1rem;
  color: #111827;
}

/* Bouton valider */
.btn-validate {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  background-color: #3b82f6;
  color: #fff;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.btn-validate:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}
</style>
