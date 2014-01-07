var arDrone = require('ar-drone');
var client = arDrone.createClient();

var stdin = process.stdin;

var COMMAND_DURATION = 500;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );
//
// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
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
          client.after(COMMAND_DURATION, function() {
            this.stop();
          });
          break;
    case 'j':
          client.down(0.5);
          client.after(COMMAND_DURATION, function() {
            this.stop();
          });
          break;
    case 'h':
          client.counterClockwise(0.5);
          client.after(COMMAND_DURATION, function() {
            this.stop();
          });
          break;
    case 'l':
          client.clockwise(0.5);
          client.after(COMMAND_DURATION, function() {
            this.stop();
          });
          break;
  }
});
