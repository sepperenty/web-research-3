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







Vue.component('reverse-input', {
		 props: ['name'],
		template: '<div> <input type=text v-model = "message"> </div> <p> {{reverseMessage}} : {{name}}</p>',
	  	data : function(){
	  	return {
	  		message : "reverse this input",
	  		}
  		},
  		computed: {
  			reverseMessage : function(){
  				console.log(this.name);
  				return this.message.split('').reverse().join('');
  			}
  		},


});


var brug = new Vue()



Vue.component('color-input-field', {
	template: '<div><input type="text" name="color" v-model="color"></div>',
	data : function(){
		return { color: "" }
	}, 
	watch: {
	    color: function (val) {
	      this.$emit('color-change', this.color);

	      brug.$emit('color-change', this.color);

	    },
	}

});


Vue.component('extern-component', {
	template:'<div><p v-bind:style="backstyle">{{backstyle}}</p></div>',
	data: function(){
		return {backstyle : "background-color : green"}
	},
	created: function () {
   
		brug.$on('color-change', function (newColor) {

		 	console.log(this.backstyle);
		 	
		})
   
  	}
});


Vue.component('parent', {
	template: '<div  v-bind:style="color"> <color-input-field v-on:color-change="changeColor"> </color-input-field> </div>',
	data : function(){
		return { color: "background-color : blue" }
	}, 
	methods: {
		changeColor:function(color){
			this.color = "background-color :" + color;
		},
	}
	

})






new Vue({
	el:'#componentExample',
 	
})

