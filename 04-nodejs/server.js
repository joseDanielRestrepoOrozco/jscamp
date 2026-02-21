import { createServer } from 'node:http'

process.loadEnvFile()

const PORT = process.env.PORT ?? 3000

const sendJson = (res, statusCode = 200, data) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

const server = createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    return res.end('Hello, World!\n')
  }

  if (req.url === '/users') {
    sendJson(res, 200, [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ])
  }

  return sendJson(res, 404, { message: 'Not Found' })
})

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`)
})
