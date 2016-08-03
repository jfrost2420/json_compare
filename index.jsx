require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
import React from 'react';
import ReactDOM from 'react-dom';

import FileSelector from './containers/SelectFiles';
import FileCompare from './containers/CompareFiles';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      step: 0,
      windowHeight: 0,
      primaryFile: null,
      secondaryFile: null
    };
  }
  
  switchViews(value) {
    this.setState({step: value, count: this.state.count + 1});
  }

  setFile(type, data) {
    if (type === 'primary') {
      this.setState({primaryFile: JSON.parse(data)});
    }
    else {
      this.setState({secondaryFile: JSON.parse(data)});
    }
    
  }

  showStep() {
    switch(this.state.step) {
      case 0:
        return <FileSelector 
                    onClick={this.switchViews.bind(this)} 
                    clicks={this.state.count} 
                    setFile={this.setFile.bind(this)} 
                    primaryFile={this.state.primaryFile} 
                    secondaryFile={this.state.secondaryFile} 
                    windowHeight={this.state.windowHeight}/>
      case 1:
        return <FileCompare 
                    onClick={this.switchViews.bind(this)} 
                    clicks={this.state.count} 
                    primaryFile={this.state.primaryFile} 
                    secondaryFile={this.state.secondaryFile} 
                    windowHeight={this.state.windowHeight}/>
    }
  }

  handleResize() {
    this.setState({windowHeight: window.innerHeight - 110});
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  
  render() {
    const style = {
      marginLeft: '50px',
      marginRight: '50px'
    };
    return (
      <div style={style}>
        {this.showStep()}
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector("#content"));
