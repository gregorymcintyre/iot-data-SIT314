const mongoose = require('mongoose');
var plotly = require('plotly')("gmcintyre", "tsHRoEapXm8pUhQprdlw")

var data = {
	x: [],
	y: [],
	type: "scatter"
};

setInterval(sensortest, 10000);

function sensortest(){
	time = Date.now();
	mongoose.connect('mongodb+srv://greg:RRz9GRjRLp37hz3@sit314.bsjyx.mongodb.net/data');

	const Sensor = require('./models/sensor');

	const sensordata = {
		id: 0,
		name: "temperaturesensor",
		address: "221 Burwood Hwy, Burwood VIC 3125",
		time: Date.now(),
		temperature: 20
	}

	const low = 10;
	const high = 40;
	reading = Math.floor(Math.random() * (high - low) + low);
	sensordata.temperature = reading;

	const jsonString = JSON.stringify(sensordata);
	//console.log(jsonString);

	const newSensor = new Sensor({
		id: sensordata.id,
		name: sensordata.name,
		address: sensordata.address,
		time: sensordata.time,
		temperature: sensordata.temperature
	});



	newSensor.save().then(doc => {
		time=Date.now()-time;
		//console.log("Runtime: " + (Date.now()-time) + "ms");
		console.log("Runtime: " + time + "ms");
		console.log(doc);
		
		data.x.push((new Date()).toISOString());
		data.y.push(time);
		
		var graphOptions = {filename: "iot-performance", fileopt:"overwrite"};
		plotly.plot(data, graphOptions, function (err, msg) {
	
		if (err) return console.log(err);
			console.log(msg);
		});
		
	}).then(() => {
		mongoose.connection.close();
	});
}
