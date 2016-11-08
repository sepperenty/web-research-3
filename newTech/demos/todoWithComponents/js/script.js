



var exampleData = {
	title: 'hello world',
	newTodo: '',
	todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ],
	id : 'inspect me',
};

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li><button v-on:click="removeTodo($index)">X</button>'
})


var exampleVM = new Vue({
	el:'#todo',
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
});

