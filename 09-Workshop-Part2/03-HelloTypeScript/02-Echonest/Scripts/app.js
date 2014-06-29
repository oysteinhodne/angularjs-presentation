/// <reference path="../../../ExtrernalLibs/DefinitionFiles/AngularJs/angular.d.ts"/>
var eco;
(function (eco) {
    eco.app = angular.module('echonest', ['ui.bootstrap']);
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
            this.getProfile = function (id, data) {
                data = data || {};
                data.id = id;
                data.bucket = ['video', 'images'];
                return _this.query('artist/profile', data).then(function (d) {
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
            function StartCtrl($scope, echonest, $sce) {
                var _this = this;
                this.getArtist = function (id) {
                    return _this.echoService.getProfile(id).then(function (d) {
                        console.log(d);
                        return d;
                    });
                };
                this.findArtists = function (str) {
                    return _this.echoService.findArtist(str, {}).then(function (data) {
                        return data;
                    });
                };
                this.cleanYoutubeUrl = function (url) {
                    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                    var regexS = "[\\?&]v=([^&#]*)";
                    var regex = new RegExp(regexS);
                    var results = regex.exec(url);
                    if (results == null) {
                        return null;
                    } else {
                        return "//www.youtube.com/embed/" + results[1];
                    }
                };
                $sce.trustAsResourceUrl('http://www.youtube.com/');
                this.echoService = echonest;
                var _scope = $scope;
                $scope.vm = this;
                $scope.$watch('vm.selected', function (selected) {
                    console.log(typeof selected);
                    if (typeof selected === "object") {
                        _this.getArtist(selected.id).then(function (sa) {
                            _this.selectedArtist = sa;
                        });
                    }
                });
            }
            StartCtrl.$inject = ['$scope', 'echonest', '$sce'];
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
        'echonestProvider', '$sceDelegateProvider', function (_echonestProvider, $sceDelegateProvider) {
            _echonestProvider.apiKey = "7STFOVHIIXNZCEQSI";
            $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
        }]);
})(eco || (eco = {}));
//# sourceMappingURL=app.js.map
