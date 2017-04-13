import { ProseEditorPackage, PersistencePackage } from 'substance/dist/substance'

import ArticleImporter from './ArticleImporter'
import ArticleExporter from './ArticleExporter'

export default {
  name: 'article',
  configure: config => {
    // config.defineSchema({
    //   name: 'prose-article',
    //   ArticleClass: ProseArticle,
    //   defaultTextType: 'paragraph'
    // })
    config.import(ProseEditorPackage)
    config.import(PersistencePackage)

    config.addImporter('html', ArticleImporter)
    config.addExporter('html', ArticleExporter)
  }
}
