import React from 'react'
import ApplicationStore from '../stores/ApplicationStore'

class Html extends React.Component {
  render () {
    return (
      <html>
        <head lang='pt-BR'>
          <meta charSet='utf-8' />
          <title>{this.props.context.getStore(ApplicationStore).getPageTitle()}</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='stylesheet' href='/public/styles/app.css' />
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
          <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
          <script src='/public/bundle.js' defer></script>
        </body>
      </html>
    )
  }
}

Html.propTypes = {
  markup: React.PropTypes.string,
  context: React.PropTypes.object,
  state: React.PropTypes.string
}

export default Html
