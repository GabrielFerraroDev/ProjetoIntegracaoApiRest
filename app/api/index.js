const express = require('express')
const bodyParser = require('body-parser')
const service = require('../service/relatorio-service')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/relatorio', async (req, res) => {
  const response = await service.getRelatorio()
  res.send(response)
})

app.post('/relatorio', async (req, res) => {
  const response = await service.postRelatorio()
  res.send(response)
})

app.get('/ganhos', async (req, res) => {
  const response = await service.getGanhos()
  res.send(response)
})

app.get('/integracao', async (req, res) => {
  const response = await service.realizarIntegracao()
  res.send(response)
})

app.listen(3000)
