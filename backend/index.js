const express = require("express")
const app = express() 
const cors = require('cors')
var morgan = require('morgan')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

// get all resources
app.get('/api/notes',(request,response) =>
    response.json(notes))

// get 1 resource by id 
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if(note){
    response.json(note)
  } else {
    response.status(404).end()
  }
})

// delete 1 resource by id 
app.delete('/api/notes/:id', (request,response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

// add 1 resource 

// 
const generateID = () => {
    const maxId = notes.length >0 
    ? Math.max(...notes.map(n => n.id))
    : 0
    return maxId + 1
}

app.post('/api/notes',(request,response) => {

    const body = request.body

    if(!body.content) {
        return response.status(400).json({
            error:'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateID()
    }
    notes = notes.concat(note)

    response.json(note)
})


const PORT = process.env.PORT || 3001 
app.listen(PORT,()=> {
    console.log(`Server runnin on port ${PORT}`)
})
