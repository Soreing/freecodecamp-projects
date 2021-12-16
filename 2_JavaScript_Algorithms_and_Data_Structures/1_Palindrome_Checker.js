function palindrome(str) {

    var norm = str.toLowerCase().split("").filter(ch => ch.match(/^[a-z0-9]+$/i)).join('');
  
    for(var i=0; i< norm.length; i++)
        if(norm[i] != norm[norm.length -1 -i])
            return false;
            
    return true;
}

palindrome("_eye");