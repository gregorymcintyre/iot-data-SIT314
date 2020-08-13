const mqtt = require('mqtt')
const client = mqtt.connect("mqtt://broker.hivemq.com:1883")

//Drone/Long/ - Long distance drones
//Drone/Short/ - Short distance drones
//Drone/+/Battery/ - drone’s remaining battery level
//Drone/+/LatLong/ - latitude and longitude, showing their current position
//Drone/+/Altitude/ - current altitude of the drone
//Drone/+/Speed/ - current speed of the drone

//Drone/# - A filter to subscribe to all drone messages
/*
client.on('connect', () => {
	client.subscribe('Drone/#')
})

client.on('message', (topic, message, packet) => {
	console.log(topic.toString())
	console.log(message.toString())
})
*/

//Drone/Short/Speed/ - A filter to subscribe to the Speeds of Short distance drones
/*
client.on('connect', () => {
	client.subscribe('Drone/Short/Speed/')
})

client.on('message', (topic, message, packet) => {
	console.log(topic.toString())
	console.log(message.toString())
})
*/

//Drone/+/Battery/ - A filter to subscribe to the battery levels of all drones

client.on('connect', () => {
	client.subscribe('Drone/+/Battery/')
})

client.on('message', (topic, message, packet) => {
	console.log(topic.toString())
	console.log(message.toString())
})

//Drone/Long/LatLong/ - A filter to subscribe to the latitude and longitude values of all Long distance drones.
/*
client.on('connect', () => {
	client.subscribe('Drone/Long/LatLong/')
})

client.on('message', (topic, message, packet) => {
	console.log(topic.toString())
	console.log(message.toString())
})
*/
