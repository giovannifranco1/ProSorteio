<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-4">
      <li>
        <div>
          <a href="/admin" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li>
      <li v-for="page in pages" :key="page.name">
        <div class="flex items-center">
          <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
          <router-link
            :to="page.href"
            tag="a"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            :aria-current="page.current ? 'page' : undefined"
          >{{ page.name }}</router-link>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
import { ChevronRightIcon, HomeIcon } from '@heroicons/vue/solid'


export default {
  components: {
    ChevronRightIcon,
    HomeIcon,
  },
  props: {
    pages: {
      type: Object,
    }
  }
}
</script>