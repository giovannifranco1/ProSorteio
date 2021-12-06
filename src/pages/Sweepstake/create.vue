<template>
  <h2 class="text-gray-400 text-lg py-2 font-semibold">Informações do sorteio</h2>

  <form @submit.prevent="handlerSubmit" class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 sm:col-span-6 md:col-span-4">
          <label for="name" class="block text-sm font-medium">Nome do sorteio *</label>
          <input name="name" type="text" class="w-full min-w-0 h-9" v-model="form.name" />
        </div>
        <div class="col-span-12 sm:col-span-6 md:col-span-4">
          <label for="date" class="block text-left text-sm font-medium">Data</label>
          <input type="date" class="w-full min-w-0 h-9" v-model="form.date" />
        </div>
        <div class="col-span-12 sm:col-span-6 md:col-span-4">
          <label for="address" class="block text-left text-sm font-medium">Data fim</label>
          <input type="text" class="w-full min-w-0 h-9" v-model="form.date" />
        </div>
        <div class="col-span-12">
          <label for="address" class="block text-left text-sm font-medium">Descrição</label>
          <textarea type="text" class="w-full min-w-0 h-9" v-model="form.description" />
        </div>
      </div>
      <div>
        <h2 class="text-gray-400 font-semibold text-lg py-5">Produtos</h2>
        <app-modal :show="modal_products" size="xl" icon="PlusCircleIcon" name="Produtos">
          <form>
            <div class="space-y-8 divide-y divide-gray-200 p-3">
              <div class="grid grid-cols-12 gap-3">
                <div class="col-span-12 sm:col-span-6">
                  <label for="name" class="block text-sm font-medium">Nome *</label>
                  <input name="name" type="text" class="w-full min-w-0 h-9" v-model="product.name" />
                </div>
                <div class="col-span-12 sm:col-span-6">
                  <label for="date" class="block text-left text-sm font-medium">Categoria *</label>
                  <input type="date" class="w-full min-w-0 h-9" v-model="product.category" />
                </div>
                <div class="col-span-12">
                  <label for="address" class="block text-left text-sm font-medium">Descrição</label>
                  <textarea type="text" class="w-full min-w-0 h-9" v-model="product.description" />
                </div>
              </div>
              <div class="w-full">
                <button @click.prevent="addProducts" class="btn btn--success w-full">Salvar</button>
              </div>
            </div>
          </form>
        </app-modal>
      </div>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >categoria</th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >nome</th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >quantidade</th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(product, index) in listProducts"
                    :key="index"
                    :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >{{ product.category }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <app-icon
                        @click.prevent="removeProducts(index)"
                        class="cursor-pointer text-red-600 hover:text-red-900"
                        icon="XIcon"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="btn btn--success w-full text-base flex justify-center mt-5"
      >Cadastrar</button>
    </div>
  </form>
</template>
<script>
import AppModal from "../../components/globals/AppModal.vue";
import AppIcon from "../../components/globals/AppIcon.vue";
export default {
  name: "Create",
  components: { AppModal, AppIcon },
  data() {
    return {
      modal_products: false,
      listProducts: [],
      product: {
        name: null,
        category: null,
        description: null,
        quantities: null,
      },
      form: {
        name: null,
        date: null,
        description: null,
        address: null
      }
    }
  },

  methods: {
    addProducts() {
      this.listProducts.push({
        ...this.product
      });
      this.modal_products = !this.modal_products;

      Object.keys(this.product).forEach(value => {
        this.product[value] = null;
      });
    },
    removeProducts(value) {
      delete this.listProducts[value];
    }
  }
}
</script>
<style>
</style>