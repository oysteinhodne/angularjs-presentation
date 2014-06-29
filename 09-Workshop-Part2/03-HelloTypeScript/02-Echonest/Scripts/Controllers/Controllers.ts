/// <reference path="../Services/Echonest/EchonestService.ts"/>
module eco.controllers {
    export class StartCtrl {
        echoService:EchonestService;
        artists: any[];
        selected: any;
        selectedArtist: any;
        getArtist = (id)=>{
            return this.echoService.getProfile(id).then((d)=>{
                console.log(d);
                return d;
            });
        };
        findArtists = (str:string)=>{
            return this.echoService.findArtist(str, {}).then((data)=>{
                return data;
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
                    return "//www.youtube.com/embed/" + results[1];
                }
        };

        static $inject = ['$scope', 'echonest', '$sce'];
        constructor($scope, echonest:EchonestService, $sce:ng.ISCEService){
            $sce.trustAsResourceUrl('http://www.youtube.com/');
            this.echoService = echonest;
            var _scope = $scope;
            $scope.vm = this;
            $scope.$watch('vm.selected', (selected:any) =>{
                console.log(typeof selected);
                if(typeof selected === "object"){
                    this.getArtist(selected.id).then((sa)=>{
                        this.selectedArtist = sa;
                    });

                }
            });
        }
    }
}