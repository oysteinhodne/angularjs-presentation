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
module omdb {
    app.service(services);
    app.controller(controllers);
    app.directive(directives);
}

//Compile with tsc main.ts --out 'app.js' --sourcemap