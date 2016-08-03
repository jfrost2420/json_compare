import React from 'react';

import FileSelector from '../components/FileSelector';

export default class SelectFiles extends React.Component {

  render() {
    const style = {
      borderColor: 'red',
      borderStyle: 'solid',
      borderWidth: '0px',
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
    const compareButtonStyle = {
      margin: '5px'
    }
    return (
      <div style={style}>
        <div>
          <button type="button" className="btn btn-primary" style={compareButtonStyle} onClick={e => this.props.onClick(1)}>Compare Files</button>
        </div>
        <div style={styleLeft}>
          <FileSelector type='primary' setFile={this.props.setFile} primaryFile={this.props.primaryFile} windowHeight={this.props.windowHeight}/>
        </div>
        <div style={styleRight}>
          <FileSelector type='secondary' setFile={this.props.setFile} secondaryFile={this.props.secondaryFile} windowHeight={this.props.windowHeight}/>
        </div>
      </div>
    );
  }
}
