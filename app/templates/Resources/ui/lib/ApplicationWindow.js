module.exports = function(Title, Layout) {
	var windowSettings = {
		backgroundColor: <%= safeAppName %>.UI.WindowBackground,
		title: Title,
		barColor: <%= safeAppName %>.UI.NavBarColor
	};

	if (Layout != undefined)
		windowSettings.layout = Layout;

	var self = Ti.UI.createWindow(windowSettings);

	return self;
};

