<template>
  <div v-if="btns" class="toolbar--min win98-toolbar">
    <div class="win98-toolbar--left" />
    <div class="win98-toolbar--left" />
    <span v-for="(btn, index) in btns" :key="index">
      <button class="toolbar--button" @click="btnClick(btn)">
        <p>{{ btn.name }}</p>
      </button>
    </span>
    <div v-show="show" class="tool-tip">
      <div class="modal" />
      <ToolTip :z-index="99999" :type="clickBtn.type" class="dialog" @eventCallBack="toolTipEventCallBack">
        <div class="content">
          {{ content }}
        </div>
      </ToolTip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    btns: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      show: false,
      content: '',
      clickBtn: {
        type: 'message'
      },
      parentElement: null
    }
  },
  created() {
  },
  mounted() {
    this.parentElement = this.$el.parentElement
  },
  methods: {
    btnClick(btn) {
      if (btn.type) {
        if (btn.type === 'message') {
          this.content = btn.content || ''
        }
      }
      this.show = true
      this.clickBtn = btn
    },
    toolTipEventCallBack({ eventName, data }) {
      if (eventName === 'close') {
        this.show = false
      }
      if (eventName === 'submit') {
        console.log(data)
        this.$emit('toolBarEventCallBack', { btnName: this.clickBtn.name, data: data })
      }
    }
  }
}
</script>

<style lang='less'>
.toolbar--min {
  height: 26px;
}

.toolbar--button {
  border: var(--px) solid transparent;
  background: transparent;
  display: block;
  padding: 2px 7px;
  &:hover {
    border-color: var(--white) var(--grayDark) var(--grayDark) var(--white);
  }
  p {
    margin: 0;
    padding: 0;
    font-size: calc(10 * var(--px));
  }
}
.tool-tip {
  position: absolute;
  top: 26px;
  left: 0;
  height: calc(100% - 26px);
  width: 100%;
  .modal {
    z-index: 99999;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 100%;
    background-color: darkgrey;
    opacity: 0.6;
  }
}
</style>
