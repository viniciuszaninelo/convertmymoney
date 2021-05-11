const express = require('express')
const app = express()
const path = require('path') //COMO NO FUTURO IREI POSTAR/ APLICAR O PROJETO, EU PRECISO FAZER O TRATAMENTO DO 'PATH', PARA QUE ELE FUNCIONE 
const convert = require('./lib/convert')

// PARA JA APPARECER A TELA DO FORMULARIO NA TELA, PRECISAMOS UAR O EJS, E PARA USAR O EJS, PRECISO SETAR MEU VIEW ENGINE
app.set('view engine', 'ejs')
//VAMOS MOSTRAR AQUI QUAL DIRETORIO VAI TER OS MEUS VIEWS
app.set('views', path.join(__dirname, 'views')) // 'path.join' vai criar um diretorio para mim, ai ele vai pega o diretorio atual(DIRNAME) e somar com o meu 'views'   
app.use(express.static(path.join(__dirname, 'public'))) // Aqui é um lugar para colocar os nossos arquivos, (css, fotos , etc...)  -> NA PASTA PUBLIC VAI TA OS NOSSOS ARQUIVOS
//  '/' é a parte principal
app.get('/', (req, res) => { // request e response 
  res.render('home')  // estou renderizando nossa página  'home' 
})

app.get('/cotacao', (req, res) => {
  const { cotacao, quantidade } = req.query
  // ja consigo fazer a conversao 
  const conversao = convert.convert(cotacao, quantidade)
  res.render('cotacao', {
    cotacao,
    quantidade,
    conversao
  })
})

app.listen(3000, err => { // retorne um erro ce nao for possivel abrir a porta 3000
  if (err) {
    console.log('Não foi possivel inciar o servidor')
  } else {
    console.log('Convertmymoney está online')
  }
})