import React from 'react';

import FileCompare from '../components/FileCompare';

export default class CompareFiles extends React.Component {

  tick() {
    console.log('tick...');
    this.props.onClick(0);
  }

  componentDidMount() {
    console.log('componentDidMount...');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount...');
  }

  render() {
    const style = {
      borderColor: 'green',
      borderStyle: 'solid',
      borderWidth: '2px',
      height: this.props.windowHeight + 'px'
    };
    return (
      <div style={style}>
        <div onClick={this.tick.bind(this)}>
          Click Me : CompareFiles... {this.props.clicks}
        </div>
        <FileCompare primaryFile={this.props.primaryFile} secondaryFile={this.props.secondaryFile} />
      </div>
    );
  }
}
