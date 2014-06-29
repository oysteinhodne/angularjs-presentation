/// <reference path="../Services/Echonest/EchonestService.ts"/>
module eco.controllers {
    export class StartCtrl {
        echoService:EchonestService;

        searchString:string;
        artists: any[];
        selectedArtist: any;
        getArtist = (id)=>{
            this.echoService.getProfile(id).then((d)=>{
                this.selectedArtist = d;
            });
        };

        constructor($scope, echonest:EchonestService){
            this.echoService = echonest;
            var _scope = $scope;
            $scope.vm = this;
            $scope.$watch('vm.searchString', (name:string) =>{
                name = name || "";
                if(name.length > 3){
                    this.echoService.findArtist(name, {}).then((data)=>{
                        console.log(data);
                        this.artists = data;
                    });
                }
            });
        }
    }
}