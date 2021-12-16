const coin_values = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];

function checkCashRegister(price, cash, cid) {
  
  // Fixing the money values from float to int (This question has a trash input format)
  cash  *= 100;
  price *= 100;
  
  // Solution
  var change_amt = cash - price;
  var ret        = { status:"INSUFFICIENT_FUNDS", change:[] };
  var change     = [];

  var amount_have, amount_need, amount_full;
  var drawer_amt = 0;

  for(var i = cid.length-1; i >=0 ; i--)
  {
    // Number of this "coin" available in the drawer
    amount_have = cid[i][1]*100  / coin_values[i];
    // Total number of this "coin" needed to give a change
    amount_need = Math.floor(change_amt / coin_values[i]);
    // Total amount of money taken from the drawer in pennies (integer)
    amount_full = Math.min(amount_have, amount_need) * coin_values[i];
    
    // Adjust value of change in pennies
    change_amt -= amount_full;
    // Track the amount of pennies in the drawer
    drawer_amt += cid[i][1]*100;

    // If the amount taken is non zero, add it to the change
    if( amount_full != 0)
      change.push([cid[i][0], amount_full/100]);
  }

  // If the change can be completed (no pennies leftover)
  if(change_amt <= 1)
  { // If the drawer has some more coins
    if( drawer_amt - (cash-price) >= 1)
    { ret.status = "OPEN";
      ret.change = change;
    }
    // If the drawer has no more coins
    else
    { ret.status = "CLOSED";
      ret.change = cid;
    }
  }

  return ret;
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);