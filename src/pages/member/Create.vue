<template>
  <div class="absolute top-3 right-3">
    <AppAlertErro v-if="mensagem_erro" :mensagem="mensagem_erro" @fechar="fechar" />
  </div>
  <AppAlertSuccess success="Salvo com sucesso!" v-if="show" />
  <form @submit.prevent="handlerSubmit" action="POST">
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
          <AppSelect :label="'Sexo'" :items="['Masculino', 'Feminino']" v-model="form.sex" />
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
          <div class="col-span-12 sm:col-span-4">
            <label for="email" class="block text-sm font-medium">Email *</label>
            <input name="email" type="email" class="w-full min-w-0 h-9" v-model="user.email" />
          </div>
          <div class="col-span-12 sm:col-span-4">
            <label for="password" class="block text-left text-sm font-medium">Senha *</label>
            <input type="password" class="w-full min-w-0 h-9" v-model="user.password" />
          </div>
          <div class="col-span-12 sm:col-span-4">
            <label for="username" class="block text-left text-sm font-medium">Nome do usuario *</label>
            <input name="username" type="text" class="w-full min-w-0 h-9" v-model="user.username" />
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
import AppAlertSuccess from "../../components/alerts/AppAlertSuccess.vue";
import AppAlertErro from "../../components/alerts/AppAlertErro.vue";
export default {
  name: 'Create',
  data() {
    return {
      show: false,
      mensagem_erro: '',
      mensagem_sucesso: '',
      user: {
        username: null,
        email: null,
        password: null
      },
      people: [],
      form: {
        name: null,
        cpf: null,
        sex: null,
        resgistration: null,
        peopleId: null,
        senha: null,
      }
    }
  },
  components: {
    AppSelect,
    AppAlertSuccess,
    AppAlertErro,
  },
  mounted() {
    this.getPeople();
  },
  methods: {
    async handlerSubmit() {
      try {
        const { data } = await this.$api.post('People', {
          name: this.form.name,
          cpf: this.form.cpf,
          sex: this.form.sex,
        }, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookie.get('_token')
          }
        })
        this.form.peopleId = data.id;
        this.savePeople();
        this.saveUser();

      } catch (error) {
        this.mensagem_erro = error.response.errors[0];
      }

      this.show = true;
      this.timeAlert();
    },
    async saveUser() {
      await this.$api.post('authManagement/Register', this.user,
        {
          headers: {
            'Authorization': 'Bearer ' + this.$cookie.get('_token')
          }
        })
        .then(response => {
          Object.keys(this.user).forEach(value => { this.user[value] = null });
          console.table(response.errors);
        })
        .catch(error => {
          console.log(error.errors);
          this.mensagem_erro = 'Erro ao cadastrar';
          this.show = false;
        })
    },
    async savePeople() {
      await this.$api.post('Members', {
        resgistration: this.form.resgistration,
        peopleId: this.form.peopleId,
      },
        {
          headers: {
            'Authorization': 'Bearer ' + this.$cookie.get('_token')
          }
        })
        .then(response => {
          Object.keys(this.form).forEach(value => { this.form[value] = null });
          console.log(response);
        })
        .catch(error => {
          console.warn(error);
        })
    },
    async getPeople() {
      await this.$api.get('People', {
        headers: {
          'Authorization': 'Bearer ' + this.$cookie.get('_token')
        }
      })
        .then(response => {
          console.log(response);
          this.people = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    fechar() {
      this.mensagem_erro = '';
      this.mensagem_sucesso = '';
    },
    timeAlert() {
      setTimeout(() => {
        this.show = false;
      }, 4000);
    }
  }
}
</script>