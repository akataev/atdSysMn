requirejs.config({
	baseUrl: "js",
	paths: {
		utils: "utils/js/base",
		jquery: "bower_components/jquery/dist/jquery.min",
		json2: "bower_components/json2/json2",
		underscore: "bower_components/underscore/underscore",
		backbone: "bower_components/backbone/backbone",
		marionette: "bower_components/backbone.marionette/lib/backbone.marionette.min",
		marionette_radio: "bower_components/backbone.radio/src/backbone.radio",
		doTCompiler: "bower_components/doT/doT",
		text: "bower_components/requirejs-text/text",
		doT: "bower_components/requirejs-doT/doT",
		css: "bower_components/require-css/css",
		app: "app",
		router: "routers/router"
	},
	shim: {
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["jquery", "underscore", "json2"],
			exports: "Backbone"
		},
		marionette: {
			deps: ["backbone"],
			exports: "Marionette"
		},
		marionette_radio: {
			deps: ["marionette"],
			exports: "Marionette.Radio"
		},
		text: {
			deps: ["jquery"]
		},
		css: {
			deps: ["jquery"]
		},
		doT: {
			deps: ["doTCompiler", "text"],
			exports: "doT"
		},
		app: {
			deps: ["marionette"]
		},
		router: {
			deps: ["app"]
		}
	}
});

require(["app"], function(app){
	app.start();
});