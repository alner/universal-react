import path from 'path'
import express from 'express'
import handlebars from 'express-handlebars'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './generated/app'

let app = express()

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  app.locals.assetPath = 'http://localhost:8080/';
  app.locals.isDevelopment = true;
}

// view templates
app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  layoutsDir: path.resolve(__dirname, 'views/layouts')
}))
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, 'views'))

// static assets
app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/', (req, res) => {
  res.render('app', {
    app: ReactDOMServer.renderToString(<App />)
  })
  // ReactDOMServer.renderToString(<App />))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
// export default app;
