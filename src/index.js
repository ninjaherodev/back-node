import express from 'express'

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3010

app.use((req, res , next) => {
    if(req.method !== 'POST') return next()
    if(req.headers['content-type'] !== 'application/json') return next()
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const data = JSON.parse(body)
        data.timestamp = Date.now()
        req.body = data
        next()
    })
    
})

app.get('/', (req,res) => {
  res.status(200).json({id:1, name:'fabio rojas'})
})

app.post('/', (req,res) => {
    res.status(200).json(req.body)
  })

app.use((req, res)=> {
    res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, ()=>{
    console.log(`Server listen on http://localhost:${PORT}`)
})