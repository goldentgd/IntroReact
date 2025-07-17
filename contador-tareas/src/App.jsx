import React, { useState, useEffect, useMemo } from 'react'
import './App.css'

function App () {
  const [tareas, setTareas] = useState([])
  const [nuevaTarea, setNuevaTarea] = useState('')
  const [duracion, setDuracion] = useState('')
  const [filtroDuracion, setFiltroDuracion] = useState('')

  useEffect(() => {
    const tareasGuardadas = localStorage.getItem('tareas')
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
  }, [tareas])

  // Actualizar el título del documento con el total
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`
  }, [tareas])

  // Calcular tiempo total usando useMemo
  const calcularTiempoTotal = useMemo(() => {
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0)
  }, [tareas])

  // Agregar tarea
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
        fecha: new Date().toISOString(),
      }
      setTareas([...tareas, nuevaTareaObj])
      setNuevaTarea('')
      setDuracion('')
    }
  }

  // Filtrar tareas por duración mínima
  const tareasFiltradas = tareas.filter(tarea => {
    if (!filtroDuracion) return true
    return tarea.duracion >= parseInt(filtroDuracion)
  })

  return (
    <div className='container'>
      <h1>Contador de Tareas</h1>
      <div className='form'>
        <input
          type='text'
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder='Nombre de la tarea'
        />
        <input
          type='number'
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          placeholder='Duración en minutos'
        />
        <button onClick={agregarTarea}>Agregar tarea</button>
      </div>

      <div className='filtro'>
        <label>Filtrar por duración mínima:</label>
        <input
          type='number'
          value={filtroDuracion}
          onChange={(e) => setFiltroDuracion(e.target.value)}
          placeholder='Minutos'
        />
      </div>

      <h2>Tareas</h2>
      <ul>
        {tareasFiltradas.length > 0
          ? (
              tareasFiltradas.map((tarea, index) => (
                <li key={index}>
                  {tarea.nombre}: {tarea.duracion} minutos
                </li>
              ))
            )
          : (
            <li>No hay tareas que coincidan</li>
            )}
      </ul>

      <h3>Total de tiempo: {calcularTiempoTotal} minutos</h3>
    </div>
  )
}

export default App
