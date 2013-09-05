exports.SetupActionBar = function(Window, Title, ShowBackButton, NavButtons) {
	var i, AndroidButton;

	//Handle a case where there are no nav buttons
	if (NavButtons == undefined)
		NavButtons = [];

	//SETUP ANDROID ACTION BAR AND NAV ITEMS
	//	Action Bar Setup
	if (<%= safeAppName %>.UserPlatform === 'android') {
		Window.addEventListener("open", function() {
			//Setup the Main Action Bar
			var Activity = Window.getActivity();
		    if (! Activity) {
		        Ti.API.error("Can't access action bar on a lightweight window.");
		    } else {
		        var ActionBar = Activity.actionBar;
		        if (ActionBar) {
		            ActionBar.title = Title;
		            ActionBar.displayHomeAsUp = ShowBackButton;

		            if (ShowBackButton) {
			            ActionBar.onHomeIconItemSelected = function() {
			                Window.close();
			            };
		            }
		        }
		    }

			//Add Nav Buttons to Action Bar
			if (NavButtons.length > 0) {
				Activity.onCreateOptionsMenu = function(e) {
					for (i=0;i<NavButtons.length;i++) {
						AndroidButton = e.menu.add(NavButtons[i].GetAndroidButton());
						AndroidButton.addEventListener('click', NavButtons[i].ClickHandler);
					}
				};
			}
		});
	}
};

exports.SetupIOSNav = function(Window, NavButtons) {
	var i, j, IOSButton;

	//SETUP IPHONE NAV ITEMS
	if (<%= safeAppName %>.UserPlatform === 'iphone') {
		for (i=0;i<NavButtons.length;i++) {
			if (NavButtons[i].iOS.ShowAsLeftNavButton || NavButtons[i].iOS.ShowAsRightNavButton) {
				IOSButton = NavButtons[i].GetIOSButton();
				IOSButton.addEventListener('click', NavButtons[i].ClickHandler);

				if (Window.length > 0) {
					for (j=0;j<Window.length;j++) {
						if (NavButtons[i].iOS.ShowAsLeftNavButton)
							Window[j].setLeftNavButton(IOSButton);
						else //(NavButtons[i].iOS.ShowAsRightNavButton()
							Window[j].setRightNavButton(IOSButton);
					}
				} else {
					if (NavButtons[i].iOS.ShowAsLeftNavButton)
						Window.setLeftNavButton(IOSButton);
					else //(NavButtons[i].iOS.ShowAsRightNavButton()
						Window.setRightNavButton(IOSButton);
				}
			}
		}
	}
};
