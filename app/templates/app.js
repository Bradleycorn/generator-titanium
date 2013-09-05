var <%= safeAppName %> = {};

(function() {
	Ti.API.info('<%= appName %> - Starting Application and loading global variables');
	Ti.include('<%= safeAppName %>.js');
	Ti.API.info('<%= appName %> is Running on: ' + <%= safeAppName %>.UserPlatform + '(' + <%= safeAppName %>.UserOS + ')');


	var FirstRun = Ti.App.Properties.getBool("FirstRun", true);
	Ti.API.info("<%= appName %> - FirstRun: " + FirstRun);
	if (FirstRun) {
		//Perform one time app initialization functions (DB creation, etc) here

		//Create the Database.
		//var db = require('lib/db');
		//db.CreateDatabase(Ti.App.version);

		Ti.App.Properties.setBool("FirstRun", false);
	}

	//Init Main Window

	Ti.API.info('<%= appName %> initialized');
})();
