// need some kinda GPIO lib here
// moment ?

function Servo(options) {
  if(!(this instanceof Servo)) return new Servo(options);

  let servo = this;
  let defaults = {
    open_pin: 0,
    close_pin: 0,
    label: 'unknown'
  };
  servo.settings = Object.assign({}, defaults, options);
  servo.open = false;

  // set GPIO pins as OUT
  // GPIO.setup(servo.open_pin, GPIO.OUT)
  // GPIO.setup(servo.close_pin, GPIO.OUT)

}

Servo.prototype.move = function(opening, duration){
  console.log(`opening ${this.settings.label}: ${opening} (op=${this.settings.open_pin}, cp=${this.settings.close_pin}`);
  if(opening and !this.open){
    // GPIO.output(this.settings.open_pin, GPIO.HIGH)
    // GPIO.output(this.settings.close_pin, GPIO.LOW)
    if(duration!=undefined){
      // time.sleep(duration)
      this.stop();
    }
    this.open = true;
  }else{
    // GPIO.output(this.settings.open_pin, GPIO.LOW)
    // GPIO.output(this.settings.close_pin, GPIO.HIGH)
    if(duration!=undefined){
      // time.sleep(duration)
      this.stop();
    }
    this.open = false;
  }
}

Servo.prototype.stop = function(){
  GPIO.output(this.settings.open_pin, GPIO.LOW);
  GPIO.output(this.settings.close_pin, GPIO.LOW);
}

module.exports = Servo;