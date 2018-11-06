// GPIO
// subprocess
// time / moment?

// Math.randomfrom
// threading

const Servo = require('./servo');

function Bear(options, audioPlayer) {
  if(!(this instanceof Bear)) return new Bear(options);

  let bear = this;
  let defaults = {
    phrases: { sample: 'this is a sample phrase' },
    close_pin: 0,
    label: 'unknown'
  };
  bear.settings = Object.assign({}, defaults, options);

  // use Broadcom pin designations
  // GPIO.setmode(GPIO.BCM)

  // attach audio player
  bear.audioPlayer = audioPlayer;

  // bind mouth and eye servos based on pins defined in config
  bear.eyes = Servo({
    'open_pin':config.getint('pins', 'eyes_open'),
    'close_pin': config.getint('pins', 'eyes_closed'),
    'eyes'
  });
  bear.mouth = Servo({
    'open_pin':config.getint('pins', 'mouth_open'),
    'close_pin': config.getint('pins', 'mouth_closed'),
    'mouth'
  });

  # set initial motor state
  bear.eyes.move(true);
  bear.mouth.move(true);

  // bear.mouthThread = Thread(target=_updateMouth);
  // bear.mouthThread.start();
}

Bear.prototype.move = function(data){
  if(data.bear && data.bear.eyes) this.eyes.move(data.bear.eyes.open);
  if(data.bear && data.bear.mouth) this.mouth.move(data.bear.mouth.open);
  return this.getStatus();
}

Bear.prototype.getStatus = function(){
 console.log(JSON.stringify(this));
 return {
  "bear": {
    "eyes": {
      "open": this.eyes.open
    },
    "mouth": {
      "open": this.mouth.open
    }
  };
}

Bear.prototype.blink = function(){
  this.eyes.move(true);
  // time.sleep(0.4);
  self.eyes.move(false);
  // time.sleep(0.4);
  self.eyes.move(true);
  // time.sleep(0.4);
  self.eyes.move(false);
}

Bear.prototype.play = function(filename){
  self.audioPlayer.play(`public/sounds/${filename}.wav`);
}

Bear.prototype.talk = function(text){
  // insert brief bit of silence to prevent beginnning of audio from getting chopped
  // os.system(`espeak ",..." 2>/dev/null`);
  // time.sleep( 0.5 );

  // # TODO: make speech params configurable
  // call espeak as a subprocess, saving output to an audio file
  // subprocess.call(["espeak", "-w", "speech.wav", text, "-s", "130", "-a", "200", "-ven-us+m3","-g","5"])

  // play the resulting audio file
  self.audioPlayer.play('speech.wav');
}

// observe audio signal and move mouth accordingly
Bear.prototype._updateMouth = function(){
  lastMouthEvent = 0
  lastMouthEventTime = 0

  while(!this.audio){
    // time.sleep( 0.1 )
  }

  while(this.isRunning){
    if(this.audioPlayer.mouthValue != lastMouthEvent){
      lastMouthEvent = this.audioPlayer.mouthValue;
      lastMouthEventTime = time.time();
      this.mouth.move((this.audioPlayer.mouthValue == 1), false);
    } else if( time.time() - lastMouthEventTime > 0.4 ){
      this.mouth.stop()
    }
  }
}

Bear.prototype.__del__ = function(){
  if(this.mouthThread) this.mouthThread.stop();
  if(this.eyesThread) this.eyesThread.stop();
  GPIO.cleanup()
}

module.exports = Bear;
