import express from 'express';
const app = express();
import cors from 'cors'
import morgan from 'morgan';
import './config/dotenvConfig.js'
const db = [
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

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan('dev'))
app.get('/api/persons', (req, res)=>{
    res.json(db)
})
app.get('/api/info', (req, res)=>{
    res.send(`<h2>PhoneBook has info for ${db.length} persons</h2>
        <p>${new Date()}</p>`)
})
app.get('/api/persons/:id', (req, res)=>{
    const id = Number(req.params.id);
    const person = db.find(p=>p.id===id);
    if(person) return res.json(person)
    res.status(404).json({error: "person not found"})
})

const PORT = process.env.PORT||3000
app.listen(PORT, ()=>{
    console.log(`server running successfuly in ${PORT}`)
})

