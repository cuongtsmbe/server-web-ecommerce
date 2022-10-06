const mysql = require('mysql');
const config = require("./../config/default.json");

module.exports = {
    load: function(sql,condition) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(config.mysql);
            connection.connect();
            connection.query(sql,condition, function(error, results, fields) {
                if (error) throw error;
                resolve(results);
            });
        

            connection.end();
        });
    },
    get: function(table,limit) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(config.mysql);
            connection.connect();
            connection.query(`SELECT * from ${table} LIMIT ?`,limit, function(error, results, fields) {
                if (error) throw error;
                resolve(results);
            });

            connection.end();
        });
    },
    insert: function(table, data) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(config.mysql);
            connection.connect();
            connection.query(`INSERT INTO ${table} SET ?`, data, function(error, results, fields) {
                if (error) throw error;
                resolve(results);
            });

            connection.end();
        });
    },
    getOneByCondition: function(table, condition) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(config.mysql);
            connection.connect();
            connection.query(`select * from ${table} where ?`, condition, function(error, results, fields) {
                if (error) throw error;
                resolve(results);
            });

            connection.end();
        });
    },
    delete: function(table, con) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(config.mysql);
            connection.connect();
            connection.query(`DELETE FROM ${table} WHERE ?`, con, function(error, results, fields) {
                if (error) throw error;
                resolve(results);
            });

            connection.end();
        });
    },


};