/*global Backbone */
var app = app || {};

$(function ($) {
	'use strict';

	app.loginChannel = Backbone.Radio.channel('login');

	app.loginChannel.reply("fuckyou", "fuck you too ma'fucker!");

});