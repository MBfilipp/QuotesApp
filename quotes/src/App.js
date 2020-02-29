import React, { useState } from 'react';
import 'materialize-css';
import { randomColor } from './randomColor';

function App() {
  const [quotes, setQuotes] = useState("Здесь должна быть цитата");
  const [color, setColor] = useState("#000");

  const generateQuotes = async (event) => {
    event.preventDefault();

    try {

      const data = await fetch("https://fish-text.ru/get?format=json&number=1&type=title", 
        {
          method: "GET",
        }
      );

      const dataJson = await data.json();

      setQuotes(dataJson.text);
      setColor(randomColor());

    } catch(e) {
      console.log(e.message);
    }
    
  }
  return (
    <div className="container">
      <style>{`body { background-color: ${color}; transition: 1s;`}</style>
      <div className="row center">
        <div className="col s10 m6 offset-m3 offset-s1" style={{ marginTop: 23 + "%", transition: 1 + "s" }}>
          <div className="card lighten-5">
            <div className="card-content white-text">
              <span className="card-title" style={{ color }}>Цитата</span>
              <p className="quotes-p" style={{ color }}><span className="mini-icon">&#9998;</span>{quotes}</p>
            </div>
            <div className="card-action">
              <a onClick={generateQuotes} className="waves-effect btn btn-size" style={{ backgroundColor: color }}>Генерировать</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
