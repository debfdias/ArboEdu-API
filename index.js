const express = require('express');
const routes = require('./src/routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('API rodando na porta 3000!')
})

