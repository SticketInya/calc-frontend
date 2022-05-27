import { useState } from 'react';

export default function Calculator() {
    const [numbers, setNumbers] = useState('');
    const operators = ['+', '-', '/', '*', '.'];
    const digitBtns = Array.from({ length: 10 }).map((_, i) => {
        return (
            <button key={i} onClick={() => addDigit(i)}>
                {i}
            </button>
        );
    });

    const addDigit = (digit: number) => {
        setNumbers(numbers + String(digit));
    };

    const addOperator = (operator: string) => {
        const lastDigit = numbers.slice(-1);
        if (operators.includes(lastDigit)) {
            return;
        }
        setNumbers(numbers + operator);
    };

    const evalNumbers = () => {
        try {
            const result = eval(numbers);
            setNumbers(String(result));
        } catch (err) {
            setNumbers('Error');
        }
    };

    const deleteLastDigit = () => {
        if (numbers.length === 0) {
            return;
        }
        setNumbers(numbers.slice(0, -1));
    };

    return (
        <div className='Calculator'>
            <div className='Display'>{numbers === '' ? '0' : numbers}</div>
            <div className='Operators'>
                {operators.map((operator) => (
                    <button
                        key={operator}
                        onClick={() => addOperator(operator)}
                    >
                        {operator}
                    </button>
                ))}
            </div>
            <div className='Digits'>{digitBtns}</div>
            <div className='FunctionalBtns'>
                <button onClick={evalNumbers}>=</button>
                <button onClick={deleteLastDigit}>Del</button>
                <button>Save</button>
                <button>Read</button>
            </div>
        </div>
    );
}
