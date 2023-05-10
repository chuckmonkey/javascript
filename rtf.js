function toRTF(alt_text) {
  // 12 apr 2023 [cm] .. take alt text and convert to rtf
  var rtfPrefix=
          "{\\rtf1\\ansi\\ansicpg1252\\deff0"+
            "\\deflang1033"+
            "{\\fonttbl"+
              "{\\f0\\fnil\\fcharset0 Microsoft Sans Serif;}"+
              "{\\f1\\fmodern\\fprq6\\fcharset134 SimSun;}"+
            "}";
  
  var rtfDelim="\\"+"'"+"";
  //rtfDelim="";
  
  var rtfText="";
  if ((alt_text===null) || (alt_text.length<=0) ) {
    return rtfText;
  }
  var iIndex=0;
  for (iIndex=0; iIndex<alt_text.length; iIndex++) {
    var charValue=alt_text.charCodeAt(iIndex);
    
    rtfText+="\\u"+charValue+rtfDelim;
  }
  
  rtfText=rtfPrefix+rtfText+"}";
  return rtfText;
 
}
