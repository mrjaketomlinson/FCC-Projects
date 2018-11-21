import React, { Component } from 'react';
import marked from 'marked';
import './App.css';

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  const linkInNewTab = marked.Renderer.prototype.link.call(this, href, title, text);
  return linkInNewTab.replace("<a","<a target='_blank' ");
};

marked.setOptions({
  breaks: true,
  renderer: renderer,
  sanitize: true
});

class App extends Component {
  constructor(props) {
    super(props);
    const defaultMarkdown =
    `# Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:

  Heres some code, \`<div></div>\`, between 2 backticks.

  \`\`\`
  // this is multi-line code:

  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`

  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.

  There's also [links](https://www.freecodecamp.com), and
   > Block Quotes!

  And if you want to get really crazy, even tables:

  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.

  - And of course there are lists.
    - Some are bulleted.
        - With different indentation levels.
          - That look like this.


  1. And there are numbererd lists too.
  1. Use just 1s if you want!
  1. But the list goes on...
  - Even if you use dashes or asterisks.
  * And last but not least, let's not forget embedded images:

  ![React Logo w/ Text](https://goo.gl/Umyytc)
  `;

    this.state = {
      input: defaultMarkdown
    }
    this.renderMarkdown = this.renderMarkdown.bind(this);
    this.convertToMarkdown = this.convertToMarkdown.bind(this);
  }
  renderMarkdown(event) {
    this.setState({input: event.target.value});
  }
  convertToMarkdown() {
    let markdown = marked(this.state.input);
    return ({__html : markdown});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Markdown Previewer</h1>
        </header>
        <p className="App-intro">
          Change the markdown in the editor below and a preview of your markdown
          will display in the markdown previewer.
        </p>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 align-items-center align-self-center">
              <h2>Editor</h2>
              <textarea id="editor"
                type="text"
                value={this.state.input}
                onChange={event => this.renderMarkdown(event)} />
            </div>
            <div className="col-lg-6 align-items-center align-self-center">
              <h2>Markdown Previewer</h2>
              <div id="preview" dangerouslySetInnerHTML={this.convertToMarkdown()}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
