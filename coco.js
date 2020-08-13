/**
 * @name coco.js
 * @file Charge of creating and saving files.
 * @author Esteban Padilla <ep@estebanpadilla.com>
 * @version 1.7.6
 * @todo Add fileManager. configutationManager y errorManager.
 */

var helpers = require('./libs/helpers');
var fs = require('fs');
var path = require('path');

const readline = require('readline');
const htmlFactory = require('./htmlFactory');
const jsFactory = require('./jsFactory');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var coco = {};
var version = 'v 0.0.1';

coco.saveEmail = function (email) {
    loadConfiguration().then(function (configuration) {
        configuration.email = email;
        saveConfiguration(configuration);
    }).catch(function (reject) {
        //Do nothing here for now.
        var msj = '-> Error saving email, you may need to use sudo';
        console.log(msj);
    });
}

coco.saveAuthor = function (author) {
    loadConfiguration().then(function (configuration) {
        configuration.author = author;
        saveConfiguration(configuration)
    }).catch(function (reject) {
        //Do nothing here for now.
        var msj = '-> Error saving author, you may need to use sudo';
        console.log(msj);
    });
}

function loadConfiguration() {
    return new Promise(function (resolve, reject) {
        var file = fs.readFile((__dirname + '/configuration.json'), function (err, data) {
            if (err) {
                var msj = '-> There is not configuration available.';
                console.log(msj);
                reject(null);
            } else {
                var configuration = JSON.parse(data);
                resolve(configuration)
            }
        });
    });
}

function saveConfiguration(configuration) {
    try {
        var buffer = Buffer.from(JSON.stringify(configuration), 'utf8');
        fs.writeFileSync(path.resolve(__dirname, './configuration.json'), buffer);
        var msj = '-> Configuration saved, you can use the same command to change it anytime!';
        console.log(msj);
    } catch (error) {
        var msj = '-> There was an error saving configuration, sorry.';
        console.log(msj);
    }
}

coco.createHTML = function (name) {
    var buffer = Buffer.from(htmlFactory.createHTML(name), 'utf8');
    fs.writeFileSync(path.resolve(process.cwd(), (name + '.html')), buffer);
    var msj = '-> html file created!';
    console.log(msj);
}

coco.createCSS = function (name) {
    var buffer = Buffer.from('/* Add your amazing style here! */', 'utf8');
    fs.writeFileSync(path.resolve(process.cwd(), (name + '.css')), buffer);
    var msj = '-> css file created!';
    console.log(msj);
}

coco.createJS = function (name) {

    loadConfiguration().then(function (configuration) {

        var buffer = Buffer.from(jsFactory.createJS(name, configuration), 'utf8')
        fs.writeFileSync(path.resolve(process.cwd(), (name + '.js')), buffer);

        var msj = '-> javascript file created!';
        console.log(msj);

    }).catch(function (reject) {
        //Do nothing here for now.
        var msj = '-> Error loading configuration file.';
        console.log(msj);
    });
}

coco.createClass = function (name) {

    loadConfiguration().then(function (configuration) {

        var buffer = Buffer.from(jsFactory.createClass(name, configuration), 'utf8');
        fs.writeFileSync(path.resolve(process.cwd(), (name + '.js')), buffer);

        var msj = '-> es6 class created!';
        console.log(msj);

    }).catch(function (reject) {
        //Do nothing here for now.
    });
}

coco.addHtmlJS = function () {
    var dir = path.resolve(process.cwd());
    fs.mkdir(dir + '/js/libs', function (err) {
        if (err) {
            if (err.code === 'EEXIST') {
                addHtmlJSFile(dir);
            } else {
                console.log('Error creating folder libs:', err);
            }
        } else {
            addHtmlJSFile(dir);
        }
    });
}

function addHtmlJSFile(dir) {
    fs.readFile(__dirname + '/libs/html.js', 'utf8', function (err, file) {
        if (err) {
            console.log('Error reading html.js file in: ' + __dirname);
        } else {
            fs.writeFileSync((dir + '/js/libs/html.js'), file);
            addReferenceToIndex('/js/libs/html.js');
        }
    });
}

