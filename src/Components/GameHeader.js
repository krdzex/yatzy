import React from 'react';
import Die from './Die';

const GameHeader = ({ freez, rolling, roll, rolls, dices, showPlayAgain, playAgain }) => {
    return (
        <div className='diceAndButtom'>
            <div className="title">Yatzy</div>
            <div className="allDices">
                {dices.map((dice, id) => {
                    return <Die diceInfo={dice} id={id} key={id} freez={freez} rolling={rolling} showPlayAgain={showPlayAgain} />
                })}
            </div>
            {showPlayAgain ? <button className="playAgain"
                onClick={() => playAgain()}
            >
                Play Again?
            </button>
                : <button className={rolling ? "button-rolling" : rolls > 0 ? "button" : "button unactive"}
                    disabled={rolling}
                    onClick={() => roll(rolls)}>
                    {rolling ? "Rolling" : rolls + " roll left"}
                </button>}
        </div>
    );
};

export default GameHeader;