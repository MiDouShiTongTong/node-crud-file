/*
    student.js, 只负责操作student数据
        - 增删改查
 */
const fs = require('fs');

let dbPath = './db.json';

// 列表
/*
    回调函数中
        第一个参数是error对象
        第二个参数是student对象
 */
exports.selectList = (callback) => {
    fs.readFile(dbPath, 'utf-8', (error, data) => {
        if (error) {
            callback(error, null);
        }
        callback(null, JSON.parse(data).students);
    });
};

// 根据id获取
exports.selectByPrimaryKey = (id, callback) => {
    fs.readFile(dbPath, 'utf-8', (error, data) => {
        if (error) {
            callback(error);
        }

        let students = JSON.parse(data).students;
        // 根据id获取学生
        let student = students.find((item, index, arr) => {
            if (item.id === parseInt(id)) {
                return item;
            }
        });

        callback(null, student);
    });
};

// 新增
exports.insert = (student, callback) => {
    fs.readFile(dbPath, 'utf-8', (error, data) => {
        if (error) {
            callback(error);
        }

        let students = JSON.parse(data).students;
        student.id = parseInt(students[students.length - 1].id) + 1;
        students.push(student);

        fs.writeFile(dbPath, JSON.stringify({students: students}, false, 1), (error) => {
            if (error) {
                callback(error);
            }
        });
        callback(null);
    });
};

// 修改
exports.updateByPrimaryKey = (student, callback) => {
    student.id = parseInt(student.id);
    fs.readFile(dbPath, 'utf-8', (error, data) => {
        if (error) {
            callback(error);
        }
        let students = JSON.parse(data).students;

        // 获取需要修改的学生
        let student_ = students.find((item, index, arr) => {
            if (item.id === student.id) {
                return item;
            }
        });

        // 遍历拷贝对象
        for (let key in student) {
            student_[key] = student[key];
        }

        fs.writeFile(dbPath, JSON.stringify({students: students}, false, 1), (error) => {
            if (error) {
                callback(error);
            }
        });
        callback(null);
    });
};

// 删除
exports.deleteByPrimaryKey = (id, callback) => {
    id = parseInt(id);
    fs.readFile(dbPath, 'utf-8', (error, data) => {
        if (error) {
            callback(error);
        }
        let students = JSON.parse(data).students;

        // 获取不需要删除的学生
        students = students.filter((item,) => {
            return item.id != id;
        });

        fs.writeFile(dbPath, JSON.stringify({students: students}, false, 1), (error) => {
           if (error) {
               callback(error);
           }
        });

        callback(null);
    });
};
