
new Vue({
  el: '#example',
  data: {
  			message: "hello",
  		}
})




var newComponent = Vue.extend({
  template: '<div>{{ message }}</div>',
  data: function () {
    return {
      message: 'hello'
    }
  }
})




var app = new Vue({
  el: '#app',
  data: {
    message: 'hello world'
  }
})


methods: {
    methode: function () {
      console.log("uitgevoerd")
    }



Vue.component('myComponent', {
  template: '<p>Inhoud component</p>'
})


Vue.component('myComponent', {
 
  props: ['componentProp'],
  template: '<li>{{ componentProp.text }}</li>'

})





var data = { kop :"text",}


var vm = new Vue({
  data: data
})



var vm = new Vue({
  data: { kop :"text",}
})



vm.$watch('kop', function (newVal, oldVal) {
 	//dit wordt uitgevoegd bij een wijziging van de kop variabele
})




var vm = new Vue({
  data: {
   kop: "tekst"
  },
  created: function () {
    
    console.log(this.kop);
  }
})

