import { useState } from 'react';
import Message from './Message';
import InputNumber from './InputNumber';
import RestartButton from './RestartButton';

const Game = () => {
    const randomNumber = () => Math.floor(Math.random() * 100) + 1;
    const [number, setNumber] = useState(randomNumber);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [attempts, setAttempts] = useState(10);

    const handleChange = (e) => {
        setGuess(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (attempts <= 0 || message === '¡Correcto, has encontrado el número secreto!🎉') return;
        const numGuess = Number(guess);

        if (numGuess === number) {
            setMessage('¡Correcto, has encontrado el número secreto!🎉');
        }else {
            const newAttempts = attempts - 1;
            setAttempts(newAttempts);
        
        if (newAttempts === 0) {
        setMessage('Ya no hay intentos disponibles 😢');
        }else if (numGuess < number) {
            setMessage(`El número es mayor que ${numGuess}. Intentos restantes: ${newAttempts}`);
        } else {
            setMessage(`El número es menor que ${numGuess}. Intentos restantes: ${newAttempts}`);
        }
        }
    };
    
    const handleRestart = () => {
    setNumber(randomNumber());
    setGuess('');
    setMessage('');
    setAttempts(10);
  };

    return (
        <div>
           <InputNumber
                value={guess}
                onChange={handleChange}
                onSubmit={handleSubmit}
                disabled={attempts <= 0 || message === '¡Correcto, has encontrado el número secreto!🎉'}
            />
            {message && <Message message={message} />}
            <RestartButton restart={handleRestart} />
        </div>
    );
};

export default Game;