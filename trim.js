var months="JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC".split(",");

var HSLdays="Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(",");
var HSLmonths="January,February,March,April,May,June,July,August,September,October,November,December".split(",");

const HSLdayNum = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
};

var hlMale="Male";
var hlFemale="Female";
var hlUnassigned="Unassigned";
var hlStudent="Student";
var hlStudents="Students";

var iNumIndivStudents=0;
var iNumMale=0;
var iNumFemale=0;
var iNumUnassigned=0;

var AJAX_URL_ENCODE="application/x-www-form-urlencoded";
var AJAX_CONTENT_TYPE="Content-type";
var CHARSET_UTF8="charset=UTF-8";
var AJAX_MULTIPART_FORM="multipart/form-data; charset=UTF-8; boundary=UUID;";

var ASYNC=false;
var ASYNC_TRUE=true;
var ASYNC_FALSE=false;

var AJAX_TIMEOUT=10000;

var MEGABYTE=1024*1024;
var KB=1024;
var MB=1024*1024;

var AJAXtimeout=false;
var AJAXloading=false;

var STR_SAVING          ="Saving...";
var TAB="\t";
var CRLF="\r\n";
var CR="\n";
var PX="px";
var NBSP="&nbsp;";
var NBSP4="&nbsp;&nbsp;&nbsp;&nbsp;";
var COMMA=", ";

// XML tags

// misc
var XMLmode ="mode";
var XMLcmd  ="cmd";
var XMLdup  ="dup";
var XMLttl  ="ttl";
var XMLdata ="data";
var XMLitem ="item";

// discip
var XMLdiscip       ="st_discipline";
var XMLdisID        ="st_dis_id";
var XMLdisPersonID  ="st_person_id";
var XMLdisDate      ="st_date";
var XMLdisMisID     ="st_mis_id";
var XMLdisMisconduct="st_misconduct";
var XMLdisPenID     ="st_pen_id";
var XMLdisPenalty   ="st_penalty";
var XMLdisLocID     ="st_loc_id";
var XMLdisLocation  ="st_location";
var XMLdisResID     ="st_res_id";
var XMLdisReason    ="st_reason";
var XMLdisTeachers  ="st_teachers";
var XMLdisPoints    ="st_points";
var XMLdisDone      ="st_done";
var XMLdisNotes     ="st_notes";
var XMLdisCompleted ="st_completed";

// accounts
var XMLaccounts     ="st_accounts";
var XMLaccID        ="id";
var XMLaccPersonID  ="personid";
var XMLacc          ="acc";
var XMLaccTypeID    ="acctypeid";
var XMLaccBilled    ="billed";
var XMLaccPaid      ="paid";
var XMLaccBalance   ="balance";
var XMLaccPayment   ="payment";
var XMLaccPaymentID ="paymentid";
var XMLaccDate      ="date";
var XMLaccNotes     ="notes";

// course
var XMLcrs            ="course";
var XMLcrsID          ="crsID";
var XMLcrsNumber      ="crsNumber";
var XMLcrsShortName   ="crsShortName";
var XMLcrsLongName    ="crsLongName";
var XMLcrsForeignName ="crsForeignName";
var XMLcrsLimit       ="crsLimit";
var XMLcrsMaxSize     ="crsMaxSize";
var XMLcrsTerms       ="crsTerms";
var XMLcrsDays        ="crsDays";
var XMLcrsPeriods     ="crsPeriods";
var XMLcrsType        ="crsType";
var XMLcrsYear        ="crsYear";
var XMLcrsMinCode     ="crsMinCode";
var XMLcrsMinLvl      ="crsMinLvl";
var XMLcrsMinType     ="crsMinType";
var XMLcrsNotes       ="crsNotes";
var XMLcrsColorCode   ="crsColorCode";
var XMLcrsCredits     ="crsCredits";
var XMLcrsWeights     ="crsWeights";
var XMLcrsLeader      ="crsLeader";
var XMLcrsResGroupID  ="crsResGroupID";
var XMLcrsImpPrds     ="crsImpPrds";
var XMLcrsFixPrds     ="crsFixPrds";
var XMLcrsGrp         ="crsGrp";
var XMLcrsLayer       ="crsLayer";
var XMLcrsMinBAA      ="crsMinBAA";
var XMLcrsMinSubject  ="crsMinSubject";

// section
var XMLsection      ="section";
var XMLsecMasID     ="masID";
var XMLsecCrsID     ="crsID";
var XMLsecNumber    ="secNumber";
var XMLsecRoomID    ="secRoomID";
var XMLsecRoomName  ="secRoomName";
var XMLsecLimit     ="secLimit";
var XMLsecGroup     ="secGroup";
var XMLsecTchrID    ="secTchrID";
var XMLsecTchr      ="secTchr";
var XMLsecTchrName  ="secTchrName";
var XMLsecPd        ="secPd";
var XMLsecDy        ="secDy";
var XMLsecTm        ="secTm";
var XMLsecExclude   ="secExclude";
var XMLsecBlockCode ="secBlockCode";


var YN=["Y","N"];
var YESNO=["Y","N"];

/* window.onload=setDarkMode; */
function setDarkMode() {
  /*
   * 15 nov 2020 [cm] .. Check time, set <body> css for dark mode
   */
  var today=new Date();
  var thisHour=today.getHours();
  var thisMin=today.getMinutes();

  var darkAM=[6,0];   /* 6:00am */
  var darkPM=[20,0];  /* 20:00pm */

  var startAM=((darkAM[0])*60)+((darkAM[1]))
  var startPM=((darkPM[0])*60)+((darkPM[1]));

  var rightNow=(thisHour*60)+thisMin;
  if ((rightNow<=startAM) || (rightNow>=startPM)) {
    var thisBody=document.getElementsByTagName("body");
    if (thisBody) {
      if (thisBody.length>0) {
        thisBody[0].style.backgroundImage="url(images/storm-clouds1.jpg)";
        thisBody[0].style.backgroundRepeat="no-repeat";
        thisBody[0].style.backgroundAttachment="fixed";
        thisBody[0].style.backgroundPosition="center center";
        thisBody[0].style.color="lightskyblue";
        thisBody[0].style.color="#a0a000";       /* Muddy yellow */
        thisBody[0].style.color="#00bb00";       /* Slightly brighter green */

      }
    }
  }
}
//setDarkMode();



function trim(s) {
  if (s==null) return "";
  s=s.toString();
  return rtrim(ltrim(s));
}

function ltrim(s) {
  if (s==null) return "";

  s=s.toString();
  var l=0;
  while(l < s.length && s[l] == ' ')
    {l++;}
  return s.substring(l, s.length);
}

function rtrim(s) {
  if (s==null) return "";
  s=s.toString();
  var r=s.length -1;
  while(r > 0 && s[r] == ' ')
    {r-=1;}
  return s.substring(0, r+1);
}

function removeSpaces(st) {
  return st.split(' ').join('');
}

function removeExtraSpaces(st) {
  /*
   * 19 may 2019 [cm] .. Remove consecutive spaces (but leaving single spaces)
   */

  st=st.replace(/\s+/g,' ').trim();
  return st;
}


function IsNumeric(sText) {
  /* Returns false is string contains any value other than numbers, decimal, negative */
  var valid_chars="0123456789.-";
  var is_number=true;
  var Char;
  var i=0;

  if (sText===undefined) return false;

  for (i=0; i<sText.length && is_number==true; i++) {
    Char=sText.charAt(i);
    if (valid_chars.indexOf(Char)==-1) {
      is_number=false;
    }
  }

  return is_number;
}

