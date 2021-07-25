<template>
  <nav class="menu">
    <div class="logo">
      <img class="logo_img" src="@/assets/logo.jpg" id="icon" alt="User Icon" />
    </div>
    <div  class="container-user" v-if="userStore.getters.isLoggedIn">
     <img class="logo-user" src="@/assets/no-usuario.png" id="icon" alt="User" /> 
      <button class="btn-logout"
        @click="userStore.logout()"
      >
        Logout
      </button>
    </div>
    <ul class="menu_items" v-if="!userStore.getters.isLoggedIn">
      <li><router-link to="/">Sing In</router-link></li>
      <li><router-link to="/singup">Sing Up</router-link></li>
    </ul>
  </nav>
</template>

<script>
import userStore from "@/stores/user";
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    onMounted(userStore.getUser);
    return { userStore };
  },
});
</script>
<style>
.menu {
  background-color: rgb(0, 0, 0, 1);
  margin-left: -8px;
  margin-top: -8px;
  height: 75px;
  width: 101%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #fff;
  box-shadow: 5px 0 10px rgb(0, 0, 0, 0.6);
}

.logo {
  margin-left: 30px;
}

.logo_img{
  margin-top: 13px;
  max-width: 80%;
}

.container-user{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: -180px;
}

.logo-user{
  margin-top: 10px;
  margin-bottom: 5px;
  max-width: 6%;
  border-radius: 1px solid;
}



.btn-logout {
 max-width: 80px;
}

.btn-logout:hover {
  cursor: pointer;
  background: rgb(218, 197, 218);
}

.menu_items {
  display: flex;
  align-items: flex-end;
  list-style: none;
}

.menu_items li {
  border-radius: 3px;
  margin: 0 5px;
}

.menu_items li a {
  padding: 7px 13px;
  text-decoration: none;
  font-size: 18px;
  display: block;
  text-transform: uppercase;
  color: #fff;
}

.menu_items li:hover,
li.active {
  background-color: rgba(116, 107, 107, 0.562);
  transition: 0.4s;
}

.btn_menu {
  margin-right: 30px;
  font-size: 25px;
  color: #fff;
  cursor: pointer;
  display: none;
}

ul.show {
  top: 65px;
  z-index: 100;
}

@media screen and (max-width: 952px) {
  .logo {
    font-size: 30px;
    padding-left: 35px;
  }
  .menu_items li a {
    font-size: 16px;
  }
}
@media screen and (max-width: 858px) {
  .menu {
    height: 65px;
  }

  .btn_menu {
    display: inline-block;
  }
  .menu_items {
    position: fixed;
    width: 100vw;
    height: cal(100% - 65px);
    background: #414141;
    top: -100vh;
    text-align: center;
    transition: all 0.4s;
    flex-direction: column;
  }

  .menu_items li {
    margin: 30px 0 0 0;
    line-height: 30px;
  }

  .menu_items li:hover {
    background: none;
  }
  .menu_items li a {
    font-size: 20px;
    color: #fff;
    font-weight: bold;
  }
  .menu_items li a:hover {
    color: #e9183b;
  }

  .logo {
    padding-left: 35px;
    width: 10%;
  }
}

@media screen and (max-width: 858px) and (orientation: landscape) {
  .menu_items li {
    margin: 5px 0 0 0;
  }
  .menu_items {
    overflow: scroll;
    height: cal(100% -65px);
  }
}
</style>
