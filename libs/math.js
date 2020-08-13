/**
* @name lib/math.js
* @file Add a small description for this file.
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/

//App object
var math = {};

math.getRandonBetween = function (min, max) {
	return Math.floor((Math.random() * (max - min + 1)) + min);
}

//Export the library
module.exports = math;