const express = require('express')
const app = express()
const path = require('path')
const convert = require('./lib/convert')
const apiBCB = require('./lib/api.bcb')

// PARA JA APPARECER A TELA DO FORMULARIO NA TELA, PRECISAMOS UAR O EJS, E PARA USAR O EJS, PRECISO SETAR MEU VIEW ENGINE
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // 'path.join' vai criar um diretorio para mim, ai ele vai pega o diretorio atual(DIRNAME) e somar com o meu 'views'   
app.use(express.static(path.join(__dirname, 'public'))) // Aqui é um lugar para colocar os nossos arquivos, (css, fotos , etc...)  -> NA PASTA PUBLIC VAI TA OS NOSSOS ARQUIVOS
app.get('/', async(req, res) => {
  const cotacao = await apiBCB.getCotacao()
  res.render('home', {
    cotacao
  })
})

app.get('/cotacao', (req, res) => {
  const { cotacao, quantidade } = req.query
  if (cotacao && quantidade) { // para se o usuario digitar nda
    const conversao = convert.convert(cotacao, quantidade)
    res.render('cotacao', {
      error: false,
      cotacao: convert.toMoney(cotacao),
      quantidade: convert.toMoney(quantidade),
      conversao: convert.toMoney(conversao)
    })
  } else {
    res.render('cotacao', {
      error: 'Os valores a seguir são inválidos'
    })
  }
})

app.listen(3000, err => { // retorne um erro ce nao for possivel abrir a porta 3000
  if (err) {
    console.log('Não foi possivel inciar o servidor')
  } else {
    console.log('Convertmymoney está online')
  }
})