angular.module('backendfastmoneyApp').factory('BanksService',['$http', banksService]);

function banksService($http) {

    /**
     * Get dashboard data
     * @returns {*}
     */
    function getBanksList()
    {
      this.request = {
        method: 'GET',
        url: ' http://localhost:3000/data',
      };      
      return $http(this.request);
    }

    //public methods
    return {
        'getBanksList': getBanksList
    }
}