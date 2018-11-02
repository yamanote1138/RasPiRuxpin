var Board = require("../");

Board.requestPort(function(error, port) {
  if (error) {
    console.log(error);
    return;
  }

  // var board = new Board(port.comName);
  var board = new Board("/dev/cu.usbmodem1411");
  var state = 1;

  console.log(__filename);
  console.log("------------------------------");

  board.on("ready", function() {
    console.log("  ✔ ready");


    // this.pinMode(5, board.MODES.INPUT);
    // this.digitalRead(5, (value) => {
    //   console.log(`digitalRead: ${value}`);
    //   console.log("------------------------------");
    // });
    this.pinMode(5, board.MODES.OUTPUT);
    setInterval(function() {
      board.digitalWrite(5, (state ^= 1));
    }, 500);


    this.pinMode(5, board.MODES.ANALOG);
    this.analogRead(5, (value) => {
      console.log(`analogRead: ${value}`);
      console.log("------------------------------");
    });
  });
});
