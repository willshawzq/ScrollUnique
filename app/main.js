import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import ScrollUnique from './App';

class App extends  Component{
  renderUl() {
    let lis = [];
    for(let i = 0; i < 100; i++) {
      lis.push(<li key={i}>{i}</li>);
    }
    return <ul>{lis}</ul>;
  }
  render() {
    return <ScrollUnique
              width={400}
              height={500}
            >
            {this.renderUl()}
           </ScrollUnique>;
  }
}

render(
  <App />,
  document.querySelector("#root")
);
