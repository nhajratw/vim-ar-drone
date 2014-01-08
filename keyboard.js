var arDrone = require('ar-drone');
var client = arDrone.createClient();

var stdin = process.stdin;

var COMMAND_DURATION = 500;

var animationsWithFlips = ['phiM30Deg', 'phi30Deg', 'thetaM30Deg', 'theta30Deg', 'theta20degYaw200deg', 'theta20degYawM200deg', 'turnaround', 'turnaroundGodown', 'yawShake', 'yawDance', 'phiDance', 'thetaDance', 'vzDance', 'wave', 'phiThetaMixed', 'doublePhiThetaMixed', 'flipAhead', 'flipBehind', 'flipLeft', 'flipRight'];
var animations = ['phiM30Deg', 'phi30Deg', 'thetaM30Deg', 'theta30Deg', 'theta20degYaw200deg', 'theta20degYawM200deg', 'turnaround', 'turnaroundGodown', 'yawShake', 'yawDance', 'phiDance', 'thetaDance', 'vzDance', 'wave', 'phiThetaMixed', 'doublePhiThetaMixed'];

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();
stdin.setEncoding( 'utf8' );

// on any data into stdin
stdin.on( 'data', function( key ){
  //process.stdout.write( key );
  // ctrl-c ( end of text )
  switch (key) { 
    case '\u0003':
      process.exit();
      break;
    case 'i':
      client.takeoff();
      break;
    case 'x':
      client.stop();
      client.land();
      break;
    case 'k':
      client.up(0.5);
      stop();
      break;
    case 'j':
      client.down(0.5);
      stop();
      break;
    case 'h':
      client.counterClockwise(0.5);
      stop();
      break;
    case 'l':
      client.clockwise(0.5);
      stop();
      break;
    case 'f':
      client.front(0.5);
      stop();
      break;
    case 'b':
      client.back(0.5);
      stop();
      break;
    case '?':
      var animationIndex = Math.floor((Math.random() * animations.length) + 1); 
      console.log("Starting Animation: " + animations[animationIndex]);
      client.animate(animations[animationIndex], 1000);
      break;
    case '!':
      animations.forEach(function(animation) {
        client.animate(animation, 1500);
      });
    case '@':
      client.animate('wave',2000);
      client.after(2000, function() {
        this.animate('yawDance', 2000);
      });
      client.animate('doublePhiThetaMixed', 2000);
      client.animate('phiDance', 2000);
      break;
  }
});

function stop() {
  client.after(COMMAND_DURATION, function() {
    this.stop();
  });
}
