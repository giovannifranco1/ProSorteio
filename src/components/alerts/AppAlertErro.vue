<template>
  <div class="relative" v-if="mensagem">
    <div
      class="rounded-md bg-red-100 p-4 border-2 border-red-400 fixed right-0 md:right-10 w-full md:w-2/4"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <CheckCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-red-800">{{ mensagem }}</p>
        </div>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button
              @click="fechar"
              type="button"
              class="inline-flex bg-red-400 rounded-md p-1.5 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
            >
              <span class="sr-only">Fechar</span>
              <XIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon, XIcon } from '@heroicons/vue/solid'
export default {
  emits: ['fechar'],
  components: {
    CheckCircleIcon,
    XIcon,
  },
  props: {
    mensagem: String,
  },
  methods: {
    fechar() {
      this.$emit('fechar');
      sessionStorage.removeItem('erro');
    }
  },
}
</script>