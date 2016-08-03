import React from 'react';

export default class FileCompare extends React.Component {

  flattenJSON(data) {

    var result = {};

    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (var i = 0, l = cur.length; i < l; i++)
            recurse(cur[i], prop + "[" + i + "]");
            if (l == 0) result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + "." + p : p);
            }
            if (isEmpty && prop) result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
  }

  unflattenJSON(data) {
    "use strict";
    if (Object(data) !== data || Array.isArray(data)) return data;
    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
    resultholder = {};
    for (var p in data) {
        var cur = resultholder,
            prop = "",
            m;
        while (m = regex.exec(p)) {
            cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
            prop = m[2] || m[1];
        }
        cur[prop] = data[p];
    }
    return resultholder[""] || resultholder;
  }

  generateFileComparission() {
    var comparrisonObject = {};
    var primaryFlattenFile = '';
    var secondaryFlattenFile = '';

    primaryFlattenFile = this.flattenJSON(this.props.primaryFile); //JSON.stringify(this.flattenJSON(this.props.primaryFile), null, ' '); // JSON.stringify(this.props.primaryFile, null, ' ');
    this.secondaryFlattenFile = this.flattenJSON(this.props.secondaryFile);

    for (var obj in primaryFlattenFile) {
      //console.log(obj);

      comparrisonObject[obj] = {primaryValue: primaryFlattenFile[obj]};
      comparrisonObject[obj].key = obj;

      if (this.secondaryFlattenFile[obj]) {
        //console.log('found in secondary');
        comparrisonObject[obj].secondaryValue = this.secondaryFlattenFile[obj];

      }
      else {
        //console.log('not found in secondary');
        comparrisonObject[obj].secondaryValue = '';
      }
    }

    return comparrisonObject;
  }

  onUpdateClicked(e, key) {
    console.log('onUpdateClicked...', this.refs[key].value)
    console.log('original value...', this.secondaryFlattenFile[key]);

    this.secondaryFlattenFile[key] = this.refs[key].value;
  }

  onSaveClicked(e) {
    var data = this.unflattenJSON(this.secondaryFlattenFile);
    var json = JSON.stringify(data, null, ' ');
    var blob = new Blob([json], {type: "application/json"});
    var url  = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.download    = "new_translated_file.json";
    a.href        = url;
    a.textContent = "new_translated_file.json";

    this.refs.contentDownload.appendChild(a);
  }

  render() {
    const style = {
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: '1px',
      height: this.props.windowHeight - 100 + 'px',
      overflowY: 'scroll'
    };

    const cellStyle = {
      width: '30%',
      overflowX: 'scroll'
    };

    const editCellStyle = {
      width: '35%'
    };

    const updateCellStyle = {
      width: '5%'
    };

    const tableStyle = {
      tableLayout: 'fixed',
      width: '100%'
    };

    const inputStyle = {
      width: '100%'
    };

    const saveButtonStyle= {
      marginTop: '5px',
      marginRight: '5px'
    };

    var data = this.generateFileComparission();
    var displayData;
    var rows = [];

    var buildRows = function(key) {
      return rows.push(<tr key={key}>
                            <td style={cellStyle}><span>{key}</span></td>
                            <td style={cellStyle}><span>{data[key].primaryValue}</span></td>
                            <td style={editCellStyle}><input ref={key} style={inputStyle} placeholder="value" defaultValue={data[key].secondaryValue}></input></td>
                            <td><button type="button" className="btn btn-default btn-xs" onClick={e => this.onUpdateClicked(e.target, key)}>update</button></td>
                          </tr>);
    };

    Object.keys(data).map(buildRows.bind(this))
    
    return (
      <div>
      <div style={style}>
        <table style={tableStyle} className="table table-striped">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
      <button type="button" className="btn btn-primary pull-right" style={saveButtonStyle} onClick={e => this.onSaveClicked(e.target)}>Create New Translated File</button><span id="contentDownload" ref="contentDownload"></span>
      </div>
    );
  }
}

