import React from "react"
import {marked} from "marked"
import "./Markdown.css"

function Markdown({defaultText}) {

    const [info, setInfo] = React.useState({
        input: defaultText,
        html: marked.parse(defaultText, {breaks: true})
    });

    const changeText = (event) => {
        setInfo({
            input: event.target.value,
            html: marked.parse(event.target.value, {breaks: true})
        });
    }

    return(
      <div id="markdown-container">
        
        <div className="display-box">
          <div className="display-header">
            Markdown Text
          </div>
          <div className="display-content">
            <textarea id="editor" value={info.input} onChange={changeText}></textarea>
          </div>
        </div>
    
        <div className="display-box">
          <div className="display-header">
            HTML Formatting
          </div>
          <div className="display-content">
            <div id="preview" dangerouslySetInnerHTML={{__html: info.html}} />
          </div>
        </div>
    
      </div>
    );
}

export default Markdown;

// class Markdown extends React.Component{
//     constructor(props){
//       super(props);
      
//       this.state={
//         text: DEFAULT_TEXT
//       }
      
//       this.changeText = this.changeText.bind(this);
//     }
    
//     changeText(event){
//       this.setState({
//         text: event.target.value
//       });
//     }
    
//     render(){
//       let formattedText = marked.parse(this.state.text, {breaks: true});
      
//       return(
//         <div id="markdown-container">
          
//           <div className="display-box">
//             <div className="display-header">
//               Markdown Text
//             </div>
//             <div className="display-content">
//               <textarea id="editor" value={this.state.text} onChange={this.changeText}></textarea>
//             </div>
//           </div>
          
//           <div className="display-box">
//             <div className="display-header">
//               HTML Formatting
//             </div>
//             <div className="display-content">
//               <div id="preview" dangerouslySetInnerHTML={{__html: formattedText}} />
//             </div>
//           </div>
        
//         </div>
//       )
//     }
//   }
  
  
//   ReactDOM.render(<Markdown />, document.getElementById("root"));