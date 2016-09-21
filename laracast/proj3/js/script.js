


var data = {
	points: 300,
	first: "Seppe",
	last: "Renty",
};

var computed = {
	skill: function(){
		
		if (this.points <= 100)
		{
			return "beginner";
		}
		else
		{
			return "advanced";
		}
	},

	fullname: function(){
		return this.first + " " + this.last;
	},
};

new Vue({
	el:"#app",
	data:data,
	computed:computed,

	/*watch: {
		first: function(first){
			
			this.fullname = first + " " + this.last;
		},

		last: function(last){
			
			this.fullname = this.first + " " + last;
		}
	},*/

	
});


