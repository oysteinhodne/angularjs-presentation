/// <reference path="Bootstrap/Init.ts"/>
/// <reference path="Services/Echonest/EchonestProvider.ts"/>
/// <reference path="Controllers/Controllers.ts"/>

module eco {
    app.controller(controllers);
    app.config(['echonestProvider', '$sceDelegateProvider',(_echonestProvider:IEchonestProvider,
                                                            $sceDelegateProvider:ng.ISCEDelegateProvider)=>{
        _echonestProvider.apiKey = "7STFOVHIIXNZCEQSI";
        $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
    }])
}