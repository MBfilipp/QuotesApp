import React, { useState, useRef } from 'react';
import 'materialize-css';
import M from "materialize-css";
import Modal from "./Components/Modal";
import { randomColor } from './randomColor';
import { sliceText } from './sliceText';

setTimeout(() => {
    M.toast({
      html: '<span>Что бы посмотреть полную новость нажмите на &#9998;</span>', 
      displayLength: 1000000,
      classes: 'rounded'
    })
  }, 5000)

function App() {
  const pText = useRef(null);
  const button = useRef(null);
  const [quotes, setQuotes] = useState("Здесь должна быть новость");
  const [color, setColor] = useState("#000");
  const [fullText, setFullText] = useState("Здесь должна быть новость");

  

  const generateQuotes = async (event) => {
    event.preventDefault();
    pText.current.classList.toggle("opacity");
    button.current.classList.toggle("disabled");
    setTimeout(() => {
      pText.current.classList.toggle("opacity");
      button.current.classList.toggle("disabled");
    }, 1000)
    try {

      const data = await fetch("https://fish-text.ru/get?format=json&number=4&type=sentence", 
        {
          method: "GET",
        }
      );

      const dataJson = await data.json();
      setFullText(dataJson.text);
      setTimeout(() => {
        setQuotes(sliceText(dataJson.text, 50, "..."));
      }, 700)
      
      setColor(randomColor());

    } catch(e) {
      console.log(e.message);
    }
    
  }
  return (
    <>
      <div className="container">
        <style>{`body { background-color: ${color};`}</style>
        <div className="row center">
          <div className="col s12 m10 l8 xl8 offset-m1 offset-s1 offset-l2 offset-xl2">
            <div className="card lighten-5">
              <div className="card-content white-text">
                <span className="card-title" style={{ color }}>Новость</span>
                <p ref={pText} className="quotes-p" style={{ color }}>
                  <span className="mini-icon modal-trigger waves-light" data-target="modal1">&#9998;</span>
                    {quotes}
                  <span className="mini-icon modal-trigger next waves-light" data-target="modal1">&#9998;</span>
                </p>
              </div>
              <div className="card-action">
                <a class="btn-floating btn-large waves-effect waves-light red favicon" target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}`}>
                  <i style={{ backgroundColor: color }} class="fab fa-twitter"></i>
                </a>
                <a href="/#" ref={button} onClick={generateQuotes} className="waves-effect btn btn-size" style={{ backgroundColor: color }}>Генерировать</a>
              </div>
              <Modal color={color} text={fullText}></Modal>
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
}

export default App;
