console.log("base is ingeladen");


Vue.component('card', {
	template : "#cardTemplate",
	data: function(){
		return {list : [], 
				newId : "5", 
				selectedCard : "", 
				newTitle:"", 
				newBody:""}
	},

	created : function(){
		this.update();

	},
	methods: {
		update : function(){
			var vm = this;
			$.getJSON('/api/cards', function(cards){
				vm.list = cards;
			})
		},

		changeId : function(value){
			var vm = this;
			vm.newId = value;
			$.getJSON('/api/cards/'+value, function(data){
				vm.selectedCard =  data;
			})
		},
		
		addCard : function(){
			var vm = this;
			var token = $('#token').val();
			console.log(token);
			$.post( "/api/cards/"+vm.newId+"/update", { title: vm.newTitle, body: vm.newBody, '_token': token  } );
			this.update();
		}
	},
});




var vueExample = new Vue({
	el:"#vueExample",

});	