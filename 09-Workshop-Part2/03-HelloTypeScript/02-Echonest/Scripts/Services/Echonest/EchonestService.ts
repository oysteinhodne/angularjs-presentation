/// <reference path="../../../../ExtrernalLibs/DefinitionFiles/AngularJs/angular.d.ts"/>
module eco{
    export class EchonestService {
        artists:any = {};
        query:(url:string, data:any)=>ng.IPromise<any> = (url, data) => {
            data.api_key = this.apiKey;
            data.format = 'jsonp';
            data.callback = 'JSON_CALLBACK';
            var deferred = this.$q.defer();
            this.$http({
                method: 'jsonp',
                url: this.apiUrl + url,
                params: data
            }).success((d)=>{
                deferred.resolve(d);
            });

            return deferred.promise;
        };

        findArtist = (name:string, data)=>{
            data = data || {};
            data.name = name;
            data.results = 10;
            return this.query('artist/search/', data).then((d:any)=>{
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
        getProfile = (id:string, data?)=>{
            data = data || {};
            data.id = id;
            data.bucket = ['video', 'images'];
            return this.query('artist/profile', data).then((d:any)=>{
                this.artists[data.id] = d.response.artist;
                return d.response.artist;
            });
        };

        constructor(
            public $q:ng.IQService,
            public $http:ng.IHttpService,
            public apiKey,
            public apiUrl){
        }
    }
}