import React, { useEffect } from 'react'
import { insertInGrid } from '../grid'

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
            // console.log(e.code)
            onKeyPress(insertInGrid(grid, 2))
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
