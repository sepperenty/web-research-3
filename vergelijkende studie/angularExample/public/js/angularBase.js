


(function(){
console.log("angularbase ingeladen");



	angular.module('angularTest', [])
		.controller('cardsController', ['$scope', function($scope) {
		 	 $scope.currentId = "5";
		}])

		.directive('myCustomer',["$http", function($http) {
		  return {
		    templateUrl: '/templates/cards.html',
		    controller: function($scope){
		    	var vm = this;
		    	vm.cards = {};

		    	this.updateCards = function(){
		    	console.log("update cards");
			    		$http({
						url: "/api/cards",
						method:"GET",
						}).success(function(data){
							vm.cards = data;

						});

		    	};
		    	this.changeId = function(newId){
		    		$scope.currentId = newId;
		    	};

		    	this.updateCards();
		    	



		    }, controllerAs: "cardsCtrl"

		  };
		}])

		.directive('cardInfo',["$http", function($http) {
		  return {
			    templateUrl: "/templates/cardInfo.html",
			    controller: function($scope){
		    	var vm = this;
		    	vm.card = {};

		    	this.updateCard = function(){
		    	console.log("update cards");
			    		$http({
						url: "/api/cards/"+ $scope.currentId,
						method:"GET",
						}).success(function(data){
						
							vm.card = data;
						});
		    	}
		    	this.updateCard();

		    	$scope.$watch("currentId", function (val) {
		    		vm.updateCard();
		    	});
		    	
		    }, controllerAs: "cardInfoCtrl"
			  };
		}]);




})();