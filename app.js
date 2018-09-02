/*
    app.js, 入口的文件
        - 创建服务端
        - 配置
            - 配置模版引擎
            - 配置post解析
            - 配置公共资源
            - 挂载路由容器
        - 启动服务端

    配置模版引擎和post解析, 必须配置在路由容器之前

 */
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');

// 创建服务端
let app = express();

// 配置模版引擎
app.engine('.html', require('ejs').__express);

// 配置post解析
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 配置公共资源
app.use('/public/', express.static('./public/'));

// 挂载路由容器
app.use(router);

// 启动服务端
app.listen(3000, () => {
    console.log('服务器启动');
});
