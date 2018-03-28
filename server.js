
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const profile = require('./profile');
const path = require('path');


const app = express();

app.use( express.static(path.join(__dirname + '/public')));
app.use( express.static('views'));

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/profile', profile)

app.set('views', './views');
app.set('view engine', 'ejs');




app.get('/', (req, res) => {
  const data = {
    person: {
      firstName: 'Christopher',
      lastName: 'Wong',
    }
  }
  res.render('index', data);
});


  app.get('/contact', (req, res) => {
    res.render('contact');
  });
  
  app.post('/thanks', (req, res) => {
    res.render('thanks', { contact: req.body })
  });

  // Notice now the data is the second argument passed to the template render method




app.listen(8080, () => {
  console.log('listening at http://localhost:8080');
})
