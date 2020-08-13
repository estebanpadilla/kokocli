/**
* @name helpers.js
* @file Add a small description for this file.
* @author Your Name <Your Email>
* @version 1.0.0
*/

var helpers = {};

helpers.capitalizeFirstLetter = function (string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = helpers;
