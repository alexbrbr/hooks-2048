import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
})
function getScores() {
    return client.query({
        query: gql`
            {
                scores {
                    userName
                    score
                }
            }
        `,
    })
}
function getScore(userName: string) {
    return client.query({
        query: gql`
            {
                score(userName: ${userName}) {
                    score
                }
            }
        `,
    })
}
function updateScore(userName: string, newScore: number) {
    return client.query({
        query: gql`
            mutation updateScore {
                updateScore(userName: ${userName}, newScore: ${newScore}) {
                    userName
                    score
                }
            }
        `,
    })
}
function addScore(userName: string, score: number) {
    return client.query({
        query: gql`
            mutation addScore {
                addScore(userName: ${userName}, score: ${score}) {
                    userName
                    score
                }
            }
        `,
    })
}

export default {
    addScore,
    updateScore,
    getScore,
    getScores,
}
