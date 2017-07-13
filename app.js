var app = angular.module('app', ['simpleGrid']);

app.controller('MainCtrl', function($scope,$http) {
  $scope.delimiter = ';';
  $scope.fileData = [];
  $scope.fileHeaders = [];
  $scope.myGridConfig = {
      // should return your data (an array)        
      getData: function () { return $scope.fileData; }, 
            
      options: { 
          showDelete: true,
          columns:$scope.fileHeaders
      }
  }

  var CSVToArray = function ( strData, strDelimiter ){
      // Check to see if the delimiter is defined. If not,
      // then default to comma.
      strDelimiter = (strDelimiter || ",");

      // Create a regular expression to parse the CSV values.
      var objPattern = new RegExp(
          (
              // Delimiters.
              "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

              // Quoted fields.
              "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

              // Standard fields.
              "([^\"\\" + strDelimiter + "\\r\\n]*))"
          ),
          "gi"
          );


      // Create an array to hold our data. Give the array
      // a default empty first row.
      var arrData = [[]];

      // Create an array to hold our individual pattern
      // matching groups.
      var arrMatches = null;


      // Keep looping over the regular expression matches
      // until we can no longer find a match.
      while (arrMatches = objPattern.exec( strData )){

          // Get the delimiter that was found.
          var strMatchedDelimiter = arrMatches[ 1 ];

          // Check to see if the given delimiter has a length
          // (is not the start of string) and if it matches
          // field delimiter. If id does not, then we know
          // that this delimiter is a row delimiter.
          if (
              strMatchedDelimiter.length &&
              strMatchedDelimiter !== strDelimiter
              ){

              // Since we have reached a new row of data,
              // add an empty row to our data array.
              arrData.push( [] );

          }

          var strMatchedValue;

          // Now that we have our delimiter out of the way,
          // let's check to see which kind of value we
          // captured (quoted or unquoted).
          if (arrMatches[ 2 ]){

              // We found a quoted value. When we capture
              // this value, unescape any double quotes.
              strMatchedValue = arrMatches[ 2 ].replace(
                  new RegExp( "\"\"", "g" ),
                  "\""
                  );

          } else {

              // We found a non-quoted value.
              strMatchedValue = arrMatches[ 3 ];

          }


          // Now that we have our value string, let's add
          // it to the data array.
          arrData[ arrData.length - 1 ].push( strMatchedValue );
      }

      // Return the parsed data.
      return( arrData );
  }

  $scope.handleData = function (content){
    var fileData = [];
    var fileHeaders = [];
    var jsonFile =  CSVToArray(content.trim(),$scope.delimiter);
    var headers = jsonFile.shift();

    debugger;
    for (var i = 0; i < headers.length; i++) {
        var element = headers[i];
        $scope.fileHeaders.push({field:element});
    }
    for (var k = 0; k < jsonFile.length; k++) {
        var row = jsonFile[k];
        var columns = [];
        for (var j = 0; j < row.length; j++) {
            var element = row[j];
            var fieldName = headers[j];
            columns[fieldName] = element;
        }
        $scope.fileData.push(columns);
    }
    // $scope.fileData = fileData;
    // $scope.fileHeaders = fileHeaders;
  }

  $scope.sendData = function () {
    debugger;
     $http.post("/slimApi/api/index.php/insert",{data:$scope.fileData })
      .then(function(response) {
          debugger;
      });
  }

});

app.directive('fileReader', function() {
  return {
    scope: {
      fileReader:"="
    },
    link: function(scope, element) {
      $(element).on('change', function(changeEvent) {
        var files = changeEvent.target.files;
        if (files.length) {
          var r = new FileReader();
          r.onload = function(e) {
              var contents = e.target.result;
              scope.$apply(function () {
                scope.fileReader(contents);
              });
          };
          
          r.readAsText(files[0]);
        }
      });
    }
  };
});