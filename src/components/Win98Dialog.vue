<template>
  <div class="win98-dialog">
    <div class="win98-dialog--header header">
      <div
        class="win98-dialog--dragmove-bar"
        v-on:mousedown="mouseDownAndMoveEvent($event, 'dragMove')"
      ></div>
      <div class="win98-dialog--title title win98-text">{{ title }}</div>
      <div class="win98-dialog--buttons">
        <button class="win98-button">
          <img
            class="win98-icon"
            size="custom"
            name="window-minimize"
            title="Minimize"
            src="data:image/gif;base64,R0lGODlhDAAKAIABAAAAAAQz/yH5BAEKAAEALAAAAAAMAAoAAAINjI+py+0PGZhU0RpNAQA7"
            alt=""
          />
        </button>
        <button class="win98-button">
          <img
            class="ui95-icon ui95-icon--window-maximize ui95-icon--custom ui95-icon--"
            size="custom"
            name="window-maximize"
            title="Maximize"
            src="data:image/gif;base64,R0lGODlhDAAKAIABAAAAAAQz/yH5BAEKAAEALAAAAAAMAAoAAAIWDI4Ym732IngzMmqvthXm3klUo2RmAQA7"
            alt=""
          />
        </button>
        <button class="win98-button">
          <img
            class="ui95-icon ui95-icon--window-close ui95-icon--custom ui95-icon--"
            size="custom"
            name="window-close"
            title="Close"
            src="data:image/gif;base64,R0lGODlhDAAKAIABAAAAAAQz/yH5BAEKAAEALAAAAAAMAAoAAAIUjI8IoNy2ElxOhmgvtRgfr2WiWAAAOw=="
            alt=""
          />
        </button>
      </div>
    </div>
    <div class="win98-dialog--content"></div>
    <div class="win98-dialog--footer"></div>
    <div
      class="win98-dialog__resize-left"
      v-on:mousedown="mouseDownAndMoveEvent($event, 'leftResize')"
    ></div>
    <div
      class="win98-dialog__resize-right"
      v-on:mousedown="mouseDownAndMoveEvent($event, 'rightResize')"
    ></div>
    <div
      class="win98-dialog__resize-top"
      v-on:mousedown="mouseDownAndMoveEvent($event, 'topResize')"
    ></div>
    <div
      class="win98-dialog__resize-bottom"
      v-on:mousedown="mouseDownAndMoveEvent($event, 'bottomResize')"
    ></div>
    <div
      class="win98-dialog__resize-corner"
      v-on:mousedown="mouseDownAndMoveEvent($event, 'cornerResize')"
    ></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      title: "我的电脑",
    };
  },
  methods: {
    initEvents() {},
    commonMoveEvent(dom, e, callBack) {
      //获取鼠标按下的坐标
      let mousedownX = e.clientX;
      let mousedownY = e.clientY;

      //获取元素的left，top值
      let left = dom.offsetLeft;
      let top = dom.offsetTop;

      let width = dom.offsetWidth;
      let height = dom.offsetHeight;

      //给可视区域添加鼠标的移动事件
      document.onmousemove = function (event) {
        //获取鼠标移动时的坐标
        let mouseMoveX = event.clientX;
        let mouseMoveY = event.clientY;

        //计算出鼠标的移动距离
        var moveX = mouseMoveX - mousedownX;
        var moveY = mouseMoveY - mousedownY;

        callBack({
          dom: dom,
          width: width,
          height: height,
          left: left,
          top: top,
          moveX: moveX,
          moveY: moveY,
        });
      };

      //清除
      document.onmouseup = function () {
        document.onmousemove = null;
      };
    },
    mouseDownAndMoveEvent(e, type) {
      if (type === "dragMove") {
        let dom = e.path[2];
        this.commonMoveEvent(dom, e, this.dragMoveEvent);
      }
      let dom = e.path[1];
      if (type === "leftResize") {
        this.commonMoveEvent(dom, e, this.leftResizeEvent);
      }
      if (type === "rightResize") {
        this.commonMoveEvent(dom, e, this.rightResizeEvent);
      }
      if (type === "topResize") {
        this.commonMoveEvent(dom, e, this.topResizeEvent);
      }
      if (type === "bottomResize") {
        this.commonMoveEvent(dom, e, this.bottomResizeEvent);
      }
      if (type === "cornerResize") {
        this.commonMoveEvent(dom, e, this.cornerResizeEvent);
      }
    },
    leftResizeEvent(data) {
      let ls = data.moveX + data.left;
      let changeWidth = data.width - data.moveX;
      if (changeWidth >= 300) {
        data.dom.style.left = ls + "px";
        data.dom.style.width = changeWidth + "px";
      }
    },
    rightResizeEvent(data) {
      let changeWidth = data.width + data.moveX;
      if (changeWidth >= 300) {
        data.dom.style.width = changeWidth + "px";
      }
    },
    topResizeEvent(data) {
      let top = data.moveY + data.top;
      let changeHeight = data.height - data.moveY;
      if (changeHeight >= 300) {
        data.dom.style.top = top + "px";
        data.dom.style.height = changeHeight + "px";
      }
    },
    bottomResizeEvent(data) {
      let changeHeight = data.height + data.moveY;
      if (changeHeight >= 300) {
        data.dom.style.height = changeHeight + "px";
      }
    },
    cornerResizeEvent(data) {
      this.bottomResizeEvent(data);
      this.rightResizeEvent(data);
    },
    dragMoveEvent(data) {
      let ls = data.moveX + data.left;
      let lt = data.moveY + data.top;
      data.dom.style.top = lt + "px";
      data.dom.style.left = ls + "px";
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  min-height: 18px;
}
.title {
  font-size: calc(10 * var(--px));
  text-align: left;
}
</style>
