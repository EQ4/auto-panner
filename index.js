
/**
 * @module auto-panner
 * @org opendsp
 * @author potasmic
 * @license CC0 (Public Domain)
 * @version 0.0.0 (Work In Progress)
 * @desc An auto panner, swings from one ear to another.
 */
 
 /**
  * Initialisation of an AutoPanner instance requires a frequency value and a waveform.
  * Sine, Triangle and Sqare are three built in waveforms.
  * User can also input a function that takes two params (time and frequency) as their custom wave.
  * 
  * Takes an mono input or a stereo input and turn them into a stereo signal that auto-pans.
  * 
  * Range defins how much panning there will be. 0 means no panning. 1 means maximum panning to sides.
  * 
  *        1   0.5   0   0.5   1
  *  Left  <----|----+----|---->   Right
  * 
  * In Fade mode, the panner will fade between the two sides with a phase offset in one of each.
  * -- Left = Left  Input * /\/\/\/\
  * -- Right= Right Input * \/\/\/\/
  * 
  * In Mix mode, when panner is 100% Left/Right, the stereo signals will be mixed, then panned.
  * -- Left = Left Input  ++WIP++
  * -- Right= Right Input ++WIP++
  */

export default AutoPanner

function AutoPanner(config) {
  if(!(this instanceof AutoPanner)) return new AutoPanner(config);
  
  this.frequency = config.frequency || config.freq || 1;
  this.range = config.range || 1;
  this.mode  = "fade"; // Will add the mix mode later on
  this.waveform  = config.waveform  || config.wave || "sin";
  this.customWav = (this.waveform instanceof Function)? true : false;
  
  
}

AutoPanner.prototype.monoIn = function(t, signal) {
  var l , r;
  var range = this.range / 2;
  
  if( this.customWav ) {
     l = ( range + range * this.waveform(t, this.frequency)) * signal;
     r = ( range + range * this.waveform(t + (1/(this.frequency*2)), this.frequency)) * signal;
     l += signal * (1-this.range);
     r += signal * (1-this.range);
  } else {
    
  }
  
  return [
    l, r
    ];
};

function sin(t, f) {
  return Math.sin(Math.PI * t * f * 2);
}

function tri(t, f){
  return Math.abs(1 - (2 * t * f) % 2) * 2 - 1;
}

function sqr(t, f){
  return (t*f % 1/f < 1/f/2) * 2 - 1;
}