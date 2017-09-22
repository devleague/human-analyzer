// Given the test data provided for previous years, we need you to calculate the following about the applicant pool:

//   - How many applicants do we get on average per month?
//   - What percentage of those applicants are female (on average)?
//   - How many applicants do we get on average for each of the 6 months for each gender?
//   - Do any of the months stand out in any way? Should we prepare differently for any month(s)?

// Given the data provided for the first quarter (Jan-Mar) of 2017, we need you to calculate the following:
//   - What is the average score per month?
//   - What is the average score per gender?

// Given the data provided for the first quarter (Jan-Mar) of 2017, we need you to calculate the following projections for the 2nd quarter (Apr-Jun) so we can plan accordingly for our next launch:
//   - How many applicants can we expect for the second quarter?
//   - What can we expect the average score of applicants to be by gender?
//   - What suggestions can you make based on the formatting of the raw data to make this process easier in the future?

const csv = require('fast-csv');

var maleCount = 0;
var femaleCount = 0;

var maleScore = 0;
var femaleScore = 0;
var forthYear = {
  Jan: 0,
  Feb: 0,
  Mar: 0
}
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


csv
  .fromPath("./Data/2017_1st_quarter_raw_data.csv")
  .on("data", function(data){
      var objGender = '';
      var gender = data[1];
      var checkNum = parseInt(data[7]);
      var date = data[8];
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
