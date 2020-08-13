function randomTemp(){
	const low = 10;
	const high = 40;
	var reading = Math.floor(Math.random() * (high - low) + low);
	//sensordata.temperature = reading;
	return reading;
}


setInterval(sendData, 1000);

function sendData(){
	var http = require('http');
	var querystring = require('querystring');

	const sensorData = {
		id: 0,
		name: "temperaturesensor",
		address: "221 Burwood Hwy, Burwood VIC 3125",
		time: Date.now(),
		temperature: randomTemp()
	};

	var postData = querystring.stringify(sensorData);

	var options = {
	    //hostname: 'localhost',
	    //hostname: 'ec2-54-144-130-19.compute-1.amazonaws.com',
	    hostname: 'LoadBal-53-2134790920.us-east-1.elb.amazonaws.com',
	    port: 3000,
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length
	    }
	};

	var req = http.request(options, function (res) {
	    console.log('STATUS:', res.statusCode);
	    console.log('HEADERS:', JSON.stringify(res.headers));

	    res.setEncoding('utf8');

	    res.on('data', function (chunk) {
		console.log('BODY:', chunk);
	    });

	    res.on('end', function () {
		console.log('No more data in response.');
	    });
	});

	req.on('error', function (e) {
	    console.log('Problem with request:', e.message);
	});

	req.write(postData);
	req.end();
}
