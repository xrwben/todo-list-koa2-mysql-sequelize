## TodoList

**基于 koa2+vue2+mysql+sequelize 的增删改查小demo**

### 使用Sequelize操作MySQL

参考：https://sequelize.org/master/

    https://www.sequelize.com.cn/

    https://itbilu.com/nodejs/npm/V1PExztfb.html

**ORM：** Object-Relational Mapping，把关系数据库的表结构映射到对象上

- 增：

```js
await TodosTable.create({
    content: content,
    c_time: new Date()
})
```

- 删：

```js
await TodosTable.destroy({
    where: {
        id
    }
})
```

- 改：

```js
await TodosTable.update({
    finish: finish ? 0 : 1
}, {
    where: {
        id: id
    }
})
```

- 查：

```js
await TodosTable.findAll()
```


### 增加mysql数据持久化

参考：https://www.runoob.com/mysql/mysql-delete-query.html

    https://github.com/mysqljs/mysql#pooling-connections

- cnpm i mysql --save

**数据库字段设计**

字段名称 | 类型
:--:|:--:
id | int unsigned(自增)
content | vchar(255)
finish | tinyint(1)
c_time | datetime
update_time | datetime(自动更新)


### 用到的插件

- Koa 是一个基于Node.js平台的下一代web框架

- koa-static 处理静态资源的中间件

- koa-bodyparser 处理post请求参数的中间件

- koa-router 处理路由的中间件

----

### 运行

- git clone https://github.com/xrwben/todo-list-koa2.git

- npm i

- node index.js

- 浏览器运行http:127.0.0.1:5555/index.html