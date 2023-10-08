import React from 'react'
import { DiceContext } from './DiceContext/DiceContext'
import { useTimeout } from './hooks/useTimeout.hook';
import { Dice } from './Dice/Dice';
import { Action_Types } from './DiceContext/DiceReducer/diceReducer';

export const App = () => {
    const { state, dispatch } = React.useContext(DiceContext);
    const { amount, diceValues, disabled, messgae, winner } = state;
    const [play, setPlay] = React.useState(false);

    const handleClick = (item, index) => {
        const { value } = item;
        const element = { ...item, isSelected: item.isSelected && value === 0 ? false : true, value: amount > 0 ? value + 1 : value }
        const replaceElement = [...diceValues]
        replaceElement.splice(index, 1, element)
        dispatch({ type: Action_Types.CHANGE_AMOUNT, payload: element.value > 0 && amount > 0 ? -1 : 0 });
        dispatch({
            type: Action_Types.CHANGE_DICE_VALUES, payload: replaceElement
        })
    }

    const isOneItemSelected = React.useMemo(() => diceValues.some((el) => el.isSelected), [diceValues]);

    const isValueIncluded = React.useMemo(() => diceValues.map((el, index) => el.isSelected ? index : -1), [diceValues])

    const handleDisable = () => {
        dispatch({ type: Action_Types.SET_DISABLED, payload: !disabled })
        dispatch({ type: Action_Types.SET_MESSAGE, payload: 'Please Wait system is calculating' })
    }

    const handlePlay = () => setPlay(true)

    const checkForWinner = () => {
        const fill = Array(diceValues.length).fill(0).map((_, index) => index)
        const randomNumber = Math.floor(Math.random() * fill.length)
        const winner = randomNumber > fill.length ? Math.floor(randomNumber / 2) : randomNumber;
        const getItem = diceValues.find((_, index) => winner === index);
        const filteredValues = isValueIncluded.filter((item) => item >= 0);
        const winnerIncluded = filteredValues.includes(winner);
        const isWon = winnerIncluded ? 'won' : 'lost'
        const betAmount = diceValues.reduce((acc, curr) => acc + curr.value, 0)
        const amountRewarded = winnerIncluded ? (2 * getItem.value) : betAmount
        const messgae = `Dice returned the number ${winner + 1}, you ${isWon} the game and ${isWon} $ ${amountRewarded}`;
        dispatch({ type: Action_Types.SET_WINNER, payload: winner });
        dispatch({ type: Action_Types.CHANGE_AMOUNT, payload: winnerIncluded ? (2 * getItem.value) : 0 })
        dispatch({ type: Action_Types.SET_MESSAGE, payload: messgae })
    }

    const handleReset = () => {
        dispatch({
            type: Action_Types.CHANGE_DICE_VALUES, payload: diceValues.map((el) => ({ ...el, isSelected: false, value: 0 }))
        })
        dispatch({ type: Action_Types.SET_WINNER, payload: -1 })
        dispatch({ type: Action_Types.SET_MESSAGE, payload: '' })
        dispatch({ type: Action_Types.SET_DISABLED, payload: false })
        setPlay(false);
    }

    useTimeout(() => {
        handleDisable()
    }, play ? 10000 : 0);

    useTimeout(() => {
        checkForWinner()
    }, disabled ? 4000 : 0);

    useTimeout(() => {
        handleReset()
    }, winner > -1 ? 5000 : 0);

    return (
        <section>
            <span>Wallet Balance <strong>${amount}</strong></span>
            <div className='dice'>
                {diceValues.map((el, index) => <Dice key={index} index={index} item={el} disable={disabled || play} handleClick={() => handleClick(el, index)} />)}
            </div>
            <button className='playButton' onClick={handlePlay} disabled={!isOneItemSelected || play}>Play</button>
            <div className='colorCode'>
                <div className='boxColor'>
                    <div className='showInfo'>
                        <span className='selected'></span>
                        <span>You selected</span>
                    </div>
                </div>
                <div className='boxColor'>
                    <div className='showInfo'>
                        <span className='winner'></span>
                        <span>Dice returned value or winner</span>
                    </div>
                </div>
            </div>
            <span className='message'>{messgae}</span>
        </section>
    )
}