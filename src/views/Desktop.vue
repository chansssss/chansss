<template>
  <div class="desktop">
    <div class="windowarea">
      <template v-for="(window, index) in windows" :key="index">
        <component
          v-bind:is="window.componentName"
          v-show="!window.minimize"
          :uuid="window.uuid"
          @windowEventCallBack="windowEventCallBack"
        ></component>
      </template>
    </div>
    <div class="footer">
      <div class="startmenu">
        <button class="win98-button btn-startmenu">Start</button>
      </div>
      <div class="taskbar">
        <template v-for="(window, index) in windows" :key="index">
          <button
            class="win98-button taskbar-item"
            :class="window.actived ? 'win98-button--active' : ''"
          >
            {{ window.name }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MyComputer from "@/views/my-computer";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "Home",
  components: { MyComputer },
  data() {
    return {
      windows: [
        {
          componentName: "MyComputer",
          actived: true,
          name: "我的电脑",
          minimize: false,
          uuid: uuidv4(),
        }
      ],
    };
  },
  methods: {
    windowEventCallBack({ uuid, eventName }) {
      let window = this.getWindowByUUID(uuid)
      if (window) {
        if (eventName === 'minimize') {
          window.minimize = true
        }
        if (eventName === 'close') {
          this.deleteWindowByUUID(uuid)
        }
      }
    },
    getWindowByUUID(uuid){
      let window = null
      for (let i = 0; i < this.windows.length; i++) {
        const element = this.windows[i];
        if (element.uuid === uuid) {
          window = element
          window.index = i
          return window
        }
      }
      return window
    },
    deleteWindowByUUID(uuid){
      let window = this.getWindowByUUID(uuid)
      if (window) {
        this.windows.splice(window.index,1)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.desktop {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: var(--background-color);
  background-image: var(--background-image);
  background-repeat: var(--background-repeat);
  background-size: var(--background-size);
  background-position: 50%;
  color: var(--color-primary-alt);
  padding: 0;
  margin: 0;
  overflow: hidden;
  transform-origin: top left;
}
.windowarea {
  position: relative;
  height: calc(100% - 28px);
  overflow: hidden;
}
.footer {
  display: flex;
  background: var(--gray);
  background: linear-gradient(
    180deg,
    var(--gray) 0,
    var(--gray) 1px,
    #fff 0,
    #fff 2px,
    var(--gray) 0
  );
  color: var(--black);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 28px;
  padding: 4px 2px 2px;
  box-shadow: 0 calc(var(--px) * -1) 0 var(--graylight);
  z-index: 90;
  .startmenu {
    .btn-startmenu {
      image-rendering: crisp-edges;
      image-rendering: pixelated;
      background-image: url(data:image/gif;base64,R0lGODlhEAAQAMIGAAABACcA9foAAAD9AM7Mvfb9AHBLxXBLxSH5BAEKAAcALAAAAAAQABAAAANJeLrcCxCwKBUUgsIxoM0AtnVA91EcWl0bFLTVEZbUaz5zSL6xnAcFl+cRBEGCL1wQwFvyLEsXTwg9OnlJXyEaCTwtkUnYQWYkAAA7);
      background-repeat: no-repeat;
      background-position: 3px;
      padding-left: 22px;
      width: 55px;
      height: 100%;
      font-weight: 700;
    }
  }
}

.taskbar {
  display: flex;
  margin-left: 2px;
  .taskbar-item {
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: start;
    padding-left: 3px;
    margin-right: 3px;
    text-align: left;
    height: 100%;
    display: flex;
  }
}
</style>
