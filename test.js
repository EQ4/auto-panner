
/**
 * test
 */
 
import APanner from './index';

var panr = new APanner({
  range: 0.5000001,
  frequency : 3,
  waveform: function (t, f) {
     return Math.sin(Math.PI * t * f * 2);
  }
});

export function dsp(t) { 
  var input = 1 * Math.sin( 440 * Math.PI * 2 * t);
  
  var output = panr.monoIn(t, input);
  
  return output;
}