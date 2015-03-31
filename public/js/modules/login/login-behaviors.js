define([], function() {

	Mn.Behaviors.behaviorsLookup = function() {
		return window.Behaviors;
	};

	var GoToProfile = new Mn.Behavior.extend({
		defaults: {
			message: "Ept"
		}
	});
});