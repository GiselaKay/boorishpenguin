var Sequelize = require('sequelize');
var db = new Sequelize('townhall', 'root', 'mypw');

var User = db.define('User', {
  schoolId: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  name: Sequelize.STRING,
  isTeacher: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  email: Sequelize.STRING,
  picture: Sequelize.STRING
}, {
  timestamps: false
});

var Tag = db.define('Tag', {
  name: Sequelize.STRING
}, {
  timestamps: false
});

var Course = db.define('Course', {
  name: Sequelize.STRING
}, {
  timestamps: false
});

var Question = db.define('Question', {
  text: Sequelize.STRING,
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isAnswered: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isGood: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isClosed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  }
}, {
  timestamps: true,
  updatedAt: false
});

var Answer = db.define('Answer', {
  text: Sequelize.STRING,
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  answersQuestion: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isGood: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  }
}, {
  timestamps: true,
  updatedAt: false
});

Course.belongsToMany(User, {
  through: 'CourseUser'
});
User.belongsToMany(Course, {
  through: 'CourseUser'
});

User.hasMany(Question);
Question.belongsTo(User);
Tag.hasMany(Question);
Question.belongsTo(Tag);
Course.hasMany(Question);
Question.belongsTo(Course);

User.hasMany(Answer);
Answer.belongsTo(User);
Question.hasMany(Answer);
Answer.belongsTo(Question);

Tag.sync();
Course.sync();
User.sync();
Question.sync();
Answer.sync();

exports.User = User;
exports.Question = Question;
exports.Answer = Answer;
exports.Course = Course;
exports.Tag = Tag;