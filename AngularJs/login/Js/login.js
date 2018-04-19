var app = angular.module('login',[]);
app.controller('main',['$scope', function ($scope)
{
    $scope.obj = {
        tel: '',
        pws: '',
        close: false,
        check: false
    }

    $scope.$watch('obj.tel',function (newValue, oldValue)
    {
        if(newValue === oldValue){
            return false;
        }
        var str = $scope.obj.tel;
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            $scope.obj.check = false;
            $scope.obj.close = true;
            return false;
        } else {
            $scope.obj.close = false;
            $scope.obj.check = true;
            return true;
        }
    })

    $scope.close = function ()
    {
        if($scope.obj.close)
        $scope.obj.tel = '';
    }

    $scope.validate = function ()
    {
        if(!$scope.obj.check)
        {

        }
    }

}])