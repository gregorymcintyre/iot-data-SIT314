const mongoose = require('mongoose');
var mongoClient = require('mongodb').MongoClient;
//const { Board, Thermometer } = require("johnny-five");

var plotly = require('plotly')("gmcintyre", "tsHRoEapXm8pUhQprdlw")

var mongodata = {
	x: [],
	y: [],
	name: 'Mongo Remote',
	type: "scatter"
};

var localdata = {
	x: [],
	y: [],
	name: 'Mongo Local',
	type: "scatter"
};



var reading=0;

setInterval(sensortest, 10000);

function randomTemp(){
	const low = 10;
	const high = 40;
	reading = Math.floor(Math.random() * (high - low) + low);
	//sensordata.temperature = reading;
	return reading;
}


function sensortest(){
	var now = (new Date()).toISOString();
	mongodata.x.push(now);
	localdata.x.push(now);

	//Remote MongoDB
	mongoTime = Date.now();
	mongoose.connect('mongodb+srv://greg:RRz9GRjRLp37hz3@sit314.bsjyx.mongodb.net/data');

	const Sensor = require('./models/sensor');
	const sensordata = {
		id: 0,
		name: "temperaturesensor",
		address: "221 Burwood Hwy, Burwood VIC 3125",
		time: Date.now(),
		temperature: 20
	}

	sensordata.temperature = randomTemp()

	//const jsonString = JSON.stringify(sensordata);
	//console.log(jsonString);

	const remoteSensor = new Sensor({
		id: sensordata.id,
		name: sensordata.name,
		address: sensordata.address,
		time: sensordata.time,
		temperature: sensordata.temperature
	});
	
	remoteSensor.save().then(doc => {
		mongoTime=Date.now()-mongoTime;
		//console.log("Mongo Remote Runtime: " + mongoTime + "ms");
		//console.log(doc);
		mongodata.y.push(mongoTime);

	}).then(() => {
		mongoose.connection.close();
	});
	
	//Local MongoDB
	localTime = Date.now();
	mongoose.connect('mongodb://localhost:27017/db');
		
	const localsensordata = {
		id: 0,
		name: "temperaturesensor",
		address: "221 Burwood Hwy, Burwood VIC 3125",
		time: Date.now(),
		temperature: 20
	}
		
	localsensordata.temperature = randomTemp()
	//const jsonString = JSON.stringify(localsensordata);
	//console.log(jsonString);
		
	const localSensor = new Sensor({
		id: localsensordata.id,
		name: localsensordata.name,
		address: localsensordata.address,
		time: localsensordata.time,
		temperature: localsensordata.temperature
	});
		
	localSensor.save().then(doc => {
		localTime=Date.now()-localTime;
		//console.log("Local db Runtime: " + localTime + "ms");
		localdata.y.push(localTime);
	}).then(() => {
		mongoose.connection.close();
	});


	//ploy.ly
	console.log("Mongo Data to plot.ly" + JSON.stringify(mongodata));
	console.log("Local Data to plot.ly" + JSON.stringify(localdata));
	
	data = [mongodata, localdata];
	var graphOptions = {filename: "iot-performance", fileopt:"overwrite"};
	/*
	plotly.plot(data, graphOptions, function (err, msg) {
		
	if (err) return console.log(err);
		console.log(msg);
	});
	*/
}
