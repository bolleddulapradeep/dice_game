export const initialState = {
    amount: 100,
    diceValues: [{ name: 'Dice 1', bet: 'Bet $1', value: 1, isSelected: false },
    { name: 'Dice 2', bet: 'Bet $1', value: 1, isSelected: false },
    { name: 'Dice 3', bet: 'Bet $1', value: 1, isSelected: false },
    { name: 'Dice 4', bet: 'Bet $1', value: 1, isSelected: false },
    { name: 'Dice 5', bet: 'Bet $1', value: 1, isSelected: false },
    { name: 'Dice 6', bet: 'Bet $1', value: 1, isSelected: false }],
    disabled: false,
    winner: -1,
    messgae: '',
    betAmount: 1,
}

export const Action_Types = {
    CHANGE_AMOUNT: 'CHANGE_AMOUNT',
    CHANGE_DICE_VALUES: 'CHANGE_DICE_VALUES',
    SET_DISABLED: 'SET_DISABLED',
    SET_MESSAGE: 'SET_MESSAGE',
    SET_WINNER: 'SET_WINNER',
    CLEAR: 'CLEAR'
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Action_Types.CHANGE_AMOUNT:
            return {
                ...state,
                amount: state.amount + action.payload
            };

        case Action_Types.CHANGE_DICE_VALUES:
            return {
                ...state,
                diceValues: [...action.payload]
            }
        case Action_Types.SET_DISABLED: return { ...state, disabled: action.payload }
        case Action_Types.SET_MESSAGE: return { ...state, messgae: action.payload }
        case Action_Types.SET_WINNER: return { ...state, winner: action.payload }
        case Action_Types.CLEAR: return { ...initialState }
        default: return { ...initialState }
    }
} 