import React from 'react'

interface scoreProps {
    score: number
    userName: string
}
function Score(props: scoreProps) {
    const { score, userName } = props
    return userName ? (
        <p>
            Score for user {userName} : {score}
        </p>
    ) : (
        <p>Enter your username</p>
    )
}

export default Score
