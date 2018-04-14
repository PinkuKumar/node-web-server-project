const express = require('express');
const fs = require('fs')
const hbs = require('hbs');

const port = process.env.PORT || 3000;

const app = express();

//setting the view template engine
app.set ('view engine','hbs');
//to use partials from a specific directory
hbs.registerPartials(__dirname + '/views/partials');



//middleware
app.use((req,res,next) => {
  var now = new Date().toString();
  var logMessage = `${now} : ${req.method} : ${req.url} \r\n`
  fs.appendFile('server.log', logMessage, (err) => {
    if (err){
      console.log('Error!');
    }
  })
  console.log(`${logMessage} :`);
  next();

})
// uncomment to enable mainetenance page
// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

//__dirname gives the root of the project folder
app.use(express.static(__dirname + '/public'))

//to use helper functions
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();

})

hbs.registerHelper('upperCase', (text) =>{
  return text.toUpperCase();

})

app.get('/',(req, res) => {
  res.render('home.hbs',{
    pageName :'Home Page',
  //  currentYear : new Date().getFullYear(), //changed to a Helper
    welcomeMessage: 'Welcome to my first website using NodeJs and Handlebars!'
  })

  //Comment - sending string with html
//  res.send('<h1> Hello Express </h1>');
})

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageName :'About Us'
    //currentYear : new Date().getFullYear() - changed to a Helper
  });
  // res.send({
  //   name: 'Web Server Project',
  //   version: '1.0.0'
  // });
})

app.get('/projects',(req,res) => {
  res.render('projects.hbs',{
    pageName: 'Projects'
  })

})

app.get('/bad',(req,res) =>{
  res.send({
    errorMessage:'Oops something went wrong'
  })
})

//commnt - For Heroku need variable port
app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
