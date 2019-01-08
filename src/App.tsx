import React, { useState, useEffect } from 'react'
import './App.css'
import Score from './components/Score'
import Grid from './components/Grid'
import HighScore from './components/HighScore'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
const client = new ApolloClient({
    uri: 'http://localhost:4000/',
})

import {
    defaultGrid,
    insertInGrid,
    moveGrid,
    direction,
} from './grid'

import graphQL from './graphQL'
import { string } from 'prop-types'

interface score {
    userName: string
    score: number
}
interface scoreRes {
    data: {
        scores: [
            {
                userName: string
                score: number
            }
        ]
    }
}
function App() {
    const [score, setScore] = useState(0)
    const [grid, setGrid] = useState<number[][]>(defaultGrid)
    const [hasWon, setHasWon] = useState(false)
    const [userName, setUserName] = useState('')
    const [highScores, setHighScores] = useState([])

    useEffect(() => {
        graphQL.getScores().then((res: any) => {
            if (!res) {
            }
            setHighScores(res.data)
            console.log(res)
        })
    }, [])

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        setUserName(e.target.value)
    }
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
        <ApolloProvider client={client}>
            <div className="game">
                <Grid grid={grid} onKeyPress={onKeyPress} />
                <div className="score-board">
                    <input
                        type="text"
                        value={userName}
                        onChange={handleChange}
                    />
                    <Score score={score} userName={userName} />
                    <HighScore />
                </div>
            </div>
        </ApolloProvider>
    )
}

export default App
