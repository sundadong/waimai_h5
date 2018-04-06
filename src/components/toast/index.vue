<template>
  <transition :name="transition">
    <div v-show="visible" class="toast" :class="customClass">
      <span v-if="iconClass !== ''" class="toast-icon" :class="iconClass"></span>
      <span class="toast-text">{{message}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'toast',
  props: {
    message: String,
    className: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'middle'
    }
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    transition () {
      var name = ''

      switch (this.position) {
        case 'top':
          name = 'slide-top'
          break
        case 'bottom':
          name = 'slide-bottom'
          break
        default:
          name = 'fade'
          break
      }

      return name
    },
    customClass () {
      var classes = []

      switch (this.position) {
        case 'top':
          classes.push('is-placetop')
          break
        case 'bottom':
          classes.push('is-placebottom')
          break
        default:
          classes.push('is-placemiddle')
          break
      }

      if (this.iconClass !== '') {
        classes.push('has-icon')
      }

      classes.push(this.className)

      return classes.join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variable';

.toast {
  position: fixed;
  left: 50%;
  z-index: 999;
  max-width: 80%;
  padding: pxTorem(20px) pxTorem(30px);
  font-size: $base-font-size;
  color: $bright-color;
  text-align: center;
  background-color: rgba(0, 0, 0, .7);
  border-radius: pxTorem(10px);

  &.has-icon {
    padding: pxTorem(30px) pxTorem(40px);
  }

  &-#{'icon'} {
    font-size: pxTorem(60px);
    margin-bottom: pxTorem(20px);
  }

  &-#{'text'} {
    display: block;
  }
}

.is-placetop {
  top: pxTorem(60px);
  transform: translate(-50%, 0);
}

.is-placebottom {
  bottom: pxTorem(60px);
  transform: translate(-50%, 0);
}

.is-placemiddle {
  top: 50%;
  transform: translate(-50%, -50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter,
.fade-leave-to,
.slide-top-enter,
.slide-top-leave-to,
.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0;
}

.slide-top-enter-active,
.slide-top-leave-active,
.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: all .3s;
}

.slide-top-enter,
.slide-top-leave-to {
  transform: translate(-50%, -100%);
}

.slide-bottom-enter,
.slide-bottom-leave-to {
  transform: translate(-50%, 100%);
}
</style>
