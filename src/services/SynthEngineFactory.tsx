import { SynthEngineModel } from '../models/SynthEngineModel';
import { DefaultParams } from '../consts/DefaultParams';

const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

const audioContext = new AudioContext({
    latencyHint: 'interactive',
    sampleRate: 44100,
});

export const createSynthEngine = (): SynthEngineModel => {
    // create oscillators
    const primaryVco = audioContext.createOscillator();
    const secondaryVco = audioContext.createOscillator();
    // todo: create primary and secondary detune

    // create adsr's and vca's
    let primaryAdsr = audioContext.createGain();
    let secondaryAdsr = audioContext.createGain();
    let primaryVca = audioContext.createGain();
    let secondaryVca = audioContext.createGain();

    // create filter
    let filter = audioContext.createBiquadFilter();

    // create analyser
    const analyser = audioContext.createAnalyser();

    // create master volume
    let masterVca = audioContext.createGain();

    // configure filter
    filter.type = DefaultParams.filterType;
    filter.frequency.setTargetAtTime(DefaultParams.filter, audioContext.currentTime, 0);
    filter.Q.value = DefaultParams.qualityFactor;

    // configure delay
    const delayNode = audioContext.createDelay(5);
    delayNode.delayTime.value = DefaultParams.delayTime;
    const delayFeedback = audioContext.createGain();
    delayFeedback.gain.value = DefaultParams.delayFeedback;

    // configure analyser
    analyser.smoothingTimeConstant = 0.5;
    analyser.fftSize = 1024;
    const analyserBufferLength = analyser.fftSize;

    // set master volume
    masterVca.gain.value = DefaultParams.gain;

    // connect nodes
    primaryAdsr.connect(primaryVca).connect(filter);
    secondaryAdsr.connect(secondaryVca).connect(filter);

    filter.connect(delayNode);
    delayNode.connect(delayFeedback);
    delayFeedback.connect(filter);

    filter.connect(masterVca).connect(analyser).connect(audioContext.destination);

    // start oscillators
    primaryVco.start();
    secondaryVco.start();

    return {
        audioContext: audioContext,
        primaryVco: primaryVco,
        secondaryVco: secondaryVco,
        primaryAdsr: primaryAdsr,
        secondaryAdsr: secondaryAdsr,
        primaryVca: primaryVca,
        secondaryVca: secondaryVca,
        filter: filter,
        delayNode: delayNode,
        delayFeedback: delayFeedback,
        masterVca: masterVca,
        analyserNode: analyser,
        analyserData: new Uint8Array(analyserBufferLength),
    };
};
