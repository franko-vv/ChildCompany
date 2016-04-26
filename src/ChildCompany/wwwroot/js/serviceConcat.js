angular.module("app").factory('concatArrayService', function(){
    return {
        concatTwoArray: function (primary, foreign, primaryKey, foreignKey, select)
        {
            var m = primary.length, n = foreign.length, index = [], c = [];

            for (var i = 0; i < m; i++)
            {
                var row = primary[i];
                index[row[primaryKey]] = row;
            };

            for (var j = 0; j < n; j++)
            {
                var y = foreign[j];
                var x = index[y[foreignKey]];
                c.push(select(x, y));
            };

            return c;
        }
    };
})