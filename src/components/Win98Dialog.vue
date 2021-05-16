<template>
  <div class="win98-dialog" :style="dialogStyle" @click="commonClick($event, 'active')">
    <div class="win98-dialog--header header">
      <div
        class="win98-dialog--dragmove-bar"
        @mousedown="mouseDownAndMoveEvent($event, 'dragMove')"
      />
      <div class="win98-dialog--title title win98-text">{{ title }}</div>
      <div class="win98-dialog--buttons">
        <button class="win98-button" @click="commonClick($event, 'minimize')">
          <img
            class="win98-icon"
            size="custom"
            name="window-minimize"
            title="Minimize"
            src="data:image/gif;base64,R0lGODlhDAAKAIABAAAAAAQz/yH5BAEKAAEALAAAAAAMAAoAAAINjI+py+0PGZhU0RpNAQA7"
            alt=""
          >
        </button>
        <template v-if="canResize">

          <button
            v-show="!isMaximize"
            class="win98-button"
            @click="dialogMaximize"
          >
            <img
              class="win98-icon maximize"
              size="custom"
              name="window-maximize"
              title="Maximize"
              src="data:image/gif;base64,R0lGODlhDAAKAIABAAAAAAQz/yH5BAEKAAEALAAAAAAMAAoAAAIWDI4Ym732IngzMmqvthXm3klUo2RmAQA7"
              alt=""
            >
          </button>
          <button v-show="isMaximize" class="win98-button" @click="dialogRestore">
            <img
              class="win98-icon restore"
              size="custom"
              name="window-restore"
              title="Restore"
              src="data:image/gif;base64,R0lGODlhDAAKAIABAAAAAAQz/yH5BAEKAAEALAAAAAAMAAoAAAIWjI8ZwK3tEkDzQLbozVZX83HUKG1HAQA7"
              alt=""
            >
          </button>
        </template>
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
    <template v-if="canResize">
      <div
        class="win98-dialog__resize-left"
        @mousedown="mouseDownAndMoveEvent($event, 'leftResize')"
      />
      <div
        class="win98-dialog__resize-right"
        @mousedown="mouseDownAndMoveEvent($event, 'rightResize')"
      />
      <div
        class="win98-dialog__resize-top"
        @mousedown="mouseDownAndMoveEvent($event, 'topResize')"
      />
      <div
        class="win98-dialog__resize-bottom"
        @mousedown="mouseDownAndMoveEvent($event, 'bottomResize')"
      />
      <div
        class="win98-dialog__resize-corner"
        @mousedown="mouseDownAndMoveEvent($event, 'cornerResize')"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'Win98Dialog',
  props: {
    zIndex: {
      type: Number,
      required: true
    },
    width: {
      type: String,
      default: '300px'
    },
    height: {
      type: String,
      default: '300px'
    },
    canResize: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isMaximize: false,
      dialog: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }
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
  created() {
  },
  methods: {
    commonClick(event, eventName) {
      if (eventName === 'minimize') {
        event.stopPropagation()
      }
      this.$emit('eventCallBack', { event: event, eventName: eventName })
    },
    dialogMaximize(e) {
      const dom = e.path[4]
      this.dialog.width = dom.offsetWidth
      this.dialog.height = dom.offsetHeight
      this.dialog.top = dom.offsetTop
      this.dialog.left = dom.offsetLeft
      dom.style.top = 0
      dom.style.left = 0
      dom.style.width = '100vw'
      dom.style.height = 'calc(100vh - 28px)'
      this.isMaximize = true
      this.$emit('eventCallBack', { event: e, eventName: 'resize' })
    },
    dialogRestore(e) {
      const dom = e.path[4]
      dom.style.top = this.dialog.top + 'px'
      dom.style.left = this.dialog.left + 'px'
      dom.style.width = this.dialog.width + 'px'
      dom.style.height = this.dialog.height + 'px'
      this.isMaximize = false
    },
    initEvents() {},
    commonMoveEvent(dom, e, callBack) {
      // 获取鼠标按下的坐标
      const mousedownX = e.clientX
      const mousedownY = e.clientY

      // 获取元素的left，top值
      const left = dom.offsetLeft
      const top = dom.offsetTop

      const width = dom.offsetWidth
      const height = dom.offsetHeight

      // 给可视区域添加鼠标的移动事件
      document.onmousemove = function(event) {
        // 获取鼠标移动时的坐标
        const mouseMoveX = event.clientX
        const mouseMoveY = event.clientY

        // 计算出鼠标的移动距离
        var moveX = mouseMoveX - mousedownX
        var moveY = mouseMoveY - mousedownY

        callBack({
          dom: dom,
          width: width,
          height: height,
          left: left,
          top: top,
          moveX: moveX,
          moveY: moveY
        })
      }

      // 清除
      document.onmouseup = function() {
        document.onmousemove = null
      }
    },
    mouseDownAndMoveEvent(e, type) {
      if (type === 'dragMove') {
        const dom = e.path[2]
        this.commonMoveEvent(dom, e, this.dragMoveEvent)
      }
      const dom = e.path[1]

      if (type === 'leftResize') {
        this.commonMoveEvent(dom, e, this.leftResizeEvent)
      }
      if (type === 'rightResize') {
        this.commonMoveEvent(dom, e, this.rightResizeEvent)
      }
      if (type === 'topResize') {
        this.commonMoveEvent(dom, e, this.topResizeEvent)
      }
      if (type === 'bottomResize') {
        this.commonMoveEvent(dom, e, this.bottomResizeEvent)
      }
      if (type === 'cornerResize') {
        this.commonMoveEvent(dom, e, this.cornerResizeEvent)
      }
      this.$emit('eventCallBack', { event: e, eventName: 'resize' })
    },
    leftResizeEvent(data) {
      const ls = data.moveX + data.left
      const changeWidth = data.width - data.moveX
      if (changeWidth >= 300) {
        data.dom.style.left = ls + 'px'
        data.dom.style.width = changeWidth + 'px'
      }
    },
    rightResizeEvent(data) {
      const changeWidth = data.width + data.moveX
      if (changeWidth >= 300) {
        data.dom.style.width = changeWidth + 'px'
      }
    },
    topResizeEvent(data) {
      const top = data.moveY + data.top
      const changeHeight = data.height - data.moveY
      if (changeHeight >= 300) {
        data.dom.style.top = top + 'px'
        data.dom.style.height = changeHeight + 'px'
      }
    },
    bottomResizeEvent(data) {
      const changeHeight = data.height + data.moveY
      if (changeHeight >= 300) {
        data.dom.style.height = changeHeight + 'px'
      }
    },
    cornerResizeEvent(data) {
      this.bottomResizeEvent(data)
      this.rightResizeEvent(data)
    },
    dragMoveEvent(data) {
      const ls = data.moveX + data.left
      const lt = data.moveY + data.top
      data.dom.style.top = lt + 'px'
      data.dom.style.left = ls + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.win98-dialog {
  top: 100px;
  left: 150px;
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
