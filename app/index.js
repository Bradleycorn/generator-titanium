'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;


var TitaniumGenerator = module.exports = function TitaniumGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

/*
	this.on('end', function () {
	this.installDependencies({ npm: false, bower: false });
	});
*/
	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TitaniumGenerator, yeoman.generators.Base);


TitaniumGenerator.prototype.setVars = function setVars() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);
	console.log('I\'ll be scaffolding out a Titanium mobile app for you.');
	console.log('Out of the box your app will support:');
	console.log('- iOS (iPhone and iPad)');
	console.log('- Android');
	console.log('- Mobile web');

	this.guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});

	this.sdks = [];
	var self = this;
	exec('titanium sdk list -o json', function(error, stdout, stderr) {
		var sdkList = JSON.parse(stdout);
		for (var sdk in sdkList.installed) {
			self.sdks.push(sdk);
		};
		cb();
	});
};

TitaniumGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	var prompts = [{
	name: 'appName',
	message: 'What is the name of your app?',
	},
	{
		name: 'appId',
		message: 'And the app ID (ex: com.domain.appname)?'
	},
	{
		name: 'sdk',
		message: 'Which Titanium SDK do you want to use with this project (' + this.sdks.join() + ')?',
		default: this.sdks[0]
	},
	{
		type: 'confirm',
		name: 'createTabs',
		message: 'Shall I create a tab group for you?',
		default: true
	}];

	this.prompt(prompts, function (props) {
	this.appName = props.appName;
	this.safeAppName = this.appName.replace(/\W/g, '')
	this.appId = props.appId;
	this.sdk = props.sdk;
	this.createTabs = props.createTabs;

	cb();
	}.bind(this));
};

TitaniumGenerator.prototype.app = function app() {
	this.directory('settings', '.settings');
	this.directory('Resources', 'Resources');
};

TitaniumGenerator.prototype.templates = function templates() {
	this.template('_project', '.project');
	this.template('manifest');
	this.template('tiapp.xml');
	this.template('globals.js', 'Resources/' + this.safeAppName + ".js");
	this.template('Resources/lib/db.js');
	this.template('Resources/ui/lib/NavButton.js');
	this.template('Resources/ui/lib/WindowNav.js');
	this.template('Resources/ui/lib/ApplicationWindow.js');
	this.template('Resources/ui/common/RootTabGroup.js')
	this.template('Resources/ui/common/RootWindow.js');
};

TitaniumGenerator.prototype.templateAppjs = function templateAppjs() {
	var appjs = this.readFileAsString(path.join(this.sourceRoot(), 'app.js'));

	var initMainWindow;

	if (this.createTabs) {
		initMainWindow = "\tvar RootTabGroup = require('ui/common/RootTabGroup');\n";
		initMainWindow += "\tvar AppTabs = new RootTabGroup();\n";
		initMainWindow += "\tAppTabs.open();\n";
	} else {
		initMainWindow = "\tvar RootWindow = require('ui/common/RootWindow');\n";
		initMainWindow += "\tMainWindow = new RootWindow('<%= appName %> Main Window');\n";
		initMainWindow += "\tMainWindow.open();\n";
	}
	appjs = appjs.replace('//Init Main Window\n', "//Init Main Window\n" +  initMainWindow);
	appjs = this.engine(appjs, this);

	this.write('Resources/app.js', appjs);


}
