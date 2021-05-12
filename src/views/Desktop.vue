<template>
  <div class="desktop">
    <div class="windowarea">
      <div class="application-container">
        <div
          class="application-shortcut"
          v-for="(application, index) in applications"
          :key="index"
          @click="launchApplicationBefore($event, application)"
        >
          <div class="application-shortcut--icon">
            <img
              size="32"
              name="mycomputer"
              classnames="file-icon"
              width="32"
              height="32"
              src="data:image/gif;base64,R0lGODlhIAAgAIQfAAAAABgYGCEhIQAxMQAxnDExnABjY1JSUlpaWgCAAGNjYwCAgACcnISEhJSUlJycnJyczjHOzq2tlM6c/7W1tcDAwJzO/zH/Y87Ozs7O/+fn1ufn5+/v7///9////wQz/yH5BAEKAB8ALAAAAAAgACAAAAX+4CeO42OeaJqSrPhoVSzPtNwAbentfM/9wF+locDlHp6fRsNZNpnOKLGY+zw6moF2y+3CpsYWMssoMxbnhUFtaHOGCurRQ44wCvh8Xv2Nh1ljA2YFFhmGhwR8cHJiHhuCenoEGYkGfYyAHRyQEJ2eEAQTAYpgVYF3Gj1LARmjlot/JKcFqTtLGAG5pH6mjpBLwBi4C2yXsSWakHm5zGq7mLJYA8TU1c5txqbSXdxb2UeaGxob5OXm5rCmMDXsM2AKRwoIB/T08/X4+QAKDwI5AAADChxIkJ+CAIDiKFzIsGGcB3EQynoC7JYwDBIySnDgwESDKQcBabiQwKIMjRJtBAjIJeAjSIklTFZAmVHFA5cKYX5wybOnT585S1CoSDEKUaIQQ5Z4AwBG0wpNJTR9MLWqhqQ6HzBl6pSDVA1SOVC9CuBNRFlOYwBQyxZqBapvAbyAmLVoxbsXMZyUQBeQzb9/lcpySJiwzhEhAAA7"
              alt=""
            />
          </div>
          <div class="application-shortcut--name">{{ application.name }}</div>
        </div>
      </div>
      <template v-for="(window, index) in windows" :key="index">
        <component
          v-bind:is="window.componentName"
          v-show="!window.minimize"
          :window="window"
          @windowEventCallBack="windowEventCallBack"
        ></component>
      </template>
    </div>
    <div class="footer">
      <div class="startmenu">
        <!-- <StartMenu></StartMenu> -->
        <button class="win98-button btn-startmenu">Start</button>
      </div>
      <div class="taskbar">
        <template v-for="(window, index) in windows" :key="index">
          <button
            class="win98-button taskbar-item"
            :class="window.actived ? 'win98-button--active' : ''"
            @click="activeWindow(window.uuid)"
          >
            {{ window.name }}
          </button>
        </template>
      </div>
      <div class="corner-box">
        <div class="network corner-box--icon">
          <img :src="networkImg" alt="">
        </div>
        <div class="sound corner-box--icon">
          <img
            class="ui95-icon ui95-icon--sound ui95-icon--16 ui95-icon--"
            size="16"
            name="sound"
            title="volume"
            width="16"
            height="16"
            src="data:image/gif;base64,R0lGODlhEAAQAOMDAAABAHd5dnh6d7e4ALe5tvf4A/b59vj697e4ALe4ALe4ALe4ALe4ALe4ALe4ALe4ACH5BAEKAAYALAAAAAAQABAAAARR0MhpAKCYjgBCxkMBEMQ3hUFAHJ7USuExHqx7xuJav8OxFjIA7QUrEIA5IdEQ+sk4uxRng7QMM5bYrPYBhLaepcSbuhrElcGI8BJ01WjsJRMBADs="
            alt=""
          />
        </div>
        <div class="time">
          <p>{{nowTime}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import dayjs from 'dayjs' // ES 2015

import { v4 as uuidv4 } from "uuid";
export default {
  name: "Desktop",
  data() {
    return {
      applications: [
        {
          name: "我的电脑",
          hasMultiple: true,
          hasLaunched: false,
          componentName: "MyComputer",
        },
        {
          name: "关于我",
          hasMultiple: false,
          hasLaunched: false,
          componentName: "AboutMe",
        },
        {
          name: "象棋",
          hasMultiple: false,
          hasLaunched: false,
          componentName: "Chess",
        },
      ],
      windows: [],
      zIndex: 9527,
      applicationWaitMap: {},
      nowTime: dayjs(new Date()).format("hh:mm A"),
      networkImg: require('@/assets/imgs/network.png')
    };
  },
  methods: {
    updateTime(){
      setInterval(() => {
        this.nowTime = dayjs(new Date()).format("hh:mm A")
      }, 1000);
    },
    // 启动应用的前置操作
    launchApplicationBefore(event, application) {
      if (this.applicationWaitMap[application.componentName]) {
        return;
      }
      this.applicationWaitMap[application.componentName] = true;
      let window = {
        componentName: application.componentName,
        actived: true,
        name: application.name,
        minimize: false,
        zIndex: this.zIndex++,
        uuid: uuidv4(),
      };
      if (application.hasLaunched) {
        if (application.hasMultiple) {
          application.hasLaunched = true
          this.launchApplication(window);
        } else {
          let applicationWindows = this.getWindowByApplication(application);
          if (applicationWindows) {
            this.activeWindow(applicationWindows[0].uuid);
          }else{
            application.hasLaunched = false
            this.launchApplication(window);
          }
        }
      } else {
        application.hasLaunched = true
        this.launchApplication(window);
      }
    },
    // 根据应用获取打开的窗口
    getWindowByApplication(application) {
      let applicationWindows = [];
      for (let i = 0; i < this.windows.length; i++) {
        const element = this.windows[i];
        if (application.componentName === element.componentName) {
          applicationWindows.push(element);
        }
      }
      return applicationWindows.length > 0 ? applicationWindows : null;
    },
    // 打开应用
    launchApplication(window) {
      document.body.style.cursor = "wait";
      setTimeout(() => {
        this.unactivedAllWindow();
        this.windows.push(window);
        this.applicationWaitMap[window.componentName] = false;
        document.body.style.cursor = "default";
      }, 300);
    },
    //
    unactivedAllWindow() {
      for (let i = 0; i < this.windows.length; i++) {
        const element = this.windows[i];
        element.actived = false;
      }
    },
    // 根据uuid激活应用窗口
    activeWindow(uuid) {
      let window = this.getWindowByUUID(uuid);
      if (window) {
        this.unactivedAllWindow();
        window.actived = true;
        window.minimize = false;
        window.zIndex = this.zIndex++;
      }
    },
    // 应用窗口的事件回调
    windowEventCallBack({ uuid, eventName }) {
      let window = this.getWindowByUUID(uuid);
      if (window) {
        if (eventName === "minimize") {
          window.minimize = true;
          window.actived = false;
        }
        if (eventName === "close") {
          this.deleteWindowByUUID(uuid);
        }
        if (eventName === "active") {
          this.activeWindow(uuid);
        }
      }
    },
    // 根据uuid获取应用窗口
    getWindowByUUID(uuid) {
      let window = null;
      for (let i = 0; i < this.windows.length; i++) {
        const element = this.windows[i];
        if (element.uuid === uuid) {
          window = element;
          window.index = i;
          return window;
        }
      }
      return window;
    },
    deleteWindowByUUID(uuid) {
      let window = this.getWindowByUUID(uuid);
      if (window) {
        this.windows.splice(window.index, 1);
      }
    },
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
  .application-container {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    .application-shortcut {
      display: block;
      width: 65px;
      margin: 5px 5px 15px;
      text-align: center;
      cursor: pointer;
      color: var(--black);
      .application-shortcut--name {
        margin-top: 5px;
        font-size: calc(10 * var(--px));
        background: var(--background-color);
        color: var(--color-primary-alt);
      }
      .application-shortcut--icon {
        margin: auto;
        width: 32px;
        height: 32px;
        img {
          margin: auto;
          width: 32px;
          height: 32px;
        }
      }
    }
  }
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

  .taskbar {
    display: flex;
    flex: 1;
    overflow: hidden;
    margin-left: 2px;
    .taskbar-item {
      width: 160px;
      flex-shrink: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      justify-content: flex-start;
      padding-left: 3px;
      margin-right: 3px;
      text-align: left;
      height: 100%;
      display: flex;
    }
  }

  .corner-box {
    margin-right: 3px;
    display: flex;
    padding: 2px 3px;
    align-items: center;
    white-space: nowrap;
    border-color: var(--grayDark) var(--grayLight) var(--grayLight)
      var(--grayDark);
    border-left: var(--px) solid var(--black);
    border-bottom: var(--px) solid var(--white);
    border-right: var(--px) solid var(--white);
    border-top: var(--px) solid var(--black);
    position: relative;
    pointer-events: none;
    .corner-box--icon{
      margin-right: 5px;
    width: 16px;
    height: 16px;
    }
    .sound {
      margin-right: 5px;
      width: 16px;
      height: 16px;
    }
    .time {
      font-size: calc(10 * var(--px));
    }
  }
}
</style>
