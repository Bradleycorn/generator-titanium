module.exports = function(LabelContent) {

	var Window = require('ui/lib/ApplicationWindow');
	var self = new Window('<%= appName %>');

	var view = Ti.UI.createView();
	var label = Ti.UI.createLabel({
		color: '#000',
		text: LabelContent,
		height: 'auto',
		width: 'auto'
	});

	view.add(label);
	self.add(view);

	return self;
}
