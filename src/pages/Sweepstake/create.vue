<template>
  <h2 class="text-gray-400 text-lg py-2 font-semibold">Informações do sorteio</h2>
  <form @submit.prevent="saveSweepstake" class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 sm:col-span-6">
          <label for="name" class="block text-sm font-medium">Nome do sorteio *</label>
          <input name="name" type="text" class="w-full h-9" v-model="form.name" />
        </div>
        <div class="col-span-12 sm:col-span-6">
          <label for="date" class="block text-left text-sm font-medium">Data</label>
          <input type="date" class="w-full h-9" v-model="form.date" />
        </div>
        <div class="col-span-12">
          <label for="address" class="block text-left text-sm font-medium">Endereçõ</label>
          <input name="address" type="text" class="w-full h-9" v-model="form.address" />
        </div>
        <div class="col-span-12">
          <label for="address" class="block text-left text-sm font-medium">Descrição</label>
          <textarea type="text" class="w-full h-9" v-model="form.description" />
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
                  <label for="name" class="block text-sm font-medium">Quantidade *</label>
                  <input
                    name="name"
                    type="text"
                    class="w-full min-w-0 h-9"
                    v-model="product.quantities"
                  />
                </div>
                <div class="col-span-12">
                  <app-select label="Categoria *" :items="categories" v-model="product.category" />
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
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.name }}</td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >{{ product.quantities }}</td>
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
import AppSelect from "../../components/admin/AppSelect.vue";

export default {
  name: "Create",
  components: { AppModal, AppIcon, AppSelect },
  data() {
    return {
      modal_products: false,
      listProducts: [],
      categories: null,
      product: {
        name: null,
        category: null,
        quantities: null,
        description: null,
      },
      form: {
        name: null,
        date: null,
        description: null,
        address: null
      }
    }
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    addProducts() {
      console.table(this.product);
      this.listProducts.push({
        ...this.product
      });
      this.modal_products = !this.modal_products;

      Object.keys(this.product).forEach(value => {
        this.product[value] = null;
      });
    },
    removeProducts(index) {
      this.listProducts.splice(index, 1);
    },
    async saveProduct(product) {
      console.log(product);
      try {
        const { data } = await this.$api.post('Products', {
          name: product.name,
          categoryId: product.category.id,
          description: product.description
        }, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookie.get('_token')
          }
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async saveSweepstake() {
      try {
        const { data } = await this.$api.post('Sweepstake', this.form,
          {
            headers: {
              'Authorization': 'Bearer ' + this.$cookie.get('_token')
            }
          });
        for (const product of this.listProducts) {
          var productc_create = await this.saveProduct(product);
          await this.saveSweepstakeProduct(productc_create, data.id)
        }
        Object.keys(this.form).forEach(value => {
          this.form[value] = null;
        });
        this.listProducts = [];
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories() {
      await this.$api.get('categories', {
        headers: {
          'Authorization': 'Bearer ' + this.$cookie.get('_token')
        }
      })
        .then(response => {
          console.log('dsds');
          this.categories = response.data;
        })
        .catch(error => {
          console.warn(error);
        })
    },
    async findCategory(id) {
      try {
        const { data } = await this.$api.get(`Categories${id}`, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookie.get('_token')
          }
        });
        return data.name;
      } catch (error) {
        console.log(error);
      }
    },
    async saveSweepstakeProduct(product, sweepstake_id) {
      console.table(sweepstake_id);
      try {
        const { data } = await this.$api.post('SweepstakeProduct', {
          productId: product.id,
          sweepstakeId: sweepstake_id,
        }, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookie.get('_token')
          }
        });
        console.table(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
<style>
</style>