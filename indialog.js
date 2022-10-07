/*
 * Copyright (c) Harts Systems Ltd
 *
 */

var TIMER = 5;
var SPEED = 10;
var WRAPPER = 'content';

var IEbody=(document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body;

var alertZindex=220;
var alertLeftOffset=0;
var alertTopOffset=0;

var dialogZindex=200;
var dialogLeftOffset=0;
var dialogTopOffset=0;

var alertDIV  ="showalert";
var alertMSG  ="alertmessage";
var alertTTL  ="alerttitle";
var dialogMASK="dialog-mask";
var CCS1      ="CSS1Compat";

var currentFormObj;
var sDefaultStyle="Transparent";


var BUTTONS_NONE="000";
var BUTTONS_CLOSE="001";
var BUTTONS_MAXCLOSE="011";
var BUTTONS_MINCLOSE="101";
var BUTTONS_MINMAXCLOSE="111";
var BUTTONS_MINPOPCLOSE="121";

function getWidth() {
  var thisWidth;
  // 22 Dec 2011 [hf] (2012.12) - Try to get more accurate width for mobile browser
  if (document.body && document.body.offsetWidth) {
   thisWidth = document.body.offsetWidth;
  }
  if (document.compatMode==CCS1 &&
      document.documentElement &&
      document.documentElement.offsetWidth ) {
   thisWidth = document.documentElement.offsetWidth;
  }
  if (window.innerWidth) {
    thisWidth=window.innerWidth;
  } else {
    thisWidth=IEbody.clientWidth;
  }


  thisWidth=window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;


  return thisWidth;
}

function getHeight() {
  var thisHeight;
  // 22 Dec 2011 [hf] (2012.12) - Try to get more accurate height for mobile browser
  if (document.body && document.body.offsetWidth) {
   thisHeight = document.body.offsetHeight;
  }
  if (document.compatMode==CCS1 &&
      document.documentElement &&
      document.documentElement.offsetWidth ) {
   thisHeight = document.documentElement.offsetHeight;
  }
  if (window.innerHeight) {
    thisHeight=window.innerHeight;
  } else {
    thisHeight=IEbody.clientHeight;
  }


  thisHeight=window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;


  return thisHeight;
}

function getLeft() {
  var thisLeft;
  if (window.pageXOffset) {
    thisLeft=window.pageXOffset;
  } else {
    thisLeft=IEbody.scrollLeft;
  }
  return thisLeft;
}

function getTop() {
  var thisTop;
  if (window.pageYOffset) {
    thisTop = window.pageYOffset;
  } else {
    thisTop=IEbody.scrollTop;
  }
  return thisTop;
}

function dialogMask() {
  var loadmask;
  if (document.getElementById(dialogMASK)) {
    loadmask=document.getElementById(dialogMASK);
    loadmask.style.visibility='visible';
  } else {
    loadmask=document.createElement('div');
    loadmask.id=dialogMASK;
    document.body.appendChild(loadmask);
  }
}

function hideMask() {
  var loadmask=document.getElementById(dialogMASK);
  if (loadmask) {
    //loadmask.style.display='none';
    loadmask.style.visibility='hidden';
  }
}

function showHelp(divname) {
  var width =getWidth();
  var height=getHeight();

  var left  =getLeft();
  var top   =getTop();

  var divDialog=document.getElementById(divname);
  if (divDialog) {
    divDialog.style.display='inline';
    divDialog.style.visibility='visible';

    var dialogwidth = divDialog.offsetWidth;
    var dialogheight = divDialog.offsetHeight;

    var topposition  =80;
    var leftposition =15;

    divDialog.style.top =topposition +"px";
    divDialog.style.left=leftposition+"px";

    divDialog.style.zIndex=250;
  }
}

function showHelpWindow(sURL) {
  closeDialog('webapp_help');
  window.open(sURL, 'WP_Help', 'width=640 ,height=430, scrollbars=1').focus();
  return false;
}

function saveHelpPref() {
  /* 07 mar 2017 [cm] .. Save user choice (always high/show help screens) in UserSpecs */
  var chkHelp=document.getElementById("webapp_help_check");

  if (chkHelp) {
    var desc="webapp_help_check";
    var checkedValue=chkHelp.checked;
    var helpHttp=getHTTPObject(); // We create the XMLHTTPRequest Object

    var sURL="./tcl";
    var sParams="?cmd=setspecs "+
                desc+" "+
                checkedValue;

    helpHttp.open("POST", sURL+sParams, true);
    helpHttp.send(null);

  }
}

function showDialogTimeout(divname, timeout) {
  // 23 sep 2016 [cm] .. Show dialog for specified time, then close
  showDialog(divname);
  var sClose="closeDialog('"+divname+"')";
  setTimeout("closeDialog('"+divname+"')", timeout);
}
function showDialog(divname) {
  // 21 jun 2016 [cm] .. Added optional zindex paramter (default is 200)
  showDialogZ(divname, dialogZindex+"");
  dialogZindex=dialogZindex+5;
}

function showDialogZ(divname, zindex) {
  // 21 jun 2016 [cm] .. Added optional zindex paramter (default is 200)
  var width =getWidth();
  var height=getHeight();

  var left  =getLeft();
  var top   =getTop();

  var divDialog=document.getElementById(divname);
  if (divDialog) {
    divDialog.style.display='inline';
    divDialog.style.visibility='visible';

    // 22 Dec 2011 [hf] (2012.12) - For mobile browsers, reset width and height
    // otherwise the dialog is not displayed nicely
    if (dialogwidth<300) {
      dialogwidth=350;
      divDialog.style.width=dialogwidth+"px";
    }
    if (dialogheight<200) {
      dialogheight=200;
      divDialog.style.height=dialogheight+"px";
    }

    var dialogwidth = divDialog.offsetWidth;
    var dialogheight = divDialog.offsetHeight;

    var topposition = top + (height / 3) - (dialogheight / 2);
    var leftposition = left + (width / 2) - (dialogwidth / 2);

    topposition = top+(height-dialogheight)/2;
    leftposition= left+(width-dialogwidth)/2;

    if (divname==alertDIV) {
      topposition  =alertTopOffset+topposition;
      leftposition =alertLeftOffset+leftposition;
    } else {
      topposition  =dialogTopOffset+topposition;
      leftposition =dialogLeftOffset+leftposition;
    }
    divDialog.style.top =topposition +"px";
    divDialog.style.left=leftposition+"px";

    if (zindex!="") {
      divDialog.style.zIndex=zindex;
    }

    /* This sets the background (behind the dialog box) to 75% opacity */
    dialogMask();
    dialogESC(divname);  // This adds a check for ESC event to the dialog box
    divDialog.focus();   // Then sets the focus to the dialog box.

  }
}


function resizeDialog(divname, percentX, percentY) {
  var divDialog=document.getElementById(divname);
  var width =getWidth();
  var height=getHeight();

  var dialogwidth = divDialog.offsetWidth;
  var dialogheight = divDialog.offsetHeight;

  var bSetWidth=false;
  var bSetHeight=false;

  // 10 dec 2020 [cm] .. Check for null values
  if (percentX!=null) bSetWidth=true;
  if (percentY!=null) bSetHeight=true;
  
  // Fit dialog and table to screen
  dialogwidth=width*(percentX/100);
  dialogheight=height*(percentY/100);

  divDialog.style.width=dialogwidth+"px";
  divDialog.style.height=dialogheight+"px";

  var divcrsobj_div=document.getElementById(divname+"_div");
  if (!divcrsobj_div) {
    divcrsobj_div=document.getElementById(divname);
  }
  if (divcrsobj_div) {

    if (bSetWidth) divcrsobj_div.style.width=(dialogwidth-50)+"px";
    if (bSetHeight) divcrsobj_div.style.height=(dialogheight-125)+"px";

    divcrsobj_div.style.marginLeft="auto";
    divcrsobj_div.style.marginRight="auto";
  }

  var divcrsobj_table=document.getElementById(divname+"_table");
  if (divcrsobj_table) {
    if (bSetWidth) divcrsobj_table.style.width=(dialogwidth-70)+"px";

  }

}


function sizeDialog(divname, sizeX, sizeY) {
  // 10 dec 2020 [cm] .. Set dialog box to fixed size
  var divDialog=document.getElementById(divname);
  var width =getWidth();
  var height=getHeight();

  var dialogwidth = divDialog.offsetWidth;
  var dialogheight = divDialog.offsetHeight;

  var bSetWidth=false;
  var bSetHeight=false;

  // 10 dec 2020 [cm] .. Check for null values
  if (sizeX!=null) bSetWidth=true;
  if (sizeY!=null) bSetHeight=true;

  // Fit dialog and table to screen
  dialogwidth=sizeX;
  dialogheight=sizeY;

  if (bSetWidth) divDialog.style.width=dialogwidth+"px";
  if (bSetHeight) divDialog.style.height=dialogheight+"px";

  var divcrsobj_div=document.getElementById(divname+"_div");
  if (divcrsobj_div) {

    if (bSetWidth) divcrsobj_div.style.width=(dialogwidth-50)+"px";
    if (bSetHeight) divcrsobj_div.style.height=(dialogheight-125)+"px";

    divcrsobj_div.style.marginLeft="auto";
    divcrsobj_div.style.marginRight="auto";
  }

  var divcrsobj_table=document.getElementById(divname+"_table");
  if (divcrsobj_table) {
    if (bSetWidth) divcrsobj_table.style.width=(dialogwidth-70)+"px";

  }

}


function scrollToTop() {
  window.scrollTo(0,0);
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


function showPrintDialog(divname) {
  // 16 dec 2020 [cm] .. Show print preview dialog

  scrollToTop();
  var width =getWidth();
  var height=getHeight();

  var left  =getLeft();
  var top   =getTop();

  var divDialog=document.getElementById(divname);

  var topposition;
  var leftposition;

  var dialogwidth;
  var dialogheight;


  if (divDialog) {
    divDialog.style.width=(width-100)+"px";
    divDialog.style.height=(height-200)+"px";
    
    dialogwidth = divDialog.offsetWidth;
    dialogheight = divDialog.offsetHeight;

    //if (dialogwidth<=100) {
      dialogwidth=(width-100);
    //}
    //if (dialogheight<=100) {
      dialogheight=(height-200);
    //}

    divDialog.style.display='inline';
    divDialog.style.visibility='visible';

    topposition = top+((height-dialogheight)/2);
    leftposition= left+((width-dialogwidth)/2);

    
    scrollToTop();
  
    divDialog.style.top =topposition +"px";
    divDialog.style.left=leftposition+"px";

    //window.scrollTo(0,(0-topposition));
    //scrollToTop();
    
    /* This sets the background (behind the dialog box) to 75% opacity */
    dialogMask();
    dialogESC(divname);  // This adds a check for ESC event to the dialog box
    divDialog.focus();   // Then sets the focus to the dialog box.

  }
}


function printDialog(divname) {
  /*
   * 22 feb 2022 [cm] .. print only the contents of the <div> identified by divID
   *                     it works by making a copy of the page content (document.body.innerHTML), then removes and
   *                     replaces it with the innerHTML of the <div> only, then prints the window.
   *                     Then returns the body back to the originalContents
   *
   */
  var divDialog=document.getElementById(divname);
  bRemovedNoPrint=false;
  if (divDialog.classList.contains("noprint")) {
    divDialog.classList.remove("noprint");
    bRemovedNoPrint=true;
  }

  var printContents = divDialog.innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
  
  if (bRemovedNoPrint) {
    divDialog.classList.add("noprint");
  }
}


function closeDialog(divname) {
  var divDialog=document.getElementById(divname);
  if (divDialog) {
    divDialog.style.display='none';
    divDialog.style.visibility='hidden';
  }
  hideMask();
  //var loadmask = document.getElementById(dialogMASK);
  //if (loadmask) {
  //  //loadmask.style.display='none';
  //  loadmask.style.visibility='hidden';
  //}

  if (divname==alertDIV) {
    alertZindex=alertZindex-5;
    if (alertZindex<220) alertZindex=220;
    // If it exists, reset focus back to original object
    if (currentFormObj) {
      currentFormObj.focus();
    }
  } else {
    dialogZindex=dialogZindex-5;
    if (dialogZindex<200) dialogZindex=200;
  }
  return;
}

function minDialog(divID) {
  /*
   * 21 dec 2021 [cm] .. minimize Dialog box (reduce to minimum (300px x 180px)
   */

  //frmObj.style.width="300px";
  //frmObj.style.height="180px";
  sizeDialog(divID, 300, 100);
  setDialogPos(divID);
  resizeReportData(divID);

}

function maxDialog(divID) {
  /*
   * 21 dec 2021 [cm] .. maximize Dialog box (to fit current window)
   */

  var width =getWidth();
  var height=getHeight();

  var left  =getLeft();
  var top   =getTop();

  var thisDiv=document.getElementById(divID);
  if (thisDiv) {
    //thisDiv.style.left=(left+10)+"px";
    //thisDiv.style.top=(top+10)+"px";

    sizeDialog(divID, ( width-(left*2)-40 ), ( height-(top*2)-40 ) );
    setDialogPos(divID);
    resizeReportData(divID);
  }
}


function popDialog(divID) {
  /*
   * 30 dec 2021 [cm] .. close the Dialog box, then open it in an external window
   */

  closeDialog(divID);
  var sURL="./reportout.jsp?cmd=open&div="+divID;
  var width=720;
  var height=640;

  var iepID=getElementValue("iep_design_name");
  var iepSectionID=getElementValue("iep_sec_id");
  var iepSectionTab=getElementValue("iep_sec_tab");

  if (divID==G_IEP_SECTION) {
    // 09 jun 2022 [cm] .. Extra paramters required for IEP preview in popout window
    width=800;

    sURL+="&iepid="+eCode(iepID);
    sURL+="&iepsectionid="+eCode(iepSectionID);
    sURL+="&iepsectiontab="+eCode(iepSectionTab);
  }

  if (divID==G_IEP_DESIGN) {
    // 09 jun 2022 [cm] .. Extra paramters required for IEP preview in popout window
    width=800;
    sURL+="&iepid="+eCode(iepID);
  }

  //var sURL="./students.jsp?cmd=open&div="+divID;
  thisPopout=window.open(sURL, 'Report', 'scrollbars=yes, resizable=yes, width='+width+', height='+height+', location=no, status=no').focus();
}


function showAlert(message) {
  showAlertZ(message, alertZindex+"");
  alertZindex=alertZindex+5;
}

function showAlertZ(message, zindex) {
  // 15jul 2016 [cm] .. Added optional zindex paramter (default is 200)

  var divAlert=document.getElementById(alertMSG);
  var sAlert="showDialogZ('"+alertDIV+"', "+zindex+");";
  if (message!="") {
    if (divAlert) {
      divAlert.innerHTML=message;
      if (zindex!="") {
        divAlert.style.zIndex=zindex;
      }

      // This adds a check for ESC key event to the entire alert <div> button
      //dialogESC(alertDIV);
      /* 14 DEC 2009 ml (2010.20) -- Per CM, changed from: showDialog('showalert'); */
      setTimeout(sAlert,1);
      setTimeout('setElementFocus("alertbutton");',5);


    } else {
      alert(message);
    }
  }


}

function dialogESC(div) {
  var thisDiv=document.getElementById(div);
  if (thisDiv) {
    //console.log(div+" adding event listener");
    thisDiv.addEventListener("keydown", function(e) {
      e=e || window.event;
      //console.log(div+" e="+e.keyCode);
      if (e.keyCode==27) {
        closeDialog(div);
      }
    }, true);
    thisDiv.tabIndex="1";
  }
}

function showDone(message, msgtitle) {
  var divAlert=document.getElementById(alertMSG);
  var divTitle=document.getElementById(alertTTL);
  if (divAlert) {
    divAlert.innerHTML=message;
    divTitle.innerHTML=msgtitle;
    /* 14 DEC 2009 ml (2010.20) -- Per CM, changed from: showDialog('showalert'); */
    setTimeout("showDialog('"+alertDIV+"');",200);
  } else {
    alert(message);
  }
}


var bItemSelectAll=true;
function selectItems(FormObj, elem_name) {
  var iRow=0;
  var this_select=document.getElementsByName(elem_name+"_select");
  var this_button=document.getElementById(elem_name+"_button");

  if (this_select) {

    if (bItemSelectAll) {
      for (iRow=0; iRow<this_select.length; iRow++) {
        this_select[iRow].checked=bItemSelectAll;
      }
      bItemSelectAll=false;
      if (this_button) {
        this_button.innerHTML="Clear all";
      }

    } else {
      for (iRow=0; iRow<this_select.length; iRow++) {
        this_select[iRow].checked=bItemSelectAll;
      }
      bItemSelectAll=true;
      if (this_button) {
        this_button.innerHTML="Select all";
      }
    }
  }
}


function showPic(id, usertype) {
  // 08 Mar 2022 [hf] (2021.27) - add usertype parameter, if it's undefined set it to a blank string
  var checkUserType = "";
  if ((trim(id))=="") return false;
  if (typeof usertype === "undefined") {  } else {checkUserType = usertype;}

  var left  =getLeft();
  var top   =getTop();

  var posY=Math.round(mouseY/10);
      posY=Math.round(posY*10);

  var posX=25;  // 18 nov 2015 [cm] .. Moved pic slight to left...

  var this_img=document.getElementById("thumbnail");
  // 08 Mar 2022 [hf] (2021.27) - Add staff mode if required
  if (this_img) {
    //this_img.src="./getphoto?id="+id+
    //                         "&stamp="+new Date().getTime();
    this_img.src="./getphoto?id="+id+
                             "&stamp="+new Date().getTime()+
                             "&staff_mode="+checkUserType;
  }

  var this_pic=document.getElementById("thisphoto");

  if (this_pic) {
    this_pic.style.left=left+posX+"px";
    this_pic.style.top=top+posY-20+"px";

    this_pic.style.display='inline';
    this_pic.style.visibility='visible';
  }

  return true;
}

function showMobilePic(id) {

  if ((trim(id))=="") return false;

  var width =getWidth();
  var left  =getLeft();
  var top   =getTop();

  var posY=Math.round(mouseY/10);
      posY=Math.round(posY*10);

  var posX=(width-180)/2;
  if (posX>100) posX=100;

  var this_img=document.getElementById("thumbnail");
  if (this_img) this_img.src="./getphoto?id="+id;

  var this_pic=document.getElementById("thisphoto");

  if (this_pic) {
    this_pic.style.left=posX+"px";
    this_pic.style.top="40px";

    this_pic.style.display='inline';
    this_pic.style.visibility='visible';
  }
  dialogMask();

  return true;
}

function hidePic() {
  var this_pic=document.getElementById("thisphoto");
  if (this_pic) {
    this_pic.style.display='none';
    this_pic.style.visibility='hidden';
  }
  //hideMask();  /* 27 mar 2014 [cm] .. Don't need to hideMask() */
}

function showMap(message) {
  /* 30 JUL 2015 ml (2015.64) -- Show map popup. */
  var divAlert=document.getElementById('mapmessage');
  if (divAlert) {
    divAlert.innerHTML=message;
    setTimeout("showDialog('showmap');",200);
  } else {
    alert(message);
  }
}

function closeMapDialog(divname) {
  /* 30 JUL 2015 ml (2015.64) -- Close map popup. */
  var divDialog=document.getElementById(divname);
  if (divDialog) {
    divDialog.style.visibility='hidden';
  }
  hideMask();
  var loadmask = document.getElementById(dialogMASK);
  if (loadmask) {
    loadmask.style.visibility='hidden';
  }
  return;
}

function enableButton(buttonID) {
  setButton(buttonID, true);
}

function disableButton(buttonID) {
  setButton(buttonID, false);
}

function setButton(buttonID, bEnabled) {
  // 22 jun 2016 [cm] .. Enable or disable button indicated by buttonname
  var thisButton=document.getElementById(buttonID);

  if (thisButton) {
    if (bEnabled) {
      thisButton.disabled=false;
    } else {
      thisButton.disabled=true;
    }
  }
}

function showButton(buttonID) {
  showHideButton(buttonID, true);
}

function hideButton(buttonID) {
  showHideButton(buttonID, false);
}

function showHideButton(buttonID, bShow) {
  var thisButton=document.getElementById(buttonID);

  if (thisButton) {
    if (bShow) {
      thisButton.style.display='inline';
      thisButton.style.visibility='visible';
      if (thisButton.tagName.toLowerCase()=="tr") {
        thisButton.style.display='table-row';
      }
    } else {
      thisButton.style.display='none';
      thisButton.style.visibility='hidden';
    }
  }
}

function hideElement(elemID) {
  var thisElem=document.getElementById(elemID);
  if (thisElem) {
    thisElem.style.visibility='hidden';
  }
}

function showElement(elemID) {
  var thisElem=document.getElementById(elemID);
  if (thisElem) {
    thisElem.style.visibility='visible';
  }
}


function getElement (el) {
  if (typeof el=='string') return document.getElementById(el);
  return el;
}

function makeDragable (clickEl, dragEl) {
  /*
   * 05 oct 2016 [cm] .. Make a dialog <div> into a dragable item.
   *                     clickEl should be the ID of the <div> which can be clicked. dragEl should be the ID of the <div> which will get moved around.
   *                     For example, the clickEl should be the main title bar of a dialog box, the dragEl should be the entire dialog box.
   */
  var p=getElement(clickEl);
  var t=getElement(dragEl);
  var drag=false;

  var offsetX=0;
  var offsetY=0;

  var mousemoveTemp = null;

  if (t) {

    var move = function (x,y) {

      var dragPadTop=10;
      var dragPadLeft=10;
      var dragPadWide=30;
      var dragPadHigh=15;

      var newLeft=(parseInt(t.style.left)+x);
      var newTop =(parseInt(t.style.top) +y);

      var divWidth=(parseInt(t.style.width));
      var divHeight=(parseInt(t.style.height));

      var w=getWidth();
      var h=getHeight();

      if (newLeft < dragPadLeft) newLeft=dragPadLeft;
      if (newTop < dragPadTop) newTop=dragPadTop;

      if ( (newLeft+divWidth) > (w-dragPadWide) ) newLeft=(w-divWidth-dragPadWide);
      if ( (newTop+divHeight) > (h-dragPadHigh) ) newTop=(h-divHeight-dragPadHigh);

      //var ttl=getElement("anecdotal_title");
      //if (ttl) {
      //  ttl.innerHTML="divHeight="+divHeight+"px;";
      //}

      t.style.left =newLeft +"px";
      t.style.top  =newTop  +"px";
    }

    var mouseMoveHandler = function (e) {
      e = e || window.event;

      if(!drag) {return true};

      // Get current mouse position
      getMouseXY(e);
      var x = mouseX;
      var y = mouseY;

      if (x != offsetX || y != offsetY) {
        move(x-offsetX, y-offsetY);

        offsetX = x;
        offsetY = y;

        // For debugging, check mouse position, offset from top/left corner of div, window height, width
        //var leftPos=get("leftPos");
        //var topPos=get("topPos");
        //
        //var offLeft=get("offLeft");
        //var offTop=get("offTop");
        //
        //var windowWidth=get("windowWidth");
        //var windowHeight=get("windowHeight");
        //
        //if (leftPos) {
        //  leftPos.innerHTML="leftPos="+t.style.left;
        //  topPos.innerHTML="topPos="+t.style.top;
        //
        //  offLeft.innerHTML="offsetLeft="+offsetX;
        //  offTop.innerHTML="offsetTop="+offsetY;
        //
        //  windowWidth.innerHTML="Width="+w;
        //  windowHeight.innerHTML="Height="+h;
        //}

      }
      return false;
    }

    var start_drag = function (e) {
      e = e || window.event;

      getMouseXY(e);
      offsetX=mouseX;
      offsetY=mouseY;
      drag=true; // basically we're using this to detect dragging

      // save any previous mousemove event handler:
      if (document.body.onmousemove) {
        mousemoveTemp = document.body.onmousemove;
      }
      document.body.onmousemove = mouseMoveHandler;
      return false;
    }

    var stop_drag = function () {
      drag=false;

      // restore previous mousemove event handler if necessary:
      if (mousemoveTemp) {
        document.body.onmousemove = mousemoveTemp;
        mousemoveTemp = null;
      }
      return false;
    }

    p.onmousedown =start_drag;
    p.onmouseup   =stop_drag;
    p.onmouseout  =stop_drag;
    //t.onmouseout  =stop_drag;

    // 30 mar 2017 [cm] .. set mouse cursor style to "move" on clickable area
    p.style.cursor=style="move";
  }

}

function getStudentProfile_byID(person_ID) {

  // 16 NOV 2017 ml (2017.56)  -- Handle student profiles.
  // 12 DEC 2017 ml (2017.56b) -- Changed from "studentprofile.jsp" to "studentdashboard.jsp".
  var sProfilePage="studentdashboard.jsp?person_id="+person_ID;
  gotoUrl(sProfilePage);

}

function removeElement(elementId) {
  // 05 apr 2019 [cm] .. Removes an element from the document
  var element = document.getElementById(elementId);
  if (element) {
    element.parentNode.removeChild(element);
  }
}


function bringDialogToFront(frmObj) {
  /*
   * 21 dec 2021 [cm] .. Bring <div> to front by setting zIndex to next highest value
   */

  var highestObj=findHighestZIndexObject("div");
  
  if (highestObj.id!=frmObj.id) {

    var thisDiv=document.getElementById(frmObj.id);
    if (thisDiv) {
      var zedIndex=getStyle(highestObj.id, "z-index");
      
      if (zedIndex=="") zedIndex=dialogZindex;
      zedIndex=parseInt(zedIndex)+5;
      thisDiv.style.zIndex=zedIndex+"";
    }
  }

}

var G_BROWSE_STUDENTS   ="browsestudents";
var G_BIRTHDAY_LIST     ="birthdaylist";
var G_BROWSE_CLASSES    ="browseclasses";
var G_DAILY_ATT_REPORT  ="dailyattreport";
var G_CALENDAR_REPORT   ="printcalreport";
var G_TABLEGRID         ="tablegrid";

var G_LABELS            ="labels";
var G_MESSAGES          ="messages";
var G_THISMSG           ="thismsg";

var G_IEP_SECTION       ="iepsection";
var G_IEP_DESIGN        ="iepdesign";
var G_RECENT_ACTIVITY   ="recentactivity"; // 6 Jul 2022 [hf] (2021.52)

function showReportDiv(divID, sReportTitle, sButtons, sStyle, sWidth) {
  /*
   * 10 dec 2021 [cm] .. Display a <div> (create if required) to show a report
   */
  var mainDiv=document.getElementById(divID);

  var thisReport=new ReportDiv(divID, sReportTitle, sButtons, sStyle, sWidth);

  // 14 jan 2022 [cm] .. check if report in popout window
  var bPopout=false;
  if (thisReport.buttons=="POP") bPopout=true;

  //sReportTitle=checkUndefined(sReportTitle, "");
  //sButtons    =checkUndefined(sButtons, "000");
  //sStyle      =checkUndefined(sStyle, sDefaultStyle);
  //sWidth      =checkUndefined(sWidth, "480px");

  
  if (!mainDiv) {
    // Create the main div if it does not exist
    mainDiv=createReportDiv(thisReport);
  }

  // Then display the div
  mainDiv.style.display='inline';
  mainDiv.style.visibility='visible';

  setDialogPos(mainDiv.id);
  
  dialogESC(divID);  // This adds a check for ESC event to the dialog box
  //mainDiv.focus();
  
  // Get the report to be displayed...
  getQuickReport(divID);

  // Make sure _reportdata <div> fits
  //if (!bPopout) {
  if (divID==G_LABELS) {
    mainDiv.style.width="320px";
    mainDiv.style.height="440px";
  }

  if (divID==G_IEP_SECTION) {
    mainDiv.style.width="800px";
    mainDiv.style.height="700px";
  }
  if (divID==G_IEP_DESIGN) {
    mainDiv.style.width="800px";
    mainDiv.style.height="700px";
  }
  if (divID==G_RECENT_ACTIVITY) {
    // 6 Jul 2022 [hf] (2021.52)
    mainDiv.style.width="300px";
    mainDiv.style.height="300px";
  }

  resizeReportData(divID);
    
  //}

  bringDialogToFront(mainDiv);
}


function ReportDiv(divID, reportTitle, buttons, style, width) {
  // 13 jan 2022 [cm] .. function to create ReportDiv object
  
  divID       =checkUndefined(divID, "");
  reportTitle =checkUndefined(reportTitle, "");
  buttons     =checkUndefined(buttons, BUTTONS_NONE);
  style       =checkUndefined(style, sDefaultStyle);
  width       =checkUndefined(width, "480px");

  while (buttons.length<3) {
    buttons="0"+buttons;
  }

  this.divID      =divID;
  this.reportTitle=reportTitle;
  this.buttons    =buttons;
  this.style      =style;
  this.width      =width;

}


function createReportDiv(thisReport) {

  // 30 DEC 2021 [CM] .. Create the main div if it does not exist, return div object
  var dialogwidth;
  var dialogheight;

  var width =getWidth();
  var height=getHeight();

  var left  =getLeft();
  var top   =getTop();

  var buttonHeight=80;

  //sReportTitle=checkUndefined(sReportTitle, "");
  //sButtons    =checkUndefined(sButtons, "000");
  //sStyle      =checkUndefined(sStyle, sDefaultStyle);
  //sWidth      =checkUndefined(sWidth, "480px");

  //if (sStyle=="") sStyle=sDefaultStyle;

  //while (sButtons.length<3) {
  //  sButtons="0"+sButtons;
  //}

  // 14 jan 2022 [cm] .. check if report in popout window
  var bPopout=false;
  if (thisReport.buttons=="POP") bPopout=true;

  var mainDiv=document.createElement("div");
  mainDiv.id=thisReport.divID;
  mainDiv.className="resizable thisDialog noprint";
  mainDiv.style.minWidth="300px";
  //mainDiv.style.maxWidth="640px";
  mainDiv.style.width=thisReport.width;
  mainDiv.setAttribute("onclick", "bringDialogToFront(this);");

  mainDiv.style.minHeight="100px";
  if (!bPopout) mainDiv.style.height=(height-40)+"px";
  mainDiv.style.marginRight="auto";
  mainDiv.style.marginLeft="auto";
  //mainDiv.style.zIndex=dialogZindex;
  if (bPopout) {
    mainDiv.style.height="95%";
  }

  
  var buttonDiv=document.createElement("div");
  buttonDiv.id=thisReport.divID+"_closediv";
  buttonDiv.style.width="80px";
  buttonDiv.style.marginRight="auto";
  buttonDiv.style.marginLeft="auto";
  buttonDiv.style.marginTop="5px";

  var okButton=document.createElement("input");
  okButton.id=thisReport.divID+"_okbutton";
  okButton.className="inputbutton";

  okButton.setAttribute("type", "button");
  okButton.setAttribute("value", " OK ");
  okButton.setAttribute("onClick", "closeDialog('"+thisReport.divID+"');");

  okButton.style.textAlign="center";
  okButton.style.minWidth="50px";
  okButton.style.maxWidth="50px";
  okButton.style.width="50px";


  var printButton=document.createElement("input");
  printButton.id=thisReport.divID+"_okbutton";
  printButton.className="inputbutton prbutton";

  printButton.setAttribute("type", "button");
  printButton.setAttribute("value", " Print ");
  printButton.setAttribute("onClick", "printDialog('"+thisReport.divID+"');");

  printButton.style.textAlign="center";
  printButton.style.minWidth="50px";
  printButton.style.maxWidth="50px";
  printButton.style.width="50px";


  var reportDiv=document.createElement("div");
  reportDiv.className="reportData";
  reportDiv.id=thisReport.divID+"_reportdata";
  if (bPopout) {
    reportDiv.style.minHeight="90%";
    reportDiv.style.height="90%";
    reportDiv.style.width="98%";
  }

  
  var resizeDiv=makeResizers();

  
  if (!bPopout) {
    // Title bar and buttons
    var titleDrag=document.getElementById(thisReport.divID+"_drag");
    if (!titleDrag) {
      titleDrag=document.createElement("div");
      titleDrag.id=thisReport.divID+"_drag";
    }

    var titleElem=document.createElement("p");
    titleElem.id="titlebar";
    titleElem.innerHTML="&nbsp;";

    var titleSpan=makeTitleSpan(thisReport);
    titleDrag.appendChild(titleElem).appendChild(titleSpan);
    resizeDiv.appendChild(titleDrag);
  }

  //resizeDiv.appendChild(titleDrag).appendChild(titleElem).appendChild(titleSpan);
  resizeDiv.appendChild(reportDiv);

  if (!bPopout) {
    buttonDiv.appendChild(okButton);
    resizeDiv.appendChild(buttonDiv);
  } else {
    buttonDiv.appendChild(printButton);
    resizeDiv.appendChild(buttonDiv);
  }

  mainDiv.appendChild(resizeDiv);
  
  //mainDiv.appendChild(titleDrag).appendChild(titleElem).appendChild(titleSpan)
  //mainDiv.appendChild(reportDiv);
  //mainDiv.appendChild(closeDiv).appendChild(closeButton);

  document.body.appendChild(mainDiv);

  if (!bPopout) {
    makeDragable(thisReport.divID+"_drag", thisReport.divID);
    makeResizableDiv(thisReport.divID);
    //makeResizableDiv(".resizable");
    //resizeReportData(divID);
  }

  return mainDiv;
}


function makeResizers() {

  var resizeDiv=document.createElement("div");
  resizeDiv.className="resizers";

  var resizeDiv1=document.createElement("div");
  var resizeDiv2=document.createElement("div");
  var resizeDiv3=document.createElement("div");
  var resizeDiv4=document.createElement("div");

  var resizeDivTop=document.createElement("div");
  var resizeDivBottom=document.createElement("div");
  var resizeDivLeft=document.createElement("div");
  var resizeDivRight=document.createElement("div");

  resizeDiv1.className="table-resizer top-left";
  resizeDiv2.className="table-resizer top-right";
  resizeDiv3.className="table-resizer bottom-left";
  resizeDiv4.className="table-resizer bottom-right";

  resizeDivTop.className="table-resizer top-side";
  resizeDivBottom.className="table-resizer bottom-side";
  resizeDivLeft.className="table-resizer left-side";
  resizeDivRight.className="table-resizer right-side";

  resizeDiv.appendChild(resizeDiv1);
  resizeDiv.appendChild(resizeDiv2);
  resizeDiv.appendChild(resizeDiv3);
  resizeDiv.appendChild(resizeDiv4);

  resizeDiv.appendChild(resizeDivTop);
  resizeDiv.appendChild(resizeDivBottom);
  resizeDiv.appendChild(resizeDivLeft);
  resizeDiv.appendChild(resizeDivRight);

  return resizeDiv;
}


function addResizers(divID) {
  /*
   * 05 jan 2022 [cm] .. Added table-resizer <divs> to dialog
   */

  var mainDiv=document.getElementById(divID);
  if (mainDiv) {
    var x=0;
    var divElem = document.getElementById(divID).children;

    var thisElem;
    // Check to see if this div already has the table-resizer div
    var bResizer=false;
    for (x=0; x<=divElem.length-1; x++) {
      thisElem=divElem[x];
      if (thisElem.classList.contains("table-resizer")) {
        bResizer=true;
        break;
      }
    }

    

    if (!mainDiv.classList.contains("resizable")) {
      mainDiv.classList.add("resizable");
    }

    if (!bResizer) {
      var resizeDiv=makeResizers();
      // Remove the elements from div1 and put them into resizeDiv
      for (x=0; x<=divElem.length-1; x++) {
        thisElem=divElem[x];
        // This is interesting...
        // By using appendChild to append thisElem to root1,
        // it gets removed from div1 immediately
        resizeDiv.appendChild(thisElem);
        //console.log(thisElem.tagName+" "+thisElem.id);
        // So we have to decrease x (index) because the length of divElem
        // keeps going down.
        x--;
      }
      mainDiv.appendChild(resizeDiv);
    }

    makeResizableDiv(divID);
  }
}


function makeTitleSpan(thisReport) {

  var bMin=false;
  var bMax=false;
  var bPop=false;
  var bClose=false;

  var bPopout=false;
  
  //sReportTitle=checkUndefined(sReportTitle, "");
  //sButtons    =checkUndefined(sButtons, "000");
  //sStyle      =checkUndefined(sStyle, sDefaultStyle);

  //while (sButtons.length<3) {
  //  sButtons="0"+sButtons;
  //}

  if (thisReport.buttons.substring(0,1)=="1") bMin=true;
  if (thisReport.buttons.substring(1,2)=="1") bMax=true;
  if (thisReport.buttons.substring(1,2)=="2") bPop=true;
  if (thisReport.buttons.substring(2,3)=="1") bClose=true;

  var closeButton=makeButton("close", thisReport.divID, thisReport.style, bClose);
  var minButton  =makeButton("min",   thisReport.divID, thisReport.style, bMin);
  var maxButton  =makeButton("max",   thisReport.divID, thisReport.style, bMax);
  if (bPop) {
    maxButton=makeButton("pop", thisReport.divID, thisReport.style, bPop);
  }
  
  var titleSpan=document.createElement("span");
  titleSpan.id=thisReport.divID+"_reporttitle";
  titleSpan.innerHTML="&nbsp;"+thisReport.reportTitle;

  if (bMin) titleSpan.appendChild(minButton);
  if ((bMax) || (bPop)) titleSpan.appendChild(maxButton);
  if (bClose) titleSpan.appendChild(closeButton);

  return titleSpan;
}


function makeButton(sButtonType, divID, sButtonStyle, bVisibility) {

  var sWinStyle="winbutton ";
  var sDialogStyle="DialogButton ";

  var sTtlClose="Close";
  var sTtlMin="Minimize";
  var sTtlMax="Maximize";
  var sTtlPop="Popup window";

  var sTitle="";
  var sOnClick="";

  var sVisibility="hidden";

  bVisibility=checkNull(bVisibility);
  if (bVisibility) {
    sVisibility="visible";
  }
  sButtonType=checkUndefined(sButtonType, "close");
  sButtonStyle=checkUndefined(sButtonStyle, sDefaultStyle);

  if (sButtonType=="close") {
    sTitle=sTtlClose;
    sOnClick="closeDialog('"+divID+"');";

  } else if (sButtonType=="min") {
    sTitle=sTtlMin;
    sOnClick="minDialog('"+divID+"');";

  } else if (sButtonType=="max") {
    sTitle=sTtlMax;
    sOnClick="maxDialog('"+divID+"');";

  } else if (sButtonType=="pop") {
    sTitle=sTtlPop;
    sOnClick="popDialog('"+divID+"');";
  }


  var thisButton=document.createElement("div");
  thisButton.className=sWinStyle+sButtonType+sButtonStyle+sDialogStyle;
  thisButton.setAttribute("onClick", sOnClick);
  thisButton.setAttribute("title", sTitle);
  thisButton.style.visibility=sVisibility;

  return thisButton;
}


function setDialogPos(divID, xpos, ypos) {

  var dialogWidth;
  var dialogHeight;

  var width =getWidth();
  var height=getHeight();

  var left  =getLeft();
  var top   =getTop();

  var buttonHeight=80;

  xpos=checkUndefined(xpos, "");
  ypos=checkUndefined(ypos, "");

  var mainDiv=document.getElementById(divID);

  if (mainDiv) {
    // Position the div...
    dialogWidth  = mainDiv.offsetWidth;
    dialogHeight = mainDiv.offsetHeight;

    //var topposition = top-((height-dialogheight)-100);
    var topPosition = top+((height-dialogHeight)-20);
    var leftPosition = left+((width-dialogWidth)-20);

    if (xpos!="") {leftPosition=parseInt(xpos);}
    if (ypos!="") {topPosition=parseInt(xpos);}
    
    //var topposition = top+(((height-dialogheight)/2));
    //var leftposition = left+(((width-dialogwidth)/2));

    if (topPosition<10) topPosition=10;
    if (leftPosition<10) leftPosition=10;

    topPosition  =dialogTopOffset+topPosition;
    leftPosition =dialogLeftOffset+leftPosition;

    mainDiv.style.top =(topPosition) +"px";
    mainDiv.style.left=(leftPosition)+"px";
  }

}


function findHighestZIndex(elem) {
  /*
   * 21 dec 2021 [cm] .. find the element with the highest zIndex, return zIndex
   */
  var elems = document.getElementsByTagName(elem);
  var highest = Number.MIN_SAFE_INTEGER || -(Math.pow(2, 53) - 1);
  for (var i = 0; i < elems.length; i++) {
    
    var zindex =
      Number.parseInt(
        document.defaultView.getComputedStyle(elems[i], null).getPropertyValue("z-index"), 10
      );

    if ((!isNaN(zindex))) {
      if (zindex > highest) {
        highest = zindex;
      }
    }
  }
  return highest;
}

function findHighestZIndexObject(elem) {
  /*
   * 21 dec 2021 [cm] .. find the element with the highest zIndex, return the object
   */
  var elems = document.getElementsByTagName(elem);
  var highest = Number.MIN_SAFE_INTEGER || -(Math.pow(2, 53) - 1);
  var frmObj=null;
  for (var i = 0; i < elems.length; i++) {
    
    var zindex=
      Number.parseInt(
        document.defaultView.getComputedStyle(elems[i], null).getPropertyValue("z-index"), 10
      );
    

    if ((!isNaN(zindex))) {
      if (zindex > highest) {
        highest = zindex;
        frmObj=elems[i];
      }
    }
  }
  return frmObj;
}


function getStyle(el, styleProp) {
  var x = document.getElementById(el);
  var y=null;
  if (window.getComputedStyle) {
    y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
  } else if (x.currentStyle) {
    y = x.currentStyle[styleProp];
  }

  return y;
}


function getCSS(className, styleProp) {
  /*
   * 08 apr 2022 [cm] .. return computed style from CSS class
   */
  var CSSstyle="";

  var span=document.createElement("span");
  span.id="tempspan";
  document.body.appendChild(span);
  if (span) {
    span.className=className;
    CSSstyle=getStyle(span.id, styleProp);
    span.parentNode.removeChild(span);
  }

  return CSSstyle;

}


var thisReportDivID="";
var thisReportID="";
function getQuickReport(divID) {
  /*
   * 23 dec 2021 [cm] .. get report through AJX and insert into report <div>
   */

  var rep_url="attendance"; /*The server-side script */
  thisReportID=divID;
  thisReportDivID=divID+"_reportdata";
  var reportDiv=document.getElementById(thisReportDivID);
  var params="&mode=get";
  
  if (reportDiv) {

    var std_http=getHTTPObject(); // We create the XMLHTTPRequest Object

    // 11 jun 2022 [cm] .. Only used for IEP sections and designs
    var iepID=getElementValue("iep_design_name");
    var iepSectionID=getElementValue("iep_sec_id");
    var iepSectionTab=getElementValue("iep_sec_tab");

    if (divID==G_BROWSE_STUDENTS) {
      rep_url="getperson.jsp";

      params="?type=browse"+
        "&value="    +eCode("all");
        /*+
        "&grades="   +eCode(sSelected_grades)+
        "&hmfms="    +eCode(sSelected_hmfms)+
        "&gender="   +eCode(sSelected_genders)+
        "&file="     +eCode(sSelected_file)+
        "&code="     +eCode(sSelected_code)+
        "&codeitems="+eCode(sSelected_code_items)+
        "&tchr="     +eCode(sSelected_tchr);
      */

      getstdReport(std_http, rep_url+params);
    }

    if (divID==G_DAILY_ATT_REPORT) {
      rep_url="attendance?cmd="+G_DAILY_ATT_REPORT;
  
      getstdReport(std_http, rep_url+params);
    }

    if (divID==G_CALENDAR_REPORT) {
      loadCSS("styles/calsetup.css");
      rep_url="attendance?cmd=printcal";
      params="&options=false,false,false,true,true"+
        "&startdate="+
        "&enddate=";

      getstdReport(std_http, rep_url+params);
    }

    if (divID==G_BIRTHDAY_LIST) {
      rep_url="getperson.jsp";
      params="?type="+G_BIRTHDAY_LIST+
        "&value="+eCode("thisweek");

      getstdReport(std_http, rep_url+params);

    }

    if (divID==G_TABLEGRID) {
      makeTable(divID+"_reportdata", "tableGrid", 24, 45, 20, 20);
    }

    if (divID==G_LABELS) {
      var thisLabel=getLabelSettings();
      makeTable(divID+"_reportdata", "tableLabels", thisLabel, 30);
    }

    if (divID==G_IEP_SECTION) {
      rep_url="iep";
      params="?cmd=iepgetsection";
      params+="&iepid="+eCode(iepID);
      params+="&iepsectionid="+eCode(iepSectionID);
      params+="&iepsectiontab="+eCode(iepSectionTab);

      getstdReport(std_http, rep_url+params);
    }

    if (divID==G_IEP_DESIGN) {
      rep_url="iep";
      params="?cmd=iepgetdesign";
      params+="&iepid="+eCode(iepID);

      //console.log("params="+params); // 6 Jul 2022 [hf] (2021.52) - Comment out debug
      getstdReport(std_http, rep_url+params);
    }

    // 30 jul 2022 [cm] .. Messages and announcements
    if (divID==G_MESSAGES) {
      var stid = getElementValue("parentpage_stid");
      rep_url="./process_data_servlet";
      params="?cmd=get"+G_MESSAGES;
      params+="&stid="+eCode(stid);
      //console.log("rep_utl+params="+rep_url+params);
      getstdReport(std_http, rep_url+params);

    }
    
    // 30 jul 2022 [cm] .. Messages and announcements
    if (divID==G_THISMSG) {
      var msgid = getElementValue("msgid");
      rep_url="./process_data_servlet";
      params="?cmd=get"+G_THISMSG;
      params+="&msgid="+eCode(msgid);
      getstdReport(std_http, rep_url+params);

    }

    // 6 Jul 2022 [hf] (2021.52)
    if (divID==G_RECENT_ACTIVITY) {
      var stid = getElementValue("parentpage_stid");
      var rps = getElementValue("parentpage_rp");
      rep_url = "process_data_servlet";
      params = "?cmd="+G_RECENT_ACTIVITY;
      params += "&stid="+eCode(stid);
      params += "&rp="+eCode(rps);
      getstdReport(std_http, rep_url+params);
      
    }

  }
}


function getstdReport(std_http, url_params) {
  std_http.onreadystatechange = handleQuickRepResponse;
  std_http.open("POST", url_params, false);
  std_http.send(null);
}


function handleQuickRepResponse() {
  if (this.readyState == 4) {
    if (serverStatusOK(this)) {
      /* Get the data back from the server */
      var xmlDoc;
      var section;
      var END_AJAX="!!";

      var sReport=this.responseText;
      
      if (sReport.endsWith(END_AJAX)) {
        sReport=sReport.substring(0,sReport.indexOf(END_AJAX));
      }
      
      setElementinnerHTML(thisReportDivID, sReport);
      if (thisReportID==G_IEP_DESIGN) {
        showFirstSection();
      }

    }
  }
}


function TableGrid(tableID, className, fontSize, fontFamily, border, padding, margin) {


  fontSize  =checkUndefined(fontSize, "13px");
  fontFamily=checkUndefined(fontFamily, "arial");
  border    =checkUndefined(border, "0px solid transparent");
  padding   =checkUndefined(padding, "2px");
  margin    =checkUndefined(margin, "auto");

  this.tableID    =tableID;
  this.className  =className;
  this.fontSize   =fontSize;
  this.fontFamily =fontFamily;
  this.border     =border;
  this.padding    =padding;
  this.margin     =margin;
}


var G_LETTER_PORT = "Letter (8.5in x 11in)";
var G_LETTER_LAND = "Letter landscape (11in x 8.5in)";
var G_LEGAL_PORT  = "Legal (8.5in x 14in)";
var G_LEGAL_LAND  = "Legal landscape (14in x 8.5in)";
var G_A4_PORT     = "A4 (21.0cm x 29.7cm)";
var G_A4_LAND     = "A4 landscape (29.7cm x 21.0cm)";

var G_INCH_TO_CM=2.54;
var G_CM_TO_INCH=0.393;


function getLabelSettings() {
  // 03 feb 2022 [cm] .. check for label settings, otherwise return default label
  var thisLabel={
    iNumRows: 10,
    iNumCols: 3,

    iTopMargin: 50,
    iLeftMargin: 19,

    iLabelHeight: 100,
    iLabelWidth: 263,

    iVertSpacing: 100,
    iHorizSpacing: 275,

    iPageWidth: 850,
    iPageHeight: 1100
  };

  thisLabel.iNumRows    =getElementValueDefault("lbl_num_down", thisLabel.iNumRows);
  thisLabel.iNumCols    =getElementValueDefault("lbl_num_across", thisLabel.iNumCols);

  thisLabel.iTopMargin  =(getElementValueDefault("lbl_top_margin", thisLabel.iTopMargin))*100;
  thisLabel.iLeftMargin =(getElementValueDefault("lbl_left_margin", thisLabel.iLeftMargin))*100;

  thisLabel.iLabelHeight =(getElementValueDefault("lbl_height", thisLabel.iLabelHeight))*100;
  thisLabel.iLabelWidth  =(getElementValueDefault("lbl_width", thisLabel.iLabelWidth))*100;

  thisLabel.iVertSpacing =(getElementValueDefault("lbl_vertical_spacing", thisLabel.iVertSpacing))*100;
  thisLabel.iHorizSpacing=(getElementValueDefault("lbl_horizontal_spacing", thisLabel.iHorizSpacing))*100;

  var sPaper=getElementValue("lbl_paper_type");
  if (sPaper==G_LETTER_PORT) {
    thisLabel.iPageWidth=850;
    thisLabel.iPageHeight=1100;

  } else if (sPaper==G_LETTER_LAND) {
    thisLabel.iPageWidth=1100;
    thisLabel.iPageHeight=850;

  } else if (sPaper==G_LEGAL_PORT) {
    thisLabel.iPageWidth=850;
    thisLabel.iPageHeight=1400;

  } else if (sPaper==G_LEGAL_LAND) {
    thisLabel.iPageWidth=1400;
    thisLabel.iPageHeight=850;

  } else if (sPaper==G_A4_PORT) {
    thisLabel.iPageWidth=827;
    thisLabel.iPageHeight=1169;

  } else if (sPaper==G_A4_LAND) {
    thisLabel.iPageWidth=1169;
    thisLabel.iPageHeight=827;

  }  

  var sUnits=getElementValue("marginunits");

  if (sUnits=="cm") {
    // Convert to inches
    thisLabel=convertLabelUnits(thisLabel, G_CM_TO_INCH);
  }

  return thisLabel;
}


function convertLabelUnits(thisLabel, convertScale) {

  thisLabel.iTopMargin    =(thisLabel.iTopMargin) * convertScale;
  thisLabel.iLeftMargin   =(thisLabel.iLeftMargin) * convertScale;

  thisLabel.iLabelHeight  =(thisLabel.iLabelHeight) * convertScale;
  thisLabel.iLabelWidth   =(thisLabel.iLabelWidth) * convertScale;

  thisLabel.iVertSpacing  =(thisLabel.iVertSpacing) * convertScale;
  thisLabel.iHorizSpacing =(thisLabel.iHorizSpacing) * convertScale;

  //thisLabel.iPageHeight   =(thisLabel.iPageHeight) / convertScale;
  //thisLabel.iPageWidth    =(thisLabel.iPageWidth) / convertScale;

  return thisLabel;
}



var iLabelBorder=1;
function makeTable(divID, tableID, thisLabel, iScale) {
  // 02 feb 2022 [cm] .. build a <table> element, with iRows, iCols of specified iRowHeight, iColWidth, append to <div> divID

  var thisDiv=document.getElementById(divID);
  if (!thisDiv) {
    thisDiv=document.createElement('div');
    thisDiv.id=divID;
    document.body.appendChild(thisDiv);
  }

  iScale=checkUndefined(iScale, 100);

  var iRow=0;
  var iCol=0;

  var chkTable=document.getElementById(tableID);
  if (chkTable) {chkTable.remove();}

  var defaultTable=new TableGrid(tableID, "tableGrid", "", "", "", "0px", "auto");

  var thisTable=document.createElement("table");
  
  thisTable.id                =defaultTable.tableID;
  thisTable.className         =defaultTable.className;
  thisTable.style.padding     =defaultTable.padding;
  thisTable.style.border      =defaultTable.border;
  thisTable.style.fontSize    =defaultTable.fontSize;
  thisTable.style.fontFamily  =defaultTable.fontFamily;
  thisTable.style.marginLeft  =defaultTable.margin;
  thisTable.style.marginRight =defaultTable.margin;

  makePageMargins(thisTable, thisLabel, iScale);
  
  for (iRow=0; iRow<thisLabel.iNumRows; iRow++) {
    var newRow=document.createElement("tr");
    newRow.id=tableID+"_row_"+iRow;
    newRow.style.padding="0px";

    // Cell for left margin
    var leftMarginCell=makePageMarginCells("left", thisLabel.iLeftMargin, iScale);
    newRow.appendChild(leftMarginCell);

    for (iCol=0; iCol<thisLabel.iNumCols; iCol++) {
      var newCell=document.createElement("td");
      newCell.id=tableID+"_cell_"+iRow+"_"+iCol;
      newCell.style.padding="0px";

      var labelDiv=document.createElement("div");
      labelDiv.className="labelDiv";

      var newDiv=document.createElement("div");
      newDiv.id=tableID+"_celldiv_"+iRow+"_"+iCol;
      newDiv.className="labelCell";

      labelDiv.appendChild(newDiv);
      newCell.appendChild(labelDiv);
      newRow.appendChild(newCell);
    }


    // Cell for right margin
    var rightMarginCell=makePageMarginCells("right", thisLabel.iLeftMargin, iScale);
    newRow.appendChild(rightMarginCell);

    thisTable.appendChild(newRow);
  }

  var pageDiv=makePageDiv(thisTable, thisLabel, iScale);
  //var chkPage=document.getElementById(tableID+"_page");
  //if (chkPage) {chkPage.remove();}

  pageDiv.appendChild(thisTable);
  thisDiv.appendChild(pageDiv);

  var iIndex=0;
  // Set the size of all the labelDivs
  var labelDivs=document.getElementsByClassName("labelDiv");

  for (iIndex=0; iIndex<labelDivs.length; iIndex++) {
    labelDivs[iIndex].style.width  =(( thisLabel.iHorizSpacing * ((iScale/100)) ) ) +"px";
    labelDivs[iIndex].style.height =(( thisLabel.iVertSpacing * ((iScale/100)) ) ) +"px";
  }

  // Set the size of all the labelCells
  var labels=document.getElementsByClassName("labelCell");
  for (iIndex=0; iIndex<labels.length; iIndex++) {
    labels[iIndex].style.width  =(( thisLabel.iLabelWidth * ((iScale/100)) ) - (iLabelBorder*2)) +"px";
    labels[iIndex].style.height =(( thisLabel.iLabelHeight * ((iScale/100)) ) - (iLabelBorder*2)) +"px";
  }

  //thisDiv.appendChild(thisTable);

}

function makePageMargins(thisTable, thisLabel, iScale) {

  // Top row has top margin and left/right margin cells
  var topRow=document.createElement("tr");
  topRow.id=thisTable.id+"_toprow";

  var leftMarginCell  =makePageMarginCells("left", thisLabel.iLeftMargin, iScale);
  var rightMarginCell =makePageMarginCells("right", thisLabel.iRightMargin, iScale);
  var topMarginCell   =makePageMarginCells("top", thisLabel.iTopMargin, iScale);
  topMarginCell.setAttribute("colspan", thisLabel.iNumCols);
  
  topRow.appendChild(leftMarginCell);
  topRow.appendChild(topMarginCell);
  topRow.appendChild(rightMarginCell);
  thisTable.appendChild(topRow);

}

function makePageMarginCells(sType, iMargin, iScale) {
  // 03 feb 2022 [cm] .. Make the <td> cell which is the size of the left/right or top margin
  var marginCell=document.createElement("td");
  marginCell.style.padding="0px";
  var div=document.createElement("div");
  if ( (sType=="left") || (sType=="right") ) {
    div.style.width=(( iMargin * ((iScale/100)) ) ) +"px";
  } else {
    div.style.height=(( iMargin * ((iScale/100)) ) ) +"px";
  }
  marginCell.appendChild(div);

  return marginCell;
}

function makePageDiv(thisTable, thisLabel, iScale) {
  // 03 feb 2022 [cm] .. Build the <div> which is the size of the page
  var chkPage=document.getElementById(thisTable.id+"_page");
  if (chkPage) {chkPage.remove();}

  var pageDiv=document.createElement("div");
  pageDiv.id=thisTable.id+"_page";
  pageDiv.style.width=( (thisLabel.iPageWidth) * ((iScale/100)) )+"px";
  pageDiv.style.height=( (thisLabel.iPageHeight) * ((iScale/100)) )+"px";
  pageDiv.style.overflow="hidden";
  pageDiv.style.border="1px solid darkblue";
  pageDiv.style.borderBottom="1px solid black";
  pageDiv.style.borderRight="1px solid black";
  pageDiv.style.padding="0px";
  pageDiv.style.paddingTop=(iLabelBorder * 2)+"px";
  //pageDiv.style.marginTop="5px";
  pageDiv.style.marginLeft="auto";
  pageDiv.style.marginRight="auto";
  pageDiv.style.backgroundColor="white";

  pageDiv.appendChild(thisTable);

  return pageDiv;

}



function makeHTMLTable(divID, tableID, iNumRows, iNumCols, iColWidth) {
  // 01 apr 2022 [cm] .. build a <table> element, with iRows, iCols of specified iRowHeight, iColWidth, append to <div> divID

  var thisDiv=document.getElementById(divID);
  if (!thisDiv) {
    thisDiv=document.createElement('div');
    thisDiv.id=divID;
    document.body.appendChild(thisDiv);
  }

  var iRow=0;
  var iCol=0;

  var chkTable=document.getElementById(tableID);
  if (chkTable) {chkTable.remove();}

  var defaultTable=new TableGrid(tableID, "tableGrid", "", "", "", "0px", "auto");

  var thisTable=document.createElement("table");

  thisTable.id                =defaultTable.tableID;
  thisTable.className         =defaultTable.className;
  thisTable.style.padding     =defaultTable.padding;
  thisTable.style.border      =defaultTable.border;
  thisTable.style.fontSize    =defaultTable.fontSize;
  thisTable.style.fontFamily  =defaultTable.fontFamily;
  thisTable.style.marginLeft  =defaultTable.margin;
  thisTable.style.marginRight =defaultTable.margin;

  for (iRow=0; iRow<iNumRows; iRow++) {
    var newRow=document.createElement("tr");
    newRow.id=tableID+"_row_"+iRow;
    newRow.style.padding="0px";

    for (iCol=0; iCol<iNumCols; iCol++) {
      var newCell=document.createElement("td");
      newCell.id=tableID+"_cell_"+iRow+"_"+iCol;
      newCell.style.padding="0px";

      var innerDiv=document.createElement("div");
      innerDiv.className="tableDiv";

      var newDiv=document.createElement("div");
      newDiv.id=tableID+"_celldiv_"+iRow+"_"+iCol;
      newDiv.className="tableCell";

      innerDiv.appendChild(newDiv);
      newCell.appendChild(innerDiv);
      newRow.appendChild(newCell);
    }

    thisTable.appendChild(newRow);
  }

  thisDiv.appendChild(thisTable);

  var iIndex=0;
  // Set the size of all the labelDivs
  var labelDivs=document.getElementsByClassName("tableDiv");

  for (iIndex=0; iIndex<labelDivs.length; iIndex++) {
    labelDivs[iIndex].style.width  =iColWidth+"px";
  }

  // Set the size of all the labelCells
  var labels=document.getElementsByClassName("tableCell");
  for (iIndex=0; iIndex<labels.length; iIndex++) {
    labels[iIndex].style.width  =iColWidth+"px";
    labels[iIndex].innerHTML="&nbsp;";
  }

}


function makeTextEditor(thisBlockID, sValue, iLength, iSize, sOnBlur, sOnKeyPress) {
  // 19 apr 2022 [cm] .. Creates an <input> tag for the given blockID, setting the value, length, size, onblur and onkeypress events
  //                     -- sets the size to match the computed style width/height of the <div> which contains it.
  //                     returns the <input> text editor object, but the calling function must append it to the <div>
  var cellSize=20;
  var cellWidth=20;
  var cellHeight=20;

  var thisDiv=document.getElementById(thisBlockID);
  if (thisDiv) {
    var cellStyle=window.getComputedStyle(thisDiv, null);
    cellWidth =parseInt(cellStyle.width);
    cellHeight=parseInt(cellStyle.height);
  }

  var borderRadSize=3;
  var txtEditor=document.createElement("input");

  sOnBlur=checkNull(sOnBlur);
  if (sOnBlur=="") {
    sOnBlur="lostFocusCell(this);";
  }

  sOnKeyPress=checkNull(sOnKeyPress);
  if (sOnKeyPress=="") {
    sOnKeyPress=checkEditKey;
  }

  txtEditor.id="txt_"+thisBlockID;
  txtEditor.setAttribute("type", "text");
  txtEditor.setAttribute("value", sValue);
  txtEditor.setAttribute("length", iLength);
  txtEditor.setAttribute("size", iSize);

  txtEditor.style.width= (cellWidth-6)+"px";
  txtEditor.style.height=(cellHeight-4)+"px";
  txtEditor.style.maxHeight=(cellHeight-4)+"px";

  //txtEditor.style.fontSize=cellFontSize;
  txtEditor.maxLength=iSize;


  txtEditor.style.border="1px solid red";
  txtEditor.style.backgroundColor="white";

  txtEditor.style.borderTopLeftRadius = borderRadSize+"px";
  txtEditor.style.borderTopRightRadius = borderRadSize+"px";
  txtEditor.style.borderBottomLeftRadius = borderRadSize+"px";
  txtEditor.style.borderBottomRightRadius = borderRadSize+"px";

  txtEditor.style.paddingTop="1px";
  txtEditor.style.paddingLeft="3px";
  txtEditor.style.marginTop="-1px";
  txtEditor.style.marginLeft="-1px";

  txtEditor.setAttribute("onblur", sOnBlur);
  txtEditor.addEventListener('keydown', sOnKeyPress);

  return txtEditor;

}



function checkEditKey(event) {
  // 18 apr 2022 [cm] .. check for key pressed when using text editor <input> --
  //                     checks for ENTER, ESC, TAB, arrow keys,
  //                     prevents selected keycodes:  & * / ; , . / \ ' -- these characters are invalid for filenames
  var thisKey="";
  if (event) {
    if (event.type=="keydown") {
      if (event.charCode) {
        thisKey=event.charCode;
      } else if (event.keyCode) {
        thisKey=event.keyCode;
      }

      var keychar = String.fromCharCode(thisKey);
      var bShift=event.shiftKey;

      if (
      // Prevent user from using invalid characters
        (thisKey==106) ||
        (thisKey==111) ||
        (thisKey==186) ||
        (thisKey==188) ||
        (thisKey==190) ||
        (thisKey==191) ||
        (thisKey==220) ||
        (thisKey==222)
        ) {
            event.preventDefault();
            return;
        }

      if (bShift) {
        if (
        // Prevents & and * characters (Shift-7 and Shift-8)
          (thisKey==55) ||
          (thisKey==56)
          ) {
            event.preventDefault();
            return;
          }
      }


      if ((bShift) && (keychar=="&")) {
          event.preventDefault();
          return;
      }

      if (thisKey==13) {
        // Pressed ENTER so stop editing and save
        editDirection="down";
        checkCell(this);
      }
      if (thisKey==27) {
        // Pressed ESC so stop editing and cancel
        bEscPressed=true;
        editDirection="none";
        resetCell();
      }
      if (thisKey==9) {
        // tab key pressed, go across
        event.preventDefault();
        if (bShift) {
          editDirection="left";
        } else {
          editDirection="right";
        }
        checkCell(this);
      }
      if (thisKey==37) {
        // LEFT
        event.preventDefault();
        editDirection="left";
        checkCell(this);
      }
      if (thisKey==39) {
        // RIGHT
        event.preventDefault();
        editDirection="right";
        checkCell(this);
      }

      if (thisKey==38) {
        // UP
        event.preventDefault();
        editDirection="up";
        checkCell(this);
      }

      if (thisKey==40) {
        // DOWN
        event.preventDefault();
        editDirection="down";
        checkCell(this);
      }
    }
  }
}

