<template>
  <form @submit.prevent="save" action="POST">
    <div class="space-y-5 divide-y divide-gray-200 p-3">
      <h2 class="text-gray-400 text-lg py-2 font-semibold">Informações do sorteio</h2>
      <div class="pt-3 grid grid-cols-12 gap-3">
        <div class="col-span-12 sm:col-span-6">
          <label for="cpf" class="block text-sm font-medium">Cpf *</label>
          <input
            name="cpf"
            v-mask="'###.###.###-##'"
            type="text"
            class="w-full min-w-0 h-9"
            v-model="form.p.cpf"
          />
        </div>
        <div class="col-span-12 sm:col-span-6">
          <app-select
            :selected-item="form.p.sex"
            :label="'Sexo'"
            :items="['Masculino', 'Feminino']"
            v-model="form.p.sex"
          />
        </div>
        <div class="col-span-12">
          <label for="resgistration" class="block text-left text-sm font-medium">Resgistration *</label>
          <input
            name="resgistration"
            type="text"
            class="w-full min-w-0 h-9"
            v-model="form.resgistration"
          />
        </div>
      </div>
      <div>
        <h2 class="text-gray-400 font-semibold text-lg py-5">Autenticação</h2>
        <div class="py-2 grid grid-cols-12 gap-3">
          <div class="col-span-12 sm:col-span-6">
            <label for="name" class="block text-sm font-medium">Nome *</label>
            <input name="name" type="text" class="w-full min-w-0 h-9" v-model="form.p.name" />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="password" class="block text-left text-sm font-medium">Senha</label>
            <input type="password" class="w-full min-w-0 h-9" v-model="form.senha" />
          </div>
        </div>
        <div class="w-full">
          <button type="submit" class="btn btn--success w-full">Salvar</button>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import AppSelect from "../../components/admin/AppSelect.vue";
export default {
  name: 'EditMember',
  data() {
    return {
      form: {
        p: {
          name: null,
          cpf: null,
          sex: null,
        },
        id: null,
        resgistration: null,
        peopleId: null,
        senha: null,
      }
    }
  },
  components: {
    AppSelect,
  },
  mounted() {
    this.findMember(this.$route.params.id);
    console.table(this.member);
  },
  methods: {
    async findMember(id) {
      try {
        const { data } = await this.$api.get(`Members/${id}`, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookie.get('_token')
          }
        });
        console.table(data);
        const p = await this.findPeople(data.peopleId);
        console.table(p);
        this.form = {
          p,
          ...data
        }
      } catch (error) {
        console.error(error);
      }
    },
    async findPeople(id) {
      try {
        const { data: response } = await this.$api.get(`People/${id}`, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookie.get('_token')
          }
        });
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async save() {
      try {
        await this.$api.put(`People/${this.form.peopleId}`, {
          id: this.form.peopleId,
          name: this.form.p.name,
          cpf: this.form.p.cpf,
          sex: this.form.p.sex,
        }, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookie.get('_token')
          }
        });
        try {
          await this.$api.put(`Members/${this.form.id}`, {
            id: this.$route.params.id,
            resgistration: this.form.resgistration,
            peopleId: this.form.peopleId,
            senha: this.form.senha,
          });
        } catch (error) {
          console.warn(error);
        }
      } catch (error) {
        console.error(error);
      }

      this.$router.push({ path: '/admin/membros', params: { show: true } });
    }
  }
}
</script>
