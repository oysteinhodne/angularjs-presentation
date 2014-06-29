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

        cleanYoutubeUrl = function(url){
                name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
                var regexS = "[\\?&]v=([^&#]*)";
                var regex = new RegExp( regexS );
                var results = regex.exec( url );
                if( results == null ){
                    return null;
                }
                else{
                    console.log(results[1]);
                    return "//www.youtube.com/embed/" + results[1];
                }
        };

        static $inject = ['$scope', 'echonest', '$sce'];
        constructor($scope, echonest:EchonestService, $sce:ng.ISCEService){
            $sce.trustAsResourceUrl('http://www.youtube.com/');
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