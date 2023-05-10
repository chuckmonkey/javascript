var months=["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

var HSLdays=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var HSLmonths=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var HSLdaysinmonth=[31,28,31,30,31,30,31,31,30,31,30,31];

function typeCheck(value) {
  /*
   * 04 may 2023 [cm] .. return data type of value
   */
  const return_value = Object.prototype.toString.call(value);
  // we can also use regex to do this...
  const type = return_value.substring(
           return_value.indexOf(" ") + 1, 
           return_value.indexOf("]"));

  return type.toLowerCase();
}

// A collection of functions related to dates, checking leap years, number of days per month, etc
function isLeapYear(year) {
  // 02 may 2023 [cm] .. return true if leap year
  var bLeapYear=false;
  
  if (!(year%400)) {
    bLeapYear=true;
  } else if (!(year%100)) {
    bLeapYear=false;
  } else if (!(year%4)) {
    bLeapYear=true;
  } else {
    bLeapYear=false;
  }
  return bLeapYear;
}

function getDaysInYear(year) {
  // 02 may 2023 [cm] .. return number of days in year
  var numofdays=365;
  if (isLeapYear(year)) numofdays++;
  return numofdays;
}

function getDaysInMonth(year, month) {
  // 02 may 2023 [cm] .. return number of days in month, for give year
  var numofdays=HSLdaysinmonth[(month-1)];
  if ((month===2) && (isLeapYear(year))) {
    numofdays=29;
  }
  return numofdays;
}

function countDays(startDate, endDate) {
  /*
   * 04 may 2023 [cm] .. count number of days between 2 dates -- dates must be YYYYMMDD format, no spaces
   *                     In Javascript you could just subtract one date from another, but the purpose of this function
   *                     is to not use Dates and also ignore time zones and times.
   *                     You just call this function: var iDays=countDays(20150501, 20160525) and it returns 25
   *                     The problem with subtracting Javascript dates, then dividing by number of milliseconds in a day, is that 
   *                     if the times of each date are different, it affects the overall calculation.
   */
  var counter=0;
  var thisDate="";
  var workYear="";
  var workMonth="";
  var workDay="";
  
  var startYear =parseInt((startDate+"").substring(0,4));
  var endYear   =parseInt((endDate+"").substring(0,4));
  
  var bNegative=0;
  
  if (startDate<endDate) {
    startDate = [endDate, endDate = startDate][0];
    bNegative=true;
  }
  
  var dayCounter=0;

  if ((startYear-endYear)>=2) {
    // Calculate number of days from start date to start of the same year.
    // ie from 1972-11-04 until 1972-01-01
    var startOfYear=parseInt(startYear+"01"+"01");
    dayCounter+=countDays(startDate, startOfYear);
  
    // Then calculate number of days from end date to end of the same year.
    // ie 1967-09-05 to 1967-12-31
    var endOfYear=parseInt(endYear+"12"+"31");
    dayCounter+=countDays(endOfYear, endDate);
  
    // This speeds up counting the number of days by counting the whole years all at once (and checking for leap years)
    while ((startYear-endYear)>=2) {
      var thisYear=startYear-1;
      var numdaysthisYear=getDaysInYear(thisYear);
      
      dayCounter+=numdaysthisYear;
      
      startYear--;
    }
    
    dayCounter+=1;
    
    counter=dayCounter+0;
    if (bNegative) {
      counter=0-counter;
    }

    return counter;
  
  } else {
    
    dayCounter=0;
    while (startDate>endDate) {
      dayCounter++;

      thisDate=startDate+"";
      workYear =parseInt(thisDate.substring(0,4));
      workMonth=parseInt(thisDate.substring(4,6));
      workDay  =parseInt(thisDate.substring(6,8));

      workDay--;
      if (workDay<=0) {
        workMonth--;
        if (workMonth<=0) {
          workMonth=12;
          workYear--;
        }
        var daysThisMonth=getDaysInMonth(workYear, (workMonth));
        workDay=daysThisMonth;
      }

      workMonth=(workMonth+"").padStart(2,"0");
      workDay  =(workDay+"").padStart(2,"0");

      if ((workMonth+"").length<2) {
        workMonth="0"+workMonth;
      }
      if ((workDay+"").length<2) {
        workDay="0"+workDay;
      }
      startDate=parseInt(workYear+""+workMonth+""+workDay);

      // To prevent excessive loops, check if > 100 years
      if (dayCounter>(365*100)) {
        break;
      }
    }
  
  }
  
  counter=dayCounter+0;
  if (bNegative) {
    counter=0-counter;
  }

  return counter;  
}


function getNumDays(dtDate1, dtDate2) {
  /*
   * 02 may 2023 [cm] .. return number of days between 2 dates
   *                     given 2 dates (check to make sure they are dates), get the year,month,day and call countDays to get the number of days between the dates
   */ 
  
  var sDate1="";
  var sDate2="";
  
  sDate1=dtDate1;
  if (typeCheck(dtDate1)==="date") {
    var sYear1 =dtDate1.getFullYear();
    var sMonth1=dtDate1.getMonth()+1;
    var sDay1  =dtDate1.getDate();
    sMonth1=(sMonth1+"").padStart(2,"0");
    sDay1=(sDay1+"").padStart(2,"0");
    sDate1=sYear1+""+sMonth1+""+sDay1;
  }
  
  sDate2=dtDate2;
  if (typeCheck(dtDate2)==="date") {
    var sYear2 =dtDate2.getFullYear();
    var sMonth2=dtDate2.getMonth()+1;
    var sDay2  =dtDate2.getDate();
    sMonth2=(sMonth2+"").padStart(2,"0");
    sDay2=(sDay2+"").padStart(2,"0");
    sDate2=sYear2+""+sMonth2+""+sDay2;
  }
  
  var numDays=countDays(sDate1, sDate2);
  return numDays;
}

function getToday() {
  // 02 may 2023 [cm] .. Get today's date in yyyy-mm-dd format
  var thisDate=new Date();
  var today = thisDate.getFullYear()+'-'+("0"+(thisDate.getMonth()+1)).slice(-2)+'-'+("0"+thisDate.getDate()).slice(-2);
  return today;
}
