<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const product = ref(null);
const loading = ref(true);
const error = ref(null);

const emit = defineEmits(["add-to-cart"]);

onMounted(async () => {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/${route.params.id}`
    );
    product.value = await res.json();
  } catch (e) {
    error.value = "Produit introuvable";
  } finally {
    loading.value = false;
  }
});

function add() {
  emit("add-to-cart", product.value);
}

function goBack() {
  router.push("/products");
}
</script>

<template>
  <div class="product-page">
    <p v-if="loading" class="status">Chargement...</p>
    <p v-if="error" class="status error">{{ error }}</p>

    <div v-if="product" class="product-card">
      <!-- Galerie -->
      <div class="gallery">
        <img
          v-for="img in product.images"
          :key="img"
          :src="img"
          alt="Produit"
        />
      </div>

      <!-- Infos -->
      <div class="info">
        <h1>{{ product.title }}</h1>

        <p class="description">{{ product.description }}</p>

        <div class="price-box">
          <span class="price">{{ product.price }} $</span>
          <span class="discount">
            -{{ product.discountPercentage }} %
          </span>
        </div>

        <p class="rating">⭐ {{ product.rating }}</p>

        <ul class="meta">
          <li><strong>Marque :</strong> {{ product.brand }}</li>
          <li><strong>Catégorie :</strong> {{ product.category }}</li>
          <li><strong>Stock :</strong> {{ product.stock }}</li>
        </ul>

        <div class="actions">
          <button class="primary" @click="add">
            Ajouter au panier
          </button>
          <button class="secondary" @click="goBack">
            Retour aux produits
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.product-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #020617;
}

/* Status */
.status {
  text-align: center;
  font-size: 1.1rem;
}

.error {
  color: #dc2626;
}

/* Carte produit */
.product-card {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 40px;

  background: #ffffff;
  border-radius: 16px;
  padding: 32px;

  box-shadow:
    0 10px 40px rgba(2, 6, 23, 0.1);
}

/* Galerie */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 14px;
}

.gallery img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;

  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.gallery img:hover {
  transform: scale(1.05);
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Infos */
.info h1 {
  font-size: 2rem;
  margin-bottom: 12px;
}

.description {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 20px;
}

/* Prix */
.price-box {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.price {
  font-size: 1.8rem;
  font-weight: 700;
  color: #020617;
}

.discount {
  background: #dc2626;
  color: white;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.rating {
  margin-bottom: 16px;
  font-size: 1rem;
}

/* Meta infos */
.meta {
  list-style: none;
  padding: 0;
  margin-bottom: 28px;
}

.meta li {
  margin-bottom: 6px;
  color: #334155;
}

/* Actions */
.actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

button {
  padding: 14px 28px;
  border-radius: 999px;
  font-weight: 600;
  border: none;
  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

button.primary {
  background: linear-gradient(
    135deg,
    #6366f1,
    #4f46e5
  );
  color: white;

  box-shadow:
    0 10px 25px rgba(79, 70, 229, 0.35);
}

button.primary:hover {
  transform: translateY(-2px);
  box-shadow:
    0 18px 40px rgba(79, 70, 229, 0.45);
}

button.secondary {
  background: #e5e7eb;
  color: #020617;
}

button.secondary:hover {
  background: #d1d5db;
}

/* Responsive */
@media (max-width: 900px) {
  .product-card {
    grid-template-columns: 1fr;
  }
}

</style>

