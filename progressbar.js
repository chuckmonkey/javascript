/* 
 * Copyright (c) 2022 Harts Systems Ltd
 * Display and update progress bar...
 */

var sProgressStatus="Please wait...";
var sProgressText  ="One moment please";
var sProgressCancel=" Cancel ";
var sProcessComplete="Process complete";

var iProgIntervalID=0;
var iPercentDone=0;
var iPercentIncrement=1;
var bProgressCancel=true;
var bUserCanceled=false;


function startProgress() {
  var thisProgress=document.getElementById("progressbar");
  if (!thisProgress) {
    // Create progress bar div and elements
    var divProgress=createProgressDiv(bProgressCancel);
    document.body.appendChild(divProgress);
  }

  showDialog("progressbar");
}


function createProgressDiv(bCancel) {

  var divProgress=document.createElement("div");
  divProgress.id="progressbar";
  divProgress.className="thisDialog";
  divProgress.style.minWidth="360px";
  divProgress.style.width="420px";

  var pTitle=document.createElement("p");
  pTitle.id="titlebar";
  pTitle.innerHTML="&nbsp;&nbsp;<span id=\"progresstitlebar\">"+sProgressStatus+"</span>";

  var pPercentDone=document.createElement("p");
  pPercentDone.id="percentdone";
  pPercentDone.setAttribute("align", "center");
  pPercentDone.style.textAlign="center";
  pPercentDone.innerHTML="&nbsp;";
  pPercentDone.style.marginBottom="-30px";    // Negative margin at bottom pushes text down, displayed on top of progress bar
  pPercentDone.style.paddingTop="25px";
  pPercentDone.style.fontWeight="bold";

  var pProgressText=document.createElement("p");
  pProgressText.id="progresstext";
  pProgressText.setAttribute("align", "center");
  pProgressText.style.marginBottom="8px";
  pProgressText.innerHTML=sProgressText;


  // 04 mar 2022 [cm] .. Build a <div> instead of a table
  var divProgressBar=createProgressBar();
  
  divProgress.appendChild(pTitle);
  divProgress.appendChild(pPercentDone);
  divProgress.appendChild(divProgressBar);

  divProgress.appendChild(pProgressText);
  if (bProgressCancel) {
    // Use <div> for cancel button
    var divCancel=createCancelDiv(sProgressCancel);
    divProgress.appendChild(divCancel);
  }

  return divProgress;
}


function showProgress(percentDone, sMsg) {

  var thisProgress=document.getElementById("progressbar");
  if (!thisProgress) {
    // Create the progress bar dialog, if required
    startProgress();
  }

  percentDone=checkNull(percentDone, "");
  if (percentDone=="") percentDone=iPercentDone;

  var iDone=parseInt(percentDone);
  if (iDone<0) iDone=0;
  if (iDone>100) iDone=100;
  var iNotDone=100-(iDone);

  var doneCell=document.getElementById("bardone");
  var notDoneCell=document.getElementById("barnotdone");
  var prgPct=document.getElementById("percentdone");

  if (doneCell) {
    doneCell.style.width=(iDone)+"%";

    doneCell.style.backgroundColor="#"+calcRGBFromPct(iDone);
  
    if (iDone>0) {
      doneCell.innerHTML="&nbsp;";
    } else {
      doneCell.innerHTML="";
    }
  }
  if (notDoneCell) {
    notDoneCell.style.width=(iNotDone)+"%";
    if (iNotDone>0) {
      notDoneCell.innerHTML="&nbsp;";
    } else {
      notDoneCell.innerHTML="";
    }
  }

  if (prgPct) {
    if ((iDone>=0) || (iDone<=100)) {

      // As progress bar moves past 50%, change text color to white
      if (iDone<50) {
        prgPct.style.color="black";
      } else {
        prgPct.style.color="white";
      }
      prgPct.innerHTML=parseInt(iDone)+"%";
    }
  }

  // 15 sep 2022 [cm] .. set optional progress message
  if (sMsg!=null) {
    setElementinnerHTML("progresstitlebar", sMsg);
  }
}


function createProgressBar() {

  var divPct=document.createElement("div");
  divPct.id="progresspercent";
  divPct.style.width="360px";
  divPct.style.height="30px";
  divPct.style.marginTop="2px";
  divPct.style.marginBottom="2px";
  divPct.className="tableRows";
  divPct.style.textAlign="center";

  var divCellDone=document.createElement("div");
  divCellDone.id="bardone";
  divCellDone.style.width="0%";
  divCellDone.style.height="100%";
  divCellDone.style.padding="0px";
  divCellDone.style.margin="0px";
  divCellDone.style.backgroundColor="#008000";
  divCellDone.setAttribute("bgcolor", "#008000");

  divPct.appendChild(divCellDone);

  return divPct;

}


function createCancelDiv(sCancelText) {

  sCancelText=checkNull(sCancelText, "");
  if (sCancelText=="") sCancelText=sProgressCancel;

  var divCancel=document.createElement("div");
  divCancel.style.width="360px";
  divCancel.style.height="30px";
  divCancel.style.marginTop="2px";
  divCancel.style.marginBottom="8px";
  divCancel.style.marginLeft="auto";
  divCancel.style.marginRight="auto";
  divCancel.style.textAlign="center";

  var txtCancel=document.createElement("input");
  txtCancel.setAttribute("type", "button");
  txtCancel.className="inputbutton";
  txtCancel.setAttribute("value", sCancelText);
  txtCancel.setAttribute("onclick", "closeProgress('cancel');");

  divCancel.appendChild(txtCancel);

  return divCancel;

}

function closeProgress(opt) {
  opt=checkNull(opt);

  if (opt=="") {
    var progText=document.getElementById("progresstext");
    if (progText) progText.innerHTML=sProcessComplete;
  } else if (opt=='cancel') {
    bUserCanceled=true;

    // Run stopStatus, if it exists
    if (typeof stopStatus === "function") {
      stopStatus();
    }
  }

  if (iProgIntervalID) window.clearInterval(iProgIntervalID);

  setTimeout("closeDialog('progressbar');", 500);
  setTimeout("removeElement('progressbar');",500);
}


function testProgressBar() {
  iProgIntervalID=window.setInterval("progressTester()", 250);
}


function progressTimer() {
  // Display a progress bar, updated at regular intervals
  showProgress(iPercentDone);
  iPercentDone+=iPercentIncrement;
  if (iPercentDone>100) {
    showProgress(100);
    window.clearInterval(iProgIntervalID);
    setTimeout("closeProgress();",250);
  }
}


function showProgressTimer(iSeconds, bAllowCancel) {
  // display a progress bar for specified number of seconds, updated every 125 milliseconds.
  // ie show the progress bar for 5 seconds, while it automatically goes from 0 to 100% and then closes
  bProgressCancel=bAllowCancel;
  if (bProgressCancel==null) bProgressCancel=true;
  
  var iInc=125;
  iPercentDone=0;
  iPercentIncrement=iInc/(((iSeconds*1000)/100));
  showProgress(0);
  iProgIntervalID=window.setInterval("progressTimer()", iInc);
}


function calcRGBFromPct(iDone) {
  /*
   * Take percent value, calculate RGB color (range from blue to green)
   */
  var lRed = 0;
  var lGreen = ( ((iDone / 100) * 128) );
  var lBlue = ( 255 - ( ((iDone / 100) * 255) ) );

  var hRed  =decToHex(parseInt(lRed));
  var hGreen=decToHex(parseInt(lGreen));
  var hBlue =decToHex(parseInt(lBlue));

  var sRGB=hRed+hGreen+hBlue
  return sRGB;

}