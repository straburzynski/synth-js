import { WaveformEnum } from '../models/WaveformEnum';
import { FilterTypeEnum } from '../models/FilterTypeEnum';

export const DefaultParams = {
    primaryWaveform: WaveformEnum.SAWTOOTH,
    secondaryWaveform: WaveformEnum.SQUARE,
    filterType: FilterTypeEnum.LOWPASS,

    detune: 0,
    detuneMin: -100,
    detuneMax: 100,

    attack: 0.01,
    decay: 0.5,
    release: 0.3,
    sustain: 1.0,
    adsrMin: 0,
    adsrMax: 1,

    gain: 0.5,
    gainMin: 0,
    gainMax: 0.5,
    masterVcaGain: 0.7,

    lfoWaveform: WaveformEnum.SINE,
    lfoGain: 0,
    lfoGainMin: 0,
    lfoGainMax: 10000,
    lfoFrequency: 1,
    lfoFrequencyMin: 0.1,
    lfoFrequencyMax: 10,

    filter: 2000,
    filterMin: 50,
    filterMax: 10000,

    delayTime: 0.4,
    delayFeedback: 0.2,
    delayTimeMin: 0,
    delayTimeMax: 1,
    delayFeedbackMin: 0,
    delayFeedbackMax: 1,

    qualityFactor: 0,
    qualityFactorMin: 0,
    qualityFactorMax: 10,
};
