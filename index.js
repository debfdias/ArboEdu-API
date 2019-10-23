const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const routes = require('./src/routes');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('API ArboEdu!');
});

app.listen(3000, () => {
  console.log('API rodando na porta 3000!')
})

