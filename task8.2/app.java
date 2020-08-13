const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
	console.log('connected');
	const topic = 'SIT314Deakin/';
	const msg = '218356779';
		client.publish(topic, msg, () => {
	console.log('message sent...');
	});
});

