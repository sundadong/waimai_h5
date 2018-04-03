<template>
  <transition name="fade">
    <div v-show="visible" class="toast" role="toast">
      {{message}}
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      message: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/variable';

.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  padding: pxTorem(20px) pxTorem(30px);
  font-size: $base-font-size;
  color: $bright-color;
  text-align: center;
  background-color: rgba(0, 0, 0, .8);
  border-radius: pxTorem(10px);
  transform: translate(-50%, -50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.zoom-enter-active {
  transition: all .2s ease-in;
}

.zoom-leave-active {
  transition: all .1s ease-out;
}
.zoom-enter,
.zoom-leave-to {
  transform: scale(0, 0);
  opacity: 0;
}
</style>
