var omdb;
(function (omdb) {
    omdb.app.filter('capitalize', function () {
        return function (input, scope) {
            if (input != null)
                input = input.toLowerCase();
            return input.substring(0, 1).toUpperCase() + input.substring(1);
        };
    });
})(omdb || (omdb = {}));
//# sourceMappingURL=Filters.js.map
