## TodoList

**基于koa2+vue2的增删改查小demo**

### 增加mysql数据持久化

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

- 浏览器运行http:127.0.0.1:3000/index.html