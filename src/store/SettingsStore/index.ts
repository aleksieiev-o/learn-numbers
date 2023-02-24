import { makeAutoObservable } from 'mobx';
import { RootStore } from '../index';

interface ISettingsStore {
  rootStore: RootStore;
  minValue: number;
  maxValue: number;
  speechVolume: number;
  speechRate: number;
  speechPitch: number;
  speechLocale: string;
  updateMinValue: (value: string) => void;
  updateMaxValue: (value: string) => void;
  updateSpeechVolumeValue: (value: number) => void;
  updateSpeechRateValue: (value: number) => void;
  updateSpeechPitchValue: (value: number) => void;
  updateSpeechLocale: (locale: string) => void;
}

export class SettingsStore implements ISettingsStore {
  rootStore: RootStore;
  minValue: number;
  maxValue: number;
  speechPitch: number;
  speechRate: number;
  speechVolume: number;
  speechLocale: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.minValue = 0;
    this.maxValue = 15;
    this.speechPitch = 1;
    this.speechRate = 1;
    this.speechVolume = 1;
    this.speechLocale = 'Google US English';

    makeAutoObservable(this);
  }

  updateMinValue(value: string): void {
    this.minValue = parseInt(value, 10);
  }

  updateMaxValue(value: string): void {
    this.maxValue = parseInt(value, 10);
  }

  updateSpeechVolumeValue(value: number): void {
    this.speechVolume = value;
  }

  updateSpeechRateValue(value: number): void {
    this.speechRate = value;
  }

  updateSpeechPitchValue(value: number): void {
    this.speechPitch = value;
  }

  updateSpeechLocale(locale: string): void {
    this.speechLocale = locale;
  }
}
