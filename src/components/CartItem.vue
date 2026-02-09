<script setup>
import { formatPrice } from '@/utils/format.js';

//Le parents "CartView" doit lui envoyer des doonnées. Donc il faut  : déclarer le props au niveau de l'enfant
defineProps({
  item: Object,
});

const emit = defineEmits(["remove", "decrease", "increase"]); //Déclaration du nom de l'événement/emit permet de supprimer un produit du panier
</script>

<template>
  <!-- item.thumbnail, item.title... (est l'utilisation du props au niveau de l'enfant)  -->
  <div class="cart-item">
    <img :src="item.thumbnail" width="80" />
    <div class="cart-item">
      <p><strong>{{ formatPrice(item.price) }} $</strong> x {{ item.quantity }}</p>
      <p>{{ item.title }}</p>
      <div class="qty">
        <button class="qty-btn minus" @click="emit('decrease')">−</button>

        <span class="qty-value">{{ item.quantity }}</span>

        <button class="qty-btn plus" @click="emit('increase')">+</button>
      </div>
    </div>

    <!-- Déclenchement de l'emit -->
    <button @click="emit('remove')" class="btn-remove">Supprimer</button>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1rem;
}

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.details .title {
  font-weight: 600;
  color: #1f2937;
}

.details .price {
  font-weight: 500;
  color: #4b5563;
}

.btn-remove {
  background-color: #ef4444;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.btn-remove:hover {
  background-color: #b91c1c;
  transform: translateY(-1px);
}

.qty {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Boutons + / - */
.qty-btn {
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  border: none;

  font-size: 1.2rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

/* Bouton - */
.qty-btn.minus {
  background: #e5e7eb;
  color: #020617;
}

.qty-btn.minus:hover {
  background: #d1d5db;
}

/* Bouton + */
.qty-btn.plus {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;

  box-shadow: 0 6px 14px rgba(79, 70, 229, 0.35);
}

.qty-btn.plus:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(79, 70, 229, 0.45);
}

/* Valeur quantité */
.qty-value {
  min-width: 28px;
  text-align: center;

  font-weight: 600;
  font-size: 1rem;

  color: #020617;
}
</style>
