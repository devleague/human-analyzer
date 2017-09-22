const csv = require('fast-csv');

var maleCount= 0;
var femaleCount = 0;

var month = {
  Jan: {
    male: 0,
    female: 0
  },
  Feb: {
    male: 0,
    female: 0
  },
  Mar: {
    male: 0,
    female: 0
  },
  Apr: {
    male: 0,
    female: 0
  },
  May: {
    male: 0,
    female: 0
  },
  June: {
    male: 0,
    female: 0
  }
};

csv
  .fromPath("./Data/2016 Scores.csv")
  .on("data", function(data){
      var gender = data[2];
      var score = data[3];
      var date = data[4];
      var objGender = '';
        if(gender == "Female"){
          objGender = 'female';
          femaleCount++;
        }
        else if(gender == "Male"){
          objGender = 'male';
          maleCount++;
        }
        var dateSplit = date.split('/');
        var monthCount = dateSplit[0];
        switch(monthCount){
          case "1" :
            month.Jan[objGender]+= parseInt(score);
            break;
          case "2" :
            month.Feb[objGender]+= parseInt(score);
            break;
          case "3" :
            month.Mar[objGender]+= parseInt(score);
            break;
          case "4" :
            month.Apr[objGender]+= parseInt(score);
            break;
          case "5" :
            month.May[objGender]+= parseInt(score);
            break;
          case "6" :
            month.June[objGender]+= parseInt(score);
            break;
        }
  })
  .on("end", function(){
    console.log(JSON.stringify(month));
  });