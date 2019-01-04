import React from 'react'

interface gridProps {
    grid: number[][]
}
function Grid(props: gridProps) {
    const { grid } = props
    return (
        <div>
            {grid.map(line => (
                <div>
                    {line.map(cell => (
                        <span>{cell}</span>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Grid
