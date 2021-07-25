<template>
  <ul class="cards" id="array-rendering">
    <li v-for="product in productStore.getters.products.data" v-bind:key="product?._id">
      
      <a href="" class="card">
        <!-- <img src="{{`${apiStorage}/product.image`}}" class="card__image" alt=""/> -->
        <img src="https://www.masaltos.com/imagenes/catalogo/zapatos-con-alzas-salerno_746_1_1.jpg" class="card__image" alt=""/>
        <div class="card__overlay">
          <div class="card__header">
            <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
              <path />
            </svg>
            <img
              class="card__thumb"
              src="@/assets/regalo.png"
              alt=""
            />
            <div class="card__header-text">
              <h3 class="card__title">{{product?.name}}</h3>
              <span class="card__status">$ {{product?.price}}</span>
              
            </div>
            <img
              class="card__start"
              src="@/assets/starts.png"
              alt=""
            />
          </div>
          <p class="card__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
            blanditiis?
          </p>
          <span class="img_editar" >
            <img
              src="@/assets/edit.png"
              alt=""
            />
          </span>
          <span class="img_editar" >
            <img
              src="@/assets/delete.png"
              alt=""
            />
          </span>
        </div>
      </a>
    </li>
  </ul>
</template>
<script>
import { defineComponent, reactive } from "vue";
import productStore from "@/stores/product";
import config from "@/config/config";
import numeral from "numeral";
export default defineComponent({
  
  setup() {
    const apiStorage = `${config.API_CDN}/images`
    console.log("carga producta");
    productStore.productList(10, 0);
    return { productStore, apiStorage };
  },
});
</script>
<style>
/* :root {
  --surface-color: #fff;
  --curve: 40;
} */

* {
  box-sizing: border-box;
}

body {
  font-family: "Noto Sans JP", sans-serif;
  background-color: #fef8f8;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 5vw;
  padding: 0;
  list-style-type: none;
}

.card {
  position: relative;
  display: block;
  height: 100%;
  border-radius: calc(var(--curve) * 1px);
  overflow: hidden;
  text-decoration: none;
}

.card__image {
  width: 100%;
  height: auto;
}

.card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-radius: calc(var(--curve) * 1px);
  background-color: var(--surface-color);
  transform: translateY(100%);
  transition: 0.2s ease-in-out;
}

.card:hover .card__overlay {
  transform: translateY(0);
}

.card__header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 2em;
  border-radius: calc(var(--curve) * 1px) 0 0 0;
  background-color: var(--surface-color);
  transform: translateY(-100%);
  transition: 0.2s ease-in-out;
}

.card__arc {
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 100%;
  right: 0;
  z-index: 1;
}

.card__arc path {
  fill: var(--surface-color);
  d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
}

.card:hover .card__header {
  transform: translateY(0);
}

.card__thumb {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.card__start{
  max-width: 40%;
}
.card__title {
  font-size: 1em;
  margin: 0 0 0.3em;
  color: #6a515e;
}

.card__tagline {
  display: block;
  margin: 1em 0;
  font-family: "MockFlowFont";
  font-size: 0.8em;
  color: #d7bdca;
}

.card__status {
  font-size: 0.8em;
  color: #d7bdca;
}

.card__description {
  padding: 0 2em 2em;
  margin: 0;
  color: #d7bdca;
  font-family: "MockFlowFont";
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.img_editar{
  margin: 10px;
  max-width: 10%;
}


</style>
