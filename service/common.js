module.exports = {
    range:function (len) {
        var Num="";
        for(var i=0;i<len;i++)
        {
            Num+=Math.floor(Math.random()*10);
        }
        return Num;
    }
};