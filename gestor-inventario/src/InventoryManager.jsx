import { useReducer, useRef, useCallback, useEffect, useState } from 'react'

const savedProducts = JSON.parse(localStorage.getItem('products')) || []
const initialState = { products: savedProducts }

function reducer (state, action) {
  switch (action.type) {
    case 'add':
      return {
        products: [
          ...state.products,
          {
            id: Date.now(),
            name: action.name,
            quantity: 1
          }
        ]
      }
    case 'increment':
      return {
        products: state.products.map(p =>
          p.id === action.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      }
    case 'decrement':
      return {
        products: state.products.map(p =>
          p.id === action.id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
        )
      }
    case 'remove':
      return {
        products: state.products.filter(p => p.id !== action.id)
      }
    case 'clear':
      return { products: [] }
    default:
      return state
  }
}

function InventoryManager () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const inputRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddProduct = () => {
    if (inputRef.current.value.trim() !== '') {
      dispatch({ type: 'add', name: inputRef.current.value })
      inputRef.current.value = '' // Limpiar input
    }
  }

  const handleIncrement = useCallback((id) => {
    dispatch({ type: 'increment', id })
  }, [])

  const handleDecrement = useCallback((id) => {
    dispatch({ type: 'decrement', id })
  }, [])

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(state.products))
  }, [state.products])

  return (
    <div>
      <h2>Gestor de Inventario</h2>

      <input
        ref={inputRef}
        type='text'
        placeholder='Nombre del producto'
      />
      <button onClick={handleAddProduct}>Agregar Producto</button>

      <br />

      <input
        type='text'
        placeholder='Buscar producto...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {state.products
          .filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((product) => (
            <li key={product.id}>
              {product.name} - Cantidad: {product.quantity}
              <button onClick={() => handleIncrement(product.id)}>+</button>
              <button onClick={() => handleDecrement(product.id)}>-</button>
              <button onClick={() => dispatch({ type: 'remove', id: product.id })}>Eliminar</button>
            </li>
          ))}
      </ul>

      <button onClick={() => dispatch({ type: 'clear' })}>Vaciar Inventario</button>
    </div>
  )
}

export default InventoryManager
