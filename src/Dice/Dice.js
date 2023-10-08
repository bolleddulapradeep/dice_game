import React from 'react';
import { DiceContext } from '../DiceContext/DiceContext';

export const Dice = (props) => {
    const { state } = React.useContext(DiceContext);
    const { winner } = state;
    const { item, handleClick, disable, index } = props;
    const { name, bet, value, isSelected } = item;

    const handleDiceClick = () => {
        if (!disable) {
            handleClick()
        }
    }

    const clssess = [isSelected ? 'selected' : null, disable ? 'disableDice' : null, winner === index ? 'winner' : null].filter(Boolean).join(' ')

    return (
        <div className={`diceStyle ${clssess}`} key={item} onClick={handleDiceClick}>
            <span><strong>{name}</strong></span>
            <span><strong>{bet} ${value}</strong></span>
        </div >
    )
}