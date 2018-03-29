
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const profile = require('./profile');
const path = require('path');
const sgMail = require('@sendgrid/mail');



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
    console.log('email: ' + req.body.email);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'chrisewong@gmail.com',
        from: req.body.email,
        subject: 'Sending with SendGrid is Fun CONTACT',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
    sgMail.send(msg, function(errSend, dataSend){
      if(errSend) {
        console.log('errSend: ' + errSend);
        res.render('thanks', { contact: req.body });
        return;
      }
      if (dataSend[0].statusCode == 401) {
        console.log('Sendgrid indicated unauthorized: ' + JSON.stringify(dataSend));
        res.render('thanks', { contact: req.body });
        return;
      }
      console.log(JSON.stringify(dataSend));
      res.render('thanks', { contact: req.body })
    });
//    console.log('req.body.firstName: ' + req.body.firstName);
//    res.render('thanks', { contact: req.body })
  });

  // Notice now the data is the second argument passed to the template render method



var PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('listening at http://localhost:8080');
})
