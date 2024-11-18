let express = require('express')



let app = express()
app.use(express.json())

require('./conn')

let Todo = require('./todoModel')

app.get('/', (req, res) => {
    console.log('hello from client')
    res.send('Hello from backend')
})

app.post('/add-todo', async (req, res) => {
    let newTodo = Todo({
        title: req.body.title,
        date: req.body.date,
        complete: req.body.complete
    })

    let result = await newTodo.save()

    res.send('new todo Addeds')
})



app.listen(9000, () => {
    console.log('server is running on 9000')
})






