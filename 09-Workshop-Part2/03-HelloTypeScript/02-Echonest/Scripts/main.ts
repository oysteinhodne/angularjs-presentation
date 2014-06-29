/// <reference path="Bootstrap/Init.ts"/>
/// <reference path="Services/Echonest/EchonestProvider.ts"/>
/// <reference path="Controllers/Controllers.ts"/>

module eco {
    app.controller(controllers);
    app.config(['echonestProvider',(_echonestProvider:IEchonestProvider)=>{
        _echonestProvider.apiKey = "7STFOVHIIXNZCEQSI";
    }])
}