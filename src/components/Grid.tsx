import React, { useEffect } from 'react'

type direction = 'RIGHT' | 'LEFT' | 'UP' | 'DOWN'

interface gridProps {
    grid: number[][]
    onKeyPress(d: direction): void
}

function Grid(props: gridProps) {
    const { grid, onKeyPress } = props

    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler)
        return () => {
            document.removeEventListener(
                'keydown',
                keyDownHandler
            )
        }
    })

    const keyDownHandler = (e: KeyboardEvent) => {
        const supportedKeys = [
            'ArrowDown',
            'ArrowUp',
            'ArrowLeft',
            'ArrowRight',
        ]
        const directionByKey: {
            [eventCode: string]: direction
        } = {
            ArrowDown: 'DOWN',
            ArrowUp: 'UP',
            ArrowLeft: 'LEFT',
            ArrowRight: 'RIGHT',
        }
        const isSupported = supportedKeys.some(
            supportedKey => supportedKey === e.code
        )
        if (isSupported) {
            // console.log(e.code)
            onKeyPress(directionByKey[e.code])
            e.preventDefault()
        }
    }

    return (
        <div>
            {grid.map((line, index) => (
                <div key={'line' + index}>
                    {line.map((cell, cellIndex) => (
                        <span
                            key={
                                'line' +
                                index +
                                'cell' +
                                cellIndex
                            }
                        >
                            {cell}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Grid
