<template v-if="state.isLoggedIn">
  <div class="wrapper fadeInDown ">
    <div id="formContent">
      <!-- Tabs Titles -->

      <!-- Login Form -->
      <form @submit.prevent="onSubmit">
        <input
          type="text"
          class="fadeIn second"
          name="name"
          placeholder="Name"
          v-model="form.name"
          required
        />
        <input
          type="number"
          class="fadeIn second"
          name="price"
          placeholder="Price"
          v-model="form.price"
          required
        />
        <input
          type="number"
          class="fadeIn second"
          name="score"
          placeholder="Score"
          v-model="form.score"
        />

        <input
          type="text"
          class="fadeIn third"
          name="description"
          placeholder="Description"
          v-model="form.description"
        />

        <input
          type="file"
          accept="image/*"
          @change="upload($event)"
          id="file-input"
        />

        <input v-if="!productStore.getters.currentProduct._id"
         type="submit" class="fadeIn fourth" value="Create Product" />
         <input v-if="productStore.getters.currentProduct._id"
         type="submit" class="fadeIn fourth" value="Update Product" />
      </form>
      <router-link class="btn_link" to="/products">Product List</router-link>
     
              <div class="alert alert-danger" role="alert" v-if="productStore.getters.error">
        {{ productStore.getters.error }}
      </div> 
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import userStore from "@/stores/user"
import productStore from "@/stores/product"
import { uploadImage } from "@/querys/requestUpload"
import router from "@/router"
import numeral from "numeral"

export default defineComponent({
  setup() {
    const {
      name,
      price,
      score,
      image,
      description,
    } = productStore.getters.currentProduct;
    console.log(price?.toString());
    
    const form = reactive({
      name: name || "",
      price: price?.toString() || "",
      score: score?.toString() || "",
      image: image || "",
      description: description || "",
    });

    const upload = async (event: any) => {
      const response = await uploadImage(event)
      if (!response.error) {
        form.image = response.path;
      }
    };
    const onSubmit = async () => {
      const { name, price, image, score, description } = form
      const newPrice = numeral(price).value() || 0
      const newScore = numeral(score).value() || 0
      if (productStore.getters.currentProduct._id) {
        await productStore.updateProduct(
          productStore.getters.currentProduct?._id || "",
          name,
          newPrice,
          image,
          newScore,
          description
        );
        productStore.getProduct()
      } else {
        await productStore.createProduct(
          name,
          newPrice,
          image,
          newScore,
          description
        );
      }
      if (
        !productStore.getters.error &&
        !productStore.getters.currentProduct._id
      ) {
        router.push("/products");
        form.name = ""
        form.price = ""
        form.image = ""
        form.score = ""
        form.description = ""
      }
    }

    return { form, userStore, onSubmit, upload, productStore }
  },
})
</script>

<style scoped>
/* BASIC */

a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}

/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 5px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #39ace7;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type="text"],
input[type="email"],
input[type="number"],
input[type="password"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 65%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type="text"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type="text"]:placeholder {
  color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

/* OTHERS */

*:focus {
  outline: none;
}

#icon {
  width: 30%;
}

.btn_link {
  margin-bottom: 15px;
  border-radius: 31px 31px 31px 31px;
  -moz-border-radius: 31px 31px 31px 31px;
  -webkit-border-radius: 31px 31px 31px 31px;
  border: 1px solid #56baed;
  padding: 4px;
}
.btn_link:hover {
  background: #cccccc;
  color: #0d0d0d;
}
</style>
