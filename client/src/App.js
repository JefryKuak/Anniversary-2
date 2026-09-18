import React, {useEffect, useEffectEvent, useState} from 'react'

function App() {
  const [backEndData, setBackEndData] = useState([{}])
  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackEndData(data)
      }
    )
  })
  return (
    <div>App</div>
  )
}

export default App