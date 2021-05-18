// import mermaid from 'mermaid'
import 'highlight.js/styles/default.css'
import MarkdownIt from 'markdown-it'
export default {
  data() {
    return {
      md: null
    }
  },
  methods: {
    initMarkdownIT() {
      var hljs = require('highlight.js')
      this.md = new MarkdownIt({
        highlight: function(str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="hljs"><code>' +
                     hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                     '</code></pre>'
            } catch (__) {
              // nothing
            }
          }

          return '<pre class="hljs"><code>' + MarkdownIt().utils.escapeHtml(str) + '</code></pre>'
        }
      })
      // this.md.use(require('@wesi/markdown-it-webview'))
      // this.md.use(require('@wesi/markdown-it-mermaid'))
    }
  },
  created() {
    // this.fetch()
    this.initMarkdownIT()
  },
  mounted() {
  }
}
