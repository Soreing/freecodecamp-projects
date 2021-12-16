import React from "react";
import Counter from "./Counter.jsx";
import "./Clock.css";

const DEFAULT_SETTINGS = {
    session: 25,
    break: 5,
    stage: "Session",
    time: (25*60),
    running: false,
    thread: null
};

function mmss(sec){
    let min = Math.floor(sec / 60);
    sec %= 60;
    return `${(min<10 ? "0":"")+min}:${(sec<10 ? "0":"")+sec}`;
  }

function Clock(){

    const [state, setState] = React.useState({
        ...DEFAULT_SETTINGS
    })

    const changeSession = (val) => {
        setState((prev)=>{
            // Only change the state if the new value is valid  1 <== x <= 60
            if(prev.session + val >= 1 &&  prev.session + val <= 60 ){
              
                // Adjust time if the clock is stopped and it's in the correct state
                let newTime = prev.time;
                if(!prev.running && prev.stage=="Session"){
                    newTime = (prev.session + val) * 60;
                }
                
                return({
                  ...prev,
                  time: newTime,
                  session: prev.session + val
                })
            }
            return prev;
        })
    }

    const changeBreak = (val) => {
        setState((prev)=>{
            // Only change the state if the new value is valid  1 <== x <= 60
            if(prev.break + val >= 1 &&  prev.break + val <= 60 ){
              
                // Adjust time if the clock is stopped and it's in the correct state
                let newTime = prev.time;
                if(!prev.running && prev.stage=="Break"){
                    newTime = (prev.break + val) * 60;
                }
                
                return({
                  ...prev,
                  time: newTime,
                  break: prev.break + val
                })
            }
            return prev;
        })
    }

    const toggleClock = () => {
        setState((prev) =>{
            // If the clock is running, stop the thread
            if(prev.running){
                clearInterval(prev.thread);
                return({
                    ...prev,
                    running: false
                });
            }
            
            // Else start the clock thread
            else{
               return({
                    ...prev,
                    running: true,
                    thread: setInterval(tickClock, 1000)
               });
            }
        })
    }

    const reset = () => {
        setState((prev)=>{
            // Stop the beep
            let audio = document.getElementById("beep");
            audio.pause();
            audio.load();
            
            // Stop timer thread if it's active
            if(prev.running){
                clearInterval(prev.thread);
            }
            
            // Return default settings
            return({
                ...DEFAULT_SETTINGS
            });
        })
    }

    const tickClock = () => {
        setState((prev)=>{
            let newTime  = prev.time-1;
            let newStage = prev.stage;
            
            // If the stage is over (time == -1), go to the next stage
            // and set the time to the other phase's time interval
            if(newTime == -1){
              
                // Play beep audio
                const audio = document.getElementById("beep");
                audio.load();
                audio.play();
                
                switch(prev.stage){
                    case "Session":
                      newTime  = prev.break*60;
                      newStage = "Break";
                      break;
                      
                    case "Break":
                      newTime = prev.session*60;
                      newStage = "Session";
                      break;
                }
            }
            
            return({
                ...prev,
                time: newTime,
                stage: newStage
            });
        })
    }

    return(
        <div className="column center big-font">
          <div className="pad-ud-20">Countdown Session Clock</div>
          
          <div className="row pad-ud-20">
            <Counter 
              id="session" 
              title="Session Length" 
              value={state.session}
              changeValue={changeSession}
              />
  
            <Counter 
              id="break"   
              title="Break Length"   
              value={state.break}
              changeValue={changeBreak}
              />
          </div>
          
          <div className="pad-ud-20 column center">
            <div id="timer" className="timer-border column center pad-ud-20 pad-lr-20">
              <div id="timer-label">{state.stage}</div>
              <div id="time-left">{mmss(state.time)}</div>
            </div>
            <div id="timer-buttons" className="pad-ud-20">
              <span 
                id="start_stop"
                className="pad-lr-20"
                onClick={toggleClock}
              >
                <i className="fa fa-play"></i>
                <i className="fa fa-pause"></i>
              </span>
               <span 
                 id="reset"
                 className="pad-lr-20"
                 onClick={reset}
               >
                <i className="fa fa-refresh"></i>
              </span>
  
              <audio 
                id="beep"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
            </div>
          </div>
        </div>
    )
}

export default Clock;