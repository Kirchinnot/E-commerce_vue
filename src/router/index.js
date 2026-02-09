import { createRouter, createWebHistory } from "vue-router";
//Importation des composants de components
import CartItem from "../components/CartItem.vue";
import PaymentForm from "../components/PaymentForm.vue";
import ProductCard from "../components/ProductCard.vue";

//Importation des composants de views
import CartView from "../views/CartView.vue";
import HomeView from "../views/HomeView.vue";
import ProductDetailsView from "../views/ProductDetailsView.vue";
import ProductsView from "../views/ProductsView.vue";

//Configuration des routes
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
  },
  {
    path: "/products-details/:id",
    name: "product-details",
    component: ProductDetailsView,
    props: true,
  },
  {
    path: "/payment-form/:id",
    name: "payment-form",
    component: PaymentForm,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
