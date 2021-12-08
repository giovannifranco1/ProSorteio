<template>
  <form @submit.prevent="handlerForm" action="POST">
    <div class="space-y-8 divide-y divide-gray-200 p-3">
      <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12">
          <label for="name" class="block text-sm font-medium">Nome *</label>
          <input name="name" type="text" class="w-full min-w-0 h-9" v-model="form.name" />
        </div>
        <div class="col-span-12">
          <label for="address" class="block text-left text-sm font-medium">Descrição</label>
          <textarea type="text" class="w-full min-w-0 h-9" v-model="form.description" />
        </div>
      </div>
      <div class="w-full">
        <button type="submit" class="btn btn--success w-full">Cadastrar</button>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  name: "Create",
  data() {
    return {
      form: {
        name: null,
        description: null
      }
    }
  },
  methods: {
    async handlerForm() {
      await this.$api.post('Categories', this.form, {
        headers: {
          'Authorization': 'Bearer ' + this.$cookie.get('_token')
        }
      }
      ).then(() => {
        Object.keys(this.form).forEach(value => {
          this.form[value] = null
        });
        this.$router.push({ path: '/admin/categorias' });
      }).catch(error => {
        console.warn(error)
      });
    }
  }
}
</script>