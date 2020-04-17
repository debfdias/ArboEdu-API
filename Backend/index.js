const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

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

/* const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'it.rb.so@gmail.com',
  from: 'irs@cin.ufpe.br',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
try{
  sgMail.send(msg);
}catch(err){
  console.log(err)
} */

