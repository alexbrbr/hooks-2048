import React, { useState } from 'react'
import './App.css'
import Score from './components/Score'
import Grid from './components/Grid'
import { defaultGrid } from './grid'
function App() {
    const [score, setScore] = useState(0)
    const [grid, setGrid] = useState<number[][]>(defaultGrid)
    return (
        <div>
            <Score score={score} />
            <Grid grid={grid} onKeyPress={setGrid} />
        </div>
    )
}

export default App
