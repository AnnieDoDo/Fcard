const express = require('express');
const pa = require('path')
var session = require('express-session')
var redis = require("redis");
var RedisStore = require('connect-redis')(session);

var bodyParser  = require('body-parser');
var expressAccessToken = require('express-access-token');
var client = redis.createClient();
var sql = require('./Fsearch');
var bcrypt = require('bcrypt');

const PORT = 3500;
const HOST = '127.0.0.1';
const app = express();

app.use(session({
    store: new RedisStore({ host: 'localhost', port: 3000, client: client}),
    secret: 'dodo',
    saveUninitialized: false,
    resave: false,
    cookie: {},
    
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/loginSubmit', (req, res) => {
    let bufferStr = "";
    console.log(req.body)
    req.on('data', data => {
      bufferStr += data.toString()
    })
    req.on('end', () => {
      let reqObj = JSON.parse(bufferStr);
      var data1=reqObj.Email;
      var data2=reqObj.password;
      sql.search(data1)
      .then(data => {
        if(data.length != 0)
        {
            var checkpassword = data.password
            if(checkpassword = data2){
                req.session.acc = data1
                console.log('loginOK')
            res.end('logSubOK')
            }else{
                res.end('Invalid password')
            }  
        }else{
            res.end(`Unauthorized!`) 
        }
      })
    });
});

app.post('/registerSubmit', (req, res) => {
    let bufferStr = "";
    console.log(req.body)
    req.on('data', data => {
      bufferStr += data.toString()
    })
    req.on('end', () => {
      let reqObj = JSON.parse(bufferStr);
      var data1=reqObj.Email;
      var data2=reqObj.password;
      //console.log(data1)
      //console.log(data2)
      sql.newAccount(data1 , data2)
      .then(data => {
        if(data == 'success')
        {
            res.end('regSubOK') 
        }else{
            res.end('registerFail') 
        }
      })
    });
});



app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });