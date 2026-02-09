<script setup>
defineProps({
  cartCount: Number,
});
</script>

<template>
  <nav class="nav">
    <router-link to="/" class="logo">MyShop</router-link>

    <div class="links">
      <router-link to="/">Accueil</router-link>
      <router-link to="/products">Produits</router-link>
      <router-link to="/cart" class="cart">
        Panier
        <span v-if="cartCount" class="badge">
          {{ cartCount }}
        </span>
      </router-link>
    </div>
  </nav>
</template>


<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.nav {
  position: sticky;
  top: 0;
  z-index: 1000;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 32px;

  background: rgba(2, 6, 23, 0.85);
  backdrop-filter: blur(10px);

  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.logo {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #f8fafc;
  text-decoration: none;
}

.links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.links a {
  position: relative;
  text-decoration: none;
  font-weight: 500;
  color: #cbd5f5;

  transition: color 0.2s ease;
}

.links a:hover {
  color: #ffffff;
}

/* Lien actif */
.router-link-active {
  color: #ffffff;
}

.router-link-active::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;

  width: 100%;
  height: 2px;

  background: linear-gradient(
    90deg,
    #6366f1,
    #4f46e5
  );
}

/* Panier */
.cart {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Badge panier */
.badge {
  background: linear-gradient(
    135deg,
    #6366f1,
    #4f46e5
  );
  color: white;

  font-size: 0.75rem;
  font-weight: 600;

  padding: 3px 8px;
  border-radius: 999px;

  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.4);
}

</style>
