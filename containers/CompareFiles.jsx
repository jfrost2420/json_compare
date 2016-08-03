import React from 'react';

import FileCompare from '../components/FileCompare';

export default class CompareFiles extends React.Component {

  render() {
    const style = {
      borderColor: 'green',
      borderStyle: 'solid',
      borderWidth: '0px',
      height: this.props.windowHeight + 'px'
    };
    const compareButtonStyle = {
      margin: '5px'
    }
    return (
      <div style={style}>
        <div>
          <button type="button" className="btn btn-primary" style={compareButtonStyle} onClick={e => this.props.onClick(0)}>Select Files</button>
        </div>
        <FileCompare primaryFile={this.props.primaryFile} secondaryFile={this.props.secondaryFile} windowHeight={this.props.windowHeight} />
      </div>
    );
  }
}
