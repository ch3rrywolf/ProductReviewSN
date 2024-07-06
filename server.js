const express = require('express')
const cors = require('cors')

const app = express()

//Core
var corOptions = {
    origin: 'https://127.0.0.1:8081'
}

// middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// routers
const router = require('./routes/productRouter.js')
app.use('/api/products', router)


// testing api
app.get('/', (req, res) => {
    res.json({ message: 'hi from api'})
})

//Port
const PORT = process.env.PORT || 8080

//server
app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})