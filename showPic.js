var DB_GETPHOTO   ="./getphoto";

function showThisPic(formObj) {
  // Display a thumbnail of an image in a <div> using the data- attributes of the formObj
  // ie <td id="thisthing" data-img="1234.jpg" data-left="-100" data-top="-20" data-mode="1" onmouseover="showThisPic(this);" onmouseout="hidePic();">
  if (formObj===null) return;
  
  var userType="";
  var left  =getLeft();
  var top   =getTop();
  var leftOffset=0;
  var topOffset=0;
    
    
  if (formObj) {
    id=         formObj.getAttribute("data-img");
    userType=   formObj.getAttribute("data-mode");
    leftOffset= formObj.getAttribute("data-left");
    topOffset=  formObj.getAttribute("data-top");
    
    if (leftOffset===null) leftOffset=0;
    if (topOffset===null) topOffset=0;
    leftOffset=parseInt(leftOffset);
    topOffset=parseInt(topOffset);
  
    var thisTable=findParentByType(formObj, "table");
    if (thisTable) {
      left=parseInt(getElementStyle(thisTable, "left"));
    }
  }
  
  var posY=Math.round(mouseY/10);
      posY=Math.round(posY*10);
      
  var posX=25;  // 18 nov 2015 [cm] .. Moved pic slight to left...

  // 08 jun 2023 [cm] .. check for existing element and remove
  var this_pic=document.getElementById("thisphoto");
  if (this_pic) {
    removeElement("thisphoto");
  }
  this_pic=createPicDiv();

  var this_img=document.getElementById("thumbnail");

  if (this_img) {
    this_img.src=DB_GETPHOTO+
                  "?id="+id+
                  "&stamp="+new Date().getTime()+
                  "&staff_mode="+userType;
  }

  if (formObj) {
    var otherObjLeft=formObj.getBoundingClientRect().left;
    var otherObjTop =formObj.getBoundingClientRect().top;
    
    left=parseInt(otherObjLeft)-posX-180;
    top-=20;
  }
  
  
  if (this_pic) {
    this_pic.style.left=left + posX + leftOffset + "px";
    this_pic.style.top=top + posY - 20 + topOffset + "px";

    this_pic.style.display='inline';
    this_pic.style.visibility='visible';
    
    bringDialogToFront(this_pic);
  }

  return true;
}

function hidePic() {
  var this_pic=document.getElementById("thisphoto");
  if (this_pic) {
    this_pic.style.display='none';
    this_pic.style.visibility='hidden';
  }
}


function getScreenInfo() {
  // 08 jun 2023 [cm] .. return top, left, width, height of screen
  return {
    top: getTop(),
    left: getLeft(),
    width: getWidth(),
    height: getHeight()
  };
}


function getWidth() {
  // return screen width
  var thisWidth;
  if (document.body && document.body.offsetWidth) {
   thisWidth = document.body.offsetWidth;
  }
  if (document.compatMode===CCS1 &&
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
  // return screen height
  var thisHeight;
  if (document.body && document.body.offsetWidth) {
   thisHeight = document.body.offsetHeight;
  }
  if (document.compatMode===CCS1 &&
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


function removeElement(elementId) {
  // 05 apr 2019 [cm] .. Removes an element from the document
  var element = document.getElementById(elementId);
  if (element) {
    element.remove();
  }
}


function bringDialogToFront(frmObj) {
  /*
   * 21 dec 2021 [cm] .. Bring <div> to front by setting zIndex to next highest value
   */

  var highestObj=findHighestZIndexObject("div");
  
  if (highestObj.id!==frmObj.id) {

    var thisDiv=document.getElementById(frmObj.id);
    if (thisDiv) {
      var zedIndex=getStyle(highestObj.id, "z-index");
      
      zedIndex=parseInt(zedIndex)+5;
      thisDiv.style.zIndex=zedIndex+"";
    }
  }

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


function createPicDiv() {
  /*
   * 14 nov 2022 [cm] .. create thisphoto <div> amd thumbnail <div> to display student/staff photo using showPic function
   */

  var thisPic=document.getElementById("thisphoto");
  var thisImg=document.getElementById("thumbnail");

  if (thisPic) removeElement(thisPic);
  if (thisImg) removeElement(thisImg);

  var picDiv=document.createElement("div");
  picDiv.id="thisphoto";
  picDiv.setAttribute("name", "thisphoto");
  picDiv.style.display="none";
  picDiv.style.visibility="hidden";
  picDiv.style.position="absolute";
  picDiv.style.zIndex="100";
  picDiv.style.borderRadius="8px";
  //picDiv.style.boxShadow="var(--boxshadow1) var(--rgb20), var(--boxshadow1) var(--rgb19)";
        

  var thumbDiv=document.createElement("img");
  thumbDiv.id="thumbnail";
  thumbDiv.setAttribute("name", "thumbnail");
  thumbDiv.className="thumbnail";
  thumbDiv.setAttribute("onclick", "hidePic();");
  thumbDiv.setAttribute("onerror", "hidePic();");
  thumbDiv.src=DB_GETPHOTO+"?id=";
  thumbDiv.style.borderRadius="8px";

  picDiv.appendChild(thumbDiv);

  document.body.appendChild(picDiv);

  return picDiv;
}
