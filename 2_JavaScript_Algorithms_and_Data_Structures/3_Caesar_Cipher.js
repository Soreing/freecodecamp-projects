function caesar(ch) {return (((ch - 52) % 26) + 65);}

function rot13(str) {

    var res = "";

    for(var i = 0; i < str.length; i++){
        res += str[i] >='A' && str[i] <='Z' ? String.fromCharCode( caesar(str.charCodeAt(i)) ) : str[i];
    }

    return res;
}

rot13("SERR PBQR PNZC");