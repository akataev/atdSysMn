define(["app", "doTCompiler", "doT!./login", 
		"./login-behaviors", "css!./login"], function(app, doT, loginTemplate) {

	
	
	LoginView = Mn.ItemView.extend({

		// ui: {
		// 	"login": "#loginBtn" 
		// },

		// behaviors: {
		// 	GoToProfile: {
		// 		message: "Welcome"
		// 	}
		// },

		template: loginTemplate,

		initialize: function () {

			console.log("login loaded");
		},

		onRender: function() {
			console.log("render");
		}
	});

	return LoginView;
});