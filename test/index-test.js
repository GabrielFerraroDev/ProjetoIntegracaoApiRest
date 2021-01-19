const server = require('../app/api')

const chai = require('chai')
const chaiHttp = require('chai-http')

const Relatorio = require('../app/model/relatorio')
chai.use(chaiHttp)

const expect = chai.expect

const shutdown = (server) => {
  server.close()
}

const objRelatorio = {
  oportunidadesDia: 'teste',
  valorTotal: 'teste',
}
describe(`:: index`, () => {
  after(() =>
    Relatorio.deleteOne({ oportunidadesDia: 'teste' }, function (error) {
      shutdown(server)
    })
  )

  it('[200] [POST] /relatorio', (done) => {
    chai
      .request(server)
      .post(`/relatorio`)
      .send(objRelatorio)
      .end((err, res) => {
        expect(res).to.have.status(200) // status 200
        expect(res.body).to.be.a('object') // corpo da resposta é objeto
        expect(res.body.oportunidadesDia).to.be.an('string') // variavel ok é uma string
        expect(res.body.valorTotal).to.be.equal('teste')
        done()
      })
  })

  it('[200] [GET] /relatorio', (done) => {
    chai
      .request(server)
      .get(`/relatorio`)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        done()
      })
  })

  it('[200] [GET] /ganhos', (done) => {
    chai
      .request(server)
      .get(`/ganhos`)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.a('object')
        done()
      })
  })
})
