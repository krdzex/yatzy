import React, { useCallback, useEffect, useState } from 'react';
import Die from './Die';
import Table from './Table';

const Board = () => {
    const [sides] = useState(["1", "2", "3", "4", "5", "6"]);
    const [dices, setDices] = useState([])
    const [rolling, setRolling] = useState(false);
    const [rolls, setRolls] = useState(2)
    const [revealed, setRevealed] = useState(13);
    const [finalScore, setFinalScore] = useState(0)

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
        chackAllCases(dices)
        setDices(dices);
        setRolling(true)
        setTimeout(() => {
            setRolling(false)
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const [table, setTable] = useState([{ name: "Ones", value: 0, finalScore: false, rule: "Sum of all Ones" }, { name: "Twos", value: 0, finalScore: false, rule: "Sum of all Twos" },
    { name: "Threes", value: 0, finalScore: false, rule: "Sum of all Threes" }, { name: "Fours", value: 0, finalScore: false, rule: "Sum of all Fours" },
    { name: "Fives", value: 0, finalScore: false, rule: "Sum of all Fives" }, { name: "Sixes", value: 0, finalScore: false, rule: "Sum of all Sixes" },
    { name: "3 of Kind", value: 0, finalScore: false, rule: "Sum of all dice if 3 are the same" }, { name: "4 of Kind", value: 0, finalScore: false, rule: "Sum of all dice if 4 are the same" },
    { name: "Full House", value: 0, finalScore: false, rule: "25 points for 3 dice of one value and 2 dice of another value" }, { name: "Small Straight", value: 0, finalScore: false, rule: "Score 30 if 4+ values in row" },
    { name: "Large Straight", value: 0, finalScore: false, rule: "Score 40 if 5 values in a row" }, { name: "Yatzy", value: 0, finalScore: false, rule: "Score 50 if all values match" }, { name: "Chance", value: 0, finalScore: false, rule: "Score sum of all dice" }
    ]);

    const freez = (id) => {
        if (rolling === false) {
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

    const chackAllCases = (dices2) => {
        console.log(dices2)
        const array = [];
        const tableCopy = table.slice();
        for (let i = 0; i < dices2.length; i++) {
            array.push(parseInt(dices2[i].value));
        }
        console.log(array)
        console.log(tableCopy)
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
        if (!row.finalScore && !rolling) {
            // let integer = revealed - 1;

            setRevealed(revealed - 1)
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
                    setFinalScore(finalScore + tableCopy[i].value)
                }
            }
            roll(3);
            setTable(tableCopy)
            /* if (integer === 0) {
            let sum = 0;
            for (let i = 0; i < tableCopy.length; i++) {
                sum += tableCopy[i].value;
            }
            setFinalScore(sum)
              }*/
            // setRevealed(integer)
        }
    }
    return (
        <div className="gameWrapper">

            <div className='diceAndButtom'>
                <div className="title">Yatzy</div>
                <div className="allDices">
                    {dices.map((dice, id) => {
                        return <Die diceInfo={dice} id={id} key={id} freez={freez} rolling={rolling} />
                    })}
                </div>
                <button className={rolling ? "button-rolling" : rolls > 0 ? "button" : "button unactive"}
                    disabled={rolling}
                    onClick={() => roll(rolls)}>
                    {rolling ? "Rolling" : rolls + " roll left"}
                </button>
            </div>
            <Table table={table} onResultClick={onResultClick} finalScore={finalScore} />
        </div >
    );
};

export default Board;