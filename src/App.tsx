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
