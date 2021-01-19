const Relatorio = require('../model/relatorio')
const axios = require('axios')
const js2xmlparser = require('js2xmlparser')
const FormData = require('form-data')
const config = require('../config.js')

const uriPipeDrive = config.get('pipeDrive.urlBase')
const apiKeyPipe = config.get('pipeDrive.apikey')

const uriBling = config.get('bling.urlBase')
const apiKeyBling = config.get('bling.apikey')

const getFormData = (pedidoXml) => {
  const form = new FormData()

  form.append('apikey', apiKeyBling)

  form.append('xml', pedidoXml)

  return form
}

const getRelatorio = async () => {
  try {
    const dados = await Relatorio.find({})
    return dados
  } catch (err) {
    return `[Erro]:${err}`
  }
}

const postRelatorio = async (objRelatorio) => {
  try {
    const res = await Relatorio.create({
      oportunidadesDia: objRelatorio.oportunidadesDia,
      valorTotal: objRelatorio.valorTotal,
    })

    return res
  } catch (err) {
    return `[Erro]:${err}`
  }
}

const getGanhos = async () => {
  try {
    let dados = await axios.get(
      `${uriPipeDrive}/deals?status=won&api_token=${apiKeyPipe}`
    )
    dados = dados.data
    console.log(dados)

    return dados
  } catch (err) {
    return `[Erro]:${err}`
  }
}

const realizarIntegracao = async () => {
  try {
    let dados = await axios.get(
      `${uriPipeDrive}/deals?status=won&api_token=a4af879fb01b0facabef75cc328c248aaa45b14c`
    )
    dados = dados.data.data

    for (let i = 0; i <= dados.length - 1; i++) {
      const novosDados = {
        cliente: { nome: dados[i].person_name },
        volume: { servico: 'Sedex' },
        item: { codigo: 'aa1', descricao: 'abc', qtde: 1, vlr_unit: 10 },
        parcela: { vlr: 10 },
      }
      const pedido = js2xmlparser.parse('pedido', novosDados)

      console.log(pedido)

      const objFormData = getFormData(pedido)

      const res = await axios.post(`${uriBling}/pedido/json/`, objFormData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${objFormData._boundary}`,
        },
      })

      return res.data.retorno
    }
  } catch (err) {
    console.log(err)
    return `[Erro]:${err}`
  }
}

module.exports = { getRelatorio, postRelatorio, getGanhos, realizarIntegracao }
