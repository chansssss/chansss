<template>
  <Win98Dialog @eventCallBack="eventCallBack">
    <h1>我的电脑</h1>
  </Win98Dialog>
</template>

<script>
// @ is an alias to /src
import Win98Dialog from "@/components/Win98Dialog";
export default {
  name: "Home",
  props: {
    uuid: {
      type: String,
      required: true,
    },
    windowEventCallBack: {
      type: Function,
      required: true,
    },
  },
  components: { Win98Dialog },
  created() {
    console.log(this.uuid);
  },
  data() {
    return {};
  },
  methods: {
    eventCallBack({ event, eventName }) {
      this.$emit("windowEventCallBack", {
        uuid: this.uuid,
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
