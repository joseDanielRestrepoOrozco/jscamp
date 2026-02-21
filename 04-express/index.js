import express from 'express'
import cors from 'cors'
import jobs from './jobs.json' with {type: 'json'}
import DEFAULT from './configs.js'

const PORT = process.env.PORT ?? DEFAULT.PORT

const app = express()

const ACCEPTED_ORIGINS = ['http://localhost:3000', 'http://localhost:5173']

app.use(cors({
    origin: (origin, callback) => {
        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }
        return callback(new Error('origin not allowed'))
    }
}))
app.use(express.json())

app.use((req, res, next) => {
  const timeString = new Date().toLocaleDateString()
  console.log(`[${timeString}] ${req.method} ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' })
})

app.get('/jobs', (req, res) => {
  const {
    text,
    level,
    limit = DEFAULT.LIMIT,
    technology,
    offset = DEFAULT.OFFSET
  } = req.query

  let filteredJobs = jobs

  if (level) {
    const searchTerm = level.toLowerCase()
    filteredJobs = filteredJobs.filter(
      job =>
        job.data.nivel.toLowerCase().includes(searchTerm)
    )
  }

  if (text) {
    const searchTerm = text.toLowerCase()
    filteredJobs = filteredJobs.filter(
      job =>
        job.titulo.toLowerCase().includes(searchTerm) ||
        job.descripcion.toLowerCase().includes(searchTerm)
    )
  }

  if (technology) {
    const searchTerm = text.toLowerCase()
    filteredJobs = filteredJobs.filter(job => {
      job.data.technologies.includes(searchTerm)
    })
  }

  const limitNumber = Number(limit)
  const offsetNumber = Number(offset)

  filteredJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)
  return res.json({ data: filteredJobs, total: filteredJobs.length })
})

app.get('/jobs/:id', (req, res) => {
  const { id } = req.params

  const idNumber = Number(id)

  const job = jobs.find(job => job.id === idNumber)

  if (!job) return res.status(404).send({ message: 'Job not found' })

  return res.send(job)
})

app.post('/jobs', (req, res) => {
  const { titulo, empresa, ubicacion, descripcion, data } = req.body

  const newJob = {
    id: crypto.randomUUID(),
    titulo,
    empresa,
    ubicacion,
    descripcion,
    data
  }

  jobs.push(newJob)
  return res.status(201).send(newJob)
})

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
    uptime: process.uptime()
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