function IsNumber(value) {
    /* Returns true for any numeric value */
    // 5 Nov 2018 [hf] (2018.26) - Fix, the function is case-sensitive isNan should be isNaN
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function IsInteger(value, positiveOnly) {
  // 18 Mar 2021 [hf] (2020.77c) - default to check both positive and negative numbers
  var isInteger = true;
  if (positiveOnly == null) {positiveOnly = false;}
  if (IsNumeric(value)) {
    if (value.indexOf('.') >= 0) {
      isInteger = false;
    }
    if (positiveOnly == true) {
      if (value.indexOf('-') >= 0) {
        isInteger = false;
      }
    }
  } else {
    isInteger = false;
  }
  return isInteger
}

function IsDate (value) {
  var this_value=value.toUpperCase();
  var iIndex=0;
  for (iIndex=0; iIndex<months.length; iIndex++) {
    this_value=this_value.replace(months[iIndex], " "+months[iIndex]+" ");
  }

  var this_date=trim(this_value).replace(/-/g," ");
  //var dtDate=new Date(this_date);
  var dtDate=setNewDate(this_date);
  var bIsDate=true;

  /* 29 may 2009 [cm] .. */
  if (isNaN(dtDate.getDate()))  bIsDate=false;
  if (isNaN(dtDate.getMonth()))  bIsDate=false;
  if (isNaN(dtDate.getFullYear())) bIsDate=false;

  if (dtDate.getFullYear()<1900) bIsDate=false;
  if (dtDate.getFullYear()>2100) bIsDate=false;
  return (bIsDate) ;
}

function parseTime(value) {
  // Attempt to parse time from a string value, could be hh:mm:ss or hh:mm or hh.mm.ss or hh.mm or hhmm or hmm
  var checkValue=value.split(/[.:]/);
  var iHour=-1;
  var iMin=-1;
  var iSec=-1;

  var iNumParts=checkValue.length;
  var sTime="";
  var sHour="";
  var sMin="";
  var sSec="";

  if (iNumParts>=1) {
    iHour=parseInt(checkValue[0], 10);
  }
  if (iNumParts>=2) {
    iMin=parseInt(checkValue[1], 10);
  }
  if (iNumParts>=3) {
    iSec=parseInt(checkValue[2], 10);
  }

  if ( (iMin<0) && (iSec<0) ) {
    // Just a number (no . or : separator)
    if (iHour<=23) {
      if (iHour<10) iHour="0"+iHour;
      sTime=iHour+":00";
    } else if ( (iHour>=100) && (iHour<=2359) ) {
      sHour=iHour+"";

      while (sHour.length<4) {
        sHour="0"+sHour;
      }

      iMin=parseInt(sHour.substring(2), 10);
      iHour=sHour.substring(0,2);
      sHour=iHour+"";

      if (iMin<=59) {
        sMin=iMin+"";
        while (sMin.length<2) {
          sMin="0"+sMin;
        }
        sTime=sHour+":"+sMin;
      } else sTime=value;


    } else sTime=value;

  } else {
    if (iHour<=23) {
      sHour=iHour+"";
      while (sHour.length<2) {
        sHour="0"+sHour;
      }
    }
    if (iMin<=59) {
      sMin=iMin+"";
      while (sMin.length<2) {
        sMin="0"+sMin;
      }
    }
    if ((iSec>=0) && (iSec<=59)) {
      sSec=iSec+"";
      while (sSec.length<2) {
        sSec="0"+sSec;
      }
    }
    sTime=sHour+":"+sMin;
    if (sSec!=="") sTime+=":"+sSec;

  }

  return sTime;
}

function IsTime(value, fmt) {

  var regexp;

  value=checkNull(value);
  value=ReplaceAll(value,".",":");

  if (fmt==null) {
    regexp=/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;
    fmt="hh:mm:ss";
  }

  if (fmt.toLowerCase()==="hh:mm") {
    regexp=/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  }

  if (regexp.test(value)) {
    return true;
  } else {
    return false;
  }
}

// 18 Mar 2021 [hf] (2020.77c) - StandardDateFormat is read from school db and updated in include_checkloggedin.jsp
var StandardDateFormat = "yyyy-MM-dd";
var ISODateFormat = "yyyy-MM-dd";
// Also add the Calendar widget daFormat, it's also updated in include_checkloggedin.jsp
var CalendarDaFormat = "%d-%b-%Y";

// 18 Mar 2021 [hf] (2020.77c) - Convert the given date to the school's date format based on the
// valid formats in UserSpecs.G_DATE_FORMATS
function FormatDate(sDateString) {
  var isoDateString = convertDateToYYYY_MM_DD(sDateString);
  var retDate = isoDateString;
  if (isoDateString != "") {
    var dtDate= setNewDate(sDateString);
    var twoDigitDay = ('00'+dtDate.getDate()).slice(-2);
    var twoDigitMonth = ('00'+(dtDate.getMonth()+1)).slice(-2);
    if (StandardDateFormat == "dd MMM yyyy") {
      retDate = twoDigitDay+" "+months[dtDate.getMonth()]+" "+dtDate.getFullYear();
    } else if (StandardDateFormat == "MMM dd yyyy") {
      retDate = months[dtDate.getMonth()]+" "+twoDigitDay+" "+dtDate.getFullYear();
    } else if (StandardDateFormat == "MM-dd-yyyy") {
      retDate = twoDigitMonth+"-"+twoDigitDay+"-"+dtDate.getFullYear();
    } else if (StandardDateFormat == "yyyy MMM dd") {
      retDate = dtDate.getFullYear()+" "+months[dtDate.getMonth()]+" "+twoDigitDay;
    } else if (StandardDateFormat == "yyyy-MM-dd") {
      retDate = dtDate.getFullYear()+"-"+twoDigitMonth+"-"+twoDigitDay;
    }
  }
  return retDate;
}

function SetDate (value) {
  /* 29 may 2009 [cm] .. */
  var this_value=value.toUpperCase();
  var iIndex=0;
  
  for (iIndex=0; iIndex<months.length; iIndex++) {
    this_value=this_value.replace(months[iIndex], " "+months[iIndex]+" ");
  }
  var this_date=trim(this_value).replace(/-/g," ");
  this_date = this_date.replace(/\s+/g,' ').trim();  // 17 may 2019 [cm] .. Remove excessive spaces

  //var dtDate=new Date(this_date);  
  // 3 May 2021 [hf] (2020.91) Comment out, do not convert to ISO, all the functions are expecting school date format
  // We're also checking for valid dates using IsDate
  //var dtDate=setNewDate(this_date);
  //var dtDate = convertDateToYYYY_MM_DD(this_date);

  //var sDate=value;
  var sDate = this_date;

  // 3 May 2021 [hf] (2020.91) - Make sure this_date is a real date
  //if (IsDate(value)) {
  if (IsDate(this_date)) {
    // 18 Mar 2021 [hf] (2020.77c) - Convert to school's date format
    //sDate=dtDate.getDate()+"-"+months[dtDate.getMonth()]+"-"+dtDate.getFullYear();
    // 3 May 2021 [hf] (2020.91) - Format the date using this_date
    //sDate = FormatDate(value);
    sDate = FormatDate(this_date);
  }
  return sDate;
}

function calcAge(value) {
  var sAge="";
  var this_value=value.toUpperCase();
  var iIndex=0;
  for (iIndex=0; iIndex<months.length; iIndex++) {
    this_value=this_value.replace(months[iIndex], " "+months[iIndex]+" ");
  }
  var this_date=trim(this_value).replace(/-/g," ");
  //var dtDate=new Date(this_date);
  var dtDate=setNewDate(this_date);
  var dtToday=new Date();

  if (IsDate(value)) {
    iYear_diff  =dtToday.getFullYear()-dtDate.getFullYear();
    iMonth_diff =dtToday.getMonth()-dtDate.getMonth();

    if (iMonth_diff<0) {
      iYear_diff--;
      iMonth_diff+=12;
    }

    sAge="Age:&nbsp;"+iYear_diff+" yrs "+iMonth_diff+" mths";
  }
  return sAge;
}

function checkDate(id) {
  if (id.indexOf("birth")>=0) {
    var thisDate=document.getElementById(id);
    var thisAge=document.getElementById("age");
    if ((thisDate) && (thisAge)) {
      if (IsDate(thisDate.value)) {
        thisAge.innerHTML=calcAge(thisDate.value);
      } else {
        thisAge.innerHTML="Age:&nbsp;--";
      }
    }
  }

  var theDate=document.getElementById(id);
  if (theDate.value!="") {
    theDate.value=SetDate(trim(theDate.value));
  }
}

function checkEndDate(sStartDate, sEndDate, iMaxMonths) {
  /*
   * 23 mar 2021 [cm] .. Make sure sEndDate is not more than iMaxMonths after sStartDate,
   * change sEndDate to last day of month which is iMaxMonths ahead and return value
   *
   * ie sStartDate=07 SEP 2021, sEndDate is 22 DEC 2022, iMaxMonths is 12, so return 31 AUG 2022.
   */
  var dtStartDate=setNewDate(sStartDate);
  var dtEndDate=setNewDate(sEndDate);

  var iStartingMonth=dtStartDate.getMonth();
  var iStartYear=dtStartDate.getYear();

  var iEndingMonth=dtEndDate.getMonth();
  var iEndYear=dtEndDate.getYear();

  var iEndMonth=iEndingMonth;
  if (iEndYear>iStartYear) iEndMonth+=(12*(iEndYear-iStartYear));

  var iNumberOfMonthColumns=iEndMonth-iStartingMonth+1;

  if (iNumberOfMonthColumns>iMaxMonths) {
    do {
      dtEndDate.setDate(0);  /* Set to last day of previous month */
      iNumberOfMonthColumns--;

    } while (iNumberOfMonthColumns>iMaxMonths);
  }

  sEndDate=dtEndDate.getDate()+"-"+months[dtEndDate.getMonth()]+"-"+dtEndDate.getFullYear();
  sEndDate=FormatDate(sEndDate);
  return sEndDate;
}


function SetTime(value) {	
  // 06 MAY 2021 ml (2020.95) -- Given a time entered in any format, return hh:mm AM/PM.
  
  var sTime="";  
  var sHours="";
  var sMinutes="";
  var sAMPM="";
  var this_value=value.toUpperCase();
  
  if (this_value!="") {	
	var time=value.match(/(\d+)(:(\d\d))?\s*(p?)/i);	
	
    if (time!=null) {
      var hours=parseInt(time[1],10);	 
      if (hours==12 && !time[4]) {
        hours=0;
      }
      else {
        hours+=(hours < 12 && time[4])? 12 : 0;
      }	

      var minutes=parseInt(time[3],10);
      if (isNaN(minutes)) {
        minutes=0;
      }
      
      if (hours==0) {
        sHours="12";
        sAMPM="AM";
      } else if (hours==12) {
        sHours="12";
        sAMPM="PM";
      } else if (hours>12) {
        hours=hours-12;
        sHours=hours+"";
        sAMPM="PM";
      } else {
        sHours=hours+"";
        sAMPM="AM";
      }
      
      if (minutes>=10) {
        sMinutes=minutes+"";
      } else {
        sMinutes="0"+minutes;
      }
      
      sTime=sHours+":"+sMinutes+" "+sAMPM;
    }
  }  

  return sTime;    
}


// 21 JUN 2016 ml (2016.31f) -- 1704 validation.
function Is1704YYYYMMDD (value) {

  // Validate that 1704 date is in the format YYYYMMDD.

  var bIsDate=false;

  var this_date="";
  var this_yyyy="";
  var this_mm="";
  var this_mmm="";
  var this_dd="";

  var month_num=0;

  if (value.length==8) {
    this_yyyy=value.substring(0,4);
    this_mm=value.substring(4,6);
    this_dd=value.substring(6,8);

    if ( (!isNaN(this_yyyy)) && (!isNaN(this_mm)) && (!isNaN(this_dd)) ) {
      month_num=parseInt(this_mm);
      if ( (month_num>=1) && (month_num<=12) ) {
        this_mmm=months[month_num-1];
      }

      this_date=this_dd+" "+this_mmm+" "+this_yyyy;
      bIsDate=IsDate(this_date);
    }
  }

  return bIsDate;
}
function Is1704YYMM (value) {

  // Validate that 1704 date is in the format YY/MM.

  var bIsDate=false;

  var this_yy="";
  var this_sep="";
  var this_mm="";

  var year_num=0;
  var month_num=0;

  if (value.length==5) {
    this_yy=value.substring(0,2);
    this_sep=value.substring(2,3);
    this_mm=value.substring(3,5);

    if ( (!isNaN(this_yy)) && (!isNaN(this_mm)) && (this_sep=="/") ) {
      bIsDate=true;

      year_num=parseInt(this_yy);
      month_num=parseInt(this_mm);
      if ( (year_num<0) || (year_num>99) ) {
        bIsDate=false;
      }
      if ( (month_num<1) || (month_num>12) ) {
        bIsDate=false;
      }
    }
  }

  return (bIsDate);
}
function Is1704YYYY (value) {

  // Validate that 1704 date is in the format YY/YY.

  var bIsDate=false;

  var this_start_yy="";
  var this_sep="";
  var this_end_yy="";

  var start_num=0;
  var end_num=0;
  var year_diff=0;

  if (value.length==5) {
    this_start_yy=value.substring(0,2);
    this_sep=value.substring(2,3);
    this_end_yy=value.substring(3,5);

    if ( (!isNaN(this_start_yy)) && (!isNaN(this_end_yy)) && (this_sep=="/") ) {
      start_num=parseInt(this_start_yy);
      end_num=parseInt(this_end_yy);

      if ( (start_num==99) && (end_num==00) ) {
        bIsDate=true;
      } else {
        if (start_num<end_num) {
          year_diff=end_num-start_num;

          if (year_diff==1) {
            bIsDate=true;
          }
        }
      }
    }
  }

  return (bIsDate);
}

function fmtGPA(amount) {
  var i = parseFloat(amount);
  var s=0;

  if(isNaN(i)) {i = 0.00;}
  var minus = '';
  if(i < 0) {minus = '-';}
  i = Math.abs(i);
  i = parseInt((i + .005) * 100);
  i = i / 100;
  s = new String(i);
  if(s.indexOf('.') < 0) {s += '.00';}
  if(s.indexOf('.') == (s.length - 2)) {s += '0';}
  s = minus + s;

  return s;
}

function fmtNum(value, decimals, bComma) {
  /* Return a value, formatted to the number of decimals specified, rounded-up */

  // 14 dec 2019 [cm] .. Check for decimals undefined instead of !
  if (typeof decimals === 'undefined') decimals=2;
  //if (!decimals) decimals=2;
  
  if (typeof bComma === 'undefined') {
    bComma=false;
  }
  
  var roundoff=Math.pow(10, decimals);
  var result=parseFloat(
               (Math.round(value*roundoff)/roundoff)
             ).toFixed(decimals);

  // 14 dec 2019 [cm] .. Check for zero decimals.
  //if (decimals==0) {
  //  result=parseInt(result);
  //}

  if (bComma) {
    result=formatMoney(result, decimals);
  }

  return result;
}


function formatMoney(amount, decimalCount, decimal, thousands) {
  // 21 jun 2019 [cm] .. Function to format a number into currency format ##,##0.00
  try {

    if (typeof decimal === 'undefined') {
      decimal=".";
    }
    if (typeof thousands === 'undefined') {
      thousands=",";
    }

    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    var i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    var j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    //console.log(e)
  }
};





function niceDate(dtThisDate) {
  /*
   * 12 apr 2019 [cm] .. Format date into Fri, April 12, 2019 format
   */
  var sDate=HSLdays[dtThisDate.getDay()]+", "+HSLmonths[dtThisDate.getMonth()].substring(0,3)+" "+dtThisDate.getDate()+", "+dtThisDate.getFullYear();
  return sDate;
}


function fmtTime(sTime) {
  /*
   * 12 apr 2019 [cm] .. format time into HH:MM
   */

  sTime=checkNull(sTime);
  if (sTime=="") return "";

  var sParts=sTime.split(":");
  var iHours=checkNull(sParts[0]);
  var iMin  =checkNull(sParts[1]);

  if (parseInt(iHours)<10) {
    iHours="0"+parseInt(iHours);
  }
  if (parseInt(iMin)<10) {
    iMin="0"+parseInt(iMin);
  }
  return iHours+":"+iMin;
}


function getHTTPObject() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xmlhttp;
}


