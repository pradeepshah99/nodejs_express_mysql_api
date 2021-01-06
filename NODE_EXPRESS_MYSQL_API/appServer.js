var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var corses = require('cors');
var port = 5500;




app.use(bodyParser.json());
app.use(corses());
app.use(bodyParser.urlencoded({extended:true}));



var controller = require('./dataController');
app.use('/api/student', controller);


app.listen(port,  (req, res)=>
{
    console.log(`server is running on http://localhost:${port}`);
});

module.exports = app;
