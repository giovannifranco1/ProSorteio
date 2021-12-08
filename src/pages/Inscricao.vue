<template>
  <div class="w-full text-left w-max-7xl mx-auto">
    <form @submit.prevent="savePeopleSweepstakes" action="POST">
      <div class="space-y-5 divide-y divide-gray-200 p-3">
        <h2 class="text-gray-400 text-lg py-2 font-semibold">Informações do sorteio</h2>
        <div class="pt-3 grid grid-cols-12 gap-3">
          <div class="col-span-12 sm:col-span-4">
            <label for="name" class="block text-sm font-medium">Nome *</label>
            <input name="name" type="text" class="w-full min-w-0 h-9" v-model="form.name" />
          </div>
          <div class="col-span-12 sm:col-span-4">
            <label for="cpf" class="block text-sm font-medium">Cpf *</label>
            <input
              name="cpf"
              v-mask="'###.###.###-##'"
              type="text"
              class="w-full min-w-0 h-9"
              v-model="form.cpf"
            />
          </div>
          <div class="col-span-12 sm:col-span-4">
            <app-select :label="'Sexo'" :items="['Masculino', 'Feminino']" v-model="form.sex" />
          </div>
        </div>
        <div class="w-full">
          <button class="w-full btn btn--success" type="submit">Participar</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import AppSelect from '../components/admin/AppSelect.vue'
export default {
  components: { AppSelect },
  name: 'Inscricao',
  data() {
    return {
      form: {
        name: null,
        cpf: null,
        sex: null,
      }
    }
  },
  methods: {
    async savePeopleSweepstakes() {
      const people = await this.savePeople();
      console.table(people);
      try {
        await this.$api.post('PeopleSweepstakes', {
          peopleId: people.id,
          sweepstakeId: this.$route.params.id
        }, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookie.get('_token')
          }
        });
        Object.keys(this.form).forEach(value => {
          this.form[value] = null;
        });
        this.$router.push({ path: '/' });
      } catch (error) {
        console.log(error);
      }
    },
    async savePeople() {
      try {
        const { data } = await this.$api.post('People', this.form, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookie.get('_token')
          }
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>