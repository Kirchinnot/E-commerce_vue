<script setup>
import Navbar from "./components/Navbar.vue";

//"reactive" ne fonctionne que sur les objets, modifiant les données directement.
import { reactive, computed, watch } from "vue";

//Déclaration du panier
const cart = reactive(JSON.parse(localStorage.getItem("cart")) || []);

//Ajouter au panier
function addToCart(product) {
  // Déclaration d'une constance "existing" qui dit : <<Trouve la carte dont l'id du paramètre "item" est égal à l'id du paramètre "product">>
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity++; //Si elle existe, incrémente sa quantité de +1
  } else {
    cart.push({
      //Sinon, ajoute le au panier en mettant sa quantité à 1
      ...product,
      quantity: 1,
    });
  }
}

//Supprimer du panier
function removeFromCart(id) {
  //Déclaration d'une constance "index" qui dit : <<Trouve l'index dont l'id du paramètre "item" est égal à l'id du paramètre "id">>
  const index = cart.findIndex((item) => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1); //Si l'index trouvé est différent de -1, c'est-à-dire le dernier élément ; recopie une partie du panier en commençant par cet index et en prenant un élément à la fois
  }
}

function resetCart() {
  cart.splice(0);
  localStorage.removeItem("cart");
}

const cartCount = computed(() =>
  cart.reduce((sum, item) => sum + item.quantity, 0),
);

watch(
  cart,
  (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  },
  { deep: true },
);

function decreaseQuantity(id) {
  const item = cart.find((p) => p.id === id);

  if (!item) return;

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    const index = cart.findIndex((p) => p.id === id);
    cart.splice(index, 1);
  }
}
</script>

<template>
  <Navbar :cartCount="cartCount" />
  <main>
    <router-view
      :cart="cart"
      @add-to-cart="addToCart"
      @remove-from-cart="removeFromCart"
      @decrease-quantity="decreaseQuantity"
      @payment-success="resetCart"
    />
  </main>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
