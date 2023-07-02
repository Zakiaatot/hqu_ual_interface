import express from 'express'
import config from './config.js'
import { login } from './src/interface.js'
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Please use post!')
})

app.post('/', async (req, res) => {
    const { stunum, password } = req.body
    if (!stunum || !password) {
        res.status(400).json({
            code: 0,
            msg: '缺少必要的请求参数'
        })
    } else {
        let result = await login(stunum, password)
        res.status(200).json(result)
    }
})

app.listen(config.port, () => {
    console.log(`http://127.0.0.1:${config.port}`)
})