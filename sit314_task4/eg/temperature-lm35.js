const { Board, Thermometer } = require("johnny-five");
const board = new Board();
var temp = 20;

board.on("ready", () => {
  const thermometer = new Thermometer({
    controller: "LM35",
    pin: "A0"
  });

  thermometer.on("change", () => {
    const {celsius, fahrenheit, kelvin} = thermometer;
    temp = celsius;
    exports.temp = temp;
    //console.log(temp);
  });
});
