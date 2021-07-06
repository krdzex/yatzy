import React from 'react';

const Die = (props) => {


    return <div className={props.diceInfo.freezed ? "dice-active" : "dice"} onClick={() => props.freez(props.diceInfo.dice)}>
        <p>{props.diceInfo.value}</p>
    </div >
};

export default Die;