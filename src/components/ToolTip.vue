<template>
  <div class="win98-dialog" :style="dialogStyle">
    <div class="win98-dialog--header header">
      <div
        class="win98-dialog--dragmove-bar"
      />
      <div class="win98-dialog--title title win98-text">{{ title }}</div>
      <div class="win98-dialog--buttons">
        <button class="win98-button" @click="commonClick($event, 'close')">
          <img
            class="win98-icon close"
            size="custom"
            name="window-close"
            title="Close"
            src="data:image/gif;base64,R0lGODlhDAAKAIABAAAAAAQz/yH5BAEKAAEALAAAAAAMAAoAAAIUjI8IoNy2ElxOhmgvtRgfr2WiWAAAOw=="
            alt=""
          >
        </button>
      </div>
    </div>
    <div class="win98-dialog--content">
      <slot />
    </div>
    <div class="win98-dialog--footer" />
  </div>
</template>

<script>
export default {
  name: 'ToolTip',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '150px'
    },
    height: {
      type: String,
      default: '100px'
    },
    zIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    dialogStyle() {
      return {
        'z-index': this.zIndex,
        'width': this.width,
        'height': this.height
      }
    }
  },
  methods: {
    commonClick(event, eventName) {
      if (eventName === 'minimize') {
        event.stopPropagation()
      }
      this.$emit('eventCallBack', { event: event, eventName: eventName })
    }
  }
}
</script>

<style lang="less" scoped>
.win98-dialog {
  height: 150px;
  width: 100px;
  top: 50%;
  left: 25%;
  transform: translateX(-50%);
  transform: translateY(-50%);
}
.win98-dialog--content{
  height: 100%;
  width: 100%;
  position: relative;
}
.header {
  min-height: 18px;
}
.title {
  font-size: calc(10 * var(--px));
  text-align: left;
}
</style>
