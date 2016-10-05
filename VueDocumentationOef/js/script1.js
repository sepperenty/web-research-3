console.log("ingeladen");

var data = {a:1};

var vm = new Vue({
	el:"#example",
	data:data,
	created: function(){
		console.log("a = " + this.a);
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

//lifecycle hooks -> Vue instances goes through a series of initializations + it will invoke some lifecycle hooks wich you can give custom logic
//F.E : the created, mounted, updated, and destroyed.


//TEMPLATE SYNTAX

