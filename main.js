var app = new Vue({
	el: "#app",
	data: {
		name: "",
		search: "",
		myArray: ["Lin", "Wendy", "Sinisa", "Slavik", "Rubens", "Dani", "Emi", "Santi", "Joan", "Lluis", "Vasilio"],
		members: [
			{
				name: "Lin",
				age: 32,
				country: "China"
			},
			{
				name: "Wendy",
				age: 22,
				country: "Walse"
			}, {
				name: "Vasil",
				age: 30,
				country: "Bulgaria"
			}
				],

	},
	methods: {
		sayHi: function (nameP) {
			alert("Hello" + nameP)
		},
		saygoodbye: function () {
			alert("bye! time to eat" + name);
		}
	},
	computed: {
		sayhangry: function () {
			console.log("computed" + this.name);
			return this.name;

		}
	},
	created() {
		console.log("Created!!!")
	},
	beforecreate() {
		console.log("before create!!!!")
	}
});
