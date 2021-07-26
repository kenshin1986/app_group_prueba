import { computed, reactive } from 'vue'
import * as Request from '@/querys/requestsUsers'
import router from '@/router'
import { User } from '@/types/user.interface'


export interface UserState {
  user: Partial<User>;
  isLoggedIn: boolean;
  error: string;
}

const state: UserState = reactive({
  user: {},
  isLoggedIn: false,
  error: '',
})

const getters = reactive({
  isLoggedIn: computed(() => state.isLoggedIn),
  user: computed(() => state.user),
  error: computed(() => state.error)
})

const actions = {
  async getUser() {
    const response: any = await Request.getCurrentUser()
    if (response.error) {
      router.push('/')
      return
    }
    state.user = response
    state.isLoggedIn = true
  },

  async login(email: string, password: string) {
    const response: any = await Request.login(email, password)

    if (response.error) {
      state.error = response.error.message
      return false
    }

    state.user = response.currentUser
    state.isLoggedIn = true
    state.error = ''
    localStorage.setItem('token', response.token)

    router.push("products");
    return true
  },

  async singUp(email: string, password: string, lastName: string, firstName: string) {
    const response: any = await Request.singUp(email, password, lastName, firstName)
    if (response.error) {
      state.error = response.error
      return false
    }
    state.error = ''
    state.user = response.currentUser
    localStorage.token = response.token
    router.push("products");
    return true
  },

  async logout() {
    state.user = {}
    state.isLoggedIn = false
    localStorage.removeItem('token');
    router.push('/')
  }
}

export default { state, getters, ...actions }
