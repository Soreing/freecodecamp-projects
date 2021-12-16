import React from "react";
import "./DrumKey.css"

function DrumKey({audioName, audioURL, letter, changeTitle}){

    const onTapPlayAudio = () => {
        const audio = document.getElementById(letter);
        console.log(audio);
        changeTitle(audioName);
        audio.load();
        audio.play();
    }

    React.useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if(event.key.toLowerCase() == letter.toLowerCase()){
                onTapPlayAudio();
            }
        });
      }, [])

    return(
        <button
            id={audioName}
            className="drum-key" 
            onClick={onTapPlayAudio}
        > 
            {letter}
            <audio 
                id={letter}
                className="clip"
                src={audioURL} 
            />
        </button>
    );
}

export default DrumKey;