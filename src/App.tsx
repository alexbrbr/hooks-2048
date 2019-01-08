import React, { useState } from 'react'
import './App.css'
import Score from './components/Score'
import Grid from './components/Grid'
import {
    defaultGrid,
    insertInGrid,
    moveGrid,
    direction,
} from './grid'

function App() {
    const [score, setScore] = useState(0)
    const [grid, setGrid] = useState<number[][]>(defaultGrid)
    const [hasWon, setHasWon] = useState(false)

    const onKeyPress = (direction: direction) => {
        const {
            score: scoreToAdd,
            rows: gridAfterMove,
        } = moveGrid(grid, direction)
        if (
            gridAfterMove.every(line =>
                line.every(number => number !== 0)
            )
        ) {
            alert('you lost :(')
            setGrid(defaultGrid)
            return
        }
        if (
            !hasWon &&
            gridAfterMove.some(line =>
                line.some(number => number === 2048)
            )
        ) {
            alert('you won')
            setHasWon(true)
            if (
                !window.confirm(
                    'Do you want to continue to play ?'
                )
            ) {
                setGrid(defaultGrid)
            }
        }

        setScore(score + scoreToAdd)
        const hasChanged =
            JSON.stringify(gridAfterMove) !==
            JSON.stringify(grid)
        if (hasChanged) {
            setGrid(gridAfterMove)
            setGrid(insertInGrid(gridAfterMove, 2))
        }
    }
    return (
        <div className="game">
            <Grid grid={grid} onKeyPress={onKeyPress} />
            <Score score={score} />
        </div>
    )
}

export default App
