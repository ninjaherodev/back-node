import { app } from './app.js'
import { routerApi } from './routers/index.js'
import { logError, errorHandler } from './middlewares/error.handler.js'
const PORT = app.get('port')

routerApi(app)
// app.use(logError)
app.use(errorHandler)

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`)
})
