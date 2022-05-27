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
                <button>=</button>
                <button>Del</button>
                <button>Save</button>
                <button>Read</button>
            </div>
        </div>
    );
}
