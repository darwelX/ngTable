angular.module('backendfastmoneyApp').factory('BanksService',['$http','$q', banksService]);

function banksService($http,$q) {

    /**
     * Get dashboard data
     * @returns {*}
     */
    function getBanksList()
    {
      var random_number = Math.floor(Math.random()*10101010101)
      this.request = {
        method: 'GET',
        url: 'scripts/data.json',
        headers: {
          'Content-Type': 'application/json',
          'Acces-Control-Allow-Origin': '*',
          'Acces-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      }; 
      var deferred = $q.defer();     
      return $http(this.request).then(
            function(response){
                console.log(response);
                deferred.resolve(response);
                return deferred.promise;
            },
            function(response){
                console.log(response);
                deferred.reject(response);
                return deferred.promise;
            }
        );
    }

    //public methods
    return {
        'getBanksList': getBanksList
    }
}