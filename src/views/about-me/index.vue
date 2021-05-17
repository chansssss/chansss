<template>
  <Win98Dialog :z-index="window.zIndex" :can-resize="false" width="500px" height="400px" :title="window.name" @eventCallBack="eventCallBack">
    <div class="container">
      <Nexttt>
        <template v-slot:next1>
          <h1>ChenWei</h1>
          <p>拥有四年的Web开发经验</p>
        </template>
        <template v-slot:next2>
          <p>Gis以及WebGL的开发经验</p>
        </template>
        <template v-slot:next3>
          <img src="../../assets/imgs/about-me.jpeg" height="300" alt="me" sizes="" srcset="">
          左一(地点：湖北京山)
        </template>
      </Nexttt>
    </div>
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
.container {
  padding: 10px;
  width: 100%;
  height: 100%;
  .top{
    height: 100%;
    width: 100%;
    border:1px solid gray;
    img{
      width: 100%;
      height: 100px;
    }
  }
}
</style>
