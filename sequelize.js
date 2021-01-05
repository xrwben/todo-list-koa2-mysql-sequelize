const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "root", "123456", {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

sequelize.authenticate().then(() => {
    console.log('MYSQL 连接成功......');
}).catch(err => {
    console.error('链接失败:', err);
});
  // 根据模型自动创建表
// sequelize.sync()

module.exports = sequelize;