const axios = require('axios') 
const url = (`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='07-26-2021'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`)


const getCotacaoAPI = (data) => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getCotacao = async() => {
  const res = await  getCotacaoAPI('')
  const cotacao = extractCotacao(res)
  return cotacao
}

module.exports = {
  getCotacaoAPI,
  getCotacao,
  extractCotacao
}