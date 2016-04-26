/// <reference path="../lib/angular/angular.min.js" />
/// <reference path="../lib/angular-route/angular-route.min.js" />

(function () {

    "use strict";

    angular.module("app", []).controller("companyController", companyController);

    function companyController($scope, $http, arrayService) {

        /*var vm = this;*/

        var arrayCompanies = [];			// FOR GET REQUEST
        var moneyChildDict = [];			// ARRAY FOR CHILD MONEY -- Company ID - CHILD MONEY
        $scope.companiesAllInfo = [];		// ARRAYCOMPANIES + CHILD MONEY
        var currentParentTable = [];		// arrayCompanies - DUPLICATE (for table view)
        $scope.roots = [];					// MULTIARRAY WITH CHILDREN

        $scope.isLoading = true;			// To show text 'Loading' in view
        $scope.errorMessage = "";

        $scope.toggleTable = true;
        $scope.toggleTree = false;

        // REFRESH VIEW
        // GET ARRAY COMPANIES AND COPY TO TEMPORARY ARRAY TO DELETE ROOT COMPANY
        var refresh = function () {
            $http.get('/companies')
			    .then(function (response) {
			        console.log("Get companies array"); console.log(response);
			        arrayCompanies = response.data;
			        currentParentTable = response.data.slice();
			        calculateChild();
			        concat();
			    }, function (err) {
			        //error
			        console.log(err);
			        $scope.errorMessage = err.data;
			    }).finally(function () {
			        $scope.isLoading = false;
			    });
        };
        // CALL METHOD WHEN FIRST TIME RUN
        refresh();

        // Create multiarray
        var buildTree = function () {
            $scope.roots = arrayService.createMultiArray($scope.companiesAllInfo);
        };

        // BUILT COMPANY TREE - Build multiarray
        /*var buildTree = function ()
        {
            if ($scope.companiesAllInfo == null) return;
            var map = {}, node, roots = [];
            for (var i = 0; i < $scope.companiesAllInfo.length; i += 1) {
                node = $scope.companiesAllInfo[i];
                node.children = [];
                map[node.id] = i;
                if (node.parentId !== 0)
                    $scope.companiesAllInfo[map[node.parentId]].children.push(node);
                else
                    roots.push(node);
            }
            $scope.roots = roots;
        };*/

        var calculateChild = function () {
            for (var i = 0; i <= arrayCompanies.length - 1; i++) {
                var summaChildCompanies = recursiveSumma(i);

                if (moneyChildDict.contains(arrayCompanies[i].id)) {
                    // if Company already exists
                    moneyChildDict[i].childMoney = summaChildCompanies;
                }
                else {
                    // Add new company to array
                    moneyChildDict.push({ id: arrayCompanies[i].id, childMoney: summaChildCompanies });
                }
            };
        };

        // Calculate company earnings with child companies earnings
        var recursiveSumma = function (i) {
            i = i || 0;
            var sumChild = parseFloat(arrayCompanies[i].ownMoney);
            for (var y = 0; y <= arrayCompanies.length - 1; y++) {
                if (arrayCompanies[y].parentId === arrayCompanies[i].id)
                    sumChild += recursiveSumma(y);
            }
            return sumChild;
        };

        var concat = function () {
            // Concatinate ChildMoney from moneyChildDict to Companies Array from GET req
            $scope.companiesAllInfo = arrayService.concatTwoArray(arrayCompanies, moneyChildDict, "id", "id", function (a, b) {
                return {
                    id: a.id,
                    name: a.name,
                    ownMoney: a.ownMoney,
                    parentId: a.parentId,
                    childMoney: b.childMoney
                };
            });
        };

        /////////////////////////////////////////API//////////////////////////////////////////////
        // API GET:{id} FOR TABLE VIEW GET COMPANY BY ID TO INSERT INTO INPUT BOXES
        $scope.editCompany = function (id) {
            $scope.isLoading = true;
            console.log('GET ID COMPANY:' + id);
            $http.get('/companies/' + id)
			    .then(function (response) {
			        // success
			        $scope.company = response.data;
			    }, function (err) {
			        // error
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

            $http.post('/companies', childCompany)
			    .then(function (response) {
			        console.log('Added new company');
			        //Add to collection
			        $scope.companiesAllInfo.push(response.data);
			        currentParentTable.push(response.data);
			        //clear input fields
			        $scope.company = {};
			        // build tree
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
            $http.put('/companies/' + id, $scope.company)
			    .then(function (response) {
			        console.log('Updated company');
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
            console.log('PUT IN ID:' + id);
            console.log($scope.changedCompany);

            //Get current item
            var item = getItemByIdService.getItem(arrayCompanies, id, id);
            var index = arrayCompanies.indexOf(item);

            $http.put('/companies/' + id, $scope.changedCompany)
			    .then(function (response) {
			        console.log('Company has been updated.');
			        closeEditMode(id);
			        arrayCompanies[index].ownMoney = $scope.changedCompany.ownMoney;
			        arrayCompanies[index].name = $scope.changedCompany.name;
			        calculateChild();
			        concat();
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
                $http.put('/companies/' + newItem.id, newItem)
				    .then(function (response) {
				        console.log('Updated child company ' + newItem.id);
				    }, function (err) {
				        console.log("Can't edit company" + err);
				    });
            };
        };

        // API DELETE COMPANY BY ID
        $scope.deleteCompany = function (id, parentId) {

            $scope.isLoading = true;
            updateChildCompanies(id, parentId);

            console.log('DELETE COMPANY BY ID:' + id);
            $http.delete('/companies/' + id)
			    .then(function (response) {
			        console.log('Delete successful.');
			        location.reload();
			    }, function (err) {
			        $scope.errorMessage = err.data;
			    }).finally(function () {
			        $scope.isLoading = false;
			    });
        };

        //////////////////////////////////////////////////////////////////////////////////////////
        // SHOW TABLE OR TREE TOGGLE
        // DEFAULT: SHOW TABLE

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

        //////////////////////////////////////////////////////////////////////////////////////////
        // CONCAT TWO ARRAYS
       /* var getItemByIdFromArray = function (globalArr, prop, id) {
            for (var i = globalArr.length - 1; i >= 0; i--) {
                if (globalArr[i].prop === id)
                    return globalArr[i];
            };
        };*/

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