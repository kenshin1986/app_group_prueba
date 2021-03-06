import { computed, reactive } from 'vue'
import * as Request from '@/querys/requestProducts'
import { Product } from '@/types/products.interface'

export interface StateProducts {
  products: {
    total: number,
    skip: number,
    limit: number,
    data: Partial<Product[]>
  }
  currentProduct: Partial<Product>;
  error: string;
}

const state: StateProducts = reactive({
  products: {
    total: 0,
    skip: 0,
    limit: 10,
    data: [],
  },
  currentProduct: {},
  error: '',
})

const getters = reactive({
  products: computed(() => state.products),
  currentProduct: computed(() => state.currentProduct),
  error: computed(() => state.error),
})

const actions = {

  async getProduct(product?: Product) {
    state.currentProduct = product || {}
  },
  async productList($limit: number, $skip: number, search?: string) {
    const response: any = await Request.getProducts($limit, $skip, search)
    if (response.error) {
      state.error = response.error.message
      return
    }
    state.error = ''
    state.products = response
  },

  async createProduct(name: string, price: number, image: string, score: number, description: string) {
    const response: any = await Request.createProduct(name, price, image, score, description)
    if (response.error) {
      state.error = response.error.message
      return
    }
    state.error = ''
    state.products = response
  },
  async updateProduct(_id: string, name: string, price: number, image: string, score: number, description: string) {
    const response: any = await Request.updateProduct(_id, name, price, image, score, description)
    if (response.error) {
      state.error = response.error.message
      return
    }
    state.error = ''
    state.products = response
  },

  async deleteProduct(_id: string) {
    const response = await Request.deleteProduct(_id)
    if (response.error) {
      state.error = response.error.message
      return
    }
    state.error = ''
    state.products = response
  },


}

export default { state, getters, ...actions }