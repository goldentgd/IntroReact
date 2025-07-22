
const InputNumber = ({value, onChange, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
        <input
            type="number"
            className="input-number"
            value={value}
            onChange={onChange}
            min="1"
            max="100"
            placeholder="Escribe el número"
        />
        <button type="submit">Adivinar número</button>
    </form>
  )
}

export default InputNumber