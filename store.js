var Promise = require('bluebird');

module.exports = {
    searchDeptHead: function (destination) {
        return new Promise(function (resolve) {

     
            var deptHead = [];
  
            setTimeout(function () { resolve(deptHead); }, 2000);
        });
    },


   
};