<template>
  <Sidebar>
    <!-- Header -->
    <template v-slot:header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="mt-5">
          <Breadcrumb :pages="pages" />
        </div>
      </div>
    </template>

    <!-- Footer -->
    <template v-slot:footer>
      <Footer />
    </template>
  </Sidebar>
</template>
<script>

import Sidebar from './TheSidebar.vue';
import Breadcrumb from './TheBreadcrumb.vue';
import Footer from './TheFooter.vue';

export default {
  name: 'Container',
  data() {
    return {
      pages: null
    }
  },
  watch: {
    $route(to) {
      this.pages = [
        {
          name: to.name,
          href: to.path,
          current: true
        }
      ];
      // var url = to.path.split('/');

      // url.forEach(item => {
      //   if (item) {
      //     this.pages = {

      //     }
      //   }
      // });
    }
  },
  components: {
    Sidebar,
    Footer,
    Breadcrumb,
  },
};
</script>