const Koa = require("koa");
const koaStatic = require("koa-static");
const koaRouter = require("koa-router")();
const koaBodyParser = require("koa-bodyparser");
const path = require("path");

const app = new Koa();

let datas = [
    { id: 1, content: "koa", finish: false },
    { id: 2, content: "ts", finish: false },
    { id: 3, content: "vue", finish: true }
];
let maxId = 3;

app.use(koaStatic(path.resolve(__dirname, './views'), {
    gzip: true,
    maxAge: 20
}))

app.use(koaBodyParser())

koaRouter.get("/getTodos", async (ctx) => {
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
        datas.push({
            id: ++maxId,
            content,
            finish: false
        })
        ctx.body = {
            code: 0,
            data: null,
            msg: '新增成功'
        }
    }
})

koaRouter.post("/changeState", async (ctx) => {
    let id = ctx.request.body.id
    if (!id) {
        ctx.body = {
            code: 1,
            data: null,
            msg: '参数ID错误'
        }
    } else {
        datas.forEach(item => {
            if (id === item.id) {
                item.finish = !item.finish
            }
            ctx.body = {
                code: 0,
                data: null,
                msg: '修改成功'
            }
        });
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
        datas = datas.filter(item => {
            return item.id !== id
        });
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

app.listen(3000);