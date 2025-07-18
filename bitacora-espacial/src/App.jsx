import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [planetas, setPlanetas] = useState(
    JSON.parse(localStorage.getItem('planetas')) || []
  );
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const inputImagenRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('planetas', JSON.stringify(planetas));
  }, [planetas]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoPlaneta = {
      nombre,
      descripcion,
      imagen: imagen ? URL.createObjectURL(imagen) : null,
    };

    if (editIndex !== null) {
      const copia = [...planetas];
      copia[editIndex] = nuevoPlaneta;
      setPlanetas(copia);
      setEditIndex(null);
    } else {
      setPlanetas([...planetas, nuevoPlaneta]);
    }

    setNombre('');
    setDescripcion('');
    setImagen(null);
    if (inputImagenRef.current) {
      inputImagenRef.current.value = '';
    }
  };

  const handleDelete = (index) => {
    const copia = [...planetas];
    copia.splice(index, 1);
    setPlanetas(copia);
  };

  const handleEdit = (index) => {
    const planeta = planetas[index];
    setNombre(planeta.nombre);
    setDescripcion(planeta.descripcion);
    setImagen(null);
    setEditIndex(index);
    if (inputImagenRef.current) {
      inputImagenRef.current.value = '';
    }
  };

  return (
    <div className="bitacora">
      <h1>📔 Bitácora de Exploración</h1>

      <form onSubmit={handleSubmit} className="formulario">
        <input
          type="text"
          placeholder="Nombre del planeta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
          ref={inputImagenRef}
        />
        <button type="submit">{editIndex !== null ? "Actualizar" : "Guardar"}</button>
      </form>

      <h2>Planetas Registrados</h2>
      <div className="planetas">
        {planetas.map((planeta, index) => (
          <div key={index} className="planeta-card">
            <h3>{planeta.nombre}</h3>
            <p>{planeta.descripcion}</p>
            {planeta.imagen && <img src={planeta.imagen} alt={planeta.nombre} />}
            <div className="acciones">
              <button onClick={() => handleEdit(index)}>Editar</button>
              <button onClick={() => handleDelete(index)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
