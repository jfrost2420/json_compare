import React from 'react';
export default class FileSelector extends React.Component {

  handleFileSelect(e) {
    console.log('file event data:',e);

    var reader = new FileReader();
    var contents;

    /*
    reader.onload = (file) => {
      console.log('file:',file);
      contents = file.target.result;
    };
    */
    var readerOnload = function(file) {
      console.log('file:',file);
      contents = file.target.result;
      this.props.setPrimaryFile(this.props.type, contents);
    };

    reader.onload = readerOnload.bind(this);

    reader.readAsText(e.target.files[0]);
  }

  componentDidMount() {
    this.refs.myFiles.addEventListener('change', this.handleFileSelect.bind(this), false);
  }

  componentWillUnmount() {
    this.refs.myFiles.removeEventListener('change', this.handleFileSelect, false);
  }

  render() {
    const style = {
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: '2px'
    };

    var data = '';
    if(this.props.type === 'primary') {
      data = JSON.stringify(this.props.primaryFile, null, ' ');
    }
    else {
      data = JSON.stringify(this.props.secondaryFile, null, ' ');
    }

    return (
      <div style={style}>
      	File Selecor...
        <input type="file" ref="myFiles" name="files[]" multiple />

        <pre>
          {data}
        </pre>
      </div>

    );
  }
}