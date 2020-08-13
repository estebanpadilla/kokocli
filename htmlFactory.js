var htmlFactory = {};

htmlFactory.createHTML = function (name) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${name}</title>
</head>
<body>
</body>
</html>`;
};

htmlFactory.createHTMLForGame = function (name) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title> ${ name}</title>
    <script src="js/main.js"></script>
    <script src="js/libs/colors.js"></script>
    <script src="js/libs/stats.js"></script>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1 id="title"> Game: ${ name}</h1>
</body>
</html>`;
};

htmlFactory.createHTMLForProject = function (name) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${ name}</title>
    <script src="js/main.js"></script>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1 id="title">Project: ${ name}</h1>
    <h2 id="subtitle">Description: ${ name}</h2>
</body>
</html>`;
};

htmlFactory.createHTMLForWebpackProject = function (name) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${ name}</title>
    <script src="dist/main.js"></script>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1 id="title">Project: ${ name}</h1>
    <h2 id="subtitle">Description: ${ name}</h2>;
</body>
</html>
`;
}

module.exports = htmlFactory;
