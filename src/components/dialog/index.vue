<template>
  <transition name="modal">
    <div v-if="show" class="ydb-modal">
      <div v-if="showOverlay" class="ydb-mask" @click="clickMask"></div>
      <div class="ydb-dialog">
        <div v-if="title" class="ydb-dialog-hd">
          <strong class="ydb-dialog-title">{{title}}</strong>
        </div>
        <div class="ydb-dialog-bd" v-html="content"></div>
        <div v-if="showCancelButton || showConfirmButton" class="ydb-dialog-ft">
          <a v-if="showCancelButton" class="ydb-dialog-btn" :class="cancelButtonClass" href="javascript:;" @click="close">{{cancelButtonText}}</a>
          <a v-if="showConfirmButton" class="ydb-dialog-btn" :class="confirmButtonClass" href="javascript:;" @click="confirm">{{confirmButtonText}}</a>
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
      default: 'ydb-dialog-btn__default'
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
      default: 'ydb-dialog-btn__primary'
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
    },
    confirm () {
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

.ydb-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, .6)
}

.ydb-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  z-index: 1001;
  max-width: pxTorem(600px);
  text-align: center;
  background-color: #fff;
  border-radius: pxTorem(6px);
  transform: translate3d(-50%, -50%, 0);
  overflow: hidden;

  &-#{"hd"} {
    padding: pxTorem(30px) pxTorem(20px) 0;
    line-height: 1;
  }

  &-#{"title"} {
    font-size: $large-font-size;
    font-weight: 400;
    color: $primary-text-color;
  }

  &-#{"bd"} {
    padding: pxTorem(40px);
    font-size: $subtitle-font-size;
    word-wrap: break-word;
    word-break: break-all;
  }

  &-#{"ft"} {
    position: relative;
    display: flex;

    &:after {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      content: "";
      height: 1px;
      pointer-events: none;
      border-top: 1px solid $border-color;
      transform: scaleY(.5);
      transform-origin: 0 0;
    }
  }

  &-#{"btn"} {
    position: relative;
    display: block;
    flex: 1 1 auto;
    font-size: $title-font-size;
    line-height: 2.6;

    &+&:after {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      content: "";
      width: 1px;
      pointer-events: none;
      border-left: 1px solid $border-color;
      transform: scaleX(.5);
      transform-origin: 0 0;
    }

    &:active {
      background-color: $bg-color;
    }

    &__#{"default"} {
      color: $primary-text-color;
    }

    &__#{"primary"} {
      color: $primary-color;
    }

    &__#{"danger"} {
      color: $danger-color;
    }
  }
}

.ydb-dialog,
.modal-enter-active,
.modal-leave-active {
  opacity: 1;
  transition: all .3s ease-out;
}
.modal-enter .ydb-dialog,
.modal-leave-to .ydb-dialog {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(.5)
}
</style>
