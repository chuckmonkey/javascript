// Functions for getting/setting elements in DOM, using ID
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


function getElementStyleById(elemID, styleProp) {
  var el=document.getElementById(elemID;
  var y=null;
  if (el) {
    if (window.getComputedStyle) {
      y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
    } else if (el.currentStyle) {
      y = el.currentStyle[styleProp];
    }
  }
  return y;
}

function getElementStyle(el, styleProp) {
  var y=null;
  if (window.getComputedStyle) {
    y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
  } else if (el.currentStyle) {
    y = el.currentStyle[styleProp];
  }

  return y;
}
