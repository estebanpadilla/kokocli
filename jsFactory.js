var helpers = require('./libs/helpers');

var jsFactory = {};

jsFactory.createJS = function (name, configuration) {
    return `/**
* @name ${name}
* @file Add a small description for this file.
* @author ${configuration.author} ${configuration.email}
* @version 1.0.0
*/`;
}

jsFactory.createClass = function (name, configuration) {
    var className = helpers.capitalizeFirstLetter(name);
    return `/**
* @name ${className} 
* @extends
* @file ${name}.js
* @author ${configuration.author} ${configuration.email} 
* @version 1.0.0
*/
class ${className} {
    /**
    * @param {data type} name - description.
    */
    constructor() {
        
    }
}`;
}

jsFactory.createJSForGame = function (configuration) {
    return `/**
* @name main.js
* @file Add a small description for this file.
* @author ${ configuration.author }, ${ configuration.email }
* @version 1.0.0
*/

"use strict"

window.addEventListener('load', init, false);

function init() {
    console.log('Game running!');

    //Add Stats
    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    
    var requestId;
    
    function update() {
        stats.begin();

        //Add here your game code that needs to be update every frame.
        stats.end();

        requestId = requestAnimationFrame(update);
    }

    update();

    //Add here your game code that does not needs to be update every frame.
}`;
}

jsFactory.createJSForProject = function (configuration) {
    return `/**
* @name main.js
* @file Add a small description for this file.
* @author ${ configuration.author }, ${ configuration.email }
* @version 1.0.0
*/

"use strict";

window.addEventListener('load', init, false);

function init() {
    console.log('App running!');
    //1. Declare variables
    //2. Initialize variables
    //3. Events
    //4. Program Logic
}`;
}

jsFactory.createAppJSForWPProject = function (configuration) {
 return `/**
* @name main.js
* @file Add a small description for this file.
* @author ${ configuration.author }, ${ configuration.email }
* @version 1.0.0
*/

"use strict";

import '../css/style.css';
import '../index.html'

window.addEventListener('load', init, false);

function init() {
    console.log('App running!');
    //1. Declare variables
    //2. Initialize variables
    //3. Events
    //4. Program Logic
}`;
}


module.exports = jsFactory;
