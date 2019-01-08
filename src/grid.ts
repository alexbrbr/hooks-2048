import { createSecureContext } from 'tls'

export const defaultGrid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
]

const gridSize = 4

export const getTileCoordinatesFromFlatIndex = (
    index: number
) => {
    const gridLine = Math.floor(index / gridSize)
    const gridCell = index % gridSize

    return {
        x: gridCell,
        y: gridLine,
    }
}
const findZeroValues = (grid: number[][]): Array<zeroValues> => {
    const flat = ([] as number[]).concat(...grid)
    return flat
        .map((number, index) => {
            return { number, index }
        })
        .filter(({ number }) => number === 0)
}
interface zeroValues {
    number: number
    index: number
}

const findRandomZero = (
    zeroValues: Array<zeroValues>
): number => {
    return zeroValues[
        Math.floor(Math.random() * zeroValues.length)
    ].index
}
export const getRandomTile = (grid: number[][]) => {
    const zeroValues = findZeroValues(grid)
    const randomZero = findRandomZero(zeroValues)
    let { x, y } = getTileCoordinatesFromFlatIndex(randomZero)

    return {
        tileIndex: randomZero,
        x,
        y,
    }
}

export const insertInGrid = (
    grid: number[][],
    value: number
): number[][] => {
    const { x, y } = getRandomTile(grid)
    grid[y][x] = value
    return grid
}

interface rowAndScore {
    row: number[]
    score: number
}

function moveZerosLeft(row: number[]): number[] {
    return row.reduceRight((result: number[], _, index) => {
        if (result[index + 1] > 0 && result[index] === 0) {
            result[index] = result[index + 1]
            result[index + 1] = 0
        }
        return result
    }, row)
}
export const moveRowLeft = (row: number[]): rowAndScore => {
    row = moveZerosLeft(row)
    row = moveZerosLeft(row)
    row = moveZerosLeft(row)

    const added = row.reduce(
        (rightRow, _, index) => {
            if (
                rightRow.row[index + 1] ===
                    rightRow.row[index] &&
                rightRow.lastMergeIndex !== index
            ) {
                rightRow.score += rightRow.row[index]
                rightRow.lastMergeIndex = index
                rightRow.row[index] = rightRow.row[index + 1] * 2
                rightRow.row[index + 1] = 0
            } else if (
                rightRow.row[index + 2] &&
                rightRow.row[index + 1] ===
                    rightRow.row[index + 2] &&
                rightRow.lastMergeIndex !== index
            ) {
                rightRow.score += rightRow.row[index]
                rightRow.row[index + 1] =
                    rightRow.row[index + 2] * 2
                rightRow.row[index + 2] = 0
            } else if (
                rightRow.row[index + 1] > 0 &&
                rightRow.row[index] === 0
            ) {
                rightRow.row[index] = rightRow.row[index + 1]
                rightRow.row[index + 1] = 0
            }
            return rightRow
        },
        {
            row,
            score: 0,
            lastMergeIndex: -Infinity,
        }
    )

    added.row = moveZerosLeft(added.row)

    return added
}

export const moveRowRight = (row: number[]): rowAndScore => {
    const result = moveRowLeft(row.reverse())
    return {
        row: result.row.reverse(),
        score: result.score,
    }
}

export const rotateMatrix = (grid: number[][]): number[][] => {
    const rotatedGrid: number[][] = []
    rotatedGrid.length = grid.length

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid.length; y++) {
            var newX = grid.length - y - 1
            var newY = x

            if (!rotatedGrid[x]) {
                rotatedGrid[x] = []
            }
            rotatedGrid[x][y] = grid[newX][newY]
        }
    }
    return rotatedGrid
}

export type direction = 'RIGHT' | 'LEFT' | 'UP' | 'DOWN'

interface rowsAndScore {
    rows: number[][]
    score: number
}
export const moveGrid = (
    grid: number[][],
    direction: direction
): rowsAndScore => {
    let newGrid = JSON.parse(JSON.stringify(grid))
    const needsRotation =
        direction === 'UP' || direction === 'DOWN'

    if (needsRotation) {
        newGrid = rotateMatrix(newGrid)
    }
    const mappingFunctionByDirection = {
        RIGHT: moveRowRight,
        LEFT: moveRowLeft,
        UP: moveRowRight,
        DOWN: moveRowLeft,
    }
    const rowsAndScore: rowAndScore[] = newGrid.map(
        mappingFunctionByDirection[direction]
    )
    const result = rowsAndScore.reduce(
        (result: rowsAndScore, current: rowAndScore) => {
            result.score += current.score
            result.rows.push(current.row)
            return result
        },
        {
            score: 0,
            rows: [],
        }
    )

    if (needsRotation) {
        result.rows = rotateMatrix(
            rotateMatrix(rotateMatrix(result.rows))
        )
    }

    return result
}
