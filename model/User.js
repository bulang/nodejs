var client = require("../dbbase");
var mysql = client.getDbCon;
var crypto = require("crypto");
var userModel = {
    
    findById:function (uid,callback) {
        var query = "SELECT * FROM zh_users where u_id = "+uid+" LIMIT 1";
        mysql.query(query,function (err,result) {
            if (err){
                console.log('[FIND ERROR] - ',err.message);
                return callback(err);
            }
            return callback({
                "code":200,
                "data":result
            });
        });
    },
    findByNum:function (nNum,callback) {
        var query = "SELECT * FROM zh_users where u_num = '"+nNum+"' LIMIT 1";
        mysql.query(query,function (err,result) {
            if (err){
                console.log('[FIND ERROR] - ',err.message);
                return callback(err);
            }
            return callback({
                "code":200,
                "data":result
            });
        });
    },
    create:function (uNum,uPass,callback) {
        this.findByNum(uNum,function (res) {
            var resLen = res.data.length;
            if (resLen != 0){
                return callback({
                    "code":20001,
                    "msg":"账号已被注册"
                });
            }else{
                var md5 = crypto.createHash("md5");
                var newPass = md5.update(uPass).digest("hex");
                var query = "INSERT INTO zh_users(u_num,u_pass,addtime) VALUES(?,?,?)";
                mysql.query(query,[uNum,newPass,Date.now()/1000],function (err,result) {
                    if (err){
                        console.log('[CREATE ERROR] - ',err.message);
                        return callback(err);
                    }
                    return callback({
                        "code":200,
                        "msg":"注册成功",
                        "data":result
                    });
                });
            }
        });
    },
    updateByTel:function (uNum,uPass,callback) {
        this.findByNum(uNum,function (data) {
            if (data.code===200){
                var md5 = crypto.createHash("md5");
                var newPass = md5.update(uPass).digest("hex");
                var sql = "UPDATE zh_users SET u_pass = ? WHERE u_num = ?";
                mysql.query(sql,[newPass,uNum],function (err,result) {
                    if (err){
                        console.log('[UPDATE ERROR] - ',err.message);
                        return callback(err);
                    }else{
                        return callback({
                            "code":200,
                            "msg":"修改成功"
                        });
                    }
                });
            }else{
                return callback({
                    "code":30001,
                    "msg":"账号没有注册"
                });
            }
        })
    }
};

module.exports = userModel;