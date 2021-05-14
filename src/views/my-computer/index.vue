<template>
  <Win98Dialog :z-index="window.zIndex" @eventCallBack="eventCallBack">
    <div class="my-computer">
      <div class="toolbar--min win98-toolbar">
        <div class="win98-toolbar--left" />
        <div class="win98-toolbar--left" />
        <span>
          <button class="toolbar--button">
            <p>文件</p>
          </button>
        </span>
        <span>
          <button class="toolbar--button">
            <p>编辑</p>
          </button>
        </span>
        <span>
          <button class="toolbar--button">
            <p>视图</p>
          </button>
        </span>
      </div>
      <!-- <div class="toolbar--max win98-toolbar">
        <div class="win98-toolbar--left"></div>
        <div class="win98-toolbar--left"></div>
      </div> -->
      <div class="folder">
        <div class="folder-left">
          <div class="folder-left--head">
            <img
              class="ui95-icon ui95-icon--folder ui95-icon--32 ui95-icon--"
              size="32"
              name="folder"
              width="32"
              height="32"
              src="data:image/gif;base64,R0lGODlhIAAgAOMJAAAAABAQEDExAJycAM7OY//OnP//nP//9////wQz/wQz/wQz/wQz/wQz/wQz/wQz/yH5BAEKAA8ALAAAAAAgACAAAATH8MlJq7146L0D/tSAGGRJDh6YjWaLqtZwtLTxwtJA7Hzvc0BgDkEsGo2Ho7IIeIhqUFOBNKUaCIFntDTtcr8FgkC7hVYL1euYVQZ/uWJyzZtu0ePstoG+/+LNUnNUXX9bZ32IaVOFgYaJZ4x2fV1eb2hqcnVRlHuXYWs0ipOJVp2fcpKBnpyLoJWviFxolGiRqayKs3uFsFaHpo94mmeHxLSzjL2enYPHwqPQ0Mu6pz7W19g9Ag8C3d7f4OHi3Tjl5ufo6eroEQA7"
              alt=""
            >
            <p>我的电脑</p>
          </div>
          <div class="folder-left--divider" />
          <div class="folder-left--desc">
            <p>选择项目以查看其说明。</p>
          </div>
        </div>
        <div class="folder-right">
          <div v-for="(folder,index) in nowFolder" :key="index" class="file-item" @click="callFolder(folder)">
            <div class="file-icon">
              <img
                class="ui95-icon ui95-icon--folder ui95-icon--32 ui95-icon--file-icon"
                size="32"
                name="folder"
                classnames="file-icon"
                width="32"
                height="32"
                src="data:image/gif;base64,R0lGODlhIAAgAOMJAAAAABAQEDExAJycAM7OY//OnP//nP//9////wQz/wQz/wQz/wQz/wQz/wQz/wQz/yH5BAEKAA8ALAAAAAAgACAAAATH8MlJq7146L0D/tSAGGRJDh6YjWaLqtZwtLTxwtJA7Hzvc0BgDkEsGo2Ho7IIeIhqUFOBNKUaCIFntDTtcr8FgkC7hVYL1euYVQZ/uWJyzZtu0ePstoG+/+LNUnNUXX9bZ32IaVOFgYaJZ4x2fV1eb2hqcnVRlHuXYWs0ipOJVp2fcpKBnpyLoJWviFxolGiRqayKs3uFsFaHpo94mmeHxLSzjL2enYPHwqPQ0Mu6pz7W19g9Ag8C3d7f4OHi3Tjl5ufo6eroEQA7"
                alt=""
              >
            </div>
            <div class="file-name">
              <span>{{ folder.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Win98Dialog>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'MyComputer',
  props: {
    window: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      folders: [
        {
          name: 'file1',
          icon: '',
          type: 'folder',
          childrens: [
            {
              name: 'file2',
              icon: '',
              type: 'file'
            }, {
              name: 'file3',
              icon: '',
              type: 'file'
            }
          ]
        }
      ],
      nowFolder: []
    }
  },
  created() {
    this.nowFolder = this.folders
  },
  methods: {
    callFolder(file) {
      if (file.type === 'folder') {
        this.nowFolder = file.childrens ? file.childrens : []
      } else {
        (
          this.launchFile(file)
        )
      }
    },
    launchFile(file) {
      console.log(file)
    },
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
  .toolbar--min {
    height: 26px;
  }
  .toolbar--max {
    height: 58px;
  }
  .folder {
    flex: 1;
    display: flex;
    height: auto;
    background: #fff;
    .folder-left {
      background: #fff url(../../assets/imgs/cloud.png);
      background-size: 100%;
      width: 200px;
      max-width: 200px;
      min-width: 200px;
      background-repeat: no-repeat;
      position: relative;
      overflow: hidden;
      padding: 15px;
      box-sizing: border-box;
      .folder-left--head {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        text-align: left;
        p {
          margin: 10px 0;
        }
        img {
          width: 32px;
          aspect-ratio: auto 32 / 32;
          height: 32px;
        }
      }
      .folder-left--divider {
        display: block;
        height: 2px;
        position: relative;
        background: linear-gradient(
          90deg,
          #ff4800 0,
          #ff4800 25%,
          #ffd300 0,
          #ffd300 50%,
          #71d140 0,
          #71d140 75%,
          #00acff 0
        );
      }
      .folder-left--desc {
        text-align: left;
        font-size: calc(10 * var(--px));
      }
    }
    .folder-right {
      overflow-x: auto;
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      .file-item {
        margin-right: 12px;
        padding-top: 10px;
        height: 80px;
        width: 75px;
        &:hover {
          .file-icon {
            img {
              filter: grayscale(100%) brightness(5%) sepia(100%)
                hue-rotate(170deg) brightness(800%) saturate(500%);
            }
          }
          .file-name {
            span {
              color: #fff;
              background: var(--color-primary);
            }
          }
        }
        .file-name {
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>
