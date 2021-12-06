<template>
  <div class="wrapper">
    <a id="openModal" @click.prevent="showModal" class="btn btn--modal cursor-pointer">
      <div class="flex justify-center items-center gap-x-1">
        <app-icon v-if="icon" :icon="icon" />
        {{ icon ? name ? name : null : name || 'Abrir Modal' }}
      </div>
    </a>
  </div>

  <div id="modal" class="modal z-50">
    <div :class="'w-11/12 max-w-' + size" class="modal__content p-1 rounded-lg">
      <div class="flex justify-end">
        <a id="closeModal" @click.prevent="showModal" class="btn btn--modal">
          <app-icon class="cursor-pointer" icon="XIcon" />
        </a>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import AppIcon from "./AppIcon.vue";
export default {
  components: { AppIcon },
  props: {
    name: {
      type: String,
    },
    icon: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'sm',
      validator(value) {
        return ['sm', 'lg', 'xl'].includes(value)
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modal: false,
    };
  },
  watch: {
    show: function () {
      this.showModal();
    }
  },
  methods: {
    showModal() {
      this.modal = !this.modal;
      const modal = document.getElementById("modal");
      if (this.modal) {
        modal.classList.add("modal--active");
      }
      else {
        modal.classList.remove("modal--active");
      }
    }
  },
}
</script>

<style>
.wrapper a {
  display: inline-block;
}
.modal {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(87, 77, 77, 0.7);
  transition: all 0.4s;
}
.modal--active {
  visibility: visible;
  opacity: 1;
}
.modal__content {
  position: relative;
  background: #fff;
}
.modal__footer {
  text-align: right;
}
a {
  color: #585858;
}
i {
  color: #d02d2c;
}
.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #585858;
  text-decoration: none;
}
</style>