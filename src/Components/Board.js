import React, { useCallback, useEffect, useState } from 'react';
import Die from './Die';
import Table from './Table';

const Board = () => {
    const [sides] = useState(["1", "2", "3", "4", "5", "6"]);
    const [dices, setDices] = useState([])
    const [rolling, setRolling] = useState(false);
    const [rolls, setRolls] = useState(3)


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

    const roll = () => {
        // if (rolls > 0) {
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
        //   }
    }
    const [table, setTable] = useState([{ name: "Ones", value: 0 }, { name: "Twos", value: 0 },
    { name: "Threes", value: 0 }, { name: "Fours", value: 0 },
    { name: "Fives", value: 0 }, { name: "Sixes", value: 0 },
    { name: "3 of Kind", value: 0 }, { name: "4 of Kind", value: 0 },
    { name: "Full House", value: 0 }, { name: "Small Straight", value: 0 },
    { name: "Large Straight", value: 0 }, { name: "Yatzy", value: 0 },
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

    const chackAllCases = (dices) => {
        const array = [];
        const daCopy = table.slice();
        for (let i = 0; i < dices.length; i++) {
            array.push(parseInt(dices[i].value));
        }

        for (let i = 0; i < daCopy.length; i++) {
            switch (daCopy[i].name) {
                case "Ones":
                    let ones = 0;
                    for (let i = 0; i < array.length; i++) {
                        if (array[i] === 1) {
                            ones += 1;
                        }
                    }

                    daCopy[i].value = ones;
                    break;
                case "Twos":
                    let twos = 0;
                    for (let i = 0; i < array.length; i++) {
                        if (array[i] === 2) {
                            twos += 2;
                        }
                    }
                    daCopy[i].value = twos;
                    break;
                case "Threes":
                    let threes = 0;
                    for (let i = 0; i < array.length; i++) {
                        if (array[i] === 3) {
                            threes += 3;
                        }
                    }
                    daCopy[i].value = threes;
                    break;
                case "Fours":
                    let fours = 0;
                    for (let i = 0; i < array.length; i++) {
                        if (array[i] === 4) {
                            fours += 4;
                        }
                    }
                    daCopy[i].value = fours;
                    break;
                case "Fives":
                    let fives = 0;
                    for (let i = 0; i < array.length; i++) {
                        if (array[i] === 5) {
                            fives += 5;
                        }
                    }
                    daCopy[i].value = fives;
                    break;
                case "Sixes":
                    let sixes = 0;
                    for (let i = 0; i < array.length; i++) {
                        if (array[i] === 6) {
                            sixes += 6;
                        }
                    }
                    daCopy[i].value = sixes;
                    break;
                case "3 of Kind":
                    let threeOfKind = 0;
                    let copyArray = array.slice()
                    copyArray.sort();
                    copyArray.reverse();
                    console.log(copyArray)
                    for (let i = 0; i <= array.length - 3; i++) {
                        if (array[i] === array[i + 1] && array[i] === array[i + 2]) {
                            threeOfKind = array[i] * 3;
                            copyArray.splice(i, i + 3);
                            console.log(copyArray)
                            console.log(copyArray[3])
                            //  threeOfKind += copyArray[0] + copyArray[1];
                        }
                    }

                    daCopy[i].value = threeOfKind;
                    break;
                case "4 of Kind":
                    let arrayCopy = array.slice()
                    let fourOfKind = 0;
                    arrayCopy.sort();
                    arrayCopy.reverse();
                    for (let i = 0; i <= arrayCopy.length - 4; i++) {
                        if (array[i] === arrayCopy[i + 1] && arrayCopy[i] === arrayCopy[i + 2] && arrayCopy[i] === arrayCopy[i + 3]) {
                            fourOfKind = arrayCopy[i] * 4;
                            arrayCopy.splice(i, i + 4);
                            fourOfKind += arrayCopy[0];
                        }
                    }
                    daCopy[i].value = fourOfKind;
                    break;
                default:

            }
            setTable(daCopy)
        }
    }

    console.log()
    return (
        <div>
            <div className='diceAndButtom'>
                <div className="allDices">
                    {dices.map((dice, id) => {
                        return <Die diceInfo={dice} id={id} key={id} freez={freez} />
                    })}
                </div>
                <button className={rolling ? "button-rolling" : "button"}
                    disabled={rolling}
                    onClick={roll}>
                    {rolling ? "Rolling" : rolls + " roll left"}
                </button>
            </div>
            <Table table={table} />
        </div>
    );
};

export default Board;