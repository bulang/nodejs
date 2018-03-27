var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var config = require("../setting");
var Token = {
    createToken:function(obj,timeout){
        var token = jwt.sign({tel: obj.uTel,uid:obj.uid}, config.secret,{
            expiresIn: 10080  // token到期时间设置
        });
        return token;
    },
    checkToken:function(rq,rs,callback){
        var token = rq.body.token || rq.query.token || rq.headers["token"]; // 从body或query或者header中获取token
        jwt.verify(token, config.secret, function (err, decode) {
            if (err) {  //  时间失效的时候/ 伪造的token
                rs.json({err:err,code:40000})
            } else {
                callback(decode);
            }
        })
    }
};

module.exports = Token;