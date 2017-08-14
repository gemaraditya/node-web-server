const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// generic views
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// key value pair for config view engine
app.set('view engine', 'hbs');

//express middleware for served static pages like html,css,etc.
// __dirname is our currently relative path
app.use(express.static(__dirname + '/public'));

// another express middleware for creating log file. Next is a must parameter
app.use((req, res , next)=> {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error) {
            console.log('unable to log');
        }
    });

    next();
});

// returning text/html type
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome page',
        welcomeMessage: 'welcome to my house'
    });
});

// returning application/json type
app.get('/hobby', (req, res) => {
    res.send({
        name: 'Gema',
        hobby: ['watching movies', 'football']
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});