function keyenter(FormObj, e ) {
  var key;

  var KeyID =(window.event) ? event.keyCode : e.keyCode;

  if (window.event) {
    key=window.event.keyCode;
  } else {
    key=e.keyCode;
  }

  if ( (key==13) || (KeyID==13) ) {
    checkSearch(FormObj);
    return true;
  } else {
    return true;
  }
}

function doSearch(FormObj) {
  checkSearch(FormObj);
  return false;
}


var isIE = document.all;
var mouseX = 0;
var mouseY = 0;

function getMouseXY(e) {
  /* Set mouseX, mouseY co-ordinate */
  if (!e) e = window.event;
  if (e)
  {
  	mouseX = isIE ? (e.clientX + document.body.scrollLeft) : e.clientX;
  	mouseY = isIE ? (e.clientY + document.body.scrollTop) : e.clientY;
  }
}

function getMouseX(e) {
  getMouseXY(e);
  return mouseX;
}

function getMouseY(e) {
  getMouseXY(e);
  return mouseY;
}

document.onmousemove = getMouseXY;


function replaceAll(txt, replace, with_this) {
  if (txt) {
    return txt.replace(new RegExp(replace, 'g'),with_this);
  } else return "";
}

function getXML(this_text) {
  var result="";
  if (this_text.length>0) {
    if (this_text[0].childNodes.length>0) {
      result=this_text[0].childNodes[0].nodeValue;
    }
  }
  return result;
}

function getXMLvalue(this_text, iPos) {
  // 06 jun 2019 [cm] .. Return value from multi-value XML node
  var result="";
  if (this_text.length>iPos) {
    if (this_text[iPos].childNodes.length>0) {
      result=this_text[iPos].childNodes[0].nodeValue;
    }
  }
  return result;
}

function getXMLbyTag(xmlDoc, tagName) {
  // 19 jun 2019 [cm] .. Return XML value for a given tag name
  var thisTag=xmlDoc.getElementsByTagName(tagName);
  if (thisTag) {
    return getXML(thisTag);
  }
  return "";
}


function getXMLDoc(ajaxObject) {
  /*
   * 07 nov 2019 [cm] .. Attempt to extract XMLDoc from either responseXML or responseText of ajaxObject
   */

  var xmlDoc;
  if (ajaxObject.responseXML) {

    // If responseXML exists, return documentElement
    xmlDoc=ajaxObject.responseXML.documentElement;

  } else {

    // Didn't get XML response, so try parsing responseText
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(ajaxObject.responseText, "text/xml");

  }

  return xmlDoc;
}


function getRadioValue(objName) {
  /*
   * 01 may 2019 [cm] .. return value of selected radio input button
   */

  var radioObj=document.getElementsByName(objName);
  var objValue="";
  if (radioObj) {
    for (var item = 0; item < radioObj.length; item++) {
      if (radioObj[item].checked) {
        objValue=radioObj[item].value;
        break;
      }
    }
  }
  return objValue;
}


function getElementChecked(elementID) {
  /*
   * 12 apr 2019 [cm] .. Return true/false if element checkbox is checked
   */
  var thisElem=document.getElementById(elementID);
  if (thisElem) {
    return (thisElem.checked);
  }
  return false;
}

function setElementChecked(elementID, bChecked) {
  /*
   * 12 apr 2019 [cm] .. Set element checkbox to checked/not checked
   */
  var thisElem=document.getElementById(elementID);
  if (thisElem) {
    thisElem.checked=bChecked;
  }
}

function setElementDisabled(elementID, bDisabled) {
  // 18 AUG 2020 ml (2020.57) -- Set element to enabled/disabled.
  var thisElem=document.getElementById(elementID);
  if (thisElem) {
    thisElem.disabled=bDisabled;
  }
}

function setElementListIndex(elementID, iIndex) {
  /*
   * 17 may 2019 [cm] .. Set selected index for list item
   */
  var thisElem=document.getElementById(elementID);
  if (thisElem) {
    thisElem.selectedIndex=iIndex;
  }
}

function getElementValue(elementID) {
  // Return value of element, if it exists
  var value="";
  var thisElem=document.getElementById(elementID);
  if (thisElem) value=thisElem.value;
  return value;
}

function getElementValueDefault(elementID, sDefaultValue) {
  // Return value of element, if it exists, or return sDefaultValue
  var value=getElementValue(elementID);
  if (value=="") value=sDefaultValue;
  return value;
}

function setElementValue(elementID, value) {
  // Set value for a given element
  var thisElem=document.getElementById(elementID);
  if (thisElem) thisElem.value=value;
}


function setElementAttrib(elementID, sAttrib, sValue) {
  // Set an attribute for a given element
  var thisElem=document.getElementById(elementID);
  if (thisElem) thisElem.setAttribute(sAttrib, sValue);
}

