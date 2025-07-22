import { useReducer, useRef, useCallback, useEffect, useState } from "react";

const savedHistory = JSON.parse(localStorage.getItem("counterHistory")) || [];
const initialState = { count: 0, history: savedHistory };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { 
        count: state.count + action.payload, 
        history: [...state.history, `+${action.payload} (Nuevo valor: ${state.count + action.payload})`] 
      };
    case "decrement":
      return { 
        count: state.count - action.payload, 
        history: [...state.history, `-${action.payload} (Nuevo valor: ${state.count - action.payload})`] 
      };
    case "reset":
      return { count: 0, history: [] };
    case "undo":
      { if (state.history.length === 0) return state;
      const last = state.history[state.history.length - 1];
      let newCount = state.count;
      if (last.includes("+")) {
        const val = parseInt(last.split("(")[0].replace("+", ""));
        newCount -= val;
      } else if (last.includes("-")) {
        const val = parseInt(last.split("(")[0].replace("-", ""));
        newCount += val;
      }
      return {
        count: newCount,
        history: state.history.slice(0, -1)
      }; }
    default:
      return state;
  }
}

function CounterGame() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const incrementBtnRef = useRef(null);
  const [incrementValue, setIncrementValue] = useState(1);

  useEffect(() => {
    incrementBtnRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("counterHistory", JSON.stringify(state.history));
  }, [state.history]);

  const handleIncrement = useCallback(() => {
    dispatch({ type: "increment", payload: parseInt(incrementValue) || 1 });
  }, [incrementValue]);

  const handleDecrement = useCallback(() => {
    dispatch({ type: "decrement", payload: parseInt(incrementValue) || 1 });
  }, [incrementValue]);

  return (
    <div>
      <h2>Contador: {state.count}</h2>
      <input
        type="number"
        value={incrementValue}
        onChange={(e) => setIncrementValue(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <button ref={incrementBtnRef} onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "undo" })}>Deshacer</button>

      <h3>Historial de cambios:</h3>
      <ul>
        {state.history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}

export default CounterGame;