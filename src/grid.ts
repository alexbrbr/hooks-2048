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

export const moveRowRight = (row: number[]): number[] => {
    return row.reduce((rightRow, number, index) => {
        if (rightRow[index + 1] === 0) {
            rightRow[index + 1] = rightRow[index]
            rightRow[index] = 0
        } else if (rightRow[index + 1] === rightRow[index]) {
            rightRow[index + 1] = rightRow[index] * 2
            rightRow[index] = 0
        }
        return rightRow
    }, row)
}

export const moveRowLeft = (row: number[]): number[] => {
    return moveRowRight(row.reverse()).reverse()
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
type direction = 'RIGHT' | 'LEFT' | 'UP' | 'DOWN'

export const moveGrid = (
    grid: number[][],
    direction: direction
): number[][] => {
    const needsRotation =
        direction === 'UP' || direction === 'DOWN'

    if (needsRotation) {
        grid = rotateMatrix(grid)
    }
    const mappingFunctionByDirection = {
        RIGHT: moveRowRight,
        LEFT: moveRowLeft,
        UP: moveRowRight,
        DOWN: moveRowLeft,
    }
    return needsRotation
        ? rotateMatrix(
              rotateMatrix(
                  rotateMatrix(
                      grid.map(
                          mappingFunctionByDirection[direction]
                      )
                  )
              )
          )
        : grid.map(mappingFunctionByDirection[direction])
}
