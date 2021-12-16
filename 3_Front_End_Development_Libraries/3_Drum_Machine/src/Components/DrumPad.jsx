import React from "react";
import DrumKey from "./DrumKey.jsx"
import "./DrumPad.css"

function DrumPad({keys, changeTitle}){
	
	return(
    <div id="keyboard">
      {keys.map(e => { return ( 
          <DrumKey 
		  	key={e.letter}
            audioName={e.audioName}
            audioURL={e.audioURL}
            letter={e.letter}
            changeTitle={changeTitle} 
          />
        )}
      )}
    </div>
  )
}

export default DrumPad;