function removeElementAttrib(elementID, sAttrib) {
  // Remove an attribute for a given element
  var thisElem=document.getElementById(elementID);
  if (thisElem) thisElem.removeAttribute(sAttrib);
}

  function swapElementValues(elemID1, elemID2) {
    /*
     * 21 jun 2021 [cm] .. Swap values between 2 elements
     */
    var docElem1=getElementValue(elemID1);
    var docElem2=getElementValue(elemID2);

    setElementValue(elemID1, docElem2);
    setElementValue(elemID2, docElem1);


  }


function setValueByName(elemName, value, pos) {
  // 05 jun 2019 [cm] .. Find elements with given elemName, (could be more than one) set value to element indicated by pos
  var thisElems=document.getElementsByName(elemName);
  if (thisElems) {
    if (thisElems.length>=pos) {
      thisElems[pos].value=value;
    }
  }
}

function getElementinnerHTML(elementID) {
  /*
   * 12 apr 2019 [cm] .. Return element innerHTML
   */
  var value="";
  var thisElem=document.getElementById(elementID);
  if (thisElem) value=thisElem.innerHTML;
  return value;
}

function setElementinnerHTML(elementID, value) {
  /*
   * 12 apr 2019 [cm] ..Set innerHTML to value for a given element
   */
  var thisElem=document.getElementById(elementID);
  if (thisElem) {
    thisElem.innerHTML=value;
  } else {
    //console.log("Could not find "+elementID);
  }
}

function setElementFocus(elementID) {
  var thisElem=document.getElementById(elementID);
  if (thisElem) thisElem.focus();
}


function setFocusByName(elementName, iRow) {
  var thisElem=document.getElementsByName(elementName);
  if (iRow == undefined) {
    iRow = 0;
  }
  if (thisElem) thisElem[iRow].focus();
}



var thingInterval=0;
var iThingFlashCount=0;
var bthingOnOff=true;
var thingElem;
var thingColor;
var thingStyle;
var flashesPerSecond=4;
var MAX_SECONDS=5;

function flashElement(elemID, elemPart, thisColor, seconds) {
  // 24 jul 2020 [cm] .. flash border for selected element for seconds
  var thisElem=document.getElementById(elemID);
  var changeColor;
  var changeStyle;
  var C_BORDER="border";
  var C_BACKGROUND="background";
  var C_FLASH_STYLE="solid";



  if (elemPart==null) elemPart="border";
  if (thisColor==null) thisColor="red";

  if (thisElem) {
    thingElem=thisElem;

    if (seconds==null) {
      var thisEvent="flashElement('"+elemID+"', '"+elemPart+"', '"+thisColor+"', "+MAX_SECONDS+");";
      if (elemPart==C_BORDER) {
        thingColor=thisElem.style.borderColor;
        thingStyle=thisElem.style.borderStyle;
      } else if (elemPart==C_BACKGROUND) {
        thingColor=thisElem.style.backgroundColor;
      }
      thingInterval=setInterval(thisEvent, (1000/flashesPerSecond));

    } else {
      bthingOnOff=!bthingOnOff;
      if (bthingOnOff) {
        changeColor=thingColor;
        changeStyle=thingStyle;
      } else {
        changeColor=thisColor;
        changeStyle=C_FLASH_STYLE;
      }

      if (elemPart==C_BORDER) {
        thisElem.style.borderColor=changeColor;
        thisElem.style.borderStyle=changeStyle;
      } else if (elemPart==C_BACKGROUND) {
        thisElem.style.backgroundColor=changeColor;
      }

      iThingFlashCount++;

      if (iThingFlashCount>=((seconds)*(flashesPerSecond))) {
        clearInterval(thingInterval);
        if (elemPart==C_BORDER) {
          thisElem.style.borderColor=thingColor;
          thisElem.style.borderStyle=thingStyle;
        } else if (elemPart==C_BACKGROUND) {
          thisElem.style.borderColor=thingColor;
        }
      }
    }

  }

}



function highlightElement(elemID, thisColor, seconds){
  // 28 jul 2020 [cm] .. Highlight a selected elem by changing the background color for a few seconds
  var thisElem=document.getElementById(elemID);
  var origColor;

  if (thisElem) {
    if (thisColor==null) thisColor="yellow";
    if (seconds==null) seconds=3;
    origColor=thisElem.style.backgroundColor;

    var thisEvent="highlightElement('"+elemID+"', '"+origColor+"', -1);";

    thisElem.style.backgroundColor=thisColor;
    if (seconds>0) {
      setInterval(thisEvent, ((seconds)*1000));
    }

  }
}



function setSelectedIndex(elementID, matchingValue) {
  /*
   * 24 may 2019 [cm] .. Go through <option> items in elementID, find matchingValue and set selectedIndex
   *                     if not found, set to -1
   */

  var s=0;
  var thisSelect=document.getElementById(elementID);
  if (thisSelect) {
    if (matchingValue=="") {
      thisSelect.selectedIndex=-1;
    } else {
      thisSelect.selectedIndex=-1;
      for (s=0; s<thisSelect.options.length; s++) {
        if (thisSelect.options[s].value==matchingValue) {
          thisSelect.selectedIndex=s;
          break;
        }
      }
    }
  }

}


function numberToAlphabet(number) {
  /*
   * 12 mar 2013 [cm] .. given a number, return alpha...
   * ie.                 1=A, 2=B, 3=c, 27=AA, 28=AB, 29=AC, etc
   */
  var ABC="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  var sResult="";

  while (true) {
    var r=(number%26);
    if (r==0) {
      if (number==26) {
        sResult="Z";
      } else {
        var offset=(number/26)-1;
        sResult=ABC[offset-1]+"Z";
      }
      break;
    }

    sResult=ABC[r-1]+sResult;
    if (number<26) {
      break;
    }

    if (number>26) {
      number=parseInt(number/26);
    }
  }

  return sResult;
}

