const mqtt = require('mqtt')
const client = mqtt.connect("mqtt://broker.hivemq.com:1883")

client.on('connect', () => {
	client.subscribe('SIT314Deakin/')
})

client.on('message', (topic, message, packet) => {
	//console.log(topic.toString())
	console.log(message.toString())
})
