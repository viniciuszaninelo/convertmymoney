const api = require('./api.bcb')

const axios = require('axios')

jest.mock('axios')  // o axios aqui, não é o de verdade, estou passando uma versão 


teste('getCotacaoAPI', () => {
  const res = {
    data: {
      value: [
        { cotacaoVenda: 3.90}
      ]
    }
  }
  axios.get.mockResolvedValue(res)
  api.getCotacaoAPI('url').then( resp => {
    expect(resp).toEqual(res)
    expect(axios.get.mock.calls[0] [0].toBe('url'))
  })
})
test('extractCotacao', () => {
  const cotacao = api.extractCotacao({
    data: {
      value: [
        { cotacaoVenda: 3.90}
      ]
    }
  })
  expect(cotacao).toBe(3.90)
})