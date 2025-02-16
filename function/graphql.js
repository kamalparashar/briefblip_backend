import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const hasura_secret = process.env.HASURA_SECRET
const hasura_url = process.env.HASURA_URL

async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await axios.post(hasura_url, {
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': hasura_secret,
        },
        timeout: 63000,
    })
    return result.data
}

const operationsDoc = `
query MyQuery($youtubeUrl: String!) {
    getsummary(youtubeUrl: $youtubeUrl) {
        summary
        title
    }
}
`

function fetchGetSummary(youtubeUrl) {
    return fetchGraphQL(
        operationsDoc,
        'MyQuery',
        { 'youtubeUrl': youtubeUrl }
    )
}

async function startFetchGetSummary(youtubeUrl) {
    console.log("in graphql: ",youtubeUrl)
    const { errors, data } = await fetchGetSummary(youtubeUrl)

    if (errors) {
        console.error('Error while calling hasura :: ', errors)
        throw errors
    }

    return data.getsummary
}
export default startFetchGetSummary