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
      <div v-if="type === 'confirm'" class="confirm">
        <input v-model="confirmText" class="win98-input input" type="text">
      </div>
      <div v-if="type === 'message'" class="message">
        <slot />
      </div>
    </div>
    <div v-if="type !== 'message'" class="win98-dialog--footer footer">
      <button class="win98-button" @click="submit">确认</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolTip',
  props: {
    type: {
      type: String,
      default: 'message'
    },
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
      confirmText: ''
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
    submit() {
      if (this.type === 'confirm') {
        this.$emit('eventCallBack', { eventName: 'submit', data: { content: this.confirmText }})
      }
    },
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
  min-width: 200px !important;
  min-height: 100px !important;
  top: 45%;
  left: 34%;
  transform: translateX(-50%);
  transform: translateY(-50%);
}
.win98-dialog--content{
  height: 100%;
  width: 100%;
  position: relative;
  .confirm{
    padding: 10px;
    .input{
      width: 180px;
      margin: auto;
    }
  }
  .message{
    padding: 15px;
  }
}
.header {
  min-height: 18px;
}
.title {
  font-size: calc(10 * var(--px));
  text-align: left;
}

.footer{
  padding: 10px;
  button{
    float: right;
  }
}
</style>
