// Program that reads the raw data and adds up the scores for each month and for each gender
const csv = require('fast-csv');

// Total gender count
var maleCount = 0;
var femaleCount = 0;

// total gender score
var maleScore = 0;
var femaleScore = 0;
// Average score for each month
var forthYear = {
  Jan: 0,
  Feb: 0,
  Mar: 0
}

// Total score for each gender for each month
var monthGender = {
  Jan:{
    male:0,
    female:0
  },
  Feb:{
    male:0,
    female:0
  },
  Mar:{
    male:0,
    female:0
  },
}

// Reads data from csv
csv
  .fromPath("./Data/2017_1st_quarter_raw_data.csv")
  .on("data", function(data){
      // Grabs relevant data from csv
      var objGender = '';
      var gender = data[1];
      var checkNum = parseInt(data[7]);
      var date = data[8];
      // Filters based off gender
        if(gender == '0'){
          objGender = 'male';
          maleScore += checkNum;
          maleCount++;
        }
        else if(gender == '1'){
          objGender = 'female';
          femaleCount++;
          femaleScore += checkNum;
        }
        var dateSplit = data[8].split('/');
        var month = dateSplit[0];
        switch(month){
          case "1" :
            forthYear.Jan += checkNum;
            monthGender.Jan[objGender] += checkNum;
            break;
          case "2" :
            monthGender.Feb[objGender] += checkNum;
            forthYear.Feb += checkNum;
            break;
          case "3" :
            monthGender.Mar[objGender] += checkNum;
            forthYear.Mar += checkNum;
            break;
        }
  })
  .on("end", function(){
    console.log(JSON.stringify(forthYear) + femaleCount  + ':' + femaleScore + "  " + maleCount +':' + maleScore);
    console.log(JSON.stringify(monthGender));
  });
