import React, { useEffect } from 'react'

interface gridProps {
    grid: number[][]
}

function Grid(props: gridProps) {
    const { grid } = props

    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler)
        return () => {
            document.removeEventListener('keydown', keyDownHandler)
        }
    })

    const keyDownHandler = (e: KeyboardEvent) => {
        const supportedKeys = [
            'ArrowDown',
            'ArrowUp',
            'ArrowLeft',
            'ArrowRight',
        ]
        const isSupported = supportedKeys.some(
            supportedKey => supportedKey === e.code
        )
        if (isSupported) {
            console.log(e.code)
            e.preventDefault()
        }
    }

    return (
        <div>
            {grid.map((line, index) => (
                <div key={'line' + index}>
                    {line.map((cell, cellIndex) => (
                        <span key={'line' + index + 'cell' + cellIndex}>
                            {cell}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Grid
