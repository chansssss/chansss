<template>
  <Win98Dialog @eventCallBack="eventCallBack" :zIndex="window.zIndex">
    <h1>关于我</h1>
  </Win98Dialog>
</template>

<script>
// @ is an alias to /src
export default {
  name: "AboutMe",
  props: {
    window: {
      type: Object,
      required: true,
    },
  },
  created() {
  },
  data() {
    return {};
  },
  methods: {
    eventCallBack({ event, eventName }) {
      this.$emit("windowEventCallBack", {
        uuid: this.window.uuid,
        event: event,
        eventName: eventName,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.my-computer {
  width: auto;
  height: auto;
  position: absolute;
}
</style>
