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

/*
class FriendMessage extends Model {}
FriendMessage.init({
  // attributes
  FMid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  FRid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Sender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Receiver: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Text: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
 
  sequelize,
  modelName: 'friend'
  // options
});

class Article extends Model {}
Article.init({
  // attributes
  Aid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  autherid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Heart: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  CommentCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
 
  sequelize,
  modelName: 'Article'
  // options
});

class Comment extends Model {}
Comment.init({
  // attributes
  Cid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  CAid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Cautherid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  CBnumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Heart: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
 
  sequelize,
  modelName: 'comment'
  // options
});

class Notification extends Model {}
Notification.init({
  // attributes
  Nid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  Naccid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Naid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Nfid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Ntype: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
 
  sequelize,
  modelName: 'notification'
  // options
});*/


Account.hasMany(PersonalData); // Will add userId to Task model
PersonalData.belongsTo(Account);

/*Account.sync({ force: true }).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  return Account.create({
    Uid: uuidv4(),
    Email: 'magician19960118@gmail.com',
    Password : 'dodocute'

  });
}).then((account) => {
  return PersonalData.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return PersonalData.create({
  
      Pid : uuidv4(),
      Name :  '鳥多多',
      Picture	:	'/home/annie/Documents/nodepractice/Fcard/dodo.jpg',
      School :	'國立鸚鵡大學',
      Department : '鸚鵡飛行系',
      Birth :	'20150416',
      Gender : '男',	
      Relationship : '穩定單身中',
      Skill	:	'破壞物品',
      SkillDescription : '任何東西都逃不過我的鳥掌心',
      Interest : '吃',
      InterestDescription : '只要是吃的我都喜歡',
      Club : '高級鸚鵡說話社',		
      ClubDescription : '在裡面可以學習如何正確發音說話',
      Class : '如何第一次擄獲人類的心',		
      ClassDescription : '因為這堂課可以讓我選到好的主人',		
      Country : '鳥的烏托邦',		
      CountryDescription	: '在裡面的鳥可以自由自在飛翔',	
      Obsession	: '吃太多',
      ObsessionDescription	: '身材有點走樣，飛起來有點費力',	
      Talent : '裝可愛',		
      TalentDescription : '不用裝就很可愛',		
      Wannatry : '各式廁所',
      WannatryDescription : '想嘗試在不同人身上上廁所'
  
    });
  }).then(personalData => {
    personalData.setAccount(account)
  });
})*/



/*Padding.sync({ force: true }).then(() => {
  return Padding.create({
    PDid: uuidv4(),
    F1id: '123',
    F2id: '456'
  });
});*/

/*Friend.sync({ force: true }).then(() => {
  return Friend.create({
    Fid: uuidv4(),
    F1id: '',
    F2id: ''
  });
});*/