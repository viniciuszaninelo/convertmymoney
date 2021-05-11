const convert = (cotacao, quantidade) => {
  return cotacao * quantidade // valor da cotacao * valor da quantidade 
}

const toMoney = valor => {
  return valor.toFixed(2)  // quantos digitos eu quro depois da virgula. No caso aqui são 2
}


// agr vamos exportar meu 'covert'
module.exports = {
  convert,
  toMoney
}