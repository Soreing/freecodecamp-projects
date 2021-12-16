import React from "react";
import $ from "jquery";
import "./Quote.css";

function randByte(n,m){
    let num = Math.floor(Math.random()*(m-n)) + n;
    let str = num.toString(16);
    return num < 16 ? "0"+str : str;
}
  
function generateHexColor(){
    return `#${randByte(0,127)}${randByte(0,127)}${randByte(0,127)}`;
}
  
function Quote({quotes}){

    const firstQuoteIdx = Math.floor(Math.random() * quotes.length);

    const [quote, setQuote] = React.useState({
        index:  firstQuoteIdx,
        text:   quotes[firstQuoteIdx].text,
        author: quotes[firstQuoteIdx].author,
    });

    const generateQuote = () => {

        $("html").attr("style","--theme-color:"+generateHexColor());
        $("#quote").removeClass("fade-in").addClass("fade-out");
        
        setTimeout( () =>{
            $("#quote").addClass("fade-in")
            setQuote( (prev) => {
                let newIdx = prev.index;
                while(newIdx == prev.index){
                    newIdx = Math.floor(Math.random() * quotes.length);
                }

                return ({
                    index:  newIdx,
                    text:   quotes[newIdx].text,
                    author: quotes[newIdx].author
                });
            });
        }, 1000);
    }

    return(
        <div className="quote-container">
          <div id="quote">
            <p id="text" className="quote-text" >
              <i className="quote-text fa fa-quote-left" > </i>
              {" " + quote.text}</p>
            <p id="author" className="author-text">
              - {quote.author}</p>
          </div>
          <div className="row">
            <a id="tweet-quote" className="custom-button col-sm-1" href="twitter.com/intent/tweet">
              <i className="fa fa-twitter" style={{position: "absolute"}} ></i>
            </a>
            <a id="tumblr-quote" className="custom-button col-sm-1" href="#">
              <i className="fa fa-tumblr" style={{position: "absolute"}}></i>
            </a>
            <div className="col-md-6" />
            <button id="new-quote" className="custom-button col-sm-3" onClick={generateQuote}>
              <span style={{position: "absolute"}} >New quote</span>
            </button>
          </div>
        </div>
    );
}

export default Quote;