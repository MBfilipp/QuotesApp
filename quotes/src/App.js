import React, { useState, useRef } from 'react';
import 'materialize-css';
import Modal from "./Components/Modal";
import { randomColor } from './randomColor';
import { sliceText } from './sliceText';

function App() {
  const pText = useRef(null);
  const button = useRef(null);
  const [quotes, setQuotes] = useState("Здесь должна быть цитата");
  const [color, setColor] = useState("#000");
  const [fullText, setFullText] = useState("Здесь должна быть цитата");

  const generateQuotes = async (event) => {
    event.preventDefault();
    pText.current.classList.toggle("opacity");
    button.current.classList.toggle("disabled");
    setTimeout(() => {
      pText.current.classList.toggle("opacity");
      button.current.classList.toggle("disabled");
    }, 1000)
    try {

      const data = await fetch("https://fish-text.ru/get?format=json&number=5&type=sentence", 
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
          <div className="col s10 m6 offset-m3 offset-s1" style={{ marginTop: 23 + "%", transition: 4 + "s" }}>
            <div className="card lighten-5">
              <div className="card-content white-text">
                <span className="card-title" style={{ color }}>Цитата</span>
                <p ref={pText} className="quotes-p" style={{ color }}>
                  <span className="mini-icon">&#9998;</span>
                    {quotes}
                  <span className="mini-icon modal-trigger" data-target="modal1">&#9998;</span></p>
              </div>
              <div className="card-action">
                <a ref={button} onClick={generateQuotes} className="waves-effect btn btn-size" style={{ backgroundColor: color }}>Генерировать</a>
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
