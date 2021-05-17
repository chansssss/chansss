<template>
  <div class="next-container">
    <div class="body">
      <div v-for="item in total" v-show="item === nowIndex" :key="item">
        <slot :name="'next' + item" />
      </div>
    </div>

    <div class="footer">
      <button v-show="nowIndex > 1" class="win98-button button" @click="next(-1)">
        上一条
      </button>
      <button
        v-show="nowIndex < slotSize"
        class="win98-button button"
        @click="next(1)"
      >
        下一条
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nexttt',
  data() {
    return {
      nowIndex: 1,
      total: 10,
      slotSize: 0
    }
  },
  mounted() {
    this.slotSize = this.setSlotSize()
    console.log(this.slotSize)
  },
  methods: {
    setSlotSize() {
      let size = 0
      for (const key in this.$slots) {
        if (Object.hasOwnProperty.call(this.$slots, key)) {
          size++
        }
      }
      return size
    },
    next(num) {
      if (num < 0 && this.nowIndex === 1) {
        return
      }
      if (num > 0 && this.nowIndex >= this.slotSize) {
        return
      }
      this.nowIndex += num
    }
  }
}
</script>

<style lang="less" scoped>
.next-container {
  padding: 2px;
  height: 100%;
  width: 100%;
  position: relative;
  .body{
    height: calc(100% - 50px);
  }
  .footer{
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: flex-end;
    bottom:0;
    height: 29px;
    padding: 3px;
  }
}

.button {
  height: 23px;
  width: 70px;
  margin-left: 5px;
}
</style>
