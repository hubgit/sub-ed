import { HTMLImporter, ProseArticle } from 'substance/dist/substance'

export default class ArticleImporter extends HTMLImporter {
  constructor (config) {
    super({
      schema: config.schema,
      converters: config.converters,
      DocumentClass: ProseArticle
    })
  }

  convertDocument (input) {
    this.convertContainer(Array.isArray(input) ? input : [input], 'body')
  }
}
