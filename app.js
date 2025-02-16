import express from 'express'
import cors from 'cors'
import startFetchGetSummary from './function/graphql.js'

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credentials: true 
}))
app.get('/', (req,res)=>{
    res.send('<h1>Hello...</h1>')
})
app.get('/getsummary', async (req, res) => {
    try {
        console.log(req.query)
        const youtubeUrl = req.query.youtubeUrl
        console.log(youtubeUrl)
        const response = await startFetchGetSummary(youtubeUrl)
        res.status(200).json(response)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch data' })
    }
})

app.listen(port, () => {
    console.log(`Server is running...`)
})
