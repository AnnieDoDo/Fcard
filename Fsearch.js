const Sequelize = require('sequelize');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize( {
    dialect: 'sqlite',
    storage: '/home/annie/Documents/nodepractice/Fcard/sqldev.db'
  });

  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

const Model = Sequelize.Model;

class Account extends Model {}
Account.init({
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
  }
}, {
 
  sequelize,
  modelName: 'account'
  // options
});

class PersonalData extends Model {}
PersonalData.init({
  // attributes
  Pid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Picture: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  School: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Department: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Birth: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Relationship: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Skill: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  SkillDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Interest: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  InterestDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Club: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ClubDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Class: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ClassDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  CountryDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Obsession: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ObsessionDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Talent: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  TalentDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Wannatry: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  WannatryDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accountUid: {
    type: Sequelize.STRING,
    references: {
      model: Account,
      key: 'Uid'
    }
  }
}, {
 
  sequelize,
  modelName: 'personaldata'
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

Account.hasMany(PersonalData); 
PersonalData.belongsTo(Account);

module.exports = {
    search : function(searchData1){
      return Account.findOne({
      attributes: ['Password'],
      where:{
        Email:searchData1,
        }
      })   
    }
}

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

Account.sync({ force: false }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return Account.create({
      Uid: uuidv4(),
      Email: 'magician19960118@gmail.com',
      Password : 'dodocute'
    });
})