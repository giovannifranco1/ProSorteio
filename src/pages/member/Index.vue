<template>
  <div>
    <AppAlertSuccess success="Removido com sucesso!" v-if="show" />
    <div class="text-right">
      <router-link to="/admin/membro/create" tag="a" class="btn btn--success">Adicionar</router-link>
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
          >Matricula</th>
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(member, index) in members"
          :key="index"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'"
          class="hover:bg-gray-200 cursor-pointer"
          @click.prevent="clickEdit(member.id)"
        >
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >{{ member.p.name }}</td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >{{ member.resgistration }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <app-icon
              @click="deleteMembers($event, member.id)"
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
import AppAlertSuccess from '../../components/alerts/AppAlertSuccess.vue';
import AppIcon from "../../components/globals/AppIcon.vue";

export default {
  name: 'Index',
  data() {
    return {
      members: [],
      show: false,
    }
  },
  components: {
    AppIcon,
    AppAlertSuccess,
  },
  mounted() {
    this.getMembers();
  },
  methods: {
    async getMembers() {
      const { data } = await this.$api.get('Members', {
        headers: {
          'Authorization': 'Bearer ' + this.$cookie.get('_token')
        }
      })
        .catch(error => {
          console.warn(error);
        });
      const array = [];
      for (const member of data) {
        const p = await this.findPeople(member.peopleId);
        array.push(
          {
            p,
            ...member
          }
        )
      }
      this.members = array;
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
    async deleteMembers(e, id) {
      e.stopPropagation();
      console.log(id);
      try {
        await this.$api.delete(`Members/${id}`, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookie.get('_token')
          }
        });
        this.getMembers();
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 4000);
      } catch (error) {
        console.error(error);
      }

    },
    clickEdit(id) {
      this.$router.push({ path: `membros/edit/${id}` });
    }
  }
}
</script>