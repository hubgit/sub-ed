import { HTMLExporter } from 'substance/dist/substance'

export default class ArticleExporter extends HTMLExporter {
  convertDocument (doc) {
    const elements = this.convertContainer(doc.get('body'))

    return elements.map(el => el.outerHTML).join('')
  }
}
