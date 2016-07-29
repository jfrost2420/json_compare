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
      this.props.setFile(this.props.type, contents);
    };

    reader.onload = readerOnload.bind(this);

    reader.readAsText(e.target.files[0]);
  }

  handleSaveFileClick() {
    var data;

    if (this.props.type === 'primary') {
      data = this.props.primaryFile;
    }
    else {
      data = this.props.secondaryFile;
    }

    var json = JSON.stringify(data, null, ' ');
    var blob = new Blob([json], {type: "application/json"});
    var url  = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.download    = "backup.json";
    a.href        = url;
    a.textContent = this.props.type + "_translated_lang.json";

    this.refs.contentDownload.appendChild(a);
  }

  componentDidMount() {
    this.refs.myFiles.addEventListener('change', this.handleFileSelect.bind(this), false);
    this.refs.saveFile.addEventListener('click', this.handleSaveFileClick.bind(this), false);
  }

  componentWillUnmount() {
    this.refs.myFiles.removeEventListener('change', this.handleFileSelect, false);
    this.refs.saveFile.removeEventListener('click', this.handleSaveFileClick, false);
  }

  render() {
    const style = {
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: '2px',
      height: this.props.windowHeight - 50 + 'px',
      overflowY: 'scroll'
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
        
      	<input className="btn btn-primary btn-xs" type="button" value="download file..." ref="saveFile" /><span id="contentDownload" ref="contentDownload"></span>
        <input type="file" ref="myFiles" name="files[]" multiple />

        <pre>
          {data}
        </pre>
      </div>

      

    );
  }
}