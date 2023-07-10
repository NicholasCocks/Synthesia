import * as Tone from 'tone';

const sampler = new Tone.Sampler({
  urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
  },
  baseUrl: "https://tonejs.github.io/audio/casio/"
})

export const fft = new Tone.Analyser({size: 512, smoothing: 0.8})

const gainNode3 = new Tone.Gain(0.1).toDestination()
const reverb = new Tone.JCReverb({decay: 7})
const delay = new Tone.PingPongDelay({delayTime: 0.25, maxDelayTime: 1})

sampler.connect(gainNode3)
sampler.connect(delay)
sampler.connect(reverb)
sampler.connect(fft)
delay.connect(gainNode3)
reverb.connect(gainNode3)

export const triggerNote = (mouse) => {
  const now = Tone.now() // gets the current time of the AudioContext.
  sampler.triggerAttackRelease(findClosestNote(mouse.y - 20, NOTES), now + 0.5);
}

const findClosestNote = (needle, haystack) => {
  return haystack.reduce((a, b) => {
      let aDiff = Math.abs(a - Math.abs(needle));
      let bDiff = Math.abs(b - Math.abs(needle));

      if (aDiff == bDiff) {
          return a > b ? a : b;
      } else {
          return bDiff < aDiff ? b : a;
      }
  });
}

const NOTES = [
  20.60172,
  21.82676,
  24.49971,
  27.50000,
  30.86771,
  32.70320,
  36.70810,
  41.20344,
  43.65353,
  48.99943,
  55.00000,
  61.73541,
  65.40639,
  73.41619,
  82.40689,
  87.30706,
  97.99886,
  110.0000,
  123.4708,
  130.8128,
  146.8324,
  164.8138,
  174.6141,
  195.9977,
  220.0000,
  246.9417,
  261.6256,
  293.6648,
  329.6276,
  349.2282,
  391.9954,
  440.0000,
  493.8833,
  523.2511,
  587.3295,
  659.2551,
  698.4565,
  783.9909,
  880.0000,
  987.7666,
  1046.502,
  1174.659,
  1318.510,
  1396.913,
  1567.982,
  1760.000,
]