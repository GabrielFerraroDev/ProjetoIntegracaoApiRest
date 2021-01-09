const mongoose = require('../database')

const relatorioSchema = new mongoose.Schema({
  oportunidadesDia: {
    type: String,
  },
  valorTotal: {
    type: String,
  },
})

const Relatorio = mongoose.model('Relatorio', relatorioSchema)

module.exports = Relatorio
