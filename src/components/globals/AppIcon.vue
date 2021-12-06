<template>
  <component class="inline h-4 w-4" :is="icon" aria-hidden="true" v-bind="$attrs" />
</template>

<script>
import {
  PlusSmIcon,
  CheckIcon,
  XIcon,
  UserCircleIcon,
  LocationMarkerIcon,
  PencilIcon,
  PlusCircleIcon
} from "@heroicons/vue/outline";
export default {
  components: {
    UserCircleIcon,
    CheckIcon,
    PlusSmIcon,
    XIcon,
    LocationMarkerIcon,
    PencilIcon,
    PlusCircleIcon,
  },
  props: {
    icon: String,
  }
}
</script>

<style>
</style>