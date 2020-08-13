const mqtt = require('mqtt')
const client = mqtt.connect("mqtt://broker.hivemq.com:1883")
var batteryRegister = []
var speedRegister = []
var altitudeRegister = []
var timeRegister = []

function checkRegisters(str){
	var substring = '';	
	
	if((str.substring(str.length - 5)).localeCompare('Speed') == 0) substring = str.slice(0, -5);
	
	altString = substring + 'Altitude';
	if((altitudeRegister.indexOf(altString) != -1)) {	//check 1st position of multi for values to make sure no doubles
		if(timeRegister.filter(function (x) { return x.id == substring })=='') {
			//timeRegister.push(substring);	//TODO: This needs to be multi with Date.now() so we can to a time check!
			timeRegister.push({ "id": substring, "time": Date.now() });
		}
	}else{
		timeRegister.splice(timeRegister.indexOf(timeRegister.filter(function (x) { return x.id == substring })));
	}
	console.log('timeRegister: ');
	console.log(timeRegister);	
}

client.on('connect', () => {
	console.log('Drone Monitor Active')
	
	//Task a.
	client.subscribe('Drone/+/+/Battery');
	//console.log('Subscribed: Drone/+/+/Battery');
	
	//Task b.
	client.subscribe('Drone/+/+/Speed');
	client.subscribe('Drone/+/+/Altitude');
})

client.on('message', (topic, message, packet) => {

	//Publish an alert if more than two drones’ battery levels are below 10
	if((topic.substring(topic.length - 7)).localeCompare('Battery') == 0){			//0 is match
		if(Number(message) < 10){								//battery < 10
			if((batteryRegister.indexOf(topic) > -1)||(batteryRegister.length > 1)) {	//compare values in register to topic //ignores initial duplicates
				console.log("Alert: Two or more drones have low batteries");
			}else{
				batteryRegister.push(topic);

			}
		}
	}
	
	//Publish an alert if a drone has been stationary for more than 10 minutes, at an altitude above 100
	//if speed drops to zero above 100 alt, start timer, alt cant change without speed, but speed can change above alt.
	if((topic.substring(topic.length - 8)).localeCompare('Altitude') == 0){
		if(Number(message) > 100){								//Alt above 100
			if(altitudeRegister.indexOf(topic) == -1) altitudeRegister.push(topic);
		}else{											//lower alt
			if(altitudeRegister.indexOf(topic) != -1) {
				altitudeRegister.splice(altitudeRegister.indexOf(topic));
			}
		}
		//console.log('altitudeRegister: ' + altitudeRegister);
	}
	
	if((topic.substring(topic.length - 5)).localeCompare('Speed') == 0){				//is speed variable
		if(Number(message) == 0){								//value is 0, not moving
			if(speedRegister.indexOf(topic) == -1) {
				speedRegister.push(topic);
				checkRegisters(topic);
			}
		}else{											//moving again
			if(speedRegister.indexOf(topic) != -1) {
				speedRegister.splice(speedRegister.indexOf(topic));
				checkRegisters(topic);
			}
		}
		//console.log('speedRegister: ' + speedRegister);
	};	
});			
