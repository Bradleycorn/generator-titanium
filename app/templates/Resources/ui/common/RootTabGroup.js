module.exports = function() {
	var self = Ti.UI.createTabGroup();
	var Window = require('ui/common/RootWindow');

	var Window1 = new Window('First Tab');
	var Tab1 = Ti.UI.createTab({
		title: 'Tab 1',
		window: Window1
	});
	Window1.containingTab = Tab1;

	var Window2 = new Window('Second Tab');
	var Tab2 = Ti.UI.createTab({
		title: 'Tab 2',
		window: Window2
	});
	Window2.containingTab = Tab2;


	self.addTab(Tab1);
	self.addTab(Tab2);

	/* SETUP MENUS AND NAV ITEMS FOR ANDROID AND IOS */
	var NavButton = require('ui/lib/NavButton');
	var WindowNav = require('ui/lib/WindowNav');

	//If you want iOS Nav buttons on the root level window,
	//they have to be added to each tab widow. So, let's
	//create an array of the tab windows that we can pass
	//to our iOS nav setup method
	var WindowList = [];
	for (var i=0; i<self.tabs.length; i++) {
		WindowList.push(self.tabs[i].window);
	}

	WindowNav.SetupActionBar(self, '<%= appName %>', false);
	//WindowNav.SetupIOSNav(WindowList);

	return self;
};
