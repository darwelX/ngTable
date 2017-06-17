<script type="text/ng-template" id="pagination">
        <div class="ng-cloak ng-table-pager" ng-if="params.data.length">
          <span>
              Mostrando Filas de <strong>{{ ((params.page()-1)*params.count())+1 }}</strong>
                a <strong>{{ (params.page()*params.count()) > params.settings().total ? params.settings().total : params.page()*params.count() }}</strong>
                de <strong>{{ params.settings().total }}</strong> recuperados. Ver
                <span ng-if="params.settings().counts.length" class="ng-table-counts btn-group btn-group-sm clearfix">
                    <button ng-repeat="count in params.settings().counts" type="button" ng-class="{'btn-primary':params.count()==count}" ng-click="params.count(count)" class="btn btn-default btn-lg">
                      <span ng-bind="count"></span>
                    </button>
                </span> grupos de registros.
          </span>
          <ul class="pagination ng-table-pagination pull-right">
            <li ng-class="{'disabled': !page.active && !page.current, 'active': page.current}" ng-repeat="page in pages" ng-switch="page.type">
              <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a>
              <a ng-switch-when="first" ng-click="params.page(page.number)" href="">
                <span ng-bind="page.number"></span>
              </a>
              <a ng-switch-when="page" ng-click="params.page(page.number)" href="">
                <span ng-bind="page.number"></span>
              </a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a>
              <a ng-switch-when="last" ng-click="params.page(page.number)" href="">
                <span ng-bind="page.number"></span>
              </a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a>
            </li>
          </ul>
        </div>
</script>