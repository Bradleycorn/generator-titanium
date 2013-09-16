//UserPlatform
//Stores the value of Ti.Platform.osname so that we don't have to
//have to make a native call everytime we need to do device specific things.
<%= safeAppName %>.UserPlatform = Ti.Platform.osname;

//UserOS
//Stores the OS that the user is running. This is more generic than UserPlatform.
// i.e. iOS instead of iphone or iPad
switch (<%= safeAppName %>.UserPlatform) {
	case 'android':
		<%= safeAppName %>.UserOS = 'android';
		break;
	case 'iphone':
	case 'ipad':
		<%= safeAppName %>.UserOS = 'ios';
		break;
	default:
		<%= safeAppName %>.UserOS = "unknown";
}

/*
 * DEVICE WIDTH AND HEIGHT
 * The DeviceWidth and DeviceHeight variable are set assuming portrait mode.
 * This is done on purpose so we can always assume that height > width.
 * When using device width/height to determine things like "is tablet",
 * we can automatically check the DeviceHeight value to get the max screen size.
 */

//DeviceWidth
//Stores the device width in Portrait mode
<%= safeAppName %>.DeviceWidth = (Ti.Platform.displayCaps.platformWidth < Ti.Platform.displayCaps.platformHeight) ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight;

//DeviceHeight
//Stores the device width in Portrait mode
<%= safeAppName %>.DeviceHeight = (Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight) ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight;

//IsTablet
//This is set to true if the device's largest dimension (i.e. DeviceHeight) is at least 900.
<%= safeAppName %>.IsTablet = (<%= safeAppName %>.UserPlatform === 'ipad' || (<%= safeAppName %>.UserPlatform === 'android' && (<%= safeAppName %>.DeviceHeight > 899)));

//<%= safeAppName %>.Debug
//Useful for ... debugguing
<%= safeAppName %>.Debug = true;

//DatabaseName
//The name of the app database.
<%= safeAppName %>.DatabaseName = '<%= safeAppName %>';

//Util Namespace to hold utility values
<%= safeAppName %>.Util = {};

<%= safeAppName %>.Util.Months = [{name: "January",abbr: "Jan"},{name: "February",abbr: "Feb"},{name: "March",abbr: "Mar"},{name: "April",abbr: "Apr"},{name: "May",abbr: "May"},{name: "June",abbr: "Jun"},{name: "July",abbr: "Jul"},{name: "August",abbr: "Aug"},{name: "September",abbr: "Sep"},{name: "October",abbr: "Oct"},{name: "November",abbr: "Nov"},{name: "December",abbr: "Dec"}];

//UI Namespace to hold common user interface values
<%= safeAppName %>.UI = {};

//WindowBackground
//Common background color/image to use across all app windows
<%= safeAppName %>.UI.WindowBackground = '#fff';

//NavBarColor
//Background Color to use for Window Nav Bars on iOS
//(Android is handled by the Android Action Bar theme, set in the tiapp.xml)
<%= safeAppName %>.UI.NavBarColor = '#33b5e5';
