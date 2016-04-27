/// <reference path="../lib/angular/angular.min.js" />
/// <reference path="../lib/angular-route/angular-route.min.js" />

(function () {

    "use strict";

    angular.module("app", []).controller("companyController", companyController);

    function companyController($scope, $http, arrayService, companyApiFactory) {

        var moneyChildDict = [];			// ARRAY FOR CHILD MONEY -- Company ID - CHILD MONEY
        $scope.companiesAllInfo = [];		// ARRAYCOMPANIES + CHILD MONEY
        var currentParentTable = [];		// arrayCompanies - DUPLICATE (for table view)
        $scope.roots = [];					// MULTIARRAY WITH CHILDREN

        $scope.isLoading = true;			// To show text 'Loading' in view
        $scope.errorMessage = "";

        $scope.toggleTable = true;
        $scope.toggleTree = false;

        // REFRESH VIEW
        var refresh = function () {
            companyApiFactory.getCompanies()
			    .then(function (response) {
			        $scope.companiesAllInfo = response.data;
			    }, function (err) {
			        $scope.errorMessage = err.data;
			    }).finally(function () {
			        $scope.isLoading = false;
			    });
        };
        refresh();

        // Create multiarray
        var buildTree = function () {
            $scope.roots = arrayService.createMultiArray($scope.companiesAllInfo);
        };

        // API GET:{id} FOR TABLE VIEW GET COMPANY BY ID TO INSERT INTO INPUT BOXES
        $scope.editCompany = function (id) {
            $scope.isLoading = true;
            companyApiFactory.getCompany(id)
			    .then(function (response) {
			        $scope.company = response.data;
			    }, function (err) {
			        $scope.errorMessage = err.data;
			    }).finally(function () {
			        $scope.isLoading = false;
			    });
        };

        // API POST
        $scope.addChildCompany = function (id, company) {
            $scope.isLoading = true;
            if (id == undefined) id = 0;

            var childCompany = company || {};
            childCompany.parentId = id;

            companyApiFactory.insertCompany(childCompany)
			    .then(function (response) {
			        $scope.companiesAllInfo.push(response.data);
			        $scope.company = {};
			        refresh();
			        buildTree();
			    }, function (err) {
			        $scope.errorMessage = err.data;
			    }).finally(function () {
			        $scope.isLoading = false;
			    });
        };

        // API PUT EDIT COMPANY --- FROM TABLE
        $scope.updateCompany = function (id) {
            $scope.isLoading = true;
            $scope.company.id = id;
            companyApiFactory.updateCompany($scope.company)
			    .then(function (response) {
			        refresh();
			        //clear input fields
			        $scope.company = {};
			    }, function (err) {
			        $scope.errorMessage = err.data;
			    }).finally(function () {
			        $scope.isLoading = false;
			    });
        };

        // API PUT --- FROM TREE
        $scope.submitChange = function (id) {
            $scope.isLoading = true;

            //Get current item
            var item = getItemByIdService.getItem(arrayCompanies, id, id);
            var index = arrayCompanies.indexOf(item);

            companyApiFactory.updateCompany($scope.changedCompany)
			    .then(function (response) {
			        closeEditMode(id);
			        arrayCompanies[index].ownMoney = $scope.changedCompany.ownMoney;
			        arrayCompanies[index].name = $scope.changedCompany.name;
			        buildTree();
			        $scope.changedCompany = {};
			    }, function (err) {
			        $scope.errorMessage = err.data;
			    }).finally(function () {
			        $scope.isLoading = false;
			    });
        };

        var updateChildCompanies = function (id, parentId) {
            // IF DELETED ELEMENT HAS CHILDREN SET THEIR PARENTID TO LEVEL UP (DELETED ELEMENT PARENTID)
            var childElementId = [];
            for (var i = currentParentTable.length - 1; i >= 0; i--) {
                // find children
                if (currentParentTable[i].parentId === id)
                    childElementId.push(currentParentTable[i].id);
            };
            for (var i = childElementId.length - 1; i >= 0; i--) {
                // Set new parentId for child companies
                var newItem = getItemByIdService.getItem(arrayCompanies, id, childElementId[i]);
                newItem.parentId = parentId;
                // Update child
                companyApiFactory.updateCompany(newItem)
				    .then(function (response) { }, function (err) { });
            };
        };

        // API DELETE COMPANY BY ID
        $scope.deleteCompany = function (id, parentId) {
            $scope.isLoading = true;
            updateChildCompanies(id, parentId);

            companyApiFactory.deleteCompany(id)
			    .then(function (response) {
			        //location.reload();
			    }, function (err) {
			        $scope.errorMessage = err.data;
			    }).finally(function () {
			        $scope.isLoading = false;
			    });
        };

        // SHOW TABLE OR TREE TOGGLE
        $scope.showTable = function () {
            $scope.toggleTable = true;
            $scope.toggleTree = false;
        };

        $scope.showTree = function () {
            if ($scope.toggleTree) return;
            $scope.toggleTable = false;
            $scope.toggleTree = true;
            buildTree();
        };

        // Value into input forms
        $scope.changedCompany = {};
        // OPEN EDIT MODE FOR COMPANY
        $scope.openEditMode = function (company) {
            $scope.changedCompany = company;
            // If some item in edit mode reset changes
            $scope.editedItems = {};
            $scope.editedItems[company.id] = !$scope.editedItems[company.id];
        };

        // CLOSE EDIT MODE FOR COMPANY
        var closeEditMode = function (id) {
            $scope.editedItems[id] = !$scope.editedItems[id];
        };

        // Check if array contains element by _id
        Array.prototype.contains = function (obj) {
            var i = this.length;
            while (i--) {
                if (this[i].id === obj) {
                    return true;
                }
            }
            return false;
        }
    }
})();