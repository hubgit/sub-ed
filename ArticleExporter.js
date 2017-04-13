import HTMLExporter from 'substance/model/HTMLExporter'

export default class ArticleExporter extends HTMLExporter {
  convertDocument (doc) {
    const elements = this.convertContainer(doc.get('body'))

    return elements.map(el => el.outerHTML).join('')
  }
}
