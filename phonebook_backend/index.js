const { response } = require("express")
const express = require("express")
var morgan = require("morgan")
const app = express() 
app.use(express.json())

app.use(morgan('tiny'))

const cors = require('cors')
app.use(cors())


let contacts = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// get all contacts 

app.get('/api/persons',(request,response) => {
    response.json(contacts)
})

app.get('/info', (requst,response) => {
    const contactsCount = contacts.length 
    const date = Date()
    response.send( `Phonebook has info for ${contactsCount} people \n
    ${date}
    `)
    
})

app.get('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id)
    const entry = contacts.find(n => n.id === id)

    if(entry) {
        response.json(entry)
    } else {
        response.status(404).end()
    }
})
//

app.delete('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id)
    entrys = contacts.filter(n => n.id !== id)

    response.json(entrys)
    
        response.status(204).end()
    
})

const generateID = () => {
    const id = Math.floor(Math.random() * 100)
    return id 
}

app.post('/api/persons', (request,response) => {
    const body = request.body

    const newContact = {
        name: body.name,
        number: body.number,
        id:generateID()
    }

    if(!body.name || !body.number){
        return response.status(400).json({
            "error": "Either name or number is missing"
        })

    }  else if (contacts.filter(n => n.name === body.name)) {
        return response.status(400).json({
            "error": "name must be unique"
        })
    }
    
    else {
        contacts.concat(newContact)
        response.json(newContact)

    }
    
})

const PORT = 3001 
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})