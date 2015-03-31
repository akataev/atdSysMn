define(["app"], function(app) {

	Router = Mn.AppRouter.extend({

		routes: {
			"login": "showLoginPage",
			"profile/:userId": "showProfile",
			"subject/:subjectId": "showSubject",
			"subject/:subjectId/:subjectDate": "showSubjAttendance"
		},

		initialize: function() {
			console.log("router init");
		},

		showLoginPage: function() {
			console.log("Login");

			require(["./modules/login/login-view"], function() {
				var loginView = new LoginView();
				app.mainRegion.show(loginView);
			});

			

			// var kk = app.loginChannel.request("fuckyou");

			// console.log(kk);


			// 1. Compile template function
			// var tempFn = doT.template("<h1>Here is a sample template {{=it.foo}}</h1>");
			// 2. Use template function as many times as you like
			// var resultText = tempFn({foo: 'with doT'});
			// console.log(resultText);

		},
		showProfile: function(userId) {
			console.log("Profile "+userId);
		},
		showSubject: function(subjectId) {
			console.log("Subject "+subjectId);
		},
		showSubjAttendance: function(subjectId, subjectDate) {
			console.log("SubjAttendance "+subjectId+ " " +subjectDate);
		},

		defaultAction: function() {
			console.log("ssdsd");
		}
	});
	
	return Router;

});