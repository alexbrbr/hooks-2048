import React, { useEffect } from 'react'
import { insertInGrid, moveGrid } from '../grid'

interface gridProps {
    grid: number[][]
    onKeyPress: any
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

    type direction = 'RIGHT' | 'LEFT' | 'UP' | 'DOWN'

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
            onKeyPress(insertInGrid(grid, 2))
            onKeyPress(moveGrid(grid, directionByKey[e.code]))
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
