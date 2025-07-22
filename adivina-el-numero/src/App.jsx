import './App.css'
import Game from './components/Game'

function App() {

  return (
    <div className="App">
      <h1>Adivina el Número</h1>
      <p>Intenta adivinar el número entre 1 y 100</p>
      <Game />
    </div>
  )
}

export default App
