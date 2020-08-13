#!/usr/bin/env node

/**
* @name main.js
* @file Add a small description for this file.
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 0.0.1
* How to run on developement: node cli.js Commands Parameters
*/

var coco = require('./coco');

function start() {

	var isOK = false;
	var args = process.argv.slice(2);

	const command = args[0];
	const name = args[1];

	switch (command) {
		case '-htmljs':
			coco.addHtmlJS();
			isOK = true;
			coco.closeReadLine();
			break;
		case '-stats':
			coco.addStats();
			isOK = true;
			coco.closeReadLine();
			break;
		case '-js':
			coco.createJS(name);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-html':
			coco.createHTML(name);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-css':
			coco.createCSS(name);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-class':
			coco.createClass(name);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-email':
			coco.saveEmail(name);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-author':
			coco.saveAuthor(name + ' ' + args[2]);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-proj':
		case '-p':
			coco.createProject(name);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-wp':
			coco.createWebpackProject(name);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-game':
		case '-g':
			coco.createGame(name);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-help':
		case '-h':
			coco.showHelp();
			isOK = true;
			coco.closeReadLine();
			break;
		case '-version':
		case '-v':
			coco.showVersion();
			isOK = true;
			coco.closeReadLine();
			break;
		case '-config':
			isOK = coco.setupConfiguration();
			break;
		default:
			break;
	}

	if (!isOK) {
		var msj = '-> Error on command!';
		console.log(msj);
		coco.closeReadLine();
	}
}

start();
