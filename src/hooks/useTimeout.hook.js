import React from 'react'

export const useTimeout = (cb = () => { }, ms = 0) => {
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
            value = setTimeout(task, ms)
        } else {
            clearTimeout(value)
        }

        return () => {
            if (value) {
                clearTimeout(value)
            }
        }
    }, [ms])
}