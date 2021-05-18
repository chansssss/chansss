<template>
  <Win98Dialog :z-index="window.zIndex" :title="window.name" @eventCallBack="eventCallBack">
    <div class="container">
      <Nexttt>
        <template v-slot:next1>
          <h3>Chansss</h3>
          <p>
            1.此网站的灵感来源于
            <a href="https://ash.ms/">ash.ms</a>,在此表示感谢。
          </p>
          <p>2.此站还在迭代中，后续将加入更多有意思的东西</p>
          <p>3.除部分css直接取自<a href="https://ash.ms/">ash.ms</a>，其他都是独立完成</p>
        </template>
      </Nexttt>
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
}
</style>
