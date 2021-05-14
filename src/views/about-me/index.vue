<template>
  <Win98Dialog :z-index="window.zIndex" :title="window.name" @eventCallBack="eventCallBack">
    <h1>关于我</h1>
  </Win98Dialog>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'AboutMe',
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
.my-computer {
  width: auto;
  height: auto;
  position: absolute;
}
</style>
