

var exampleData = {
	title: 'hello world',
	newTodo: '',
	todos: [],
	id : 'inspect me',
}

var exampleVM = new Vue({
	el:'#example1',
	data:exampleData,
	methods:{
		addTodo: function(){
			var text = this.newTodo
			this.todos.push({text: text})
			this.newTodo=''
		},

		removeTodo: function(index){
			this.todos.splice(index,1)
		}
	}


})