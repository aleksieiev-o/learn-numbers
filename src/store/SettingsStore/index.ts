import { makeAutoObservable } from 'mobx';
import { RootStore } from '../index';

interface Settings {
  minValue: number;
  maxValue: number;
  speechVolume: number;
  speechRate: number;
  speechPitch: number;
  speechLocale: string;
}

interface ISettingsStore {
  rootStore: RootStore;
  settings: Settings;
  updateMinValue: (value: string) => void;
  updateMaxValue: (value: string) => void;
  updateSpeechVolumeValue: (value: number) => void;
  updateSpeechRateValue: (value: number) => void;
  updateSpeechPitchValue: (value: number) => void;
  updateSpeechLocale: (locale: string) => void;
}

export class SettingsStore implements ISettingsStore {
  rootStore: RootStore;
  settings: Settings;

  constructor(rootStore: RootStore) {
    const lsValue = window.localStorage.getItem('speechSettings');
    const settings: Settings = lsValue ? JSON.parse(lsValue) : null;

    this.rootStore = rootStore;
    this.settings = settings ? settings : {
      minValue: 1,
      maxValue: 10,
      speechPitch: 1,
      speechRate: 1,
      speechVolume: 1,
      speechLocale: 'Google US English',
    };

    if (!lsValue) {
      this.updateLocalStorageValue();
    }

    makeAutoObservable(this);
  }

  updateMinValue(value: string): void {
    this.settings.minValue = parseInt(value, 10) || 0;
    this.updateLocalStorageValue();
  }

  updateMaxValue(value: string): void {
    this.settings.maxValue = parseInt(value, 10) || 0;
    this.updateLocalStorageValue();
  }

  updateSpeechVolumeValue(value: number): void {
    this.settings.speechVolume = value;
    this.updateLocalStorageValue();
  }

  updateSpeechRateValue(value: number): void {
    this.settings.speechRate = value;
    this.updateLocalStorageValue();
  }

  updateSpeechPitchValue(value: number): void {
    this.settings.speechPitch = value;
    this.updateLocalStorageValue();
  }

  updateSpeechLocale(locale: string): void {
    this.settings.speechLocale = locale;
    this.updateLocalStorageValue();
  }

  private updateLocalStorageValue(): void {
    const settings: string = JSON.stringify(this.settings);
    window.localStorage.setItem('speechSettings', settings);
  }
}
