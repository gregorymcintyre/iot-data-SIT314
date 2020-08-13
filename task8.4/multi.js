var drones = [
  { "id": "Drone/Long/1/", "time": 15 },
  { "id": "Drone/Long/2/", "time": 16 },
  { "id": "Drone/Short/3/", "time": 17 }
];

var search = "Drone/Long/3/";

console.log(drones.filter(function (x) { return x.id == search }))
if(drones.filter(function (x) { return x.id == search })=='') console.log('yep')
else console.log('nope')

  // => [{ "name": "john", "dinner": "sushi" }]
  
  //people.filter(p => p.dinner == "sushi")
  // => [{ "name": "john", "dinner": "sushi" }]
