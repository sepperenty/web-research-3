

var vm = new Vue({
	el:"#computedPropertie",
	data:{
		var : "test",
		secondVar :"no change in var",
	},
	computed:{

		returnVarComputed:function(){
			return this.var;
		},

	},
	methods:{
		returnVarMethod:function(){
			return this.var;
		},

	},

	watch: {
		var: function(val)
		{
			this.secondVar = "Changed var to " + val ;
		}
	}
	
});


