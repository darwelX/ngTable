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
    $location.path('/newbank');
  }

  banksService.getBanksList().then(function (response){
    var bancos = {};
    bancos = response.data.data;
    originalData = angular.copy(bancos);
    const sizeBanks = bancos.length;
    var cantidades = [];
    for(var i = 0; i < sizeBanks; i++){
      var size = 1 * (i+1);
      cantidades.push(size);
    }
    self.tableParams = new NgTableParams({ 
        pages: 1, count: 1, group: "country"
      }, 
      { 
        counts: cantidades,  dataset: bancos
      });

    self.aplicarBusquedaGlobal = aplicarBusquedaGlobal;
    
    function aplicarBusquedaGlobal(){
      var term = self.terminoGlobalBusqueda;
      if (self.isInvertedSearch){
        term = "!" + term;
      }
      self.tableParams.filter({ $: term }); 
    }     
  }).catch(function (response) {
                console.log(response);
            });

    self.cancel = cancel;
    self.del = del;
    self.save = save;
    self.add = add;
    self.cancelChanges= cancelChanges;
    self.saveChanges = saveChanges;
    self.hasChanges = hasChanges;
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

    function add() {
      self.isEditing = true;
      self.isAdding = true;
      self.tableParams.settings().dataset.unshift({
        isEditing: true,
        isAdding: true,
        country: "",
        name: null,
        account: null
      });
      // we need to ensure the user sees the new row we've just added.
      // it seems a poor but reliable choice to remove sorting and move them to the first page
      // where we know that our new item was added to
      self.tableParams.sorting({});
      self.tableParams.group('');
      self.tableParams.page(1);
      self.tableParams.reload();
    }  

    function cancelChanges() {
      resetTableStatus();
      var currentPage = self.tableParams.page();
      self.tableParams.settings({
        dataset: angular.copy(originalData)
      });
      // keep the user on the current page when we can
      if (!self.isAdding) {
        self.tableParams.page(currentPage);
      }
    }

    function resetTableStatus() {
      self.isEditing = false;
      self.isAdding = false;
      self.deleteCount = 0;
      self.tableParams.group('country');
      self.tableTracker.reset();
      self.tableForm.$setPristine();
    }  

    function saveChanges() {
      resetTableStatus();
      var currentPage = self.tableParams.page();
      self.tableParams.settings().dataset[0].isEditing =  false;
      self.tableParams.settings().dataset[0].isAdding =  false;
      originalData = angular.copy(self.tableParams.settings().dataset);
    }

    function hasChanges() {
      return self.tableForm.$dirty || self.deleteCount > 0
    }            
}]);