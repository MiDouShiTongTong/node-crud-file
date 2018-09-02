/*
    router.js, 只配置路由
        - 配置路由, 根据url请求对应的函数\\
*/
const fs = require('fs');
const express = require('express');
const student = require('./student');

// 创建路由容器
let router = express.Router();

// 首页
router.get('/', (request, response) => {
    response.render('dashboard.html', {
        currentUrl: request.url
    });
});

// 学生管理视图
router.get('/student', (request, response) => {
    // 获取学生列表
    student.selectList((error, students) => {
        if (error) {
            response.status(500).send('Server Error.');
        }
        // 渲染html模版
        response.render('student/list.html', {
            currentUrl: request.url,
            students: students
        });
    });
});

// 学生添加视图
router.get('/student/insert', (request, response) => {
    response.render('student/insert-and-update.html', {
        currentUrl: request.url
    });
});

// 学生添加逻辑
router.post('/student/insert', (request, response) => {
    student.insert(request.body, (error) => {
        if (error) {
            response.status(500).send('Server Error.');
        }
        response.redirect('/student');
    });
});

// 学生修改视图
router.get('/student/update', (request, response) => {
    student.selectByPrimaryKey(request.query.id, (error, student) => {
        response.render('student/insert-and-update.html', {
            currentUrl: request.url,
            student: student
        });
    });
});

// 学生修改逻辑
router.post('/student/update', (request, response) => {
    student.updateByPrimaryKey(request.body, (error) => {
        if (error) {
            response.status(500).send('Server Error.');
        }
    });
    response.redirect('/student');
});

// 学生删除逻辑
router.get('/student/delete', (request, response) => {
    student.deleteByPrimaryKey(request.query.id, (error) => {
        if (error) {
            response.status(500).send('Server Error.');
        }
    });
    response.redirect('/student')
});

// 导出路由容器
module.exports = router;
