import React from "react";
import "./Counter.css"

function Counter({id, title, value, changeValue}){
    return(
      <div id={`${id}-label`} className="column center pad-lr-20 small-font">
        <div>{title}</div>
        <div id={`${id}-length`}>
          <span 
            id={`${id}-increment`}
            className="pad-lr-5"
            onClick={() => changeValue(1)}>
            <i className="fa fa-arrow-up"></i>
          </span>
          {value}
          <span 
            id={`${id}-decrement`}
            className="pad-lr-5"
            onClick={() => changeValue(-1)}>
            <i className="fa fa-arrow-down"></i>
          </span>
        </div>
      </div>
    )
}

export default Counter;