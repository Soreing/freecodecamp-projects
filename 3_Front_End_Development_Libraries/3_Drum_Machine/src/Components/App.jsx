import React from "react"
import DrumPad from "./DrumPad.jsx"
import "./App.css"

function App(keys){

    const [title, setTitle] = React.useState(" ");

    return(
        <div id="drum-machine" >
          <div id="display-div">
            <div id="display">{title}
            </div>
          </div>
          <DrumPad keys={keys.keys} changeTitle={setTitle} />
        </div>
        
      )
}

export default App;