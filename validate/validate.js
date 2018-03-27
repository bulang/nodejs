var baseValidate = require("../validate/base");
module.exports = {
    diffArr:function (arr1, arr2) {
            var newArr = [];
            var arr3 = [];
            for (var i=0;i<arr1.length;i++) {
                if(arr2.indexOf(arr1[i]) === -1)
                    arr3.push(arr1[i]);
            }
            var arr4 = [];
            for (var j=0;j<arr2.length;j++) {
                if(arr1.indexOf(arr2[j]) === -1)
                    arr4.push(arr2[j]);
            }
            newArr = arr3.concat(arr4);
            return newArr;
    },
    EmptyFun:function (eleArr,allData,callback) {
        var clientArr = [];
        var tiShi = "以下参数不能为空";
        for (var i in allData){
            clientArr.push(i);
        }
        if (eleArr.length!==clientArr.length){
            tiShi+=this.diffArr(eleArr,clientArr).toString();
            return callback(
                {
                    "code":30000,
                    "msg":tiShi
                }
            )
        }else{
            var emptyArr = [];
            for (var j in allData){
                $state = baseValidate.isNotEmpty(allData[j]);
                if (!$state){
                    emptyArr.push(j);
                }
            }
            if (emptyArr.length===0){
                return callback(
                    {
                        "code":200,
                        "msg":"ok"
                    }
                )
            }else{
                tiShi+=emptyArr.toString();
                return callback(
                    {
                        "code":30000,
                        "msg":tiShi
                    }
                )
            }
        }
    },
    regValidate:function (req,res,callback) {
        var allData = req.body;
        var eleArr = ["u_num","u_pass","u_code"];
        this.EmptyFun(eleArr,allData,function (data) {
            return callback(data);
        });
    },
    loginValidate:function (req,res,callback) {
        var allData = req.body;
        var eleArr = ["u_num","u_pass"];
        this.EmptyFun(eleArr,allData,function (data) {
            return callback(data);
        });
    },
    findPassValidate:function (req,res,callback) {
        var allData = req.body;
        var eleArr = ["u_num","u_pass","u_code"];
        this.EmptyFun(eleArr,allData,function (data) {
            return callback(data);
        });
    }

};