 'use strict';  
    angular.module('app', [])  
    .controller('myCtrl', function ($scope) {  
        $scope.data = {};  
        $scope.save = function () {  
            alert('保存成功！')  
        }  
    }) 
    //判断用户名是否已经存在
    .directive('ensureUnique', function ($http, $q) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                ctrl.$asyncValidators.ensureUnique = function(modelValue, viewValue){
                    var d = $q.defer();
                    $http.get('http://ot31wbk51.bkt.clouddn.com/data3.txt')
                    .then(function successCallback(namelist){
                        for(var i=0;i<namelist.data.length;i++){
                            //debugger
                            //console.log(namelist.data[i].user);
                        
                                if(modelValue === namelist.data[i].user){
                                    console.log(modelValue);
                                    return ctrl.$setValidity('unique',false);
                                }else{
                                    ctrl.$setValidity('unique', true); 
                                    d.resolve();  
                                }
                            
                        }
                    },
                    function errorCallback(data) {
                        console.log('error')
                    });
                    return d.promise;
                }
            }  
        }
    }) 
      
    // 判断手机号是否重复  
    .directive('phone', function ($q, $http) {  
        return {  
            require: 'ngModel',  
            link: function (scope, ele, attrs, ctrl) {  
                ctrl.$asyncValidators.phone = function (modelValue, viewValue) {  
                    var d = $q.defer();  
                    $http.get('http://ot31wbk51.bkt.clouddn.com/phone.json')  
                    .success(function (phoneList) {  
                        if (phoneList.indexOf(parseInt(modelValue)) >= 0) {  
                            //d.reject(); 
                            console.log(modelValue) 
                            ctrl.$setValidity('unique', false); 
                        } else {  
                            ctrl.$setValidity('unique', true); 
                            d.resolve();   
                        }  
                    })
                    .error(function(data){
                        console.log('s')
                        //d.$setValidity('unique', false);
                    }); 
                    return d.promise;  
                }  
            }  
        }  
    })  
      
    // 验证两次输入的密码是否相同的自定义验证  
    .directive('pwdRepeat', function () {  
        return {  
            require: 'ngModel',  
            link: function (scope, ele, attrs, ctrl) {  
                ctrl.$validators.pwdRepeat = function (modelValue) {    
                    // 当值为空时，通过验证，因为有required  
                    if (ctrl.$isEmpty(modelValue)) {  
                        return true;  
                    }       
                    return modelValue === scope.data._password ? true : false;  
                }  
            }  
        }  
    })  