const http = require('http');

setInterval(loadtest, 100); //time is in ms

function loadtest(){
	http.get('http://sit314-495691368.us-east-1.elb.amazonaws.com:3000', (res) => {
		res.on('data', function (chunk) {
			console.log('' + chunk);
		});
	});
}
