function NavButton(title, icon) {
	this.Title = title;
	this.Icon = icon;
	this.ClickHandler = null;
	this.iOS = {
		ButtonStyle: (<%= safeAppName %>.UserPlatform === 'iphone') ? Titanium.UI.iPhone.SystemButtonStyle.PLAIN : null,
		SystemStyle: null,
		ShowIcon: false,
		ShowAsLeftNavButton: false,
		ShowAsRightNavButton: false
	};
	this.Android = {
		Action: (<%= safeAppName %>.UserPlatform === 'android') ? Ti.Android.SHOW_AS_ACTION_IF_ROOM : null,
		ShowIcon: true
	};
}


NavButton.prototype.GetAndroidButton = function() {
	var AndroidButton = {};
	AndroidButton.showAsAction = this.Android.Action;
	if (this.Android.ShowIcon)
		AndroidButton.icon = this.Icon;
	else
		AndroidButton.title = this.Title;

	return AndroidButton;
};

NavButton.prototype.GetIOSButton = function() {
	if (this.iOS.SystemStyle != null) {
		return Ti.UI.createButton({systemButton: this.iOS.SystemStyle});
	} else {
		var IOSButton = {};
		IOSButton.style = this.iOS.ButtonStyle;
		if (this.iOS.ShowIcon)
			IOSButton.icon = this.Icon;
		else
			IOSButton.title = this.title;

		return Ti.UI.createButton(IOSButton);
	}
};

module.exports = NavButton;
