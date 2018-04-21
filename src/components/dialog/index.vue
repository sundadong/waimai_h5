<template>
  <transition name="modal">
    <div v-if="show" class="ydb-modal">
      <div v-if="showOverlay" class="ydb-mask" @click="clickMask"></div>
      <div class="ydb-dialog">
        <div v-if="title" class="ydb-dialog-header">{{title}}</div>
        <div class="ydb-dialog-content" v-html="content"></div>
        <div v-if="showCancelButton || showConfirmButton" class="ydb-dialog-footer">
          <button v-if="showCancelButton" class="ydb-btn" :class="cancelButtonClass" @click="close">{{cancelButtonText}}</button>
          <button v-if="showConfirmButton" class="ydb-btn ydb-btn-confirm" :class="confirmButtonClass" @click="confirm">{{confirmButtonText}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ydb-dialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: ''
    },
    showOverlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    cancelButtonClass: {
      type: String,
      default: ''
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    confirmButtonClass: {
      type: String,
      default: ''
    },
    confirmButtonCallback: {
      type: Function
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    close () {
      this.show = false
      document.querySelector('.app').style.overflowY = 'auto'
    },
    confirm () {
      this.close()
      this.confirmButtonCallback && this.confirmButtonCallback()
    },
    clickMask () {
      if (this.closeOnClickOverlay) {
        this.close()
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/variable";

.ydb-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
}
.ydb-mask,
.ydb-dialog {
  position: absolute;
}
.ydb-mask {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6)
}
.ydb-dialog {
  top: 50%;
  left: 50%;
  width: 85%;
  background-color: #fff;
  border-radius: pxTorem(10px);
  transform: translate3d(-50%, -50%, 0);
}
.ydb-dialog-header {
  padding: pxTorem(20px) pxTorem(20px) 0;
  font-size: $title-font-size;
  color: $primary-text-color;
  text-align: center;
}
.ydb-dialog-content {
  padding: pxTorem(40px);
  font-size: $base-font-size;
}
.ydb-dialog-footer {
  position: relative;
  display: flex;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 200%;
    height: 200%;
    pointer-events: none;
    border-top: 1px solid $border-color;
    transform: scale(.5);
    transform-origin: 0 0;
  }
}
.ydb-dialog-footer .ydb-btn {
  flex: 1 1 auto;
  line-height: 2.4;
  cursor: pointer;
  border-radius: 0 0 0 pxTorem(10px);
}
.ydb-dialog-footer .ydb-btn:active {
  background-color: $bg-color;
}
.ydb-dialog-footer .ydb-btn-confirm {
  color: #4294F2;
  border-radius: 0 0 pxTorem(10px) 0;
}
.ydb-mask,
.ydb-dialog,
.modal-enter-active,
.modal-leave-active {
  transition: all .3s ease-out;
}
.modal-enter .ydb-dialog,
.modal-leave-to .ydb-dialog {
  transform: translate3d(-50%, -50%, 0) scale(0.1)
}
</style>
