import React from 'react'
import { DiceContext } from './DiceContext'
import { initialState, reducer } from './DiceReducer/diceReducer'

export const DiceProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return <DiceContext.Provider value={{ state, dispatch }}>{children}</DiceContext.Provider>
}