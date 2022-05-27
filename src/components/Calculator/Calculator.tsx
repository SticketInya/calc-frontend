import axios from 'axios';
import { useState } from 'react';
import { operators } from '../../constants/operators';

import styles from './Calculator.module.css';

export default function Calculator() {
    const [numbers, setNumbers] = useState('');
    const [savedNumId, setSavedNumId] = useState('');

    const digitBtns = Array.from({ length: 10 }).map((_, i) => {
        return (
            <button
                className={styles.digit}
                key={i}
                onClick={() => addDigit(i)}
            >
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

    const clearNumbers = () => {
        setNumbers('');
    };

    const saveCurrentNumber = async () => {
        if (numbers.length === 0) {
            return;
        }
        try {
            const currNum = eval(numbers);
            const dataToSend = {
                impNumber: currNum,
            };
            await axios
                .post(`${process.env.REACT_APP_API_URL}/save`, dataToSend)
                .then((res) => {
                    setSavedNumId(res.data.id);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const readSavedNumber = async () => {
        if (savedNumId === '') {
            return;
        }
        try {
            await axios
                .get(`${process.env.REACT_APP_API_URL}/${savedNumId}`)
                .then((res) => {
                    setNumbers(String(res.data.number));
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.root}>
            <div className={styles.display}>
                {numbers === '' ? '0' : numbers}
            </div>
            <div className={styles.container}>
                {digitBtns}
                {operators.map((operator) => (
                    <button
                        className={styles.digit}
                        key={operator}
                        onClick={() => addOperator(operator)}
                    >
                        {operator}
                    </button>
                ))}
            </div>
            <div className={styles.funcBtns}>
                <button onClick={evalNumbers}>=</button>
                <button onClick={deleteLastDigit}>Del</button>
                <button onClick={clearNumbers}>Clear</button>
                <button onClick={saveCurrentNumber}>Save</button>
                <button onClick={readSavedNumber}>Read</button>
            </div>
        </div>
    );
}
