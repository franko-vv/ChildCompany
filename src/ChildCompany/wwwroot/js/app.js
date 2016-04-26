/*(function () {

    "use strict";

    angular.module("app", ["ngRoute"])
            .config(function ($routeProvider) {

                $routeProvider.when("/", {
                    controller: "companyController",
                    controllerAs: vm
                    //templateUrl: "/views/companyView.html"
                });

                $routeProvider.otherwise({ redirectTo: "/" });

            });
})();*/