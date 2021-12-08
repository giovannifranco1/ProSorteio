<template>
  <div>
    <div class="text-right">
      <router-link to="/admin/categoria/create" tag="a" class="btn btn--success">Adicionar</router-link>
    </div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >Nome</th>
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(category, index) in this.categories"
          :key="category.id"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
        >
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >{{ category.description }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <app-icon
              @click.prevent="deleteCategory(category.id)"
              class="cursor-pointer text-red-600 hover:text-red-900"
              icon="XIcon"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import AppIcon from "../../components/globals/AppIcon.vue";

export default {
  name: 'Index',
  data() {
    return {
      categories: null
    }
  },
  components: {
    AppIcon,
  },
  mounted() {
    this.getCategories();
  },
  methods: {
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
    async deleteCategory(id) {
      await this.$api.delete(`categories/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + this.$cookie.get('_token')
        }
      })
        .then(response => {
          console.log(response);
          this.getCategories();
        })
        .catch(error => {
          console.warn(error);
        })
    },
  }
}
</script>