function tosafeHTML(this_text) {
  /* Replace HTML tags with "safe" HTML */
  var result=this_text+"";

  var amp=RegExp("&");
  var lt=RegExp("<");
  var gt=RegExp(">");

  result=result.replace(amp,'&amp;');
  result=result.replace(lt,'&lt;');
  result=result.replace(gt,'&gt;');
  result=result.replace(/"/g,'&quot;');
  result=result.replace(/\'/g,'&apos;');


  return result;
}


function hideObj(objID) {
  /* Hide a selected form object */
  var formobj=document.getElementById(objID);
  if (formobj) {
    formobj.style.display="none";
    formobj.style.visibility="hidden";
  }
  return true;
}

function showObj(objID, dispType) {
  /* Show a selected form object */
  var formobj=document.getElementById(objID);
  if (formobj) {
    var display_type="";
    if (dispType) display_type=dispType;

    if (display_type!="") {
      try {
        formobj.style.display=display_type;
      } catch (e) {
        // Catch errors in IE7
        formobj.style.display='none';
      }
    } 
    formobj.style.visibility="visible";
  }
}

function disableButton(button_id) {
  /* Disable a button */
  var this_el=document.getElementById(button_id);
  if (this_el) {
    this_el.disabled=true;
  }
}

function enableButton(button_id) {
  /* Enable a button */
  var this_el=document.getElementById(button_id);
  if (this_el) {
    this_el.disabled=false;
  }
}


function encryptCode(thisText) {
  /* return encrypted value of thisText */
  var passPhrase="HartsSystemsLtd-";
  var ENCODED="ee=";
  GibberishAES.size(128);
  var encrypted=GibberishAES.enc(thisText, passPhrase);
  return ENCODED+encrypted;
}

function escapeRegExp(str) {
  /* Returns regular expression of a string */
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  /* Replaces all values of "find" with "replace" in str */

 return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}


function removeExtraCRLF(sText) {
  /*
   *09 apr 2019 [cm] .. Remove trailing CR/LF from text as well as consecutive blank lines.
   */
    var iCounter=0;
    var iLoop=0;

    var CRLF="\n";
    var NEWLINE="\r\n";
    var CR="\r";
    var LF="\n";

    var sLINECHECK=
      (NEWLINE+NEWLINE+NEWLINE+","+
       CR+CR+CR+","+
       LF+LF+LF+","+
       CRLF+CRLF+CRLF).split(",");

    var sNEWCRLF=LF+LF;

    var sNewText=sText;

    for (iLoop=1; iLoop<=2; iLoop++) {
      for (iCounter=0; iCounter<sLINECHECK.length; iCounter++) {

        sNewText=sNewText.replace(RegExp(sLINECHECK[iCounter]), sNEWCRLF);

      }
    }

    /* Look for lines which contain a blank space */
    var sTextLines=sNewText.split(LF);
    for (iLoop=0; iLoop<sTextLines.length; iLoop++) {
      sTextLines[iLoop]=trim(sTextLines[iLoop]);
    }
    sNewText=sTextLines.join(LF);

    for (iLoop=1; iLoop<=2; iLoop++) {
      for (iCounter=0; iCounter<sLINECHECK.length; iCounter++) {

        sNewText=sNewText.replace(RegExp(sLINECHECK[iCounter]), sNEWCRLF);

      }
    }
    return sNewText;

}


function checkForUpper(str) {
  /* Check for upper case characters in a string, returns True if str contains upper case characters */
  var bUpper=false;
  var findUpper="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var checkUpper=str;
  var n=0;
  for (n=0; n<findUpper.length; n++) {
    checkUpper=replaceAll(checkUpper, findUpper.charAt(n), "");
  }
  if (checkUpper!=str) bUpper=true;
  return bUpper;
}

function checkForLower(str) {
  /* Check for lower case characters in a string, returns True if str contains lower case characters */
  var bLower=false;
  var findLower="abcdefghijklmnopqrstuvwxyz";
  var checkLower=str;
  var n=0;
  for (n=0; n<findLower.length; n++) {
    checkLower=replaceAll(checkLower, findLower.charAt(n), "");
  }
  if (checkLower!=str) bLower=true;
  return bLower;
}

function checkForNumber(str) {
  /* Check for number characters in a string, returns True if str contains number characters */
  var bNumber=false;
  var findNumber="0123456789";
  var checkNumber=str;
  var n=0;
  for (n=0; n<findNumber.length; n++) {
    checkNumber=replaceAll(checkNumber, findNumber.charAt(n), "");
  }
  if (checkNumber!=str) bNumber=true;
  return bNumber;
}

function checkForSpecial(str) {
  /* Check for special (punctuation) characters in a string, returns True if str contains any special characters */
  var bSpecial=false;
  var findSpecial="~`!@#$%^&*()_+-=[]{}:;,.<>?|"+
                  "\\"+
                  "\""+
                  "\'"+
                  "/";

  var checkSpecial=str;
  var n=0;
  for (n=0; n<findSpecial.length; n++) {
    checkSpecial=replaceAll(checkSpecial, findSpecial.charAt(n), "");
  }
  if (checkSpecial!=str) bSpecial=true;
  return bSpecial;
}

function textMax(thisfield, txt_length) {
  // 13 dec 2016 [cm] .. Make sure text entered does not exceed max length
  var maxTextLength=txt_length;

  if (thisfield.value.length>maxTextLength) {
    thisfield.value=thisfield.value.substring(0,maxTextLength);
  }
}

function eCode(thisData) {
  // 17 mar 2017 [cm] .. return encodeURIComponent of thisData
  return encodeURIComponent(thisData);
}

function eUrl(thisURL) {
  // 17 mar 2017 [cm] .. return encodeURI of thisURL
  return encodeURI(thisURL);
}

function gotoUrl(thisURL) {
  var url=thisURL.toString();
  var checkSession=url.indexOf("jsession");
  if ((checkSession<=0) && (sessionID!="")) {
    var paramPos=url.indexOf("?");
    if (paramPos>=0) {
      var urlPage=url.substring(0,paramPos);
      var urlParams=url.substring(paramPos+1, url.length);
      thisURL=urlPage+";jsessionid="+sessionID+"?"+urlParams;
    } else {
      thisURL=thisURL+";jsessionid="+sessionID;
    }
  }
  //console.log(thisURL);
  location.href=thisURL;
}

function ajaxTimeout() {
  // 21 mar 2017 [cm].. AJAX call has timed out.
  AJAXtimeout=true;
  AJAXloading=false;
  //console.log("Timeout: "+AJAXloading);
}

function ajaxLoading() {
  AJAXloading=true;
  //console.log("Loading: "+AJAXloading);
}
function ajaxLoadend() {
  AJAXloading=false;
  //console.log("Loadend: "+AJAXloading);
}

function infoMsgPop(this_text) {
  // 06 jun 2019 [cm] .. Show infoMsg for 1 second, then hide
  infoMsgTimeout(this_text, 1000);
}
function infoMsgTimeout(this_text, timeout) {
  // 06 jun 2019 [cm] .. Show infoMsg for specified time, then hide
  infoMsg(this_text);
  setTimeout("infoMsg('')", timeout);

}
function infoMsg(this_text) {
  var this_div=document.getElementById("infodiv");
  var this_el=document.getElementById("infomsg");

  var topPos=5;
  var scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  topPos=scrollY+5;


  /* 06 jun 2019 [cm] .. Make sure <div> exists, otherwise create it */
  if ( (!this_div) && (!this_el) ) {
    // 06 jun 2019 [cm] .. Create <div> for infomsg
    if (!this_div) {
      this_div=document.createElement("div");
      this_div.id="infodiv";
      this_div.style.width="200px";
      this_div.style.marginRight="auto";
      this_div.style.marginLeft="auto";
    }
    if (!this_el) {
      this_el=document.createElement("div");
      this_el.id="infomsg";
      this_el.className="infomsg";
      this_el.innerHTML="&nbsp;";
    }
    this_div.appendChild(this_el);
    // 05 apr 2022 [cm] .. correction: use document.body
    document.body.appendChild(this_div);
  }


  if (this_el) {
    this_el.innerHTML=this_text;
    if (trim(this_text)=="") {
      this_el.style.border="1px solid transparent";
      this_el.style.backgroundColor="transparent";
    } else {
      this_el.style.top=(topPos)+PX;
      this_el.style.border="2px solid white";
      this_el.style.backgroundColor="#ffff99";
    }
  }
}


function setSpecs(sDesc, sSetting) {
  /* 28 mar 2017 [cm] .. Save user setting to show or hide term marks */
  var setHttp=getHTTPObject(); // We create the XMLHTTPRequest Object

  var sURL="./tcl";
  var sParams="?cmd="+
            eCode(
              "setspecs "+
              sDesc+" "+
              sSetting
            );

  setHttp.open("POST", sURL+sParams, true);
  setHttp.send(null);
}


function setFlag(sNumber, sCode, sOnOff) {
  /*
   * 28 oct 2021 [cm] .. set flag for component to on/off --
   */
  var setup_http=getHTTPObject(); // We create the XMLHTTPRequest Object
  var setup_url="./tcl?";
  var params="cmd=setflag "+sCode+" "+sNumber+" "+sOnOff;

  setTimeout("showDialog('loading');", 200);
  setup_http.open("POST", setup_url+params, ASYNC);
  setup_http.setRequestHeader(AJAX_CONTENT_TYPE, AJAX_URL_ENCODE);
  setup_http.send(null);

  setTimeout("closeDialog('loading');", 1000);
}



function disableTabIndex(objname) {
  // 31 mar 2017 [cm] .. disable TabIndex of object by setting it to -1
  var thisObj=document.getElementsByName(objname);

  if (thisObj) {
    var iNumObj=thisObj.length;
    var iIndex=0;

    for (iIndex=0; iIndex<iNumObj; iIndex++) {
      thisObj[iIndex].tabIndex=-1;
    }
  }
}

function enableTabIndex(objname) {
  // 31 mar 2017 [cm] .. enabled TabIndex of object by setting it to 0, which places it at the beginning of the tab order
  var thisObj=document.getElementsByName(objname);

  if (thisObj) {
    var iNumObj=thisObj.length;
    var iIndex=0;

    for (iIndex=0; iIndex<iNumObj; iIndex++) {
      thisObj[iIndex].tabIndex=0;
    }
  }
}


function JSconvertToSafeHtml(sValue) {
  var sSafeValue=sValue;

  // Replace all ampersands with &amp;
  sSafeValue=sSafeValue.replace(/&/g, "&amp;");

  // Replace all backslashes with #92;
  sSafeValue=sSafeValue.replace(/\\/g, "&#92;");

  // Replace all apostrophes with &apos;
  sSafeValue=sSafeValue.replace(/'/g, "&apos;");

  // Replace all quotes with &quot;
  sSafeValue=sSafeValue.replace(/"/g, "&quot;");

  // Replace all less than symbols with &lt;
  sSafeValue=sSafeValue.replace(/</g,  "&lt;");

  // Replace all greater than symbols with &gt;
  sSafeValue=sSafeValue.replace(/>/g,  "&gt;");

  return sSafeValue;
}

function checkEmail(FormObj)
{
  // validate e-mail format
  var email = FormObj.email_field.value;
  var re = /(.+)@(.+)/;

  if ( !re.test(email))
  {
    showAlert(invalid_email);
    return false;
  }
  return true;
}

// 11 APR 2017 ml (2017.16g) -- Moved the following functions here: setupInputLabels, inputOnkeyup, inputOnfocus, labelOnfocus and inputOnblur.

function setupInputLabels(elemid) {
  var thisElem=document.getElementById(elemid);
  if (thisElem) {
    thisElem.onfocus =inputOnfocus;
    thisElem.onblur  =inputOnblur;
    thisElem.onkeyup =inputOnkeyup;

  }
  var thisLabel=document.getElementById("lbl_"+elemid);
  if (thisLabel) {
    thisLabel.onfocus=labelOnfocus;
    thisLabel.onclick=labelOnfocus;
  }
}

function inputOnkeyup () {
  var newColor="transparent";
  if (this.value=="") newColor="#888";
  var thisElemName=this.getAttribute("id");
  var lbl=document.getElementById("lbl_"+thisElemName);
  if (lbl) lbl.style.color=newColor;
}

function inputOnfocus () {
  if (this.value=="") return;
  var thisElemName=this.getAttribute("id");
  var lbl=document.getElementById("lbl_"+thisElemName);
  if (lbl) lbl.style.color="transparent";
}

function labelOnfocus() {
  // If user clicks on label for input box, reset focus back to the input box.
  var thisLabelid=this.getAttribute("id");
  var thisLabel=document.getElementById(thisLabelid);
  if (thisLabel) {
    var inputName=thisLabelid.substring(4,thisLabelid.length);
    setElementFocus(inputName);
  }
}

function inputOnblur() {
  if (this.value!="") return;
  var thisElemName=this.getAttribute("id");
  var lbl=document.getElementById("lbl_"+thisElemName);
  if (lbl) lbl.style.color="#888";
}

function checkSocialMedia(FormObj, social_media) {
  // 10 Jan 2018 [hf] - (2017.57) - See if the user is already logged in with social media
  var sMediaElem;
  var smedia="";
  var bsocialmedia=false;
  if (social_media=="google") {
    sMediaElem=document.getElementById("googletoken");
    smedia = sMediaElem.value;
    if (smedia!="") {
      bsocialmedia=true;
    }
  }
  return bsocialmedia;
}

function checkNull(thisValue) {
  // check to see if value is null or undefined, return as "" (empty string)
  if (thisValue==null) {
    thisValue="";
  }
  if (thisValue==="undefined") {
    thisValue="";
  }
  return thisValue;
}


function checkUndefined(sValue, sDefault) {

  if ( (sValue ==  undefined) || (sValue=="") ) {
    sValue=sDefault;
    if (sDefault == undefined) {
      sValue="";
    }
  }

  return sValue;
}


function setSessionAttribute(sAttribName, sValue) {
  /*
   * 25 apr 2019 [cm] .. Use AJAX to set an attribute on the server...
   */

  //console.log("setJSPAttribute "+sAttribName+" "+sValue);
  var params="?type=setattrib"+
             "&attrib="+eCode(sAttribName)+
             "&value="+eCode(sValue);

  //console.log("getperson.jsp"+params);

  var set_http=getHTTPObject();

  set_http.onreadystatechange=handlesetSessionResponse;
  set_http.open("POST", "getperson.jsp"+params, ASYNC);
  set_http.send(null);

  //console.log("getperson.jsp"+params);
}

function handlesetSessionResponse() {
  if (this.readyState == 4) {
    if (serverStatusOK(this)) {
      //console.log("done");
    }
  }
}

function convertDateToYYYY_MM_DD (sDateString) {
  /*
   * 01 may 2019 [cm] .. Take a string containing a date in DD-MMM-YYYY format and convert to yyyy-mm-dd
   * 18 Mar 2021 [hf] (2020.77c) - The date format of STD_DATE_FORMAT may be in a different format than dd-MMM-yyyy
   */
  var arrStdDateFormat = StandardDateFormat;
  if (arrStdDateFormat == null) {arrStdDateFormat = ISODateFormat;}
  // 3 May 2021 [hf] (2020.91) - Need replaceAll
  arrStdDateFormat = arrStdDateFormat.toLowerCase().replaceAll(" ", "-").split("-");

  var sTestDate = "";
  var thisMonth = "";
  var sResult = "";
  var iDate = -1;
  var iMonth = -1;
  var iYear = -1;
  var iSwap = 0;
  var iIndex = 0;
  var bGotDate = false;
  
  // 18 Mar 2021 [hf] (2020.77c) - Change to compare sDateString to the standard date format
  //var sParts=sDateString.split("-");
  //
  //var sDay  ="";
  //var sMonth="";
  //var sYear ="";
  //
  //if (sParts.length>=3) sDay=sParts[0];
  //if (sParts.length>=3) sMonth=sParts[1].toUpperCase();
  //if (sParts.length>=3) sYear =sParts[2];
  //
  //var iMonth=months.indexOf(sMonth);
  //iMonth++;
  //if (iMonth<10) iMonth="0"+iMonth;
  //
  //var iDay=parseInt(sDay, 10);
  //if (iDay<10) iDay="0"+iDay;
  //var sResult=sYear+"-"+(iMonth)+"-"+(iDay);

  if (!((sDateString == null) || (sDateString == ""))) {
    sDateString=sDateString.replace(/\s+/g,' ').trim();    // 17 may 2019 [cm] .. Remove any extra blank spaces
    sDateString=replaceAll(sDateString,"  ", " ");         // 21 MAY 2019 ml -- Removed double blank spaces.
    sDateString=replaceAll(sDateString," ", "-");          //                   Added semi-colon.

    sTestDate = sDateString.toUpperCase();
    // Check for full month spelling
    for (iIndex = 0; iIndex < HSLmonths.length; iIndex++) {
      thisMonth = HSLmonths[iIndex].toUpperCase();
      if (sTestDate.indexOf(thisMonth, 0) >= 0) {
        iMonth = iIndex+1; // array is 0-based, we want months to start at 1
        // remove the month word from the string
        sTestDate = sTestDate.replace(thisMonth, "");
        break;
      }
    }
    if (iMonth < 0) {
      // Check for month abbreviation
      for (iIndex = 0; iIndex < months.length; iIndex++) {
        thisMonth = months[iIndex].toUpperCase();
        if (sTestDate.indexOf(thisMonth, 0) >= 0) {
          iMonth = iIndex+1; // array is 0-based, we want months to start at 1
          // remove the abbreviation from the string
          sTestDate = sTestDate.replace(thisMonth, "");
          break;
        }
      }
    }
    // If we removed the month, there may be two dashes if the month was in the middle
    // Change to 1 dash
    sTestDate = sTestDate.replace("--", "-");
    // If the month was first or last, it starts or ends with a dash
    if (sTestDate.substr(0, 1) == '-') {sTestDate = sTestDate.substr(1);}
    if (sTestDate.substr(sTestDate.length-1) == '-') {sTestDate = sTestDate.substr(0, sTestDate.length-1);}

    var sParts = sTestDate.split("-");

    // If there are only 2 items left in the array, we already found the month, find the year and the date.
    if (sParts.length == 2) {
      iSwap = -1;
      if (IsInteger(sParts[0], true)) {
        iSwap = sParts[0];
      }
      // We have the month, years are 4-digits, days can be 1-31
      if ((iSwap > 0) && (iSwap < 32)) {
        iDate = iSwap;
      } else if (iSwap > 32) {
        iYear = iSwap;
      }

      iSwap = -1;
      if (IsInteger(sParts[1], true)) {
        iSwap = sParts[1];
      }
      if ((iSwap > 0) && (iSwap < 32)) {
        iDate = iSwap;
      } else if (iSwap > 32) {
        iYear = iSwap;
      }
      if ((iDate >= 0) && (iMonth >= 0) && (iYear >= 0)) {
        bGotDate = true;
      }
    }

    // reset any changes to date string
    sTestDate = sDateString.toUpperCase();
    sParts = sTestDate.split("-");
    if (!bGotDate) {
      // If we didn't get the date, try getting it based on the STD_FORMAT_DATE
      // 3 May 2021 [hf] (2020.91) - Use substr to check the first item in the date
      if (sParts.length == 3) {
        if (arrStdDateFormat.length == 3) {
          for (var iDateIndex = 0; iDateIndex < 3; iDateIndex++) {
            iSwap = sParts[iDateIndex];
            if (IsInteger(iSwap, true)) {
              //if (arrStdDateFormat[iDateIndex].indexOf('d') > 0)  {
              if (arrStdDateFormat[iDateIndex].substr(1,1) == 'd')  {
                iDate = iSwap;
              //} else if (arrStdDateFormat[iDateIndex].indexOf('m') > 0)  {
              } else if (arrStdDateFormat[iDateIndex].substr(1,1) == 'm')  {
                iMonth = iSwap;
              } else {
                iYear = iSwap;
              }
            }
          }
          // 3 May 2021 [hf] (2020.91) - Check the bounds for days, months
          //if ((iDate >= 0) && (iMonth >= 0) && (iYear >= 0)) {
          if ( ((iDate >= 0) && (iDate < 32)) &&
               ((iMonth >= 0) && (iMonth < 13)) &&
               (iYear >= 0) ) {
            bGotDate = true;
          }
        }
      }
    }

    if (!bGotDate) {
      // YYYY-MM-DD otherwise assume ISO date format
      // 3 May 2021 [hf] (2020.91) - Reset variables, don't need to compare StandardDateFormat to ISODateFormat
      // if we're assuming it's in ISO format anyway
      iDate = -1;iMonth = -1;iYear = -1;
      //if (StandardDateFormat != ISODateFormat) {
        if (sParts.length == 3) {
          if (IsInteger(sParts[0], true)) {
            iYear = sParts[0];
          }
          if (IsInteger(sParts[1], true)) {
            iMonth = sParts[1];
          }
          if (IsInteger(sParts[2], true)) {
            iDate = sParts[2];
          }
        }
      //}
      // 3 May 2021 [hf] (2020.91) - Check the bounds for days, months
      //if ((iDate >= 0) && (iMonth >= 0) && (iYear >= 0)) {
      if ( ((iDate >= 0) && (iDate < 32)) &&
           ((iMonth >= 0) && (iMonth < 13)) &&
            (iYear >= 0) ) {
        bGotDate = true;
      }
    }

    if (bGotDate) {
      sResult=(iYear)+"-"+(iMonth)+"-"+(iDate);
    }
  
  }
  return sResult;
}

function setNewDate(sDateString) {
  /*
   * 01 may 2019 [cm] .. return a dtDate with date from sDateString applied
   *                     sets date using Date.UTC at 11:00:00 so when converted to local time, should still be the same date.
   */

  var thisDate="";
  // Check if give date is blank or null, use today's date
  if ((sDateString==null) || (sDateString=="")) {
    var dtToday=new Date();
    sDateString=dtToday.getDate()+"-"+months[dtToday.getMonth()]+"-"+dtToday.getFullYear();
  }

  // Convert date from 28-APR-2019 to 2019-04-28
  thisDate=convertDateToYYYY_MM_DD(sDateString);

  // 14 sep 2022 [cm] .. split dates into parts then set to dtDate
  var sDateParts=thisDate.split("-");
  var sYear  =sDateParts[0];
  var sMonth =sDateParts[1];
  var sDay   =sDateParts[2];

  // Subtract month by 1, because new Date expects month between 0 and 11
  sMonth=parseInt(sMonth)-1;
  // 02 may 2019 [cm] .. better method: Set date, then adjust for time zone
  var dtDate=new Date(sYear, sMonth, sDay);
  
  // 31 aug 2022 [cm] .. changed (again!) just set time to 01:00:00:00 doesnt matter about time zone?
  dtDate.setHours(1,0,0,0);
  //var iMinutes=dtDate.getTimezoneOffset();
  //dtDate.setMinutes( dtDate.getMinutes() + iMinutes );

  // 01 may 2019 [cm] .. old method: Set date using Date.UTC setting time to 11:00am UTC which is 4:00am Pacific or 7:00pm China -- all same day
  //var sParts=thisDate.split("-");
  //var iYear  =sParts[0];
  //var iMonth =parseInt(sParts[1]);
  //var iDay   =parseInt(sParts[2]);

  //var dtDate=new Date(Date.UTC(iYear, (iMonth-1), iDay, 11, 0, 0));

  return dtDate;
}


// 05 jun 2019 [cm] .. Move these functions from defrows.js to here
function replaceElementID(frmObj, oldID, newID) {
  /*
   * 05 jun 2019 [cm] ..Given a formObj, go through childnodes, find element with oldID and replace with newID
   */

  var allChildren=frmObj.querySelectorAll("*")
  var iNumChild=allChildren.length;
  for (var c=0; c<iNumChild; c++) {
    if (allChildren[c].id!="") {
      if (allChildren[c].id==oldID) {
        allChildren[c].id=newID;
      }
    }
  }

}

function replaceElementName(frmObj, oldName, newName) {
  /*
   * 05 jun 2019 [cm] ..Given a formObj, go through childnodes, find element with oldName and replace with newName
   */

  var allChildren=frmObj.querySelectorAll("*")
  var iNumChild=allChildren.length;
  for (var c=0; c<iNumChild; c++) {
    if (allChildren[c].name!="") {
      if (allChildren[c].name==oldName) {
        allChildren[c].name=newName;
      }
    }
  }

}


function increasePrevValue(thisID) {
  // Take previous value of element and increase by one
  var sPrevValue=getElementValue(thisID);
  if (sPrevValue!="") {
    var iValue=parseInt(sPrevValue);
    iValue++;
    setElementValue(thisID, (iValue+""));
  }
}

function decreasePrevValue(thisID) {
  // Take previous value of element and decrease by one
  var sPrevValue=getElementValue(thisID);
  if (sPrevValue!="") {
    var iValue=parseInt(sPrevValue);
    iValue--;
    setElementValue(thisID, (iValue+""));
  }
}


function padFmt(str, justify, length, padChar) {
  // 18 jun 2019 [cm] .. Format a string, right or left justified, with optional padChar
  if (typeof justify === 'undefined') {
    justify="L";
  }
  if (typeof padChar === 'undefined') {
    padChar=' ';
  }
  var padding = Array(length+1).join(padChar); // make a string of 255 spaces
  return pad(str, padding, (justify=="R") );
}

function pad(str, pad, bPadLeft) {
  // 18 jun 2019 [cm] ..  Pad a string, left or right padding
  var result="";
  if (typeof str === 'undefined')
    return pad;
  if (bPadLeft) {
    result=(pad + str).slice(-pad.length);
  } else {
    result=(str + pad).substring(0, pad.length);
  }
  return result;
}

function fmtSpaces(str) {
  /*
   *
   * 18 jun 2019 [cm] .. replace spaces in a string with &nbsp, using decodeURI method
   *                     catches malformed URI error if string contains a % symbol.
   */

  try {
    str=decodeURI(str.replace(/ /g, "%C2%A0"));
  } catch (URIerr) {
    str=str.replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25');
    str=decodeURI(str.replace(/ /g, "%C2%A0"));
  }
  return str;

}



function handleNoResponse() {
  // For handling cases where AJAX has sent a code to the server, but no response is expected.
  if (this.readyState == 4) {
    if (serverStatusOK(this)) {
    }
  }
}


function getCurrentRow(frmObj) {
  // 21 jun 2019 [cm] .. Find the table row of the given object, then find the table and return the current row position
  var thisRow=-1;
  var parentElem=findParentByType(frmObj, "tr");
  if (parentElem) {
    thisRow=parentElem.rowIndex;
  }
  return thisRow;
}


function iDateDiff(Date1, Date2) {
  // 24 jun 2019 [cm] .. Copied from timesheet (webpages) project -- use Date.UTC to factor in timezones, etc
  var sThisDate1=Date1.getDate()+"-"+months[Date1.getMonth()]+"-"+Date1.getFullYear();
  var sThisDate2=Date2.getDate()+"-"+months[Date2.getMonth()]+"-"+Date2.getFullYear();

  var dtDate1=setNewDate(sThisDate1);
  var dtDate2=setNewDate(sThisDate2);

  //console.log("dtDate1="+dtDate1.toLocaleString()+"\n"+
  //            "dtDate2="+dtDate2.toLocaleString());
  //var iNumDays=Math.floor((Date2 - Date1) / (1000*60*60*24))
  // 24 jun 2019 [cm] .. Use UTC to make sure date diff is consistent.

  var iNumDays=Math.round((
              Date.UTC(dtDate2.getFullYear(), dtDate2.getMonth(), dtDate2.getDate()) -
              Date.UTC(dtDate1.getFullYear(), dtDate1.getMonth(), dtDate1.getDate()) ) /
              (1000 * 60 * 60 * 24));

  //console.log("iNumDays="+iNumDays);

  return iNumDays;
}


function setRowColors(tableID, startRow) {
  // 28 jun 2019 [cm] .. Set alternating row colors for a given table
  if (typeof startRow === 'undefined') {
    startRow=1;
  }
  var thisTable=document.getElementById(tableID);
  if (thisTable) {
    for (var r=startRow; r<thisTable.rows.length; r++) {
      thisTable.rows[r].className="tableRow"+((r-1)%2);
    }
  }

}


var bSelectAll=true;
var sClearAllTitle="Clear All";
var sSelectAllTitle="Select All";

function checkItems(elem_name) {
  var this_elem=document.getElementsByName(elem_name);
  if (this_elem) {
    var iRow=0;
    for (iRow=0; iRow<this_elem.length; iRow++) {
      if (this_elem[iRow].checked) return true;
    }
    return false;
  } else return true;
}

function checkForItems(sItems) {
  /*
   * 16 jul 2021 [cm] .. Check checkboxes in sItems (comma-separated list of element IDs return true if any item is checked
   */
  var sItemIDs=sItems.split(",");
  var iIndex=0;
  var bChecked=false;

  for (iIndex=0; iIndex<sItemIDs.length; iIndex++) {
    bChecked=getElementChecked(sItemIDs[iIndex]);
    if (bChecked) break;
  }
  return bChecked;
}


function selectAll(FormObj, elem_name) {
  var iRow=0;
  var this_select=document.getElementsByName(elem_name+"_select");
  var this_button=document.getElementById(elem_name+"_button");

  if (this_select) {

    if (bSelectAll) {
      for (iRow=0; iRow<this_select.length; iRow++) {
        this_select[iRow].checked=bSelectAll;
      }
      bSelectAll=false;
      if (this_button) {
        this_button.innerHTML=sClearAllTitle;
      }

    } else {
      for (iRow=0; iRow<this_select.length; iRow++) {
        this_select[iRow].checked=bSelectAll;
      }
      bSelectAll=true;
      if (this_button) {
        this_button.innerHTML=sSelectAllTitle;
      }
    }
  }
}



function createDivForElement(elemID, maxHeight, divID) {
  /*
   * 15 nov 2020 [cm] .. Create <div> for elemID, set maxHeight (optional)
   */

  if (divID==null) {
    divID="div"+elemID;
  }
  if (maxHeight==null) {
    maxHeight="";
  }

  var thisElem=document.getElementById(elemID);
  var thisDiv=document.getElementById(divID);

  if (thisElem) {
    if (!thisDiv) {
      //console.log("creating div "+divID);
      var newDiv=document.createElement("div");
      newDiv.id=divID;
      thisElem.parentNode.insertBefore(newDiv, thisElem);
      newDiv.appendChild(thisElem);
      thisDiv=document.getElementById(divID);
    }

    if (thisDiv) {
      // Just do some stuff to the <div> so you can see it has been created
      //console.log("setting style for div "+divID);
      thisDiv.style.padding="0px";
      thisDiv.style.borderTop="1px solid black";
      thisDiv.style.borderBottom="1px solid black";
      thisDiv.style.overflow="auto";
      thisDiv.style.padding="1px";
      thisDiv.style.marginTop="5px";

      if (maxHeight!="") {
        thisDiv.style.maxHeight=maxHeight;
      }
      // Set <div> width to match element it contains
      thisDiv.style.width=(thisElem.offsetWidth)+"px";
    }

  }
}

function resizeDiv(divID, tableID, extraWidth, maxHeight) {
  /*
   * 14 nov 2020 [cm] .. resize divID to fit width of tableID
   */

  //console.log("divID="+divID);
  //console.log("tableID="+tableID);
  //console.log("extraWidth="+extraWidth);

  var thisDiv=document.getElementById(divID);
  var thisTable=document.getElementById(tableID);

  if (maxHeight==null) {
    maxHeight="600px";
  }

  if (extraWidth==null) {
    extraWidth=20;
  }

  if (!thisDiv) {
    /*
     * 15 nov 2020 [cm] .. create <div> if it doesn't exit
     */
    //console.log("creating div for "+tableID);
    createDivForElement(tableID, maxHeight, divID);
    thisDiv=document.getElementById(divID);
  }

  if ((thisDiv) && (thisTable)) {
    thisDiv.style.width=(thisTable.offsetWidth+extraWidth)+"px";
    if (maxHeight!="") {
      thisDiv.style.maxHeight=maxHeight;
    }
  }
}



function doReport() {
  window.print();
}

function filenameOnly(fullPath) {
  // 29 JAN 2021 ml -- Get the file name from the full file path.
  var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
  var filename = fullPath.substring(startIndex);
  if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
    filename = filename.substring(1);
  }
  return filename;
}

function UpdatePaperSize(paperElem) {
  // 28 Apr 2021 [hf] (2020.86) - pdf_reports getPrintOptionsButton, getPrintOptionsDiv
  var hiddenPaperElem = document.getElementById('printoptionspaper');
  if (hiddenPaperElem) {
    hiddenPaperElem.value = paperElem.value;
  }
}

function UpdatePageOrientation(paperElem) {
  // 28 Apr 2021 [hf] (2020.86) - pdf_reports getPrintOptionsButton, getPrintOptionsDiv
  var hiddenPaperElem = document.getElementById('printoptionsorientation');
  if (hiddenPaperElem) {
    hiddenPaperElem.value = paperElem.value;
  }
}

function UpdateFontSize(fontSizeElem) {
  // 29 Apr 2021 [hf] (2020.86b) - pdf_reports getPrintOptionsButton, getPrintOptionsDiv
  var hiddenPaperElem = document.getElementById('printoptionsfontsize');
  if (hiddenPaperElem) {
    hiddenPaperElem.value = fontSizeElem.value;
  }
}



function serverStatusOK(serverObj) {
  var serverOK=false;

  /*
   * 200 OK	The request is OK (this is the standard response for successful HTTP requests)
   * 201 Created	The request has been fulfilled, and a new resource is created
   * 202 Accepted	The request has been accepted for processing, but the processing has not been completed
   * 203 Non-Authoritative Information	The request has been successfully processed, but is returning information that may be from another source
   * 204 No Content	The request has been successfully processed, but is not returning any content
   * 205 Reset Content	The request has been successfully processed, but is not returning any content, and requires that the requester reset the document view
   * 206 Partial Content	The server is delivering only part of the resource due to a range header sent by the client
   *
   * If 200,201,202,204 then return serverOK=true;
   */
  if ( (serverObj.status == 200) ||
       (serverObj.status == 201) ||
       (serverObj.status == 202) ||
       (serverObj.status == 204) ) {

    serverOK=true;
  }

  return serverOK;
}

function showServerResponse(serverObj) {
  if (!(serverStatusOK(serverObj.status))) {
    showAlert ("Warning: server responded with "+serverObj.statusText);
  }
  return true;
}


function switchUnits(frmObj, sOpt) {
  /*
   * 02 aug 2021 [cm] .. Convert value from cm to inch and back, sOpt indicates what to switch to.
   *                     ie sOpt="in", then switching values from cm to inches
   */
  var CM_to_INCH=2.54;

  if (frmObj) {
    var oldValue=frmObj.value;
    var newValue="";
    if (sOpt=="in") {
      newValue=oldValue/CM_to_INCH;
    } else {
      newValue=oldValue*CM_to_INCH;
    }
    frmObj.value=fmtNum(newValue,2);
  }
}





function loadCSS(cssFile) {
  /*
   * 21 jan 2022 [cm] .. Load the specified cssFile it hasn't already been loaded
   */

  var sParts=cssFile.split("/");
  var sLinkID=sParts[(sParts.length-1)];

  if (sLinkID!="") {
    var thisLink=document.getElementById(sLinkID);
    if (thisLink) {return;}
  }

  var bMatch=false;
  var sLinks=document.getElementsByTagName("link");
  for (var x=0; x<sLinks.length; x++) {
    var sThisLink=sLinks[x];
    if (sThisLink.type=="text/css") {
      var sThisHref=sThisLink.href+"";
      if (sThisHref.includes(cssFile)) {
        bMatch=true;
        break;
      }
    }
  }
  if (bMatch) {return;}

  var head = document.getElementsByTagName("head")[0]

  // Creating link element
  var style = document.createElement("link")
  style.id  =sLinkID;
  style.rel ="StyleSheet";
  style.type="text/css";
  style.href=cssFile;
  head.append(style);

}


function checkBool(bValue, sTrue, sFalse) {
  /*
   * 22 feb 2022 [cm] .. If bValue is true, return sTrue, otherwise return sFalse;
   */
  var sReturn=sFalse;

  if ((sTrue==null) || (sTrue=="undefined")) {
    sTrue=YN[0];
  }
  if ((sFalse==null) || (sFalse=="undefined")) {
    sFalse=YN[1];
  }

  if (bValue) sReturn=sTrue;
  
  return sReturn;
}

function checkYesNo(sValue, sTrueValue) {
  /*
     * 10 feb 2022 [cm] .. compare sValue to sTrueValue, ignores case, returns True if equal, otherwise false
     */
  var bReturn=false;

  if ((sValue==null) || (sValue=="undefined")) {
     sValue="";
   }
  if ((sTrueValue==null) || (sTrueValue=="undefined")) {
    sTrueValue=YN[0];
  }

  bReturn=( (sValue.toLowerCase()==sTrueValue.toLowerCase()) );

  return bReturn;
}


function decToHex(number) {
  // Return Hex for number, padded with zeros.
  var hex = number.toString(16);
  if ((hex.length % 2) > 0) {
    hex="0"+hex;
  }
  return hex;
}


function RGBtoHex(r, g, b) {
  // 12 apr 2022 [cm] .. convert RGB (in decimal) to HEX
  return "#" + decToHex(r) + decToHex(g) + decToHex(b);
}


// 01 apr 2022 [cm] .. return number of days in month/year
//
function getDaysInMonth(month,year) {
  return new Date(year, month, 0).getDate();
};


function initArray(iNumCols, iNumRows) {
  /*
   * 08 apr 2022 [cm] .. initialize an array
   */
  var arr=[iNumCols];
  var iColIndex=0;
  var iRowIndex=0;
  for (iColIndex=0; iColIndex<iNumCols; iColIndex++) {
    arr[iColIndex]="";
    if (iNumRows>0) {
    arr[iColIndex]=[iNumRows];
      for (iRowIndex=0; iRowIndex<iNumRows; iRowIndex++) {
        arr[iColIndex][iRowIndex]="";
      }
    }
  }

  return arr;
}


function getElemFromString(sStringArray, delim, pos) {
  // 23 jul 2022 [cm] .. return an element from a String using delim, at pos
  if (sStringArray==null) return "";

  var sArray=sStringArray.split(delim);
  var sResult="";
  if (sArray.length>pos) {
    sResult=sArray[pos];
  }
  return sResult;
}



function downloadFile(sLink, sFile) {
  // 02 JUL 2020 ml (2020.45) -- Download one file at a time.
  var link = document.createElement('a');

  link.href = sLink;
  link.download=sFile;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadDoc(sDoc) {
  var sLinkStart="getfile?cmd=DOC&filename="+sDoc;
  setTimeout("downloadFile(\""+sLinkStart+"\", \"Doc\");", 500);
}

function downloadCrsDoc(sDoc) {
  var sLinkStart="getfile?cmd=CRS&filename="+sDoc;
  setTimeout("downloadFile(\""+sLinkStart+"\", \"Doc\");", 500);
}

function downloadThisDoc(sDoc, sDocType) {
  var sLinkStart="getfile?cmd="+sDocType+"&filename="+sDoc;
  setTimeout("downloadFile(\""+sLinkStart+"\", \"Doc\");", 500);
}


function expandMsgDiv(frmObj, overflowOpt) {
  // 31 jul 2022 [cm] .. expand/collapse a message by setting the maxHeight and overflow style elements
  var thisDiv=frmObj;
  if (overflowOpt==null) overflowOpt=0;
  if (thisDiv) {

    var sTitle=thisDiv.getAttribute("title");
    var sThisDivID=thisDiv.id;
    var IDnum=getElemFromString(sThisDivID, ":", 1);

    var msgDiv=document.getElementById("msgdiv:"+IDnum);
    var msgPointerDiv=document.getElementById("msgpointer:"+IDnum);

    if (msgDiv) {
      
      if (sTitle.indexOf("collapse")>0) {
      
        msgDiv.style.maxHeight="30px";
        msgDiv.style.overflow="hidden";
        
        thisDiv.setAttribute("title", "Click to expand");
        if (msgPointerDiv) msgPointerDiv.className="pointDown";

      } else {

        msgDiv.style.maxHeight="1200px";
        if (overflowOpt==1) {
          msgDiv.style.overflow="auto";
        } else {
          msgDiv.style.overflow="hidden";
        }
        
        thisDiv.setAttribute("title", "Click to collapse");
        if (msgPointerDiv) msgPointerDiv.className="pointRight";

      }
    }
  }
}


// 03 oct 2022 [cm] .. show map based on IP address
function showIPonMap(sIP) {
  if (sIP!="") {
    window.open("https://en.iponmap.com/"+sIP,  "ipmap",  "width=675,height=320,scrollbars=1");
  }
}


function copyTableToClipboard(frmObj) {
  // 03 oct 2022 [cm] .. copy the contents of this table to the clipboard
  var sClip="";
  var sRows=frmObj.rows;
  var iRow=0;
  var iCol=0;
  for (iRow=0; iRow<sRows.length; iRow++) {
    var sCells=sRows[iRow].cells;
    for (iCol=0; iCol<sCells.length; iCol++) {
      // 04 oct 2022 [cm] .. innerText returns just the text within the cell, and not the <div> or any other HTML formatting
      var thisCell=sCells[iCol].innerText;
      sClip+=thisCell+TAB;
    }
    sClip+=CRLF;
  }

  navigator.clipboard.writeText(sClip);
}


// 15 feb 2022 [cm] .. disable autocomplete for all elements in a form
function disableAutocomplete() {
  var tagArr = document.getElementsByTagName("form");
  for (var i = 0; i < tagArr.length; i++) {
    tagArr[i].autocomplete = 'off';
  }
}

// 15 feb 2022 [cm] .. run disableAutocomplete function 1 second after page has loaded.
setTimeout("disableAutocomplete()", 1000);