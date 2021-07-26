<template>
  <div class="card_search">
    <div class="nav_btn">
      <button>
        <router-link class="link" to="/formproduct"
          >Add New Product</router-link
        >
      </button>
    </div>
    <div class="nav:search">
      <form @submit.prevent="onSubmit">
        <input
          type="search"
          name="search"
          placeholder="Type product for search"
          v-model="form.search"
        />
        <input type="submit" value="Search" />
      </form>
      <div class="nav_btn2">
        <button @click="productStore.productList">List Product</button>
      </div>
    </div>
  </div>

  <section class="personas">
    <div class="contenedor">
        <article v-for="product in productStore.getters.products.data"
           v-bind:key="product?._id"
        class="persona__columna">
        <span class="container_edit">
            <img class="img_opt" src="@/assets/edit.png" alt="" @click.prevent="editProduct(product)" />
             <img class="img_opt" src="@/assets/delete.png" alt="" @click.prevent="productStore.deleteProduct(product?._id || '')"/>
          </span>
         
        <div class="container_data">
          <strong> {{ product?.name }}</strong>
          <strong> $ {{ product?.price }}</strong>
          <img class="card__start" src="@/assets/starts.png" alt="" />
          <span>{{ product?.description }}</span>
        </div>
        <img
          v-bind:src="apiStorage + product?.image"
          class="card__image"
          alt="image"
        />
          
        </article>
      
        
    </div>
    </section>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import productStore from "@/stores/product";
import config from "@/config/config";
import router from "@/router";
// import Pagination from "vue-pagination-2";

export default defineComponent({
  /* components: {
    Pagination,
  },*/
  setup() {
    const apiStorage = `${config.API_CDN}/images/`
    let page = 1
    productStore.productList(10, 0)
    //  onMounted()
    const myCallback = () => {
      page++;
    };
    const form = reactive({
      search: "",
    });
    const editProduct = (product: any) => {
      productStore.getProduct(product)
      router.push(`/formProduct`)
    };
    const onSubmit = () => {
      productStore.productList(10, 0, form.search)
    };

    return {
      form,
      productStore,
      onSubmit,
      apiStorage,
      myCallback,
      page,
      editProduct,
    };
  },
});
</script>
<style>

.container_edit{
  display: flex;
  margin: 5px;
  max-width: 10%;
}

.img_opt{
  margin: 5px;
}

.img_opt:hover{
  
  cursor: pointer;
  background: #3f87a6;
  border-radius: 200px 200px 200px 200px;
-moz-border-radius: 200px 200px 200px 200px;
-webkit-border-radius: 200px 200px 200px 200px;
border: 2px solid #ccb3cc;
}
.card_search{
  margin-left: 470px;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px 0;
  max-width: 400px;
  background: #3f87a6;
  border-radius: 100px 100px 100px 100px;
-moz-border-radius: 100px 100px 100px 100px;
-webkit-border-radius: 100px 100px 100px 100px;
border: 2px solid #ccb3cc;
}
.link{
  text-decoration: none;
}
.nav_btn{
  margin-bottom: 10px;
}
.nav_btn2{
  margin-top: 10px;
}
.contenedor{ 
  width:100%;
  margin: auto;
}
img{
    width: 100%;
}
.persona__columna{
    margin: 3px; 
    border-radius: 36px 36px 36px 36px;
-moz-border-radius: 36px 36px 36px 36px;
-webkit-border-radius: 36px 36px 36px 36px;
border: 2px solid #ccb3cc;
background:  radial-gradient(#f69d3c, #3f87a6);
}
.personas .contenedor{
    display: grid;
    }
.container_data{
  display: flex;
  flex-direction: column;
  align-content: space-around;
  align-items: center;
}

.card__start{
  max-width: 100px;
}

@media(min-width:520px){
    .personas .contenedor{     
  grid-template-columns: repeat(2,50%);
    }
}
@media(min-width:728px){
   .personas .contenedor{
  grid-template-columns: repeat(3,33.3%);
    }
}
@media(min-width:1024px){
   .personas .contenedor{
    
  grid-template-columns: repeat(4,25%);
    }
    .contenedor{
         width: 1024px;
    }
}
@media(min-width:1200px){
    .contenedor{
         width: 1200px;
    }
}
</style>

