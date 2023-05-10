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
