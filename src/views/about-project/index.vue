<template>
  <Win98Dialog :z-index="window.zIndex" :title="window.name" @eventCallBack="eventCallBack">
    <div class="container">
      <p>Chansss</p>
      <p>
        此网站的灵感来源于
        <a href="https://ash.ms/">ash.ms</a>,在此表示感谢。
      </p>
      <p>类Win98风格的UI</p>
      <p>独立开发象棋，卫星追踪，五子棋等程序</p>
    </div>
  </Win98Dialog>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'AboutProject',
  props: {
    window: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    eventCallBack({ event, eventName }) {
      this.$emit('windowEventCallBack', {
        uuid: this.window.uuid,
        event: event,
        eventName: eventName
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
