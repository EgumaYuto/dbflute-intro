'use strict';

/**
 * Client Create Controller
 */
angular.module('dbflute-intro')
    .controller('ClientCreateCtrl', function ($scope, $window, $state, ApiFactory) {

    // ===================================================================================
    //                                                                           Attribute
    //                                                                           =========
    $scope.classificationMap = {}; // e.g. targetDatabase
    $scope.client = {
        create: true,
        mainSchemaSettings: {},
        schemaSyncCheckMap: {},
        dbfluteVersion: ''
    }; // model of current client
    $scope.oRMapperOptionsFlg = false;
    $scope.option = {testConnection: true};
    $scope.versions = [];

    // ===================================================================================
    //                                                                      Initial Method
    //                                                                      ==============
    $scope.findClassifications = function () {
        ApiFactory.classifications().then(function (response) {
            $scope.classificationMap = response.data;
        });
    };
    $scope.engineVersions = function () {
        ApiFactory.engineVersions().then(function (response) {
            $scope.versions = response.data;
        });
    };

    // ===================================================================================
    //                                                                        Event Method
    //                                                                        ============
    $scope.openORMapperOptions = function () {
        $scope.oRMapperOptionsFlg = !$scope.oRMapperOptionsFlg;
    };
    $scope.changeDatabase = function (client) {
        client.jdbcDriverFqcn = client.driverName;
        var database = $scope.classificationMap['targetDatabaseMap'][client.databaseCode];
        client.jdbcDriverFqcn = database.driverName;
        client.mainSchemaSettings.url = database.urlTemplate;
        client.mainSchemaSettings.schema = database.defaultSchema;
    };
    $scope.create = function (client, testConnection) {
        ApiFactory.createClient(client, testConnection).then(function (response) {
            $state.go('home');
        });
    };

    // ===================================================================================
    //                                                                          Initialize
    //                                                                          ==========
    $scope.findClassifications();
    $scope.engineVersions();
});