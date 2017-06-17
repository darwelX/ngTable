angular.module('backendfastmoneyApp').controller('BanksCtrl',
['$scope','NgTableParams','BanksService', '$location',function($scope,NgTableParams,banksService, $location) {
  var self = this;
  var originalData;
  jQuery("#grupo").on('click', function(event){
      event.preventDefault();
      $texto = $('#texto-grupo');
      console.log($texto);
  });  
  angular.element('#grupo').triggerHandler('click');
  self.nuevo = function(){
    $location.path('/newbank')
  }

  banksService.getBanksList().then(function (_data){
    data = _data.data;
    originalData = angular.copy(data);
    let total = data.length;
    let cantidadDeGrupos = total / 1;
    let cantidades = [];
    for(let i = 0; i < total; i++){
      let size = 1 * (i+1);
      cantidades.push(size);
    }
    self.tableParams = new NgTableParams({ 
        pages: 1, count: 1, group: "country"
      }, 
      { 
        counts: cantidades,  dataset: data
      });

    self.aplicarBusquedaGlobal = aplicarBusquedaGlobal;
    
    function aplicarBusquedaGlobal(){
      var term = self.terminoGlobalBusqueda;
      if (self.isInvertedSearch){
        term = "!" + term;
      }
      console.log(term)
      self.tableParams.filter({ $: term }); 
    }     
  });

    self.cancel = cancel;
    self.del = del;
    self.save = save;

    //////////

    function cancel(row, rowForm) {
      var originalRow = resetRow(row, rowForm);
      angular.extend(row, originalRow);
    }

    function del(row) {
      _.remove(self.tableParams.settings().dataset, function(item) {
        return row === item;
      });
      self.tableParams.reload().then(function(data) {
        if (data.length === 0 && self.tableParams.total() > 0) {
          self.tableParams.page(self.tableParams.page() - 1);
          self.tableParams.reload();
        }
      });
    }
    
    function resetRow(row, rowForm){
      row.isEditing = false;
      rowForm.$setPristine();
      self.tableTracker.untrack(row);
      return _.find(originalData, function(r){
        return r.id === row.id;
      });
    }

    function save(row, rowForm) {
      var originalRow = resetRow(row, rowForm);
      angular.extend(originalRow, row);
    }
}]);