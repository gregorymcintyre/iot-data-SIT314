const mqtt = require('mqtt');
//const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

setInterval(test, 2000);

function test(){
	//Drone(1, 'Short', randomValue(20,1), 90, randomValue(200,50), randomValue(5,0));
	Drone(1, 'Short', randomValue(100,1), 90, randomValue(90,110), randomValue(5,0));
	//Drone(1, 'Short', 9, 90, randomValue(200,50), randomValue(5,0));
	Drone(2, 'Short', randomValue(100,1), 80, randomValue(90,110), randomValue(5,0));
	//Drone(2, 'Short', 9, 80, randomValue(200,50), randomValue(5,0));
	Drone(3, 'Long', randomValue(100,1), 60, randomValue(90,110), randomValue(5,0));
	//Drone(3, 'Long', 1, 60, randomValue(200,50), randomValue(5,0));
	Drone(4, 'Long', randomValue(100,1), 70, randomValue(90,110), randomValue(5,0));
};

function randomValue(high, low){
	var reading = Math.floor(Math.random() * (high - low) + low);
	return reading;
}


function Drone(serialNumber, range, battery, latlong, altitude, speed){
	const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
	process.stdout.write('Sending data for SN: ' + serialNumber + " ... ");
		
	var topic = 'Drone/' + range + '/'+ serialNumber + '/';
	//console.log(topic);
	
	client.on('connect', () => {
		var tempTopic = topic +'Battery';
		var msg = String(battery);	
		client.publish(tempTopic, msg);
		//console.log(tempTopic + " " + msg);
		
		tempTopic = topic+'LatLong';
		msg = String(latlong);	
		client.publish(tempTopic, msg);
		//console.log(tempTopic + " " + msg);
		
		tempTopic = topic+'Altitude';
		msg = String(altitude);	
		client.publish(tempTopic, msg);
		//console.log(tempTopic + " " + msg);
		
		tempTopic = topic+'Speed';
		msg = String(speed);	
		client.publish(tempTopic, msg);
		//console.log(tempTopic + " " + msg);
	});
	console.log('Done');
};
