console.log("ingeladen");

var data = {a:1,

			numbers:[1,2,3,4,5,6,7,8,9,10]

			};

var vm = new Vue({
	el:"#example",
	data:data,
	created: function(){
		console.log("a = " + this.a);
	},
	methods:{
		evenize:function(list){
			return list.filter(function(number){
				return number % 2 ===0;
			})
		},
	},

	computed:{
		evenNumbers:function()
		{
			return this.numbers.filter(function(number){
				return number % 2 === 0;
			})
		}
	}
});

//vm.a === data.a -> true
//vm.a = 3 -> data.a === 3 -> true + vice versa

vm.$data === data //->true
vm.$el === document.getElementById('example') //->true

//$watch -> Executes function when 'watched' variable is changed

vm.$watch('a', function(newVal, oldVal){
	console.log('a is changed from ' + oldVal + ' to ' + newVal);
})



