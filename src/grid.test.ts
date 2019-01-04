import {
    getRandomTile,
    getTileCoordinatesFromFlatIndex,
    insertInGrid,
} from './grid'

describe('getRandomTile', () => {
    test('return first tile if its the only free', () => {
        const firstFree = [
            [0, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
        ]
        expect(getRandomTile(firstFree).tileIndex).toEqual(0)
    })
    test('return second tile if its the only free', () => {
        const secondFree = [
            [2, 0, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
        ]
        expect(getRandomTile(secondFree).tileIndex).toEqual(1)
    })
})
describe('insertInGrid', () => {
    test('insert first tile if its the only free', () => {
        const firstFree = [
            [0, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
        ]
        expect(insertInGrid(firstFree, 4)).toEqual([
            [4, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
        ])
    })
})

describe('getTileCoordinatesFromFlatIndex', () => {
    test('return [0,0] for index 0', () => {
        expect(getTileCoordinatesFromFlatIndex(0)).toEqual({
            x: 0,
            y: 0,
        })
    })
    test('return [0,2] for index 2', () => {
        expect(getTileCoordinatesFromFlatIndex(2)).toEqual({
            x: 2,
            y: 0,
        })
    })
    test('return [1,0] for index 4', () => {
        expect(getTileCoordinatesFromFlatIndex(4)).toEqual({
            x: 0,
            y: 1,
        })
    })
    test('return [3,3] for index 15', () => {
        expect(getTileCoordinatesFromFlatIndex(15)).toEqual({
            x: 3,
            y: 3,
        })
    })
})
