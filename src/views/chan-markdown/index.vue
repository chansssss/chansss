<template>
  <Win98Dialog :z-index="window.zIndex" width="800px" height="600px" :title="window.name" @eventCallBack="eventCallBack">
    <ToolBar :btns="toolBarBtns" @toolBarEventCallBack="toolBarEventCallBack" />
    <div class="ws-markdown_container">
      <div class="ws-markdown">
        <div
          v-show="isEditorMode && editorVisible"
          class="ws-markdown_editor"
          contenteditable="true"
          @input="changeText"
          v-html="content"
        />
        <!-- <div v-if="isEditorMode" class="ws-markdown_tool-bar">
          <button
            class="button button-bar__button"
            title="Toggle side preview"
            :class="editorVisible ? 'button_on' : ''"
            @click="toggleSidePreview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="icon"
            >
              <path
                d="M11,20.977l-6,0c-1.104,0 -2,-0.896 -2,-2l0,-14c0,-1.105 0.896,-2 2,-2l14,0c1.105,0 2,0.895 2,2l0,14c0,1.104 -0.895,2 -2,2l-6,0l0,0.023l-2,0l0,-0.023Zm0,-2l0,-14l-6,0l0,14l6,0Zm8,-14l-6,0l0,14l6,0l0,-14Z"
              />
            </svg>
          </button>

          <button
            class="button button-bar__button"
            :class="syncScroll ? 'button_on' : ''"
            title="Sync Scroll"
            @click="toggleSyncScroll"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="icon"
            >
              <path
                d="M9,18l3,0l-4,4l-4,-4l3,0l0,-3l2,0l0,3Zm8,0l3,0l-4,4l-4,-4l3,0l0,-3l2,0l0,3Zm0.055,-5l-10.11,0l0,-2l10.11,0l0,2Zm-8.055,-4l-2,0l0,-3l-3,0l4,-4l4,4l4,-4l4,4l-3,0l0,3l-2,0l0,-3l-6,0l0,3Z"
              />
            </svg>
          </button>
        </div> -->
        <div
          v-show="previewVisible"
          id="ws-markdown_preview"
          ref="export"
          class="ws-markdown_preview"
        >
          <div id="preview_content" class="preview_content" v-html="html" />
        </div>
      </div>
    </div>
  </Win98Dialog>
</template>

