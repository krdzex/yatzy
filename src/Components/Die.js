import React from 'react';

const Die = (props) => {


    return <div className={props.rolling && !props.diceInfo.freezed ? "diceRolling " + props.diceInfo.value : props.diceInfo.freezed ? "dice-active " + props.diceInfo.value : "dice " + props.diceInfo.value} onClick={() => props.freez(props.diceInfo.dice)}>
        <p style={props.rolling ? { visibility: 'hidden' } : {}}>{props.diceInfo.value}</p>
    </div >
};

export default Die;