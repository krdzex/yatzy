import React, { useCallback, useEffect, useState } from 'react';
import Die from './Die';
import Table from './Table';

const Board = () => {
    const [sides] = useState(["1", "2", "3", "4", "5", "6"]);
    const [dices, setDices] = useState([])
    const [rolling, setRolling] = useState(false);
    const [rolls, setRolls] = useState(2)


    const createDice = useCallback(() => {
        let dices = [];
        for (let i = 0; i < 5; i++) {
            dices.push({
                dice: i,
                value: sides[Math.floor(Math.random() * sides.length)],
                freezed: false

            })
        }
        return dices
    }, [sides])
    useEffect(() => {
        const dices = createDice();
        setDices(dices);
    }, [createDice])

    const roll = (rolls) => {
        if (rolls > 0) {
            let dicesCopy = dices.slice();
            for (let i = 0; i < dicesCopy.length; i++) {
                if (dicesCopy[i].freezed === true) {
                    continue;
                }
                dicesCopy[i].value = sides[Math.floor(Math.random() * sides.length)];

            }
            setRolling(true)
            setRolls(rolls - 1)
            setTimeout(() => {
                setRolling(false)
            }, 1000);
            chackAllCases(dicesCopy)
            setDices(dicesCopy)
        }
    }
    const [table, setTable] = useState([{ name: "Ones", value: 0, finalScore: false }, { name: "Twos", value: 0, finalScore: false },
    { name: "Threes", value: 0, finalScore: false }, { name: "Fours", value: 0, finalScore: false },
    { name: "Fives", value: 0, finalScore: false }, { name: "Sixes", value: 0, finalScore: false },
    { name: "3 of Kind", value: 0, finalScore: false }, { name: "4 of Kind", value: 0, finalScore: false },
    { name: "Full House", value: 0, finalScore: false }, { name: "Small Straight", value: 0, finalScore: false },
    { name: "Large Straight", value: 0, finalScore: false }, { name: "Yatzy", value: 0, finalScore: false }, { name: "Chance", value: 0, finalScore: false }
    ]);

    const freez = (id) => {
        let dicesCopy = dices.slice();
        for (let i = 0; i < dicesCopy.length; i++) {
            if (dicesCopy[i].dice === id) {
                if (dicesCopy[i].freezed === false) {
                    dicesCopy[i].freezed = true;
                } else {
                    dicesCopy[i].freezed = false;
                }
            }
        }

        setDices(dicesCopy)
    }

    const addingNumber = (array, tableCopy, number, position) => {
        let finalNumber = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === number) {
                finalNumber += number;
            }
        }
        tableCopy[position].value = finalNumber;
    }

    const threeAndFourOfKind = (array, tableCopy, number, position) => {
        let arrayCopy = array.slice()
        arrayCopy.sort();
        arrayCopy.reverse();
        let finalNumber = 0;
        for (let i = 0; i <= arrayCopy.length - number; i++) {
            if (number === 3) {
                if (arrayCopy[i] === arrayCopy[i + 1] && arrayCopy[i] === arrayCopy[i + 2]) {
                    for (let i = 0; i < arrayCopy.length; i++) {
                        finalNumber += arrayCopy[i];
                    }
                    break;
                }
            } else {
                if (arrayCopy[i] === arrayCopy[i + 1] && arrayCopy[i] === arrayCopy[i + 2] && arrayCopy[i] === arrayCopy[i + 3]) {
                    for (let i = 0; i < arrayCopy.length; i++) {
                        finalNumber += arrayCopy[i];
                    }
                    break;
                }
            }
        }
        tableCopy[position].value = finalNumber;
    }

    const fullHouse = (array, tableCopy, position) => {
        let arrayCopy = array.slice()
        arrayCopy.sort();
        arrayCopy.reverse();
        let finalNumber = 0;
        for (let i = 0; i <= arrayCopy.length - 3; i++) {
            if (arrayCopy[i] === arrayCopy[i + 1] && arrayCopy[i] === arrayCopy[i + 2]) {
                arrayCopy.splice(i, 3);
                if (arrayCopy[0] === arrayCopy[1]) {
                    finalNumber = 25;
                }
                break;
            }
        }
        tableCopy[position].value = finalNumber;
    }

    const smallAndLargeStraight = (array, tableCopy, type, position) => {
        let finalNumber = 0;
        let arrayCopy = array.slice();
        arrayCopy.sort();
        if (type === 4) {
            if (/12+3+4|23+4+5|34+5+6/.test(arrayCopy.join(""))) {
                finalNumber = 30;
            }
        } else {
            if (/12345|23456/.test(arrayCopy.join(""))) {
                finalNumber = 40;
            }
        }
        tableCopy[position].value = finalNumber;
    }

    const yatzy = (array, tableCopy, position) => {
        let finalNumber = 0;
        let arrayCopy = array.slice();
        arrayCopy.sort();

        if (arrayCopy[0] === arrayCopy[arrayCopy.length - 1]) {
            finalNumber = 50;
        }

        tableCopy[position].value = finalNumber;
    }

    const chance = (array, tableCopy, position) => {
        let finalNumber = 0;
        for (let i = 0; i < array.length; i++) {
            finalNumber += array[i];
        }
        tableCopy[position].value = finalNumber;

    }

    const chackAllCases = () => {
        const array = [];
        const tableCopy = table.slice();
        for (let i = 0; i < dices.length; i++) {
            array.push(parseInt(dices[i].value));
        }

        for (let i = 0; i < tableCopy.length; i++) {
            switch (tableCopy[i].name) {
                case "Ones":
                    if (!tableCopy[i].finalScore) {
                        addingNumber(array, tableCopy, 1, i);
                    }
                    break;
                case "Twos":
                    if (!tableCopy[i].finalScore) {
                        addingNumber(array, tableCopy, 2, i);
                    }
                    break;
                case "Threes":
                    if (!tableCopy[i].finalScore) {
                        addingNumber(array, tableCopy, 3, i);
                    }
                    break;
                case "Fours":
                    if (!tableCopy[i].finalScore) {
                        addingNumber(array, tableCopy, 4, i);
                    }
                    break;
                case "Fives":
                    if (!tableCopy[i].finalScore) {
                        addingNumber(array, tableCopy, 5, i);
                    }
                    break;
                case "Sixes":
                    if (!tableCopy[i].finalScore) {
                        addingNumber(array, tableCopy, 6, i);
                    }
                    break;
                case "3 of Kind":
                    if (!tableCopy[i].finalScore) {
                        threeAndFourOfKind(array, tableCopy, 3, i)
                    }
                    break;
                case "4 of Kind":
                    if (!tableCopy[i].finalScore) {
                        threeAndFourOfKind(array, tableCopy, 4, i)
                    }
                    break;
                case "Full House":
                    if (!tableCopy[i].finalScore) {
                        fullHouse(array, tableCopy, i)
                    }
                    break;
                case "Small Straight":
                    if (!tableCopy[i].finalScore) {
                        smallAndLargeStraight(array, tableCopy, 4, i)
                    }
                    break;
                case "Large Straight":
                    if (!tableCopy[i].finalScore) {
                        smallAndLargeStraight(array, tableCopy, 5, i)
                    }
                    break;
                case "Yatzy":
                    if (!tableCopy[i].finalScore) {
                        yatzy(array, tableCopy, i)
                    }
                    break;
                case "Chance":
                    if (!tableCopy[i].finalScore) {
                        chance(array, tableCopy, i);
                    }
                    break;
                default:
            }
            setTable(tableCopy)
        }
    }

    const onResultClick = (row) => {
        if (!row.finalScore) {
            let dicesCopy = dices.slice();
            for (let i = 0; i < dicesCopy.length; i++) {
                if (dicesCopy[i].freezed === true) {
                    dicesCopy[i].freezed = false;
                }
            }
            setDices(dicesCopy);

            let tableCopy = table.slice();
            for (let i = 0; i < tableCopy.length; i++) {
                if (row.name === tableCopy[i].name) {
                    tableCopy[i].finalScore = true;
                }
            }
            roll(3);
            setTable(tableCopy)

        }
    }
    return (
        <div className="gameWrapper">
            <Table table={table} onResultClick={onResultClick} />
            <div className='diceAndButtom'>
                <div className="allDices">
                    {dices.map((dice, id) => {
                        return <Die diceInfo={dice} id={id} key={id} freez={freez} />
                    })}
                </div>
                <button className={rolling ? "button-rolling" : "button"}
                    disabled={rolling}
                    onClick={() => roll(rolls)}>
                    {rolling ? "Rolling" : rolls + " roll left"}
                </button>
            </div>

        </div >
    );
};

export default Board;