coco.addStats = function () {
    var dir = path.resolve(process.cwd());
    fs.mkdir(dir + '/js/libs', function (err) {
        if (err) {
            if (err.code === 'EEXIST') {
                addStatsFile(dir);
            } else {
                console.log('Error creating folder libs:', err);
            }
        } else {
            addStatsFile(dir);
        }
    });
}

function addStatsFile(dir) {
    fs.readFile(__dirname + '/libs/stats.js', 'utf8', function (err, file) {
        if (err) {
            console.log('Error reading stats.js file in: ' + __dirname);
        } else {
            fs.writeFileSync((dir + '/js/libs/stats.js'), file);
            addReferenceToIndex('/js/libs/stats.js');
        }
    });
}

function addReferenceToIndex(name) {
    var dir = path.resolve(process.cwd());
    console.log('path:', dir);
    fs.readFile(dir + '/index.html', 'utf8', function (err, file) {
        if (err) {
            console.log('Error reading index.html file in: ' + dir);
        } else {
            var n = file.search("</head>");
            var b = `    <script src="${name}"></script>\n`;
            var output = [file.slice(0, n), b, file.slice(n)].join('');
            fs.writeFileSync((dir + '/index.html'), output);
        }
    });
}

coco.createProject = function (name) {
    loadConfiguration().then(function (configuration) {
        var dir = path.resolve(process.cwd(), name);
        var isOK = true;
        fs.mkdir(dir, function (err) {
            if (err) {
                console.log('Error creating project, check if a project with the same name already exist.');
            } else {
                //addExtraFiles(dir);
                fs.mkdir(dir + '/js', function (err) {
                    if (err) {
                        console.log('Error creating js dir on project.');
                    } else {
                        fs.mkdir(dir + '/css', function (err) {
                            if (err) {
                                console.log('Error creating css dir on project.');
                            } else {
                                var buffer = Buffer.from(createCSSForProject(configuration), 'utf8');
                                fs.writeFileSync((dir + '/css/style.css'), buffer);

                                buffer = Buffer.from(jsFactory.createJSForProject(configuration), 'utf8');
                                fs.writeFileSync((dir + '/js/main.js'), buffer);

                                buffer = Buffer.from(htmlFactory.createHTMLForProject(name), 'utf8');
                                fs.writeFileSync((dir + '/index.html'), buffer);

                                var msj = '-> project created!';
                                console.log(msj);
                            }
                        });
                    }
                });
            }
        });
    }).catch(function () {

    });
}

