console.log("ingeladen");



var app = new Vue({
	el: '#app',
	data: {
		factor1 : 1,
		factor2 : 2,
	},

});


var computed = new Vue({
	el: '#computed',

	data: {
		factor1 : 1,
		factor2 : 2,
	},
	computed: {
		vermedigvuldiging:{

	      get: function()
	      {

	      return this.factor1 * this.factor2;
	      },

	      set: function(newFactor1)
	      {
	      	console.log(newFactor1);
	      this.factor1 = newFactor1;
	      }
	    }
	},
	methods: {
		vermenigvuldig:function(){
			this.result = this.factor1 * this.factor2;
		}
	}
})


var bindExample = new Vue ({
	el: '#bindExample', 
	data: {

		selected : [],
		options : [
			{
				text: "option1", 
				value: "1",
			},
			{
				text: "option2", 
				value: "2",
			},
			{
				text: "option3", 
				value: "3",
			}
		],

	},
})




