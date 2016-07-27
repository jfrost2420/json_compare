import React from 'react';
export default class CompareFiles extends React.Component {

  tick() {
    console.log('tick...');
    this.props.onClick(0);
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
      </div>
    );
  }
}
