const Koa = require("koa");
const koaStatic = require("koa-static");
const koaRouter = require("koa-router")();
const koaBodyParser = require("koa-bodyparser");
const path = require("path");
// const mysql = require("./mysql.js");
const TodosTable = require("./model.js");

const app = new Koa();

// let datas = [
//     { id: 1, content: "koa", finish: false },
//     { id: 2, content: "ts", finish: false },
//     { id: 3, content: "vue", finish: true }
// ];
// let maxId = 3;

app.use(koaStatic(path.resolve(__dirname, './views'), {
    gzip: true,
    maxAge: 20
}))

app.use(koaBodyParser())

koaRouter.get("/getTodos", async (ctx) => {
    // const datas = await mysql(`select * from todos_table;`)
    const datas = await TodosTable.findAll();
    console.log(datas)
    ctx.body = {
        code: 0,
        data: datas,
        msg: ''
    }
})

koaRouter.post("/addTodo", async (ctx) => {
    let content = ctx.request.body.content
    console.log(ctx.request.body)
    if (!content) {
        ctx.body = {
            code: 1,
            data: null,
            msg: '新增内容为空~'
        }
    } else {
        // await mysql(`insert into todos_table (content, c_time) values (?, ?)`, [`${content}`, new Date()])
        await TodosTable.create({
            content: content,
            c_time: new Date()
        })
        ctx.body = {
            code: 0,
            data: null,
            msg: '新增成功'
        }
    }
})

koaRouter.post("/changeState", async (ctx) => {
    const { id, finish } = ctx.request.body
    if (!id) {
        ctx.body = {
            code: 1,
            data: null,
            msg: '参数ID错误'
        }
    } else {
        // const updateRes = await mysql(`update todos_table set finish=? where id=?`, [finish ? 0 : 1, id])
        // console.log(updateRes)
        await TodosTable.update({
            finish: finish ? 0 : 1
        }, {
            where: {
                id: id
            }
        })
        ctx.body = {
            code: 0,
            data: null,
            msg: '修改成功'
        }
    }
})

koaRouter.post("/deleteTodo", async (ctx) => {
    let id = ctx.request.body.id;
    if (!id) {
        ctx.body = {
            code: 1,
            data: null,
            msg: '参数ID错误'
        }
    } else {
        // await mysql(`delete from todos_table where id=?`, [id])
        await TodosTable.destroy({
            where: {
                id
            }
        })
        ctx.body = {
            code: 0,
            data: null,
            msg: '删除成功'
        }
    }
})

/*启动路由*/
app.use(koaRouter.routes());
app.use(koaRouter.allowedMethods());

app.listen(5555, () => {
    console.log('服务正在端口5555运行>>>')
});
