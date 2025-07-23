import { Link } from 'react-router-dom'

function Citas () {
  // Ejemplo de datos de citas
  const citas = [
    { id: 1, paciente: 'Adriana López', fecha: '2025-07-23' },
    { id: 2, paciente: 'María López', fecha: '2025-07-24' },
    { id: 3, paciente: 'Diego Hernández', fecha: '2025-07-25' },
    { id: 4, paciente: 'Andrea Noli', fecha: '2025-07-26' },
    { id: 5, paciente: 'Robert Downey Jr.', fecha: '2025-07-26' },
  ]

  return (
    <div>
      <h1>Lista de Citas</h1>
      <ul>
        {citas.map((cita) => (
          <li key={cita.id}>
            <Link to={`/cita/${cita.id}`}>
              {cita.paciente} - {cita.fecha}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Citas
