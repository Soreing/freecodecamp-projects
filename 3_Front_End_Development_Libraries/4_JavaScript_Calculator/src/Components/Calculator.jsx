import React from "react";
import Key from "./Key.jsx"
import "./Calculator.css"

const KEYS=[
    { id:"zero",     display:"0",  type:"value"},
    { id:"one",      display:"1",  type:"value"},
    { id:"two",      display:"2",  type:"value"},
    { id:"three",    display:"3",  type:"value"},
    { id:"four",     display:"4",  type:"value"},
    { id:"five",     display:"5",  type:"value"},
    { id:"six",      display:"6",  type:"value"},
    { id:"seven",    display:"7",  type:"value"},
    { id:"eight",    display:"8",  type:"value"},
    { id:"nine",     display:"9",  type:"value"},
    { id:"add",      display:"+",  type:"operation"},
    { id:"subtract", display:"-",  type:"operation"},
    { id:"multiply", display:"*",  type:"operation"},
    { id:"divide",   display:"/",  type:"operation"},
    { id:"clear",    display:"AC", type:"clear"},
    { id:"decimal",  display:".",  type:"value"},
    { id:"equals",   display:"=",  type:"equals"},
];
  
const OP_ORDER = {
    "-": 1,
    "+": 1,
    "*": 2,
    "/": 2,
}

function solveExpresion(stack){
    let valueStack = [];
    let opStack = [];
    let neg = false;
    
    for(let i=0; i< stack.length; i++){
        // If it's a value element, add it to the value stack
        if(stack[i].type == "value"){
            valueStack.push({type:stack[i].type, value:(neg ? -stack[i].value : stack[i].value)});
            neg = false;
        }
        
        // If it's an operator, it needs to be evaluated for order
        else if(stack[i].type == "operator"){
            // I am so tired of this already.. sigh.. this means the next value is negative
            if(i == 0 || stack[i-1].type == "operator"){
                neg = true;
            }
            
            // Else it's a real operator
            else{ 
                let order = OP_ORDER[stack[i].value];
                while(opStack.length > 0 && OP_ORDER[opStack[opStack.length-1].value] >= order){
                    valueStack.push(opStack.pop());
                }
        
                opStack.push(stack[i]);
            }
        }
    }

    // Add remaining operators
    while(opStack.length > 0){
        valueStack.push(opStack.pop());
    }
  
    // Solve the expression
    let result = []
    let lhs, rhs;
    
    for(let i=0; i<valueStack.length; i++){
        switch(valueStack[i].type){
            case "value":
                result.push(valueStack[i].value);
                break;
              
            case "operator":
                rhs = result.pop();
                lhs = result.pop();
                switch(valueStack[i].value){
                    case "+": result.push(lhs+rhs); break;
                    case "-": result.push(lhs-rhs); break;
                    case "*": result.push(lhs*rhs); break;
                    case "/": result.push(lhs/rhs); break; 
                }
                break;
        }
    }
  
    return result[0];
}

function Calculator(){

    const [state, setState] = React.useState({
        input: "",
        stack: []
    });

    const calculatorInput = (button) => {
        setState((prev) => {
    
            // On bad input, do nothing
            if(button.id == "decimal" && prev.input.indexOf(".") != -1){
                return prev;
            }
          
            let input = prev.input;
            let stack = [...prev.stack];
          
            if(button.type == "value"){
                // If current input is an operator, commit it to the elements
                if(/[/\*\-\+]/.test(input)){
                    stack.push({type:"operator", value:input});
                    input = "";
                }
            
                // Add button press to the existing input and format the input
                input = (input + button.display).replace(/^0*/g, "");
                if(input[0] == '.' || input == ""){
                    input = "0" + input;
                }
            }
          
            else if(button.type == "operation"){
                // If current input is a value, commit it to the elements
                if(/^[\d\.]+$/.test(input)){
                    stack.push({type:"value", value:parseFloat(input)});
                }
              
                // Else if the current input is an operator
                else {
                    // If the new operator is "-" and the last stack element is a value, commit the last operator
                    // This is for the dumb unary - operator that should not exist like this ... 
                    if(button.display == "-" && (stack.length > 0 && stack[stack.length-1].type == "value")){
                        stack.push({type:"operator", value:input});
                    }
                    
                    // Otherwise pop any last committed operator in the stack
                    else{
                        if(stack.length > 0 && stack[stack.length-1].type == "operator"){
                            stack.pop();
                        }
                    }
                }
                
                // Set the display to the new operator button
                // The condition makes sure the expression can't start with an invalid operator
                if(input != "" || button.display == "-"){
                    input = button.display;
                }
            }
            
            // Solve the expression if there is one
            else if(button.type == "equals" && stack.length > 0){
                // Commit the last input if it was a value
                if(/^[\d\.]+$/.test(input)){
                    stack.push({type:"value", value:parseFloat(input)});
                }
        
                input = solveExpresion(stack);
                stack = [];
            }
            
            // Clear the calculator
            else if(button.type == "clear"){
                stack = [];
                input = "";
            }
            
            // Set the state
            return {
              stack: stack,
              input: input
            }
        });
    }


    let formulaText = state.stack.map(e=> e.value).join('') + state.input; 

    return(
      <div id="calculator">
        <div id="formula" >{formulaText != "" ? formulaText : "0"}</div>
        <div id="display" >{state.input != "" ? state.input : "0"}</div>
        <div id="keypad">
          {KEYS.map( e => 
            <Key 
              key={e.id}
              display={e.display} 
              data={e} 
              makeInput={calculatorInput} /> 
          )}
        </div>
      </div>
    )
}

export default Calculator;