import React from 'react';

const Die = (props) => {


    return <div className={props.rolling && !props.diceInfo.freezed ? "diceRolling " + props.diceInfo.value : props.diceInfo.freezed || props.showPlayAgain ? "dice-active " + props.diceInfo.value : "dice " + props.diceInfo.value} onClick={() => props.freez(props.diceInfo.dice)}>
        <p style={props.diceInfo.freezed ? {} : props.rolling || props.showPlayAgain ? { visibility: 'hidden' } : {}}>{props.diceInfo.value}</p>
    </div >
};

export default Die;