import React, { useState, useEffect, useMemo } from 'react'
import Planeta from './Planeta'
import './App.css'

function App () {
  const [distancia, setDistancia] = useState(0)
  const [combustible, setCombustible] = useState(100)
  const [estadoNave, setEstadoNave] = useState('En órbita')
  const [planetasVisitados, setPlanetasVisitados] = useState([])

  useEffect(() => {
    console.log('¡El panel de control está listo!')

    const intervalo = setInterval(() => {
      setCombustible(prev => (prev > 0 ? prev - 1 : 0))
      setDistancia(prev => prev + 10)
    }, 1000)

    return () => {
      clearInterval(intervalo)
      console.log('El panel de control se ha apagado.')
    }
  }, [])

  useEffect(() => {
    console.log('¡Combustible actualizado!')
  }, [combustible])

  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`
  }, [estadoNave])

  const aterrizar = () => {
    setEstadoNave('Aterrizando')
    setPlanetasVisitados(prev => [...prev, `Planeta ${prev.length + 1}`])
  }

  return (
    <div className='panel'>
      <h1>🚀 Explorador Espacial</h1>
      <div className='info'>
        <p><strong>Distancia:</strong> {distancia} km</p>
        <p><strong>Combustible:</strong> {combustible} %</p>
        <p><strong>{mensajeEstado}</strong></p>
        <button onClick={aterrizar}>Aterrizar en un planeta 🌎</button>
      </div>

      <h2>Planetas Visitados</h2>
      <div className='planetas'>
        {planetasVisitados.map((planeta, index) => (
          <Planeta key={index} nombre={planeta} />
        ))}
      </div>
    </div>
  )
}

export default App
