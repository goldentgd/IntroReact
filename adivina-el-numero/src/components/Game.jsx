import { useState } from 'react';
import Message from './Message';
import InputNumber from './InputNumber';
import RestartButton from './RestartButton';

const Game = () => {
    const randomNumber = () => Math.floor(Math.random() * 100) + 1;
    const [number, setNumber] = useState(randomNumber);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setGuess(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const numGuess = Number(guess);

        if (numGuess === number) {
            setMessage('¡Correcto, has encontrado el número secreto!🎉');
        } else if (numGuess < number) {
            setMessage(`El número es mayor que ${numGuess}`);
        } else {
            setMessage(`El número es menor que ${numGuess}`);
        }
    };
    
    const handleRestart = () => {
    setNumber(randomNumber());
    setGuess('');
    setMessage('');
  };

    return (
        <div>
           <InputNumber
                value={guess}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            {message && <Message message={message} />}
            <RestartButton restart={handleRestart} />
        </div>
    );
};

export default Game;