import React, { useEffect } from 'react'
import { direction } from '../grid'
import './Grid.css'

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
            onKeyPress(directionByKey[e.code])
            e.preventDefault()
        }
    }

    return (
        <div className="grid">
            {grid.map((line, index) => (
                <div className="line" key={'line' + index}>
                    {line.map((cell, cellIndex) => (
                        <div
                            className={`cell cell-${cell}`}
                            key={
                                'line' +
                                index +
                                'cell' +
                                cellIndex
                            }
                        >
                            {cell > 0 && cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Grid
