import React from 'react';

import FileSelector from '../components/FileSelector';

export default class SelectFiles extends React.Component {
  tick() {
    console.log('tick...');
    this.props.onClick(1);
  }

  render() {
    const style = {
      borderColor: 'red',
      borderStyle: 'solid',
      borderWidth: '2px',
      height: this.props.windowHeight + 'px'
    };
    const styleLeft = {
      width: '49%',
      float: 'left',
      height: this.props.windowHeight + 'px',
      marginLeft: '5px'
    };
    const styleRight = {
      width: '49%',
      float: 'right',
      height: this.props.windowHeight + 'px',
      marginRight: '5px'
    };
    return (
      <div style={style}>
        <div onClick={this.tick.bind(this)}>
          Click Me : SelectFiles... {this.props.clicks}
        </div>
        <div style={styleLeft}>
          <FileSelector type='primary' setPrimaryFile={this.props.setPrimaryFile} primaryFile={this.props.primaryFile} windowHeight={this.props.windowHeight}/>
        </div>
        <div style={styleRight}>
          <FileSelector type='secondary' setPrimaryFile={this.props.setPrimaryFile} secondaryFile={this.props.secondaryFile} windowHeight={this.props.windowHeight}/>
        </div>
      </div>
    );
  }
}
