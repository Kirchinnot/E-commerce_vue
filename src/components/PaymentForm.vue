<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  cart: Array,
});

const emit = defineEmits(["payment-success"]);

const name = ref("");
const card = ref("");
const expiry = ref("");
const cvv = ref("");
const message = ref("");

function pay() {
  if (!name.value || !card.value || !expiry.value || !cvv.value) {
    message.value = "Veuillez remplir tous les champs";
    return;
  }

  if (props.cart.length === 0) {
    message.value = "Panier vide";
    return;
  }

  //Validation carte (alphanumérique uniquement)
  const cardRegex = /^[0-9]+$/;

  if (!cardRegex.test(card.value)) {
    message.value = "Le numéro de la carte doit être uniquement des chiffres";
    return;
  }

  const nameRegex = /^[a-zA-Z0-9]+$/;

  if (!nameRegex.test(name.value)) {
    message.value = "Le nom ne doit pas contenir des caractères spéciaux";
    return;
  }

  const cvvRegex = /^[a-zA-Z0-9]+$/;

  if (!cvvRegex.test(cvv.value)) {
    message.value = "Le cvv ne doit pas contenir des caractères spéciaux";
    return;
  }

  message.value = "✅ Paiement effectué avec succès";

  name.value = card.value = expiry.value = cvv.value = "";
  //Redirection après 2 seconde
  setTimeout(() => {
    emit("payment-success");
    router.push("/products");
  }, 2000);
}
</script>

<template>
  <div class="payment">
    <h2>Paiement sécurisé</h2>

    <input v-model="name" placeholder="Nom du client" class="input-field" />
    <input v-model="card" placeholder="Numéro de carte" class="input-field" />

    <div class="input-row">
      <input
        v-model="expiry"
        type="date"
        placeholder="Date d'expiration"
        class="input-field"
      />
      <input v-model="cvv" placeholder="CVV" class="input-field" />
    </div>

    <button @click="pay" class="btn-pay">Payer</button>

    <p class="message">{{ message }}</p>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Container principal */
.payment {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border: 1px solid #e0e0e0;
  font-family: "Inter", sans-serif;
}

/* Titre */
.payment h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937; /* gris foncé */
  margin-bottom: 1.5rem;
}

/* Champs input */
.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #cbd5e1; /* gris clair */
  border-radius: 12px;
  outline: none;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: #3b82f6; /* bleu vif */
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Ligne pour expiry + CVV */
.input-row {
  display: flex;
  gap: 1rem;
}

/* Bouton */
.btn-pay {
  width: 100%;
  padding: 0.85rem;
  background-color: #3b82f6;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.btn-pay:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

/* Message */
.message {
  margin-top: 1rem;
  text-align: center;
  color: #4b5563; /* gris moyen */
  font-size: 0.95rem;
}
</style>
