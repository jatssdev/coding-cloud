let express = require('express')
let cors = require('cors')
let userRoutes = require('./routes/userRoutes')

let app = express()
app.use(express.json())
app.use(cors())
app.use('/api/user', userRoutes)
require('./config/conn')







app.listen(9000, () => {
    console.log('app is runnig on 9000')
})