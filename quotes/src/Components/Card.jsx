import React from "react"
import "materialize-css"
import Modal from "./Modal"

export const Card = ({
    title = "Новости",
    color = "#fff",
    fullText = "Здесь должна быть новость",
    pText = "",
    quotes = "Здесь должна быть новость",
    button = "",
    generateQuotes = () => {}
}) => {
    return (
        <>
      <div className="container">
        <style>{`body { background-color: ${color}; }`}</style>
        <div className="row center">
          <div className="col s12 m10 l8 xl8 offset-m1 offset-s1 offset-l2 offset-xl2">
            <div className="card lighten-5">
              <div className="card-content white-text">
                <span className="card-title" style={{ color }}>{title}</span>
                <p ref={pText} className="quotes-p" style={{ color }}>
                  <span className="mini-icon modal-trigger waves-light" data-target="modal1">&#9998;</span>
                    {quotes}
                  <span className="mini-icon modal-trigger next waves-light" data-target="modal1">&#9998;</span>
                </p>
              </div>
              <div className="card-action">
                <a className="btn-floating btn-large waves-effect waves-light red favicon" rel="noopener noreferrer" target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}`}>
                  <i style={{ backgroundColor: color }} className="fab fa-twitter"></i>
                </a>
                <a href="/#" ref={button} onClick={generateQuotes} className="waves-effect btn btn-size" style={{ backgroundColor: color }}>Генерировать</a>
              </div>
              <Modal color={color} text={fullText}></Modal>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}