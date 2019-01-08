import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

interface score {
    userName: string
    score: number
}

const HighScore = () => (
    <Query
        query={gql`
            {
                scores {
                    userName
                    score
                }
            }
        `}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>

            return data.scores.map(
                ({ userName, score }: score) => (
                    <div key={userName}>
                        <p>
                            {userName}: {score}
                        </p>
                    </div>
                )
            )
        }}
    </Query>
)

export default HighScore
