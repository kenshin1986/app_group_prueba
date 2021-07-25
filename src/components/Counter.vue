<template>
  <h4>{{ state.count }} x2 = {{ getters.times2 }}</h4>
  <button class="btn btn-success block m-2">In+</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import counterStore from '@/stores/counter';

export default defineComponent({
  
  setup() {
    const { state, getters, inc } = counterStore;
    return { state, getters, inc };
  },
});
</script>
