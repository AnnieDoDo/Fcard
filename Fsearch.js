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
  Book: {
    type: Sequelize.BOOLEAN,
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
    checkIfAccountExist : function(checkAcc){
      return AccountData.findOne({
        attributes:['Email'],
        where:{
          Email: checkAcc,
        },
        raw: true
      })
    },
    newAccount : function(newData1 , newData2){
        var ifreg = ''

         return AccountData.upsert({
            Uid : uuidv4(),
            Email : newData1,
            Password : newData2,
            Book: 0,
            Open : 0,
          }).then(()=>{
            console.log("success")
            ifreg = 'success'
            return ifreg
          })
          .catch(error => {
            console.log("unsuccess")
            ifreg = 'unsuccess'
            return ifreg
          })
        
        //return Promise.resolve(ifreg)
    },
    ifdrew : function(checkAcc){
      return Padding.findOne({
        attributes: ['F1id','F2id'],
        where: {[Op.or]: [
          {
            F1id: {
              [Op.like]: checkAcc
            }
          },
          {
            F2id: {
              [Op.like]: checkAcc
            }
          }
        ]},
        raw: true
      })
    },
    draw : function(){
      return AccountData.findOne({
        attributes: ['Email'],
        order: sequelize.random(),
        where:{ Book: {
          [Op.ne] : 1
        }},
        raw: true
      })
    },
    withoutDrew : function(checkAcc){
      return AccountData.update(
        { Book: 1 },
        { where: { Email: checkAcc } }
        )
        .then(result =>
          console.log(result)
        )
        .catch(err =>
          console.log(err)
        )
    },
    addPair : function(acc1,acc2){
      ifreg = ''
      return Padding.upsert({
          PDid : uuidv4(),
          F1id : acc1,
          F2id:  acc2,
          raw: true
        }).then(()=>{
          console.log("addPairsuccess")
          ifreg = 'addPairsuccess'
          return ifreg
        })
        .catch(error => {
          console.log("addPairunsuccess")
          ifreg = 'addPairunsuccess'
          return ifreg
        })
      },
      PersonalData : function(searchData){
        return AccountData.findOne({
        attributes: ['Gender','School','Department','SkillDescription','ClubDescription','ClassDescription','CountryDescription','ObsessionDescription','TalentDescription','WannatryDescription'],
        where:{
          Email:searchData,
        },
        raw: true
        })   
      },
      addFriend : function(acc1,acc2){
        ifreg = ''
        return Friend.upsert({
            Fid : uuidv4(),
            F1id : acc1,
            F2id:  acc2,
          }).then(()=>{
            console.log("addFriendsuccess")
            ifreg = 'addFriendsuccess'
            return ifreg
          })
          .catch(error => {
            console.log("addFriendunsuccess")
            ifreg = 'addFriendunsuccess'
            return ifreg
          })
        }


};
