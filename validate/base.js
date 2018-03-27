module.exports = {
  isNotEmpty:function (e) {
      var len = e.length;
      if (len===0||e===" "){
          return false;
      }else{
          return true;
      }
  }
};