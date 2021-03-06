const port = 3000,
	bodyParser = require("body-parser"),
	express = require("express"),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http, {
		pingTimeout: 60000,
	});

app.use('/js', express.static('web/js'))
app.use('/styles', express.static('web/styles'))
app.use('/elements', express.static('web/elements'))
app.use('/assets', express.static('web/assets'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// const okta = require('@okta/okta-sdk-nodejs');

// const client = new okta.Client({
//   orgUrl: 'https://{yourOktaDomain}/',
//   token: 'xYzabc'    // Obtained from Developer Dashboard
// });



require('./srv/routes').listen(app)

//let sockets = require('./srv/sockets')
//sockets.Components.listen(io)
//sockets.Activations.listen(io)


http.listen(port, function(){
    console.log('listening on *:'+port);
});