coco.createWebpackProject = function (name) {
    loadConfiguration().then(function (configuration) {
        var dir = path.resolve(process.cwd(), name);
        var isOK = true;
        fs.mkdir(dir, function (err) {
            if (err) {
                console.log('Error creating project, check if a project with the same name already exist.');
            } else {

                fs.mkdir(dir + '/dist', function (err) {
                    if (err) {
                        console.log('Error creating dis dir on project: ', err);
                    } else {
                        //addExtraFiles(dir);
                        fs.mkdir(dir + '/js', function (err) {
                            if (err) {
                                console.log('Error creating js dir on project.');
                            } else {
                                fs.mkdir(dir + '/css', function (err) {
                                    if (err) {
                                        console.log('Error creating css dir on project.');
                                    } else {
                                        var buffer = Buffer.from(createMainForWebpackProject(configuration), 'utf8');
                                        fs.writeFileSync((dir + '/dist/bundle.js'), buffer);

                                        buffer = Buffer.from(createPackageForProject(configuration, name), 'utf8');
                                        fs.writeFileSync((dir + '/package.json'), buffer);

                                        buffer = Buffer.from(createWebPackConfigFile(configuration, name), 'utf8');
                                        fs.writeFileSync((dir + '/webpack.config.js'), buffer);

                                        buffer = Buffer.from(createCSSForProject(configuration), 'utf8');
                                        fs.writeFileSync((dir + '/css/style.css'), buffer);

                                        buffer = Buffer.from(jsFactory.createAppJSForWPProject(configuration), 'utf8');
                                        fs.writeFileSync((dir + '/js/main.js'), buffer);

                                        buffer = Buffer.from(htmlFactory.createHTMLForWebpackProject(name), 'utf8');
                                        fs.writeFileSync((dir + '/index.html'), buffer);

                                        var msj = '-> webpack project created!';
                                        console.log(msj);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }).catch(function () {

    });
}

coco.createGame = function (name) {
    loadConfiguration().then(function (configuration) {
        var dir = path.resolve(process.cwd(), name);
        fs.mkdir(dir, function (err) {
            if (err) {
                console.log('-> Error creating game, check if a game with the same name already exist.');
            } else {

                addExtraFiles(dir);

                var buffer = Buffer.from(jsFactory.createJSForGame(configuration), 'utf8');
                fs.writeFileSync((dir + '/js/main.js'), buffer);

                buffer = Buffer.from(htmlFactory.createHTMLForGame(name), 'utf8');
                fs.writeFileSync((dir + '/index.html'), buffer);

                //buffer = new Buffer(createSimpleCSS(), 'utf8');
                //fs.writeFileSync((dir + '/style.css'), buffer);

                var msj = '-> game created!';
                console.log(msj);
            }
        });
    }).catch(function () {

    });
}

function addExtraFiles(dir) {
    fs.mkdir(dir + '/js', function (err) {
        if (err) {
            console.log('Error creating folder /js');
        } else {
            fs.mkdir(dir + '/js/libs', function (err) {
                if (err) {
                    console.log('Error creating folder libs.');
                } else {
                    fs.readFile(__dirname + '/libs/cocoColors.js', 'utf8', function (err, colors) {
                        if (err) {
                            console.log('Error reading cocoColors file in: ' + __dirname);
                        } else {

                            fs.writeFileSync((dir + '/js/libs/colors.js'), colors);

                            fs.readFile(__dirname + '/libs/stats.js', 'utf8', function (err, stats) {
                                if (err) {
                                    console.log('Error reading stats file in: ' + __dirname);
                                } else {
                                    fs.writeFileSync((dir + '/js/libs/stats.js'), stats);
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    fs.mkdir(dir + '/css', function (err) {
        if (err) {
            console.log('-> Error creating folder css');
        } else {
            fs.readFile(__dirname + '/libs/style.css', 'utf8', function (err, style) {
                if (err) {
                    console.log('-> Error reading style file');
                } else {
                    fs.writeFileSync((dir + '/css/style.css'), style);
                }
            });
        }
    });
}

function createPackageForProject(configuration, name) {
    var text = `
{
    "name": "${name}",
    "version": "1.0.0",
    "description": "",
    "main": "main.js",
    "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1",
        "start": "webpack-dev-server",
        "build": "webpack -p"
    },
    "author": "Add your name here",
    "license": "MIT",
    "dependencies": {},
    "devDependencies": {
        "css-loader": "*",
        "style-loader": "*",
        "html-loader": "*",
        "webpack": "*",
        "webpack-cli": "*",
        "webpack-dev-server": "*"
    }
}`;
    return text;
}

function createWebPackConfigFile(configuration, name) {
    var text = `
var path = require('path');

module.exports = {
    entry:"./js/main.js",
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:"bundle.js",
        publicPath:"dist"
    },    
    module: {
        rules:[
            {
                test: /\\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\\.css$/,
                use: [
                    'style-loader', 
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        open: true
    }
}
`;
    return text;
}

function createPackageForTSProject(configuration, name) {
    var text = `
{
    "name": "${name}",
    "version": "1.0.0",
    "description": "",
    "main": "main.js",
    "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1",
        "start": "webpack-dev-server",
        "build": "webpack -p"
    },
    "author": "Add your name here",
    "license": "MIT",
    "dependencies": {},
    "devDependencies": {
        "css-loader": "*",
        "style-loader": "*",
        "html-loader": "*",
        "webpack": "*",
        "webpack-cli": "*",
        "webpack-dev-server": "*",
        "ts-loader": "*",
        "typescript": "*"
    }
}`;
    return text;
}

function createWebPackConfigTSFile(configuration, name) {
    var text = `
var path = require('path');

module.exports = {
    entry:"./js/main.js",
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:"bundle.js",
        publicPath:"dist"
    },    
    module: {
        rules:[
            {
                test: /\\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\\.css$/,
                use: [
                    'style-loader', 
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        open: true
    }
}
`;
    return text;
}

function createMainForWebpackProject(configuration) {
    var text = ``;
    return text;
}

function createCSSForProject(configuration) {
    var text = `
/**
* @name style.css
* @file Add a small description for this file.
* @author ${configuration.author} ${configuration.email}
* @version 1.0.0
*/
    
:root {
    --primary-color: #263238;
    --secondary-color: #f50057;
}

* { padding: 0; margin: 0; font-family: Arial, Helvetica, sans-serif; }
.h1 { color:var(--primary-color) }
.h2 { color:var(--secondary-color) }
.button {
    min-width: 60px;
    border-style: none;
    padding: 10px 10px 10px 10px;
    margin: 5px 5px 5px 5px;
    font-weight: bold;
    color: white;
    background-color: var(--secondary-color);
    outline:none;
}`;
    return text;
}

coco.showHelp = function () {
    var msj = `
---------------------------------------------------------------------------------------     
             ██████╗ ██████╗  ██████╗ ██████╗      ██████╗██╗     ██╗
            ██╔════╝██╔═══██╗██╔════╝██╔═══██╗    ██╔════╝██║     ██║
            ██║     ██║   ██║██║     ██║   ██║    ██║     ██║     ██║
            ██║     ██║   ██║██║     ██║   ██║    ██║     ██║     ██║
            ╚██████╗╚██████╔╝╚██████╗╚██████╔╝    ╚██████╗███████╗██║
             ╚═════╝ ╚═════╝  ╚═════╝ ╚═════╝      ╚═════╝╚══════╝╚═╝                               
---------------------------------------------------------------------------------------
                          Using this CLI is very simple!                               
---------------------------------------------------------------------------------------
     Commands      |   Parameters     |  Description                                   
---------------------------------------------------------------------------------------
   -js      |  	   |   filename       |  Creates a javascript file                      
   -html    |  	   |   filename       |  Creates a html file                           
   -css     |	   |   filename       |  Creates a css file                            
   -proj    |  -p  |   name           |  Creates a basic web project                   
   -webpack | -wp  |   name           |  Creates a basic webpack project               
   -game    |  -g  |   name           |  Creates a basic game project                  
   -class   |  	   |   name           |  Creates a ES6 class                           
   -htmljs  |      |                  |  Add html utilities file		               
   -email   |  	   |   yourEmail      |  Adds your email to config file                
   -author  |      |   name lastName  |  Adds your name and last name to config file.   
   -config  |      |     			  |  Small wizard to setup your information you.   
   -help    |  -h  |                  |  Shows this information                        
   -version |  -v  |                  |  Shows the version		                       
---------------------------------------------------------------------------------------
Example:
coco -js main

When running -config you may need to use sudo due to permissions on your OS.

Update to the latest version using this command: npm update -g cococli
For Webpack project you will need to run: npm install on the root folder after creation
To run the Webpack project on the browser use: npm start

version:${version}`;
    console.log(msj);
}

coco.showVersion = function () {
    var msj = '\n';
    msj += version;
    msj += '\n';
    console.log(msj);
}

coco.setupConfiguration = function () {
    var msj = '';
    var step = 1;
    var name = '';
    var email = '';
    var isOK = false;

    console.log('-> If you want your name, lastname and email to automatically appear on the files you create with this tool follow these instructions.');
    console.log('-> Enter your name');

    rl.on('close', () => {
        console.log('-> Have a great day!');
        process.exit(0);
    });

    rl.on('line', (input) => {

        switch (step) {
            case 1:
                msj = '-> Oops, no name was enter.\n-> Please enter your name or type exit to finish';
                break;
            case 2:
                msj = '-> Oops, no email was enter.\n-> Please enter your email or type exit to finish';
                break;
        }

        if (input === '') {
            console.log(msj);
        } else if (input === 'exit') {
            rl.close();
            console.log('-> Bye!');
        } else if (step === 1) {
            name = input;
            msj = '-> Hi ' + name + ', now enter your email.'
            console.log(msj);
            step = 2;
        } else if (step === 2) {
            email = input;
            msj = '-> Saving...';
            console.log(msj);
            isOK = true;
        }

        if (isOK) {

            loadConfiguration().then(function (configuration) {
                configuration.author = name;
                configuration.email = email;
                saveConfiguration(configuration);
                rl.close();
            }).catch(function (reject) {
                //Do nothing here for now.
                rl.close();
                var msj = '-> Error saving your setup, please try again!';
                console.log(msj);
            });
        }
    });
    return true;
}

coco.closeReadLine = function () {
    rl.close();
}

module.exports = coco;
