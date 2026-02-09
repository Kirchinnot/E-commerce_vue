<script setup>
import { ref, onMounted, computed } from "vue";
import ProductCard from "../components/ProductCard.vue";

//Importation du lien a fetché
const url = "https://dummyjson.com/products";

const products = ref([]); //Tableau qui va contenir nos données importer de data
const search = ref("");
const loading = ref(true); //Constaante qui définit l'état de la page
const error = ref(null); //Constante d'erreur (définit l'erreur à afficher en cas d'échec du chargement de la page)

//Importation des produits à partir de l'url
onMounted(async () => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    // console.log(data); //Vérification de data dans la console
    products.value = data.products; //Mettre le contenu du data dans notre tableau réactif(products)
  } catch (err) {
    error.value = "Erreur lors du chargement des produits";
  } finally {
    loading.value = false;
  }
});

const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.title.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<template>
  <div class="products-page">
    <h1>Nos produits</h1>

    <input
      v-model="search"
      type="text"
      placeholder="Rechercher un produit..."
      class="search-input"
    />

    <p v-if="loading" class="info">Chargement...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div class="products-grid">
      <!-- Le v-for permet un affichage dynamique -->
      <!-- :product="product" (est le passage du props au niveau du parent) -->
      <!-- @add-to-cart="$emit('add-to-cart', $event)" (permet d'écouter l'événement/emit au niveau du parent) -->
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="$emit('add-to-cart', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
/* Container principal */
.products-page {
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 1rem;
  font-family: 'Inter', sans-serif;
}

/* Titre */
.products-page h1 {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1f2937;
}

/* Input recherche */
.search-input {
  width: 100%;
  max-width: 400px;
  display: block;
  margin: 0 auto 2rem auto;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Grille de produits */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

/* Messages info / erreur */
.info {
  text-align: center;
  color: #4b5563;
  margin-bottom: 1rem;
}

.error {
  text-align: center;
  color: #ef4444; /* rouge vif */
  margin-bottom: 1rem;
}

</style>
