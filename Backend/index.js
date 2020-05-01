const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
///////////////////////////////////////////////
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();
app.use(session({
  secret: 'ssshhhhh',
  // create new redis store.
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
  saveUninitialized: false,
  resave: false
}));
  
//////////////////////////////////////////////
app.options('*', cors()); // include before other routes 
app.use(cors());
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



