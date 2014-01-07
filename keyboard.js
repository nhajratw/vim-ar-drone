var arDrone = require('ar-drone');
var client = arDrone.createClient();

var stdin = process.stdin;

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
  if ( key === '\u0003' ) {
    process.exit();
  }
  if ( key === 'i' ) {
    client.takeoff();
  }
  if ( key === 'x' ) {
    client.stop();
    client.land();
  }
  if (key === 'j') {
    client.counterClockwise(0.5);
    client.after(1000, function() {
      this.stop();
    });
  } 
  if (key === 'k') {
    client.clockwise(0.5);
    client.after(1000, function() {
      this.stop();
    });
  } 
});
