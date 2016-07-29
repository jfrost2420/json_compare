import React from 'react';
export default class FileCompare extends React.Component {

  flattenJSON(data) {
    //var data = this.props.primaryFile;
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

  generateFileComparission() {
    //flatten the primaryFile
    //flatten the secondaryFile

    //iterate over the primary file and for each key create a new json object:
      /* {
            <flattened_key>: {parimaryValue: '', secondaryValue: ''}
         } */

    var comparrisonObject = {};

    var primaryFlattenFile = '';
    var secondaryFlattenFile = '';
    primaryFlattenFile = this.flattenJSON(this.props.primaryFile); //JSON.stringify(this.flattenJSON(this.props.primaryFile), null, ' '); // JSON.stringify(this.props.primaryFile, null, ' ');
    secondaryFlattenFile = this.flattenJSON(this.props.secondaryFile);

    for (var obj in primaryFlattenFile) {
      console.log(obj);

      comparrisonObject[obj] = {primaryValue: primaryFlattenFile[obj]};

      if (secondaryFlattenFile[obj]) {
        console.log('found in secondary');
        comparrisonObject[obj].secondaryValue = secondaryFlattenFile[obj];

      }
      else {
        console.log('not found in secondary');
        comparrisonObject[obj].secondaryValue = '';
      }
    }

    return comparrisonObject;
  }

  componentDidMount() {
    console.log('componentDidMount...');
    if (this.props.primaryFile) {
      //this.flattenJSON();
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount...');
  }

  render() {
    const style = {
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: '2px',
      height: this.props.windowHeight + 'px'
    };

    var data = '';
    data = JSON.stringify(this.generateFileComparission(), null, ' ');


    return (
      <div style={style}>
        FileCompare....
        <pre>
          {data}
        </pre>
      </div>
    );
  }
}
