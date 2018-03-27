var mysql = require("mysql");
var client;
var dbConf = {
    host: 'localhost',     //本地数据库
    port: '3306',
    user: 'root',          //数据库用户名
    password: 'root',          //数据库密码
    database: 'zhome'  //数据库名称
};

function dbClient() {
    var err;
    try {
        if (client) {
            client = mysql.createConnection(dbConf);
            client.connect();
        } else {
            client = new mysql.createConnection(dbConf);
            client.connect();
        }
    } catch (_error) {
        err = _error;
        throw err;
    }
    return client;
}

exports.getDbCon = dbClient();