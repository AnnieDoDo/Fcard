const express = require('express');
const pa = require('path')
const session = require('express-session')
const redis = require("redis");
const RedisStore = require('connect-redis')(session);
const cors = require('cors')
const bodyParser  = require('body-parser');
const expressAccessToken = require('express-access-token');
const nconf = require('nconf');
nconf.argv().env().file('key.json');

const client = redis.createClient()
const sql = require('./Fsearch');
const bcrypt = require('bcrypt');


const PORT = 3500;
const HOST = 'localhost';
const app = express();

app.use(session({
  store: new RedisStore({ host: 'localhost', port: 3000, client: client}),
    secret: 'dodo',
    saveUninitialized: false,
    resave: false,
    cookie: {
      /*todo
      secure: true,
      SameSite: 'none'
      */
    },
    
  }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*app.use('/', express.static(pa.join('/home/annie/Documents/Fcard-FrontEnd/docs')))

app.get('/',(req, res) => {
  res.sendFile('/home/annie/Documents/Fcard-FrontEnd/docs/index.html'); 
 });*/

app.post('/loginSubmit', cors({credentials: true,origin: 'https://localhost:3500'}), (req, res) => {
    let bufferStr = "";
    req.on('data', data => {
      bufferStr += data.toString()
    })
    req.on('end', () => {
      let reqObj = JSON.parse(bufferStr);
      var data1=reqObj.Email;
      var data2=reqObj.Password;
      //console.log(data1)
      //console.log(data2)
      sql.search(data1)
      .then(data => {
        //console.log(data)
        if(data)
        {
          var checkpassword = data.Password
          console.log(checkpassword)
          if(checkpassword == data2){
            req.session.acc = data1
            res.end('logSubOK')
          }else{
            res.end('Invalid password')
            console.log('Invalid password')
          }  
        }else{
            res.end(`Unauthorized!`) 
            console.log('Unauthorized!')
        }
      })
    });
});

app.post('/registerSubmit',cors({credentials: true,origin: 'https://localhost:3500'}), (req, res) => {
    let bufferStr = "";
    console.log(req.body)
    req.on('data', data => {
      bufferStr += data.toString()
    })
    req.on('end', () => {
      let reqObj = JSON.parse(bufferStr);
      var data1=reqObj.Email;
      var data2=reqObj.Password;
      //console.log(data1)
      //console.log(data2)
      sql.checkIfAccountExist(data1)
      .then(checkdata =>{
        if(checkdata){
          console.log("You have registered before.")
          res.end("You have registered before.")
        }else{
          sql.newAccount(data1 , data2)
          .then(data => {
            if(data == 'success')
            {
                res.end('regSubOK') 
            }else{
                res.end('registerFail') 
            }
          })
        }
      })
    });
});

app.get('/drawSubmit',cors({credentials: true,origin: 'https://localhost:3500'}), (req, res) => {
  if(!req.session.acc){
    res.end('You have to login first') 
  }else{
    console.log("draw here")
    console.log(req.session.acc)
    sql.ifdrew(req.session.acc)
    .then(data => {
      console.log(data)
      if(data)
      {
        console.log("ifdrew")
        console.log(data.F1id)
        console.log(data.F2id)
        if((data.F1id==req.session.acc) || (data.F2id==req.session.acc))
        {
          res.end('drawSubOK') 
        }

      }else{
        console.log("withoutDrew")
        sql.withoutDrew(req.session.acc)
        .then(()=> {
          console.log("checkbook")
          sql.draw()
          .then(drawemail=> {
            console.log(drawemail)
            sql.addPair(req.session.acc,drawemail.Email)
            .then(afteradd=> {
              console.log(afteradd)
              if(afteradd==="addPairsuccess"){
                sql.withoutDrew(drawemail.Email)
                res.end("drawSubOK")
              }else{
                res.end("drawFail")
              }
            })
          })
        })
      }
    })
  }
});

app.get('/getDrewData',cors({credentials: true,origin: 'https://localhost:3500'}), (req, res) => {
  if(!req.session.acc){
    res.end('You have to login first') 
  }else{
    sql.ifdrew(req.session.acc)
    .then(data =>{
      if(data.F1id==req.session.acc)
      {
        sql.PersonalData(data.F2id)
        .then(personaldata=> {
          console.log(personaldata)
          res.send(personaldata) 
        })
      }else if(data.F2id==req.session.acc)
      {
        sql.PersonalData(data.F1id)
        .then(personaldata=> {
          console.log(personaldata)
          res.send(personaldata) 
        })
      }else{
        res.end("getFail")
      }
    })
  }

});

app.get('/logout', cors({credentials: true,origin: 'https://localhost:3500'}), (req, res) => {
  req.session.destroy();
  console.log("logout")
  res.end('logoutOK');
});

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
  });