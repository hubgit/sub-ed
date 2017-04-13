import React from 'react'
import { EditorSession, ProseEditor, Configurator } from 'substance/dist/substance'
import ArticlePackage from './ArticlePackage'

const defaultHTML = '<html><body><h1>Untitled</h1></body></html>'

export default class ArticleEditor extends React.Component {
  componentDidMount () {
    const { html, save } = this.props

    const configurator = new Configurator()
    configurator.import(ArticlePackage)

    const importer = configurator.createImporter('html')
    const exporter = configurator.createExporter('html')

    const doc = importer.importDocument(html || defaultHTML)

    const editorSession = new EditorSession(doc, { configurator })

    editorSession.setSaveHandler({
      saveDocument: ({ editorSession }) => {
        const html = exporter.exportDocument(editorSession.getDocument())

        return save({ html })
      }
    })

    // save after 1 sec of inactivity
    editorSession.getDocument().on('document:changed', () => {
      if (this.saveTimer) {
        window.clearTimeout(this.saveTimer)
      }

      this.saveTimer = window.setTimeout(() => {
        editorSession.save()
      }, 1000)
    })

    // ask before leaving if unsaved
    window.addEventListener('beforeunload', event => {
      if (editorSession.hasUnsavedChanges()) {
        const text = 'There are unsaved changes: are you sure you want to leave the editor?'

        event.returnValue = text

        return text
      }
    })

    ProseEditor.mount({ editorSession }, this.editor)
  }

  render () {
    return <div ref={node => (this.editor = node)}/>
  }
}
