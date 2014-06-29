/// <reference path="../../../ExtrernalLibs/DefinitionFiles/AngularJs/angular.d.ts"/>
var eco;
(function (eco) {
    eco.app = angular.module('echonest', []);
})(eco || (eco = {}));
/// <reference path="../../../../ExtrernalLibs/DefinitionFiles/AngularJs/angular.d.ts"/>
var eco;
(function (eco) {
    var EchonestService = (function () {
        function EchonestService($q, $http, apiKey, apiUrl) {
            var _this = this;
            this.$q = $q;
            this.$http = $http;
            this.apiKey = apiKey;
            this.apiUrl = apiUrl;
            this.artists = {};
            this.query = function (url, data) {
                data.api_key = _this.apiKey;
                data.format = 'jsonp';
                data.callback = 'JSON_CALLBACK';
                var deferred = _this.$q.defer();
                _this.$http({
                    method: 'jsonp',
                    url: _this.apiUrl + url,
                    params: data
                }).success(function (d) {
                    deferred.resolve(d);
                });

                return deferred.promise;
            };
            this.findArtist = function (name, data) {
                data = data || {};
                data.name = name;
                data.results = 10;
                return _this.query('artist/search/', data).then(function (d) {
                    return d.response.artists;
                });
            };
            //http://developer.echonest.com/api/v4/artist/
            // profile?api_key=7STFOVHIIXNZCEQSI&id=ARH6W4X1187B99274F
            // &format=json
            // &bucket=biographies
            // &bucket=blogs
            // &bucket=familiarity
            // &bucket=hotttnesss
            // &bucket=images
            // &bucket=news
            // &bucket=reviews
            // &bucket=terms
            // &bucket=urls
            // &bucket=video
            // &bucket=id:musicbrainz
            this.getProfile = function (id, data) {
                data = data || {};
                data.id = id;
                data.bucket = ['biographies'];
                return _this.query('artist/profile', data).then(function (d) {
                    _this.artists[data.id] = d.response.artist;
                    return d.response.artist;
                });
            };
        }
        return EchonestService;
    })();
    eco.EchonestService = EchonestService;
})(eco || (eco = {}));
/// <reference path="../../../../ExtrernalLibs/DefinitionFiles/AngularJs/angular.d.ts"/>
/// <reference path="../../Bootstrap/init.ts"/>
/// <reference path="EchonestInterfaces.ts"/>
/// <reference path="EchonestService.ts"/>
var eco;
(function (eco) {
    var EchonestProvider = (function () {
        /**
        * Constructor takes other providers, not instances
        * */
        function EchonestProvider() {
            var _this = this;
            /**
            * Configurable properties
            * */
            this.apiUrl = 'http://developer.echonest.com/api/v4/';
            this.apiKey = "";
            this.$get = [
                '$q', '$http', function (_$q_, _$http_) {
                    if (_this.apiKey.length < 15) {
                        throw new Error("Did you forget to provide a API key for echonest? \n app.config(['echonestProvider',function(echonestProvider){" + "echonestProvider.apiKey = 'yourApiKey'" + "}])");
                    }
                    return new eco.EchonestService(_$q_, _$http_, _this.apiKey, _this.apiUrl);
                }];
            console.log("Provider constructor called");
        }
        return EchonestProvider;
    })();

    eco.app.provider('echonest', EchonestProvider);
})(eco || (eco = {}));
var eco;
(function (eco) {
    /// <reference path="../Services/Echonest/EchonestService.ts"/>
    (function (controllers) {
        var StartCtrl = (function () {
            function StartCtrl($scope, echonest) {
                var _this = this;
                this.getArtist = function (id) {
                    _this.echoService.getProfile(id).then(function (d) {
                        _this.selectedArtist = d;
                    });
                };
                this.echoService = echonest;
                var _scope = $scope;
                $scope.vm = this;
                $scope.$watch('vm.searchString', function (name) {
                    name = name || "";
                    if (name.length > 3) {
                        _this.echoService.findArtist(name, {}).then(function (data) {
                            console.log(data);
                            _this.artists = data;
                        });
                    }
                });
            }
            return StartCtrl;
        })();
        controllers.StartCtrl = StartCtrl;
    })(eco.controllers || (eco.controllers = {}));
    var controllers = eco.controllers;
})(eco || (eco = {}));
/// <reference path="Bootstrap/Init.ts"/>
/// <reference path="Services/Echonest/EchonestProvider.ts"/>
/// <reference path="Controllers/Controllers.ts"/>
var eco;
(function (eco) {
    eco.app.controller(eco.controllers);
    eco.app.config([
        'echonestProvider', function (_echonestProvider) {
            _echonestProvider.apiKey = "7STFOVHIIXNZCEQSI";
        }]);
})(eco || (eco = {}));
//# sourceMappingURL=app.js.map
