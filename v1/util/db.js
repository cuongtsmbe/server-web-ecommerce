const mysql = require('mysql');
require('dotenv').config();
const configMysql = {
                    host        : process.env.MYSQL_HOST,
                    user        : process.env.MYSQL_USER,
                    password    : process.env.MYSQL_PASSWORD,
                    database    : process.env.MYSQL_DB
                };

module.exports = {
    load: function(sql,condition) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(configMysql);
            connection.connect();
            connection.query(sql,condition, function(error, results, fields) {
                if (error) {
                    console.log(error); 
                    return resolve([]);
                };
                resolve(results);
            });
            connection.end();
        });
    },
    get: function(table,limit,offset) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(configMysql);
            connection.connect();
            connection.query(`SELECT * from ${table} LIMIT ? OFFSET ?`,[limit,offset], function(error, results, fields) {
                if (error) {
                    console.log(error); 
                    return resolve([]);
                };
                resolve(results);
            });

            connection.end();
        });
    },
    insert: function(table, data) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(configMysql);
            connection.connect();
            connection.query(`INSERT INTO ${table} SET ?`, data, function(error, results, fields) {
                if (error) {
                    console.log(error); 
                    return resolve([]);
                };
                resolve(results);
            });

            connection.end();
        });
    },
    getOneByCondition: function(table, condition) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(configMysql);
            connection.connect();
            connection.query(`select * from ${table} where ?`, condition, function(error, results, fields) {
                if (error) {
                    console.log(error); 
                    return resolve([]);
                };
                resolve(results);
            });

            connection.end();
        });
    },
    delete: function(table, con) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(configMysql);
            connection.connect();
            connection.query(`DELETE FROM ${table} WHERE ?`, con, function(error, results, fields) {
                if (error) {
                    console.log(error); 
                    return resolve([]);
                };
                resolve(results);
            });

            connection.end();
        });
    },


};