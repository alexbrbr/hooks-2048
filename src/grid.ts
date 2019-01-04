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
