# sub-ed
A React component providing [Substance](https://github.com/substance/substance) as an HTML editor

## Usage

```js
// import the ArticleEditor component
import ArticleEditor from 'sub-ed'

// import the Substance and Font Awesome styles
import 'sub-ed/dist/styles.css'

const containerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden'
}

class Foo extends React.Component {
  updateArticle = ({ html }) => {
    // update the saved article
  }
  
  render () {
    const { article } = this.state

    return (
      <div style={containerStyle}>
        <ArticleEditor html={article.html} save={this.updateArticle}/>
      </div>
  }
}
```
