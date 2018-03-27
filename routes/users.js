var express = require('express');
var router = express.Router();
var user = require("../model/User");
var token = require("../service/Token");
var crypto = require("crypto");
var common = require("../service/common");
var ALiDaYu = require("node-alidayu");
var conf = require("../setting");
var Cache = require("node-cache");
var Validate = require("../validate/validate");
/* GET users listing. */
var myCache = new Cache();
var client = new ALiDaYu(conf.aliDaYu);
router.get('/userinfo', function(req, res, next) {
    token.checkToken(req,res,function (data) {
        var uid = data.uid;
        user.findById(uid,function (data) {
            res.send(data);
        })
    });
});
//用户注册
router.post('/reg',function (req, res, next) {
    Validate.regValidate(req,res,function (data) {
       if (data.code===200){
           var uNum = req.body['u_num'];
           var uPass = req.body['u_pass'];
           var uCode = req.body["u_code"];
           var serviceCode = myCache.get(uNum);
           if (uCode===serviceCode){
               user.create(uNum,uPass,function(result){
                   if (result.code===200){
                       var uid = result.data.insertId;
                       user.findById(uid,function (uInfo) {
                           var myToken = token.createToken({
                               "uid": uInfo.data[0]['u_id'],
                               "uTel":uInfo.data[0]['u_num']
                           });
                           res.send({
                               "code":200,
                               "token":myToken
                           });
                       });
                   }else{
                       res.send(result);
                   }
               });
           }else{
               res.send({
                   "code":40003,
                   "msg":"验证码错误"
               });
           }
       }else{
           res.send(data);
       }
    });
});
//用户登录
router.post('/login',function (req, res, next) {
    Validate.loginValidate(req,res,function (data) {
        if (data.code===200){
            var uNum = req.body.u_num;
            var uPass = req.body.u_pass;
            var md5 = crypto.createHash("md5");
            var clientPass = md5.update(uPass).digest("hex");
            user.findByNum(uNum,function (uInfo) {
                var servePass = uInfo.data[0]['u_pass'];
                if (clientPass===servePass){
                    var myToken = token.createToken({
                        "uid": uInfo.data[0]['u_id'],
                        "uTel":uInfo.data[0]['u_num']
                    });
                    res.send({
                        "code":200,
                        "token":myToken
                    });
                }else{
                    res.send({
                        "code":40001,
                        "msg":"账号密码错误"
                    })
                }
            });
        }else{
            res.send(data);
        }
    });
});
//注册验证码
router.post("/send",function (req,res,next) {
    var rangeNum = common.range(6);
    var tel = req.body.utel;
    client.sms({
        rec_num: tel,//要发送的手机号码
        sms_free_sign_name: '涌智科技',//你在阿里大于的应用名
        sms_template_code: 'SMS_71155349',//类型模板ID
        sms_param: {
            product:"掌控家",
            code: rangeNum//要发送的验证码
        }
    }).then(function (data) {
        myCache.set(tel,rangeNum,conf.code_exp);
        res.send({
            "code":200,
            "msg":"发送成功"
        });
    }).catch(function (err) {
        res.send({
            "code":40002,
            "msg":"发送失败"
        });
    })
});
//找回密码验证码
router.post("/findsms",function (req,res,next){
    var rangeNum = common.range(6);
    var tel = req.body.utel;
    user.findByNum(tel,function (data) {
        if(data.code===200){
            client.sms({
                rec_num: tel,//要发送的手机号码
                sms_free_sign_name: '涌智科技',//你在阿里大于的应用名
                sms_template_code: 'SMS_71155347',//类型模板ID
                sms_param: {
                    product:"掌控家",
                    code: rangeNum//要发送的验证码
                }
            }).then(function (data) {
                myCache.set(tel,rangeNum,conf.code_exp);
                res.send({
                    "code":200,
                    "msg":"发送成功"
                });
            }).catch(function (err) {
                res.send({
                    "code":40002,
                    "msg":"发送失败"
                });
            })
        }else{
            res.send({
                "code":30001,
                "msg":"账号没有注册"
            });
        }
    });
});
//找回密码
router.post("/findpass",function (req,res,next) {
    Validate.findPassValidate(req,res,function (data) {
        if (data.code===200){
            var uNum = req.body['u_num'];
            var uPass = req.body["u_pass"];
            var uCode = req.body["u_code"];
            var serviceCode = myCache.get(uNum);
            if (uCode===serviceCode){
                user.updateByTel(uNum,uPass,function (data) {
                    if (data.code===200){
                        res.send(data);
                    }else{
                        res.send({
                            "code":40004,
                            "msg":"密码找回失败"
                        })
                    }
                })
            }else{
                res.send({
                    "code":40003,
                    "msg":"验证码错误"
                });
            }
        }else{
            res.send(data);
        }
    });

});
module.exports = router;
