var express = require('express')
var router  = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var saltRound = 10;


//database connection using mysql

var dbConnection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: '',
    database:'studbs'
});

//connecting to the database

dbConnection.connect((err)=>
{
    if(err) throw err;
    else
    {
        console.log("Database has been connected");
    }
}); 

// defining routers
// GET request for getting all the datas

router.get('/getAll',(req, res)=>
{
   dbConnection.query('SELECT * FROM user_table',(err,result)=>
   {
       if(err==1)
       {
        res.status(500).json({err: true, message: " server error", data: result});

       }
       else if(result<1)
       {
        res.status(404).json({err: true, message: " no data"});

       }
       else
       {
        res.status(200).json({err: false, message: " Data Fetched", data: result});

       }
   });
 
});

router.post('/create', (req, res)=>
{
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let password = req.body.password;
    let mobile = req.body.mobile;
    let address = req.body.address;

    if(!first_name || !last_name || !email||!password||!mobile||!address)
{
    res.status(400).send({error: true, message: "Please fill the appropriate fields"});

}
else{
        bcrypt.hash(password, saltRound, function( err,hash){
    dbConnection.query("INSERT INTO user_table(first_name, last_name, email, password, mobile, address) values (?,?,?,?,?,?)", [first_name, last_name, email, hash,mobile,address],((err, result)=>{
        if(err)
        {
           res.status(500).json({message: "Some internal error"});
        }
        else
        {
            res.status(201).json({error: false, data: result, message: "Record has been added"});
        }
    
    }));
})};
});














module.exports = router;