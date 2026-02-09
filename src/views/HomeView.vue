<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goToProducts() {
  router.push("/products");
}
</script>

<template>
  <div class="home">
    <h1>Bienvenue sur notre boutique 🛒</h1>
    <p>Découvrez nos meilleurs produits au meilleur prix.</p>

    <button @click="goToProducts">
      Voir les produits
    </button>
  </div>
</template>

<style scoped>
.home {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  padding: 40px 20px;

  background: linear-gradient(
    135deg,
    #0f172a,
    #020617
  );

  color: #f8fafc;
}

.home h1 {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.home p {
  font-size: 1.1rem;
  max-width: 500px;
  line-height: 1.6;
  color: #cbd5f5;
  margin-bottom: 40px;
}

button {
  padding: 14px 36px;
  font-size: 1rem;
  font-weight: 600;

  border: none;
  border-radius: 999px;

  background: linear-gradient(
    135deg,
    #6366f1,
    #4f46e5
  );

  color: white;
  cursor: pointer;

  box-shadow:
    0 10px 25px rgba(79, 70, 229, 0.35);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 18px 40px rgba(79, 70, 229, 0.45);

  background: linear-gradient(
    135deg,
    #818cf8,
    #6366f1
  );
}

button:active {
  transform: translateY(0);
  box-shadow:
    0 8px 20px rgba(79, 70, 229, 0.3);
}

</style>

