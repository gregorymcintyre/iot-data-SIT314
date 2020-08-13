var drones = [
  { "id": "Drone/Long/1/", "time": Date.now()+60000 },
  { "id": "Drone/Long/2/", "time": Date.now()+600010 },
  { "id": "Drone/Short/3/", "time": Date.now()+6000000 }
];

var search1 = "Drone/Long/1/";
var search2 = "Drone/Long/2/";
var search3 = "Drone/Short/3/";
//people.filter(function (person) { return person.dinner == "sushi" });
  // => [{ "name": "john", "dinner": "sushi" }]

//console.log(drones.filter(function (x) { return x.id == search }));
//var test = drones.filter(function (x) { return x.id == search })[0].time-Date.now();
//console.log(test)
//console.log(test[0].time)

if(drones.filter(function (x) { return x.id == search1 })[0].time-Date.now() > 600000) console.log('yep')
else console.log('nope')

if(drones.filter(function (x) { return x.id == search2 })[0].time-Date.now() > 600000) console.log('yep')
else console.log('nope')

if(drones.filter(function (x) { return x.id == search3 })[0].time-Date.now() > 600000) console.log('yep')
else console.log('nope')


//if(drones.filter(function (x) { return x.id == search })=='') console.log('yep')
//else console.log('nope')

  // => [{ "name": "john", "dinner": "sushi" }]
  
  //people.filter(p => p.dinner == "sushi")
  // => [{ "name": "john", "dinner": "sushi" }]
