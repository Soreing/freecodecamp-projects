import React from "react";
import "./Key.css"

function Key({ data:{type, id, display}, data, makeInput}){
    
    return(
      <div 
        className={`disable-select key-button ${type}`} 
        id={id} 
        style={{gridArea: id}}
        onClick={()=> {makeInput(data)}}
      >
        {display}
      </div>
    )
}

export default Key;