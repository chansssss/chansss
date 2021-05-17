// import mermaid from 'mermaid'
export default {
  data() {
    return {
      editorElement: null,
      previewElement: null
    }
  },
  methods: {
    initScrollEvent() {
      this.editorElement = document.getElementsByClassName('ws-markdown_editor')[0]
      this.editorElement.addEventListener('scroll', this.editorElementScroll)
      this.previewElement = document.getElementsByClassName('ws-markdown_preview')[0]
      this.previewElement.addEventListener('scroll', this.previewElementScroll)
    },
    editorElementScroll(event) {
      if (this.syncScroll) {
        this.previewElement.scrollTop = this.editorElement.scrollTop
      }
    },
    previewElementScroll(event) {
      if (this.syncScroll) {
        this.editorElement.scrollTop = this.previewElement.scrollTop
      }
    }
  },
  mounted() {
    if (this.isEditorMode) {
      this.initScrollEvent()
    }
  }
}
