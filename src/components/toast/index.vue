<template>
  <transition name="zoom">
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
@import '../../assets/scss/variable';

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
  transition: opacity .3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all .3s;
}
.zoom-enter,
.zoom-leave-to {
  transform: translate(-50%, -50%) scale(.5, .5);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all .3s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 100%);
}
</style>
