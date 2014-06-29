/// <reference path="../../../../ExtrernalLibs/DefinitionFiles/AngularJs/angular.d.ts"/>
/// <reference path="../../Bootstrap/init.ts"/>
/// <reference path="EchonestInterfaces.ts"/>
/// <reference path="EchonestService.ts"/>
module eco {
    class EchonestProvider implements IEchonestProvider{
        /**
         * Configurable properties
         * */
        public apiUrl = 'http://developer.echonest.com/api/v4/';
        public apiKey:string = "";

        $get = ['$q', '$http',(_$q_:ng.IQService, _$http_:ng.IHttpService)=>{
            if(this.apiKey.length < 15){
                throw new Error("Did you forget to provide a API key for echonest? \n app.config(['echonestProvider',function(echonestProvider){" +
                    "echonestProvider.apiKey = 'yourApiKey'" +
                    "}])");
            }
            return new EchonestService(_$q_, _$http_, this.apiKey,this.apiUrl);
        }];

        /**
         * Constructor takes other providers, not instances
         * */
        constructor(){
            console.log("Provider constructor called");
        }
    }


    app.provider('echonest', EchonestProvider);
}