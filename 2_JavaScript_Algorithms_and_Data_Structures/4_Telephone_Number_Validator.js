const formats = [
    /^[1]{0,1}[ ]{0,1}[0-9]{3}[- ]{0,1}[0-9]{3}[- ]{0,1}[0-9]{4}$/,
    /^[1]{0,1}[ ]{0,1}[(][0-9]{3}[)][- ]{0,1}[0-9]{3}[- ]{0,1}[0-9]{4}$/
]
  
function telephoneCheck(str) {
    return formats[0].test(str) ? true : formats[1].test(str) ? true : false;
}
  
telephoneCheck("555-555-5555");