<script>
import markdownIt from './mixins/markdown-it'
import syncScroll from './mixins/syncScroll'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
  name: 'WsMarkdown',
  components: {},
  mixins: [markdownIt, syncScroll],
  props: {
    mode: {
      type: String,
      default: 'editor'
    },
    window: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      toolBarBtns: [
        {
          name: '导出MD文件',
          type: 'confirm'
        },
        {
          name: '帮助',
          type: 'message',
          content: '卫星追踪软件，使用卫星的tle数据计算出卫星轨道以及实时位置等信息。tle数据来源:<a href="http://celestrak.com/NORAD/elements"  target="_blank">celestrak</a>'
        }
      ],
      title: 'undefined',
      html: '',
      content: '# Hello World',
      previewVisible: true,
      editorVisible: true,
      syncScroll: true,
      isEditorMode: true
    }
  },
  watch: {},
  created() {
    this.isEditorMode = this.mode === 'editor'
  },
  mounted() {
    this.html = this.md.render(this.content)
  },
  methods: {
    toolBarEventCallBack({ btnName, data }) {
      if (btnName === '导出MD文件') {
        console.log(data)
      }
    },
    eventCallBack({ event, eventName }) {
      this.$emit('windowEventCallBack', {
        uuid: this.window.uuid,
        event: event,
        eventName: eventName
      })
    },
    exportMd() {
      const mdContent = document.getElementsByClassName('ws-markdown_editor')[0].innerText
      var FileSaver = require('file-saver')
      var blob = new Blob([mdContent], {
        type: 'text/plain;charset=utf-8'
      })
      const title = document.getElementsByClassName('custom_tool-bar_left')[0].innerText
      this.title = title || 'undefined'
      FileSaver.saveAs(blob, `${this.title}.md`)
    },
    exportPdf() {
      this.editorVisible = false
      var target = document.getElementById('preview_content')
      target.style.width = '900px'
      target.style.padding = '0 60px'
      // var cloneDom = target.cloneNode(true)
      // document.getElementsByTagName('body')[0].appendChild(cloneDom)
      this.$nextTick(() => {
        html2canvas(target, {
          allowTaint: true,
          scale: 2,
          scrollX: -window.scrollX,
          scrollY: -window.scrollY,
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: document.documentElement.offsetHeight
        }).then(canvas => {
          // var contentWidth = canvas.width
          // var contentHeight = canvas.height
          // console.log(contentWidth, contentHeight)
          // var pdfX = ((contentWidth + 10) / 2) * 0.75
          // var pdfY = ((contentHeight + 500) / 2) * 0.75 // 500为底部留白
          // var imgX = pdfX
          // var imgY = (contentHeight / 2) * 0.75 // 内容图片这里不需要留白的距离
          // var url = canvas.toDataURL('image/jpeg', 1.0)
          // var pdf = new JsPDF('', 'pt', [pdfX, pdfY])
          // // 需要dataUrl格式
          // pdf.addImage(url, 'JPEG', 0, 0, imgX, imgY)

          // pdf.save('report.pdf')
          document.body.appendChild(canvas)
          var imgData = canvas.toDataURL('image/jpeg')

          /*
      Here are the numbers (paper width and height) that I found to work.
      It still creates a little overlap part between the pages, but good enough for me.
      if you can find an official number from jsPDF, use them.
      */
          var imgWidth = 210
          var pageHeight = 295
          var imgHeight = (canvas.height * imgWidth) / canvas.width
          var heightLeft = imgHeight

          var doc = new JsPDF('p', 'mm')
          var position = 0

          doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight
            doc.addPage()
            doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight
          }
          doc.save('file.pdf')
        })
      })
    },
    exportPdf1() {
      const scale = 2
      const clientHeight = this.$refs.export.clientHeight
      const width = this.$refs.export.clientWidth
      const cs = document.createElement('canvas')
      cs.width = width * scale
      cs.height = clientHeight * scale
      const content = cs.getContext('2d')
      content.scale(scale, scale)
      const rect = this.$refs.export.getBoundingClientRect()
      content.translate(-rect.left, -rect.top)
      this.$nextTick(() => {
        html2canvas(this.$refs.export, {
          allowTaint: true,
          taintTest: true,
          useCORS: true,
          scale: scale / 2,
          canvas: cs,
          width: width,
          height: clientHeight
        }).then((canvas) => {
          var contentWidth = canvas.width
          var contentHeight = canvas.height
          console.log(contentWidth, contentHeight)
          var pdfX = ((contentWidth + 10) / 2) * 0.75
          var pdfY = ((contentHeight + 500) / 2) * 0.75// 500为底部留白
          var imgX = pdfX
          var imgY = (contentHeight / 2) * 0.75// 内容图片这里不需要留白的距离
          var url = canvas.toDataURL('image/jpeg', 1.0)
          var pdf = new JsPDF('', 'pt', [pdfX, pdfY])
          // 需要dataUrl格式
          pdf.addImage(url, 'JPEG', 0, 0, imgX, imgY)

          pdf.save('report.pdf')
        })
      })
    },
    toggleSidePreview() {
      // this.previewVisible = !this.previewVisible
      this.editorVisible = !this.editorVisible
    },
    toggleSyncScroll() {
      this.syncScroll = !this.syncScroll
    },
    changeText(el) {
      const mdContent = el.target.innerText
      this.html = this.md.render(mdContent)
    }
  }
}
</script>
<style>
</style>
<style scoped>
.ws-markdown_container {
  height: 100%;
  width: 100%;
}
.custom_tool-bar {
  box-sizing: border-box;
  padding: 4px 10px;
  height: 40px;
  background-color: #2c3a47;
  display: flex;
  justify-content: space-between;
}

.custom_tool-bar_left{
  color: white;
  text-align: left;
  height: 100%;
  min-width: 60px;
  line-height: 40px;
  outline: none;
  border-bottom: 1px solid #e1e4e8;
}

.custom_tool-bar .icon {
  fill: #d2dae2;
}
.ws-markdown {
  height: calc(100% - 26px);
  width: 100%;
  display: flex;
  color: rgba(0, 0, 0, 0.75);
  font-size: 16px;
  font-family: Lato, Helvetica Neue, Helvetica, sans-serif;
  font-variant-ligatures: common-ligatures;
  line-height: 1.67;
  -webkit-font-smoothing: antialiased;
}
.ws-markdown_editor,
.ws-markdown_preview {
  box-sizing: border-box;
  padding: 20px;
  flex: 1;
  height: 100%;
  text-align: left;
}
.ws-markdown_tool-bar {
  box-sizing: border-box;
  padding: 0 4px;
  height: 100%;
  width: 34px;
  border-left: 1px solid #dfe4ea;
}
.ws-markdown_editor {
  line-height: 30px;
  overflow-x: hidden;
  overflow-y: auto;
  outline: none;
  font-size: 17px;
  font-weight: 500;
  color: #34495e;
  overflow: auto;
  background-color: #f1f2f6;
}
.ws-markdown_preview {
  overflow: auto;
  background-color: #dfe4ea;
  /* border-left: 1px solid #dfe4ea; */
}

.button-bar__button {
  color: rgba(0, 0, 0, 0.2);
  display: block;
  width: 26px;
  height: 26px;
  padding: 2px;
  margin: 3px 0;
}

.ws-markdown .button-bar__button:hover {
  background: rgba(0, 0, 0, 0.1);
}

.button,
.text-input {
  background-image: none;
  background: transparent;
  border: 0;
  border-radius: 3px;
  outline: none;
}

.button_on {
  background: rgba(0, 0, 0, 0.2);
}

.icon {
  fill: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  display: block;
}
</style>

