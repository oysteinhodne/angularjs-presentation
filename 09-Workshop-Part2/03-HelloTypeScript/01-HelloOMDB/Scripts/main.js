/// <reference path="Bootstrap/Init.ts"/>
/// <reference path="Bootstrap/Configs.ts"/>
/// <reference path="Bootstrap/RouteConfig.ts"/>
/// <reference path="Filters/Filters.ts"/>
/// <reference path="Controllers/Controllers.ts"/>
/// <reference path="Services/omdbService.ts"/>
/// <reference path="Directives/directives.ts"/>
/**
* Wire up all parts into our app.
* */
var omdb;
(function (omdb) {
    omdb.app.service(omdb.services);
    omdb.app.controller(omdb.controllers);
    omdb.app.directive(omdb.directives);
})(omdb || (omdb = {}));
//Compile with tsc main.ts --out 'app.js' --sourcemap
//# sourceMappingURL=main.js.map
