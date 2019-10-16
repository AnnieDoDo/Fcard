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
      var data2=reqObj.Password;
      console.log(data1)
      console.log(data2)
      sql.search(data1)
      .then(data => {
        //console.log(data)
        if(data)
        {
          var checkpassword = data.Password
          console.log(checkpassword)
          if(checkpassword == data2){
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

app.get('/drawSubmit', (req, res) => {
  if(!req.session.acc){
    res.end('drawFail') 
  }else{
    sql.ifdrew(req.session.acc)
    .then(data => {
      if(data)
      {
        if(data.F1id==req.session.acc)
        {
          res.end('drawSubOK') 
        }else if(data.F2id==req.session.acc){
          res.end('drawSubOK') 
        }else{
          res.end('drawSubFail') 
        }
        console.log(data.F1id)
        console.log(data.F2id)
      }else{
        sql.draw(req.session.acc)
        .then(drawdata => {
          if(drawdata)
          {
            sql.addPair(req.session.acc,drawdata.Email)
            .then(pairdata=>{
              if(pairdata == 'addPairsuccess')
              {
                res.end('drawOK') 
              }else{
                res.end('drawFail') 
              }
            })
          }else{
              res.end(`drawFail`) 
          }
        })
      }
    })
  }
});

app.get('/inviteSubmit', (req, res) => {
  if(!req.session.acc){
    res.end('inviteFail') 
  }else{
    console.log(data.Email)
    sql.addPair(req.session.acc,data.Email)
    .then(drewdata => {
      if(drewdata == 'addPairsuccess')
      {
        res.end('invSubOK') 
      }else{
        res.end('invSubFail') 
      }
    })
  }
});



app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });