describe("EchonestProvider", function(){
    var app;
    var echonestProvider;
    beforeEach(function(){
        var fake = angular.module('fakeModule', []);
        fake.config(['echonestProvider',function(ep){
            echonestProvider = ep;
        }]);
        module('echonest', 'fakeModule');
        inject(function(){});
    });
    it("should be defined", function(){
        expect(echonestProvider).toBeDefined();
    });

    it("should have a $get method", function(){
        expect(typeof echonestProvider.$get).toEqual("object");
    });
});

describe("EchonestService", function(){
    var s;
    beforeEach(module('echonest'));
    beforeEach(inject(function(echonest){
        s = echonest;
    }));

    it("should be defined", function(){
        expect(s).toBeDefined();
    });

    it("should have a apiKey property", function(){
        expect(s.apiKey).toBeDefined();
    });

    it("should have a base url property", function(){
        expect(s.apiUrl).toBeDefined();
    });

});