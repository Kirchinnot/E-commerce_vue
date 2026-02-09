<script setup>
import { useRouter } from "vue-router";
import { formatPrice } from "@/utils/format.js";

const router = useRouter();
//Le parents "ProductsView" doit lui envoyer des doonnées. Donc il faut  : déclarer le props au niveau de l'enfant
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["add-to-cart"]); //Déclaration du nom de l'emit permettant d'ajouter au panier (au niveau de l'enfant)

function add() {
  //Fonction permettant l'ajout
  emit("add-to-cart", props.product);
}

//Lorsqu'on click sur le button "Voir détails", ça doit mené vers un autre composants. D'où l'importation de useRoute
function goToDetails() {
  router.push(`/products-details/${props.product.id}`);
}
</script>

<template>
  <!-- product.thumbnail, product.title... (est l'utilisation du props au niveau de l'enfant)  -->
  <div class="card">
    <img :src="product.thumbnail" :alt="product.title" />

    <h3>{{ product.title }}</h3>

    <p class="price">{{ formatPrice(product.price) }} $</p>

    <p class="rating">⭐ {{ product.rating }}</p>

    <div class="actions">
      <button class="btn-details" @click="goToDetails">Voir détails</button>
      <!-- @click="add", permet de déclencher l'évenement/emit de l'ajout au panier -->
      <button class="btn-add" @click="add">Ajouter au panier</button>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Carte produit */
.card {
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  padding: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

/* Image produit */
.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}

/* Titre */
.card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  text-align: center;
}

/* Prix */
.card .price {
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
  text-align: center;
}

/* Note */
.card .rating {
  color: #f59e0b; /* doré */
  margin-bottom: 1rem;
  text-align: center;
}

/* Boutons */
.actions {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.actions button {
  flex: 1;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.btn-details {
  background-color: #e5e7eb;
  color: #1f2937;
}

.btn-details:hover {
  background-color: #d1d5db;
  transform: translateY(-2px);
}

.btn-add {
  background-color: #3b82f6;
  color: #fff;
}

.btn-add:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

</style>
