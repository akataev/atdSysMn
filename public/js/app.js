define(["marionette"], function(Mn) {

	var app = new Mn.Application({
		initialize: function() {
			console.log("app has started!");
		}
	});

	app.addRegions({
		mainRegion: "#main-region"
		// headerRegion: "#header-region",
		// leftSidebarRegion: "#left-sidebar-region",
		// rightSidebarRegion: "#right-sidebar-region",
		// footerRegion: "#footer-region"
	});

	// app.StaticView = Mn.ItemView.extend({
	// 	template: "#static-template"
	// });

	app.on("start", function(){

		require(["router"], function() {

			app.Router = new Router();

			if (Backbone.history){
				Backbone.history.start();
			}
		});

		// var staticView = new app.StaticView();
		// app.mainRegion.show(staticView);
	});

	return app;
});