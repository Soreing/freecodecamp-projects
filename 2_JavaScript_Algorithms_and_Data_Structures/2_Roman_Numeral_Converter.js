const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
const huns = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];

function convertToRoman(num) {
 
    var res = "";

    while (num>=1000){
        num -= 1000;
        res += "M";
    }

    res += huns[Math.floor(num/100)];
    num %= 100;

    res += tens[Math.floor(num/10)];
    num %= 10;

    res += ones[num];

    return res;
}

convertToRoman(36);