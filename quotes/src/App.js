import React, { useState, useRef } from 'react'
import 'materialize-css'
import M from "materialize-css"
import { randomColor } from './AdditionalFunc/randomColor'
import { sliceText } from './AdditionalFunc/sliceText'
import { Card } from './Components/Card'

setTimeout(() => {
    M.toast({
      html: '<span>Что бы посмотреть полную новость нажмите на &#9998;</span>', 
      displayLength: 60000,
      classes: 'rounded'
    })
}, 5000)

setTimeout(() => {
  M.toast({
    html: 'Что бы посмотреть страницу на github нажмите <a href="https://github.com/MBfilipp" rel="noopener noreferrer" target="_blank"><i class="fab fa-github"></i></a>', 
    displayLength: 60000,
    classes: 'rounded'
  })
}, 10000)

function App() {
  const pText = useRef(null)
  const button = useRef(null)
  const [quotes, setQuotes] = useState("Здесь должна быть новость")
  const [color, setColor] = useState("orange")
  const [fullText, setFullText] = useState("Здесь должна быть новость")

  const generateQuotes = async (event) => {
    event.preventDefault();
    pText.current.classList.toggle("opacity")
    button.current.classList.toggle("disabled")
    setTimeout(() => {
      pText.current.classList.toggle("opacity")
      button.current.classList.toggle("disabled")
    }, 1000)
    try {

      const data = await fetch("https://fish-text.ru/get?format=json&number=4&type=sentence", 
        {
          method: "GET",
        }
      )

      const dataJson = await data.json()
      setFullText(dataJson.text)
      setTimeout(() => {
        setQuotes(sliceText(dataJson.text, 50, "..."))
      }, 700)
      
      setColor(randomColor());

    } catch(e) {
      console.log(e.message)
      throw e
    }
    
  }
  return (
    <Card 
      title="Новости" 
      fullText={fullText} 
      color={color} 
      pText={pText} 
      generateQuotes={generateQuotes} 
      button={button} 
      quotes={quotes} 
    />
  )
}

export default App
