const mongoose = require('mongoose');
const { Board, Thermometer } = require("johnny-five");
var myModule = require('./eg/temperature-lm35.js')
var plotly = require('plotly')("gmcintyre", "tsHRoEapXm8pUhQprdlw")
var reading=0;
var data = {
	x: [],
	y: [],
	type: "scatter"
};

sensorsend()
setInterval(sensorsend, 10000);
//console.log("fin");

function sensorsend(){
	time = Date.now();
	mongoose.connect('mongodb+srv://greg:RRz9GRjRLp37hz3@sit314.bsjyx.mongodb.net/data');

	const Sensor = require('./models/sensor');
	const sensordata = {
		id: 0,
		name: "real-temperature-sensor",
		address: "221 Burwood Hwy, Burwood VIC 3125",
		time: Date.now(),
		temperature: 1
	}
	
	while(myModule.temp==NaN){}	//wait for hardware
		
	sensordata.temperature = myModule.temp;

	const jsonString = JSON.stringify(sensordata);
	console.log(jsonString);

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
		data.y.push(sensordata.temperature);
		/*
		var graphOptions = {filename: "iot-tempsensor", fileopt:"overwrite"};
		plotly.plot(data, graphOptions, function (err, msg) {
		
		if (err) return console.log(err);
			console.log(msg);
		});
		*/
	}).then(() => {
		mongoose.connection.close();
	});
}
