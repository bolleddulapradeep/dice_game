import React from 'react'

export const useInterval = (cb = () => { }, ms = 0) => {
    const functionToCall = React.useRef();

    React.useEffect(() => {
        functionToCall.current = cb
    }, [cb])

    React.useEffect(() => {
        let value;

        const task = () => {
            functionToCall.current()
        }

        if (ms) {
            value = setInterval(task, ms)
        } else {
            clearInterval(value)
        }

        return () => {
            if (value) {
                clearInterval(value)
            }
        }
    }, [ms])
}