const Sequelize = require('sequelize');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;

const sequelize = new Sequelize( {
    dialect: 'sqlite',
    storage: '/home/annie/Documents/Fcard/Fcard/sqldev.db'
  });

  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

const Model = Sequelize.Model;

class AccountData extends Model {}
AccountData.init({
  // attributes
  Uid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Open: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Picture: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  School: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Department: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Birth: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Gender: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Relationship: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Skill: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  SkillDescription: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Interest: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  InterestDescription: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Club: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  ClubDescription: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Class: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  ClassDescription: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Country: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  CountryDescription: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Obsession: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  ObsessionDescription: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Talent: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  TalentDescription: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Wannatry: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  WannatryDescription: {
    type: Sequelize.STRING,
    allowNull: true,
  },

}, {
 
  sequelize,
  modelName: 'accountdata'
  // options
});

class Padding extends Model {}
Padding.init({
  // attributes
  PDid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  F1id: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  F2id: {
    type: Sequelize.STRING,
    allowNull: true,
  }
}, {
 
  sequelize,
  modelName: 'padding'
  // options
});

class Friend extends Model {}
Friend.init({
  // attributes
  Fid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  F1id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  F2id: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
 
  sequelize,
  modelName: 'friend'

});

module.exports = {
    search : function(searchData1){
      return AccountData.findOne({
      attributes: ['Password'],
      where:{
        Email:searchData1,
        }
      })   
    },
    newAccount : function(newData1 , newData2){
        var ifreg = ''
        async () => {
          var newacc =  AccountData.upsert({
            Uid : uuidv4(),
            Email : newData1,
            Password : newData2,
            Open : 0,
          }).then(()=>{
            console.log("success")
            PersonalData.sync({ force: false }).then(() => {
              PersonalData.create({
                Pid : uuidv4(),
              });
              }).then(personalData => {
                personalData.setAccountD(newacc)
                ifreg = 'success'
                return ifreg
              })
            
          })
          .catch(error => {
            console.log("unsuccess")
            ifreg = 'unsuccess'
            return ifreg
          })
        }
        return Promise.resolve(ifreg)
    },
    draw : function(checkAcc){
      Padding.findOne({
        attributes: ['F1id'],
        where:{
          F2id : checkAcc
        }
      })
      return AccountData.findOne({
        attributes: ['Email'],
        order: sequelize.random(),
        Email: {
          [Op.notlike] : '%' + checkAcc
        }
      }) 
    }
};

/*module.exports = {
    newAccount : function(newData1, newData2){
        Account.create({
              Uid: uuidv4(),
              Email : 'hahahahaha',
              Password : 'huhuhuhuhu',
          })

          console.log(newData1)
          console.log(newData2)
          const acc = Account.build({
            Uid : uuidv4(),
            Email : 'hahahahaha',
            Password : 'huhuhuhuhu',
            createdAt : Date(),
            updatedAt : Date()
          }).save().then(anotherTask => {
            console.log("success")
          })
          .catch(error => {

            console.log("unsuccess")
          })
        Account.Uid = uuidv4()
        Account.Email = newData1
        Account.Password = newData2
        //acc.save().then(() => {})
        return 'haha'

    }
  }
*/

/*
        var createOK = 0
        Account.sync({ force: false })
        .then(() => {
            console.log(newData1)
            console.log(newData2)
            Account.create({
              Uid: uuidv4(),
              Email: newData1,
              Password : newData2
            })
            console.log('create')
        }).then(() => {
            createOK = 1
            console.log(createOK)
            var acc = Account.findOne({
                attributes: ['Password'],
                where:{
                  Email : newData1,
                  Password : newData2
                }
            })
            console.log('createOK')
            console.log(acc)
        }).catch(() => {
            console.log(createOK)
            var acc = Account.findOne({
                attributes: ['Password'],
                where:{
                  Email : newData1,
                  Password : newData2
                }
            })
            console.log('createFail')
        })

 Account.sync({ force: false }).then(() => {
            Account.create({
              Uid: uuidv4(),
              Email: newData1,
              Password : newData2
            });
        })
*/