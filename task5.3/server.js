var http = require('http');
var querystring = require('querystring');
var server = http.createServer().listen(3000);
const Sensor = require('./models/sensor');
const mongoose = require('mongoose');

server.on('request', function (req, res) {
	if (req.method == 'POST') {
		var body = '';
	}

	req.on('data', function (data) {
		body += data;
	});

	req.on('end', function () {
		var post = querystring.parse(body);
		console.log(post);
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Sensor Data Ack\n');
		
		mongoose.connect('mongodb://ec2-54-242-171-73.compute-1.amazonaws.com/db', { useUnifiedTopology: true, useNewUrlParser: true, });
		
			
		mongoose.connection.on('error', (err) => {
    			console.error(`Mongoose connection error: ${err}`);
    			process.exit(1);
  		});
		
		const sensor = new Sensor({
			id: post.id,
			name: post.name,
			address: post.address,
			time: post.time,
			temperature: post.temperature
		});
		
		sensor.save().then(doc => {
		}).then(() => {
			mongoose.connection.close();
		});
	});
});

console.log('Listening on port 3000');

//db.sensors.find().limit(1).sort({$natural:-1})
