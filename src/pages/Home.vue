<template>
  <div class="w-full w-max-7xl">
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-12 relative">
        <div class="absolute h-5 right-5">
          <router-link class="btn bg-gray-700" to="/login">Admin</router-link>
        </div>
      </div>
      <div v-for="sweepstake in sweepstakes" :key="sweepstake.id" class="col-span-12 lg:col-span-4">
        <div class="w-full bg-white p-4 border border-gray-200">
          <div class="p-3">{{ sweepstake.name }}</div>
          <router-link class="btn btn--success" :to="`/home/inscricao/${sweepstake.id}`">Participar</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Create',
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
          console.log('dsds');
          this.sweepstakes = response.data;
        })
        .catch(error => {
          console.warn(error);
        })
    }
  }
}
</script>
