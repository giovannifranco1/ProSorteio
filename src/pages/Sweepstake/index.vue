<template>
  <div>
    <div class="text-right">
      <router-link to="/admin/sorteio/create" tag="a" class="btn btn--success">Adicionar</router-link>
    </div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >Nome</th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >Data</th>
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(sweepstake, index) in sweepstakes"
          :key="index"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
        >
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >{{ sweepstake.name }}</td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
          >{{ formatData(sweepstake.date) }}</td>
          <td
            class="px-6 py-4 cursor-pointer whitespace-nowrap text-sm hover:text-red-700 text-red-500"
          >Finalizar</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <app-icon class="cursor-pointer text-red-600 hover:text-red-900" icon="XIcon" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      sweepstakes: null
    }
  },
  mounted() {
    this.getSweepstake();
  },
  methods: {
    async getSweepstake() {
      await this.$api.get('Sweepstake', {
        headers: {
          'Authorization': 'Bearer ' + this.$cookie.get('_token')
        }
      })
        .then(response => {
          this.sweepstakes = response.data;
        })
        .catch(error => {
          console.warn(error);
        })
    },
    formatData(data) {
      const data_formating = new Date(data);
      return data_formating.getDay() + "-" + (data_formating.getMonth() + 1) + "-" + data_formating.getFullYear();
    }
  }
